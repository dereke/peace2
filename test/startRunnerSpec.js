const assert = require('assert')
const assemblies = require('./assemblies')

feature('start runner', assemblies, () => {
  scenario('can start and exit', async assembly => {
    const developer = await assembly.createActor('developer', 'Dave')
    await developer.startCLI()
    await developer.assertCLIState('ready')
    await developer.exitCLI()
    await developer.assertCLIState('finished')
  })

  scenario('can run a passing test', async assembly => {
    const developer = await assembly.createActor('developer', 'Dave')
    await developer.setupSuccessfulTest()
    await developer.startCLI()
    await developer.runAllTests()
    await developer.assertTestResults('Successful')
    await developer.exitCLI()
  })
})
