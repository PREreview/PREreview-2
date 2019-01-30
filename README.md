# PREreview 2

![PREreview logo](https://cdn.rawgit.com/SamanthaHindle/preprint_JournalClub/8acbaa94/PREreview_banner.png)

<p align="center">
  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"
      alt="API stability" />
  </a>
  <!-- License -->
  <a href="https://github.com/PREreview/PRereview-2/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square"
      alt="MIT license" />
  </a>
  <!-- Made with <3 -->
  <a href="https://prereview.org" target="_blank">
    <img src="https://img.shields.io/badge/made_with-❤️💛💚💙💜-e6e6e6.svg?style=flat-square" />
  </a>
</p>

**NOTE: this project is under very active development and is not currently accepting contributions.** Thanks for taking an interest 😊. Feel free to star/watch the repo and we'll remove this notice once we have processes and documentation in place to allow people to collaborate productively.

**[Join our PREreview Slack Channel](https://join.slack.com/t/prereview/shared_invite/enQtMzYwMjQzMTk3ODMxLTZhOWQ5M2FmMTY5OTYzZDNhNDg2ZDdhODE2Y2Y4MTVjY2U0OWRiZTA5ZjM3MWM1ZTY0N2E1ODYyNWM1NTc2NDg)**

## [TODO] Developer quick links

- Design
- Roadmap
- Project-level issue tracking
- Development milestones and issue tracker
- COKO PREreview development mattermost channel
- Gitter channel

## Developer instructions

### Things to install

- yarn
- docker

### Things to be aware of

- We use commitlint, so your commit messages must:
  - have a 'type', e.g. `chore: upgrade dependencies` or `fix: nothing works (closes #12)`
  - be all lowercase
- We use [stylelint](https://github.com/stylelint/stylelint) with the [recommended](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md#possible-errors) rules
- We use eslint and inherit rules from the [pubsweet project's configuration](https://gitlab.coko.foundation/pubsweet/pubsweet/blob/master/.eslintrc)

### Install dependencies

```sh
yarn
```

### Setup a development database

To create a development database:

```sh
docker-compose up -d
yarn setupdb
```

You can also populate the database with some demo data:

```sh
yarn seed:demo
```

### Run development environment

Make sure `docker-compose` is running the services either in another terminal or backgrounded with `-d`, then:

```sh
yarn server
```

### Interact with the app

1. Visit http://localhost:3000
2. Login as `admin:admin`
3. Enjoy
