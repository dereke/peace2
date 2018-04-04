module.exports = class DoubleHexagon {
  constructor(Assembly) {
    this.actors = {}
    this.assemblies = {}
    this.Assembly = Assembly
  }

  registerAssembly(type, cb) {
    const assembly = {
      actors: {}
    }
    this.assemblies[type] = assembly

    cb({
      registerActor(type, clazz) {
        assembly.actors[type] = clazz
      }
    })
  }

  build(assemblyType) {
    return new this.Assembly(this.assemblies[assemblyType])
  }

  map(cb) {
    return Object.keys(this.assemblies).map(type => {
      cb(() => this.build(type), type)
    })
  }
}
