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

  scenario('can run a passing test', async assembly => {
    const developer = await assembly.createCharacter('developer', 'Dave')
    await developer.ui.setupSuccessfulTest()
    await developer.ui.startCLI()
    await developer.ui.runAllTests()
    await developer.ui.assertTestResults('Successful')
    await developer.ui.exitCLI()
  })
})
