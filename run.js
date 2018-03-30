const repl = require('repl')
const watch = require('glob-watcher')
const glob = require('glob')
const colors = require('colors')
const testFiles = []
const testFilePatterns = ['**/*Spec.js']
testFilePatterns.forEach(pattern => {
  glob(pattern, (error, files) => {
    files.forEach(file => {
      testFiles.push(file)
    })
  })
})

const watcher = watch(testFilePatterns)
watcher.on('change', function(path, stat) {
  console.log('changed', path)
  runAgent([path])
})

watcher.on('add', function(path, stat) {
  console.log('added', path)
  runAgent([path])
})

const replServer = repl.start({ prompt: '> ' })
replServer.defineCommand('test', {
  help: 'Run tests',
  action(name) {
    this.clearBufferedCommand()
    console.log('run tests...')
    runAgent(testFiles)
    this.displayPrompt()
  }
})

const { fork } = require('child_process')
function runAgent (files) {
  const forked = fork('agent.js', {silent: true})

  forked.on('message', (msg) => {
    const message = `${msg.name}: ${msg.state}`
    if (msg.state === 'passed') {
      console.log(message.green)
    } else {
      console.log(message.red)
    }
  });

  forked.send({ files });
}
