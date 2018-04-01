class Runner {}
class Watchers {}

module.exports = class Core {
  constructor() {
    this.runner = new Runner()
    this.watchers = new Watchers()
  }

  start() {
    this.state = 'ready'
  }

  stop() {
    this.state = 'finished'
  }
}
