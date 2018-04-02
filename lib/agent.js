const debug = require('debug')('peace:agent')
const runMocha = require('./runMocha')

process.on('message', async ({ui, files}) => {
  debug('run mocha in sub process')
  const results = await runMocha({
    ui,
    files
  })

  debug(`mocha finished`)
  process.send(results)
})
