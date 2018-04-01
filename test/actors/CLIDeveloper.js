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
}
