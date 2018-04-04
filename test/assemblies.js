const config = require('../peace-defaults')
const MemoryDeveloper = require('./actors/MemoryDeveloper')
const CLIDeveloper = require('./actors/CLIDeveloper')
const CoreComponents = require('../lib/CoreComponents')
const EventEmitter = require('events')
const runMocha = require('../lib/runMocha')

const DoubleHexagon = require('./DoubleHexagon.js')

class InProcessRunner {
  constructor() {
    this.results = []
  }

  run(files) {
    return runMocha({files})
  }
}
class MemoryWatcher extends EventEmitter {
  start() {}
}

class Assembly {
  constructor ({actors}) {
    this.actors = actors
    this.coreComponents = new CoreComponents({config, Runner: InProcessRunner, Watchers: MemoryWatcher})
  }

  async createActor(type, name) {
    const actor = new this.actors[type]({
      name,
      coreComponents: this.coreComponents
    })

    return actor
  }

  async start () {
    await this.coreComponents.start()
  }
}

const hex = new DoubleHexagon(Assembly)
hex.registerAssembly('memory', assembly => {
  assembly.registerActor('developer', MemoryDeveloper)
})

hex.registerAssembly('cli', assembly => {
  assembly.registerActor('developer', CLIDeveloper)
})

module.exports = hex
