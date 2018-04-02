const Mocha = require('mocha')

process.on('message', function(m) {
  const mocha = new Mocha()
  mocha.ui(m.config.ui)
  mocha.files = m.files
  const runner = mocha.run()
  runner.on('test end', (test) => {
    const state = test.pending ? 'pending' : test.state
    const error = test.err ? {
      message: test.err.message,
      stack: test.err.stack
    } : null
    process.send({name: test.title, state, error})
  })

  runner.on('end', () => {
    process.send('end')
  })
});
