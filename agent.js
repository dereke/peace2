const Mocha = require('mocha')

process.on('message', function(m) {
  const mocha = new Mocha()
  mocha.files = m.files
  const runner = mocha.run()
  runner.on('test end', (test) => {
    console.log('END', test.state)
    process.send({name: test.title, state: test.state})
    console.log('sent')
  })
});
