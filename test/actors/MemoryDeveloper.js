const assert = require('assert')

module.exports = class MemoryDeveloper {
  constructor({coreComponents}) {
    this.coreComponents = coreComponents
  }

  startCLI() {
    this.coreComponents.start()
  }

  assertCLIState(state) {
    assert.equal(this.coreComponents.state, state)
  }

  exitCLI() {
    this.coreComponents.stop()
  }

  setupSuccessfulTest() {
    this.tests = ['test/fixtures/thatWorksSpec.js']
  }

  async runAllTests() {
    this.results = await this.coreComponents.run(this.tests)
  }

  assertTestResults(result) {
    const testState = {
      Successful: 'passed'
    }[result]
    assert(this.results.results.find(test => test.state === testState), `Test suite should have been: ${result}`)
  }
}
