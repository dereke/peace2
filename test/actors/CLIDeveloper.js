const assert = require('assert')
const retry = require('trytryagain')
const { spawn } = require('child_process')

module.exports = class CLIDeveloper {
  constructor({coreComponents}) {
    this.coreComponents = coreComponents
    this.history = []
  }

  startCLI() {
    this.cli = spawn('./bin/peace', [], {stdio: 'pipe'})
    this.cli.stdout.on('data', buffer => {
      this.history.push(buffer.toString())
    })
  }

  assertCLIState(state) {
    const expectedPrompt = {
      ready: 'peace> ',
      finished: 'goodbye\n'
    }[state]

    return retry(() => {
      assert(this.history.indexOf(expectedPrompt) !== -1, `expected state ${state}`)
    })
  }

  exitCLI() {
    this.cli.stdin.pause()
    this.cli.kill()
  }

  setupSuccessfulTest() {
    this.tests = ['test/fixtures/thatWorksSpec.js']
  }

  async runAllTests() {
    this.cli.stdin.write(`test ${this.tests.join(', ')}\n`)
  }

  assertTestResults(result) {
    const expectedText = {
      Successful: '1 passing'
    }[result]
    return retry(() => {
      assert(this.history.find(entry => entry.indexOf(expectedText) !== -1), `Test suite should have been: ${result}`)
    })
  }
}
