const vorpal = require('vorpal')();

module.exports = class CLI {
  constructor({coreComponents}) {
    this.coreComponents = coreComponents
  }

  start() {
    this.coreComponents.start()
    if (this.coreComponents.state === 'ready') {
      vorpal
        .command('test [files]')
        .action(async ({files}) => {
          const testFiles = (
            files ? files.split(',') : undefined
          ) || this.coreComponents.watchers.testFiles
          const results = await this.coreComponents.run(testFiles)
        });

      vorpal
        .delimiter('peace>')
        .show();
    }
  }
}
