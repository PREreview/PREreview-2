import { v4 as uuid } from 'uuid'

export default {
  author: {
    email: 'johndoe@example',
    // name: 'John Doe',
    name: '',
    WBPerson: '',
  },
  coAuthors: [
    {
      // email: 'johndoe@example.org'
      id: uuid(),
      name: 'Jane Danovski',
      WBPerson: '',
    },
    {
      // email: 'johndoe@example.org'
      id: uuid(),
      name: 'Jack Skittle',
      WBPerson: '',
    },
    {
      // email: 'johndoe@example.org'
      id: uuid(),
      name: 'Jason Bourne',
      WBPerson: '',
    },
  ],
  geneExpression: {
    // detectionMethod: 'antibody',
    // detectionMethod: 'genomeEditing',
    // detectionMethod: 'inSituHybridization',
    detectionMethod: 'newTransgene',
    // detectionMethod: 'existingTransgene',
    dnaSequence: [],
    transgeneUsed: [
      {
        id: uuid(),
        name: '',
      },
    ],
  },
}
