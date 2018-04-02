const debug = require('debug')('peace:coreComponents')

module.exports = class CoreComponents {
  constructor({config, Runner, Watchers}) {
    this.config = config
    this.runner = new Runner({config})
    this.watchers = new Watchers({config})
  }

  start() {
    this.watchers.start()

    this.watchers.on('add', path => {
      this.runner.run([path])
    })

    this.watchers.on('change', path => {
      this.runner.run([path])
    })
    this.state = 'ready'
  }

  stop() {
    this.state = 'finished'
  }

  run(files) {
    debug(`run: ${files.join(', ')}`)
    return this.runner.run(files)
  }

  get results () {
    return this.runner.results
  }
}
