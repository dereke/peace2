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
}

