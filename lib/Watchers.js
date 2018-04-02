const debug = require('debug')('peace:watchers')
const EventEmitter = require('events')
const watch = require('glob-watcher')
const glob = require('glob')

module.exports = class Watchers extends EventEmitter {
  constructor({config}) {
    super()
    this.testFiles = []
    this.config = config
  }

  start() {
    const testFilePatterns = [this.config.testPattern]
    const ignore = this.config.testPatternIgnore
    debug(`testPattern: ${testFilePatterns.join(', ')}`)
    debug(`ignore: ${ignore || 'nothing'}`)

    testFilePatterns.forEach(pattern => {
      glob(pattern, {ignore}, (error, files) => {
        files.forEach(file => {
          this.testFiles.push(file)
        })
      })
    })

    const watcher = watch(testFilePatterns)
    watcher.on('change', (path, stat) => {
      this.emit('change', path)
    })

    watcher.on('add', (path, stat) => {
      this.testFiles.push(path)
      this.emit('add', path)
    })
  }
}

