const vorpal = require('vorpal')();
const runner = require('./runner')

module.exports = class CLI {
  constructor({coreComponents, watchers}) {
    this.coreComponents = coreComponents
    this.watchers = watchers

    this.watchers.on('add change', path => {
      runner([path])
    })
  }

  start() {
    vorpal
      .command('test [files...]')
      .action(async (args, callback) => {
        await runner(this.watchers.testFiles)
        callback();
      });

    vorpal
      .delimiter('peace>')
      .show();
  }
}
