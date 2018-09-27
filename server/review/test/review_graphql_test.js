const path = require('path')

const pathToComponent = path.resolve(__dirname, '..', 'src')
const pathToManuscript = path.resolve(
  __dirname,
  '..',
  '..',
  'manuscript',
  'src',
)
process.env.NODE_CONFIG = `{"pubsweet":{"components":["${pathToComponent}", "${pathToManuscript}"]}}`

const Review = require('../src/review')
const Manuscript = require('../../manuscript/src/manuscript')
const { dbCleaner, api } = require('pubsweet-server/test')
const { User, Team } = require('pubsweet-server')

const fixtures = require('pubsweet-server/test/fixtures/fixtures')
const authentication = require('pubsweet-server/src/authentication')
const uuid = require('uuid')

describe('Review queries', () => {
  let token
  let user

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
  })

  it('can find reviews', async () => {
    const articleUuid = uuid.v4()
    await new Review({
      articleVersionId: articleUuid,
      content: 'Review 1',
      reviewerId: user.id,
    }).save()
    await new Review({
      articleVersionId: articleUuid,
      content: 'Review 2',
      reviewerId: user.id,
    }).save()

    const { body } = await api.graphql.query(
      `query($articleVersionId: ID!, $reviewerId: ID!) {
        userReviewsForArticle(articleVersionId: $articleVersionId, reviewerId: $reviewerId) { content }
        }`,
      {
        reviewerId: user.id,
        articleVersionId: articleUuid,
      },
      token,
    )

    expect(body.data.userReviewsForArticle).toHaveLength(2)
    expect(body.data.userReviewsForArticle[0].content).toEqual('Review 1')
  })

  it('can get all reviews for an article', async () => {
    const articleUuid = uuid.v4()

    // 2 reviews for one manuscript
    await new Review({
      articleVersionId: articleUuid,
      content: 'Review 1',
      reviewerId: user.id,
    }).save()
    await new Review({
      articleVersionId: articleUuid,
      content: 'Review 2',
      reviewerId: user.id,
    }).save()

    // 1 review for the other one
    await new Review({
      articleVersionId: uuid.v4(),
      content: 'Review 3',
      reviewerId: user.id,
    }).save()

    const { body } = await api.graphql.query(
      `query($articleVersionId: ID!) {
        reviewsForArticle(articleVersionId: $articleVersionId) { content }
        }`,
      {
        articleVersionId: articleUuid,
      },
      token,
    )

    expect(body.data.reviewsForArticle).toHaveLength(2)
    expect(body.data.reviewsForArticle[0].content).toEqual('Review 1')
  })

  it('can submit a review', async () => {
    const { body } = await api.graphql.query(
      `mutation($input: CreateReviewInput!) {
        createReview(input: $input) {
          reviewerId
          content
        }
      }`,
      {
        input: {
          reviewerId: user.id,
          articleVersionId: uuid.v4(),
        },
      },
      token,
    )

    expect(body).toEqual({
      data: {
        createReview: {
          reviewerId: user.id,
          content: null,
        },
      },
    })
  })

  it('can update a review', async () => {
    const manuscript = await new Manuscript({ title: '1' }).save()
    const review = await new Review({
      articleVersionId: manuscript.id,
      reviewerId: user.id,
      events: { createdAt: new Date() },
    }).save()

    const { body } = await api.graphql.query(
      `mutation($id: ID!, $input: UpdateReviewInput!) {
        updateReview(id: $id, input: $input) {
          reviewerId
          content
          recommendation
        }
      }`,
      {
        id: review.id,
        input: {
          content: 'Great stuff!',
          recommendation: 'Accept this',
          submit: true,
        },
      },
      token,
    )

    expect(body).toEqual({
      data: {
        updateReview: {
          reviewerId: user.id,
          content: 'Great stuff!',
          recommendation: 'Accept this',
        },
      },
    })
  })

  describe('Dashboard', async () => {
    it('shows manuscripts to assigned reviewers', async () => {
      const scienceOfficer = await new User({
        username: 'sci',
        email: 'sci@example.com',
        password: 'sci',
      }).save()

      const invitedReviewer = await new User({
        username: 'inv',
        email: 'inv@example.com',
        password: 'invinvinv',
      }).save()
      const rejectedReviewer = await new User({
        username: 'rej',
        email: 'rej@example.com',
        password: 'rej',
      }).save()
      const acceptedReviewer = await new User({
        username: 'acc',
        email: 'acc@example.com',
        password: 'acc',
      }).save()

      const manuscript1 = await new Manuscript({
        title: '1',
        status: { submission: { initial: true } },
      }).save()

      const manuscript2 = await new Manuscript({
        title: '2',
        status: { submission: { initial: true } },
      }).save()

      const manuscript3 = await new Manuscript({
        title: '3',
        status: { submission: { initial: true } },
      }).save()

      // Global editors team
      await new Team({
        name: 'Editors',
        teamType: 'editors',
        members: [user.id],
        global: true,
      }).save()

      const makeTeamsForManuscript = async args => {
        const { invited, rejected, accepted, manuscript } = args

        // An invited reviewer team
        await new Team({
          name: 'Invited reviewers',
          teamType: 'reviewersInvited',
          members: [
            (invited && invited.id) ||
              (rejected && rejected.id) ||
              (accepted && accepted.id),
          ],
          object: { objectId: manuscript.id, objectType: 'manuscript' },
        }).save()

        // A rejected reviewer team
        await new Team({
          name: 'Reviewers who rejected the invitation',
          teamType: 'reviewersRejected',
          members: rejected ? [rejected.id] : [],
          object: { objectId: manuscript.id, objectType: 'manuscript' },
        }).save()

        // An accepted reviewer team
        await new Team({
          name: 'Reviewers who accepted the invitation',
          teamType: 'reviewersAccepted',
          members: accepted ? [accepted.id] : [],
          object: { objectId: manuscript.id, objectType: 'manuscript' },
        }).save()

        await new Team({
          name: 'Author',
          teamType: 'author',
          members: [user.id],
          object: { objectId: manuscript.id, objectType: 'manuscript' },
        }).save()

        await new Team({
          name: 'Editor',
          teamType: 'editor',
          members: [],
          object: { objectId: manuscript.id, objectType: 'manuscript' },
        }).save()

        await new Team({
          name: 'Editor',
          teamType: 'editor',
          members: [scienceOfficer.id],
          object: { objectId: manuscript.id, objectType: 'manuscript' },
        }).save()

        await new Team({
          name: 'Reviewers',
          teamType: 'reviewers',
          members: [],
          object: { objectId: manuscript.id, objectType: 'manuscript' },
        }).save()
      }

      await makeTeamsForManuscript({
        invited: invitedReviewer,
        manuscript: manuscript1,
      })
      await makeTeamsForManuscript({
        rejected: rejectedReviewer,
        manuscript: manuscript2,
      })
      await makeTeamsForManuscript({
        accepted: acceptedReviewer,
        manuscript: manuscript3,
      })

      // Invited reviewer should see the manuscript in their dashboard,
      // with the status: 'pendingDecision'
      const invitedReviewerToken = authentication.token.create(invitedReviewer)
      const { body } = await api.graphql.query(
        `query($currentUserId: ID!) {
          dashboardArticles(currentUserId: $currentUserId) {
            reviewer {
              title
              reviewerStatus
            }
          }
        }`,
        { currentUserId: user.id },
        invitedReviewerToken,
      )

      expect(body.data.dashboardArticles.reviewer).toHaveLength(1)
      expect(body.data.dashboardArticles.reviewer[0].reviewerStatus).toEqual(
        'pendingDecision',
      )

      // Rejected reviewer should see the manuscript in their dashboard,
      // with the status: 'rejected'
      const rejectedReviewerToken = authentication.token.create(
        rejectedReviewer,
      )
      const { body: body2 } = await api.graphql.query(
        `query($currentUserId: ID!) {
          dashboardArticles(currentUserId: $currentUserId) {
            reviewer {
              reviewerStatus
            }
          }
        }`,
        { currentUserId: user.id },
        rejectedReviewerToken,
      )

      expect(body2.data.dashboardArticles.reviewer).toHaveLength(1)
      expect(body2.data.dashboardArticles.reviewer[0].reviewerStatus).toEqual(
        'rejected',
      )

      // Reviewer who accepted should see the manuscript in their dashboard,
      // with the status: 'accepted'
      const acceptedReviewerToken = authentication.token.create(
        acceptedReviewer,
      )
      const { body: body3 } = await api.graphql.query(
        `query($currentUserId: ID!) {
          dashboardArticles(currentUserId: $currentUserId) {
            reviewer {
              reviewerStatus
            }
          }
        }`,
        { currentUserId: user.id },
        acceptedReviewerToken,
      )

      expect(body3.data.dashboardArticles.reviewer).toHaveLength(1)
      expect(body3.data.dashboardArticles.reviewer[0].reviewerStatus).toEqual(
        'accepted',
      )

      // If a review is created...
      const review = await new Review({
        articleVersionId: manuscript3.id,
        reviewerId: acceptedReviewer.id,
        events: { createdAt: new Date() },
      }).save()

      // ... and submitted ...
      await api.graphql.query(
        `mutation($id: ID!, $input: UpdateReviewInput!) {
          updateReview(id: $id, input: $input) {
            reviewerId
            content
            recommendation
          }
        }`,
        {
          id: review.id,
          input: {
            content: 'Great stuff!',
            recommendation: 'Accept this',
            submit: true,
          },
        },
        acceptedReviewer,
      )

      // ... then the status of the review should be 'submitted'
      const { body: body4 } = await api.graphql.query(
        `query($currentUserId: ID!) {
          dashboardArticles(currentUserId: $currentUserId) {
            reviewer {
              reviewerStatus
            }
          }
        }`,
        { currentUserId: user.id },
        acceptedReviewerToken,
      )

      expect(body4.data.dashboardArticles.reviewer[0].reviewerStatus).toEqual(
        'submitted',
      )
    })
  })
})
