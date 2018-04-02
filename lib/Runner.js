const path = require('path')
const { fork } = require('child_process')

module.exports = class Runner {
  constructor({config}) {
    this.config = config
  }

  run(files) {
    return new Promise(resolve => {
      const forked = fork(path.join(__dirname, 'agent.js'), {silent: false})

      forked.on('message', (results) => {
        forked.kill()
        resolve(results)
      });

      forked.send({ files, ui: this.config.ui });
    })
  }
}
