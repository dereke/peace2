const DeveloperCharacter = require('./characters/DeveloperCharacter')
const CoreComponents = require('../lib/CoreComponents')
const characters = {
  developer: DeveloperCharacter
}

class Assembly {
  constructor () {
    this.coreComponents = new CoreComponents()
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
