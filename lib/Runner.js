const path = require('path')
const { fork } = require('child_process')

module.exports = class Runner {
  constructor({config}) {
    this.config = config
  }

  run(files) {
    return new Promise(resolve => {
      const forked = fork(path.join(__dirname, 'agent.js'), {silent: false})

      forked.on('message', (msg) => {
        if (msg === 'end') {
          resolve()
          return
        }
        const message = `${msg.name}: ${msg.state}`
        switch(msg.state) {
          case 'passed':
            //console.log(message.green)
            break
          case 'failed':
            //console.log(message.red)
            //console.log(msg.error.message)
            //console.log(msg.error.stack)
            break
            //case 'pending':
            //  console.log(message.cyan)
            break
        }
      });

      forked.send({ files, config: this.config });
    })
  }
}
