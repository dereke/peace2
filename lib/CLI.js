const vorpal = require('vorpal')();
const Runner = require('./Runner')

module.exports = class CLI {
  constructor({coreComponents, watchers, runner}) {
    this.coreComponents = coreComponents
    this.watchers = watchers
    this.runner = runner
  }

  start() {
    vorpal
      .command('test [files...]')
      .action(async (args, callback) => {
        await this.runner.run(this.watchers.testFiles)
        callback();
      });

    vorpal
      .delimiter('peace>')
      .show();

    this.watchers.on('add', path => {
      this.runner.run([path])
    })

    this.watchers.on('change', path => {
      this.runner.run([path])
    })
  }
}
