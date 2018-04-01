// see https://github.com/featurist/indigo-slp/blob/d7419754a23b3a89856623d728ff29369d2f787a/features/support/characters/Associate.js#L34
const assert = require('assert')
const assemblies = require('./assemblies')
feature('start runner', assemblies, () => {
  scenario('can start and exit', async assembly => {
    const developer = await assembly.createCharacter('developer', 'Dave')
    await developer.ui.startCLI()
    await developer.ui.assertCLIState('ready')
    await developer.ui.exitCLI()
    await developer.ui.assertCLIState('finished')
  })

  scenario('something else')
})

//server
 //has actions
 //- run test
 //- debug test
 //watchers
 //- on add
 //- on change
//
