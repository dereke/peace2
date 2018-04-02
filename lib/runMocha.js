const debug = require('debug')('peace:runMocha')
const Mocha = require('mocha')

module.exports = ({ui, files}) => {
  return new Promise((resolve, reject) => {
    try {
      const mocha = new Mocha()
      debug(`mocha ui: ${ui}`)
      debug(`mocha files: ${files.join(', ')}`)
      if (ui) {
        mocha.ui(ui)
      }
      mocha.files = files
      const results = []
      const runner = mocha.run(failures => {
        resolve({results})
      })

      runner.on('test end', (test) => {
        const state = test.pending ? 'pending' : test.state
        const error = test.err ? {
          message: test.err.message,
          stack: test.err.stack
        } : null
        results.push({name: test.title, state, error})
      })
    } catch (error) {
      debug(`error: ${error.message} ${error.stack}`)
      reject(error)
    }
  })
}
