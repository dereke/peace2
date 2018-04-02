const config = require('../peace-defaults')
const DeveloperCharacter = require('./characters/DeveloperCharacter')
const CoreComponents = require('../lib/CoreComponents')
const characters = {
  developer: DeveloperCharacter
}
const EventEmitter = require('events')
const runMocha = require('../lib/runMocha')

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
  constructor () {
    this.coreComponents = new CoreComponents({config, Runner: InProcessRunner, Watchers: MemoryWatcher})
  }

  async createCharacter(type, name) {
    const character = new characters[type]({
      uiType: this.uiType,
      name,
      coreComponents: this.coreComponents
    })
    await character.start()

    return character
  }

  async start () {
    await this.coreComponents.start()
  }
}

class MemoryAssembly extends Assembly {
  static get name () {
    return 'memory'
  }

  get uiType() {
    return 'memory'
  }
}


class CLIAssembly extends Assembly {
  static get name () {
    return 'cli'
  }

  get uiType() {
    return 'cli'
  }
}


module.exports = [MemoryAssembly, CLIAssembly]
