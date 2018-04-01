const { fork } = require('child_process')

module.exports = function runner (files) {
  return new Promise(resolve => {
    const forked = fork('./lib/agent.js', {silent: false})

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

    forked.send({ files });
  })
}

