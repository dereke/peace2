const MemoryDeveloper = require('../actors/MemoryDeveloper')
const CLIDeveloper = require('../actors/CLIDeveloper')

module.exports = class DeveloperCharacter {
  constructor({uiType, coreComponents}) {
    this.uiType = uiType
    this.coreComponents = coreComponents
  }

  start () {
    this.core = new MemoryDeveloper({
      coreComponents: this.coreComponents
    })

    switch (this.uiType) {
      case 'memory':
        this.ui = this.core
        break
      case 'cli':
        this.ui = new CLIDeveloper({coreComponents: this.coreComponents})
        break
    }
  }
}

