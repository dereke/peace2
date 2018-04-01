const EventEmitter = require('events')
const watch = require('glob-watcher')
const glob = require('glob')

module.exports = class Watchers extends EventEmitter {
  constructor() {
    super()
    this.testFiles = []
  }

  start() {
    const testFilePatterns = ['**/*Spec.js']
    testFilePatterns.forEach(pattern => {
      glob(pattern, (error, files) => {
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

