'use strict';

/**
 * Module dependencies.
 */

var Test = require('mocha/lib/test');

/**
 * BDD-style interface:
 *
 *      describe('Array', function() {
 *        describe('#indexOf()', function() {
 *          it('should return -1 when not present', function() {
 *            // ...
 *          });
 *
 *          it('should return the index when present', function() {
 *            // ...
 *          });
 *        });
 *      });
 *
 * @param {Suite} suite Root suite.
 */
module.exports = function (suite) {
  var suites = [suite];

  suite.on('pre-require', function (context, file, mocha) {
    var common = require('mocha/lib/interfaces/common')(suites, context, mocha);

    context.run = mocha.options.delay && common.runWithSuite(suite);

    context.feature = context.context = function (title, assemblies, fn) {
      return common.suite.create({
        title,
        file,
        fn: function () {
          return assemblies.map((CreateAssembly, title) => {
            return common.suite.create({
              title,
              file,
              fn: function () {
                this.CreateAssembly = CreateAssembly
                return fn.call(this)
              }
            })
          })
        }
      });
    };

    /**
     * Pending feature.
     */

    context.xfeature = context.xcontext = context.feature.skip = function (title, assemblies, fn) {
      return common.suite.skip({
        title,
        assemblies,
        file,
        fn
      });
    };

    /**
     * Exclusive suite.
     */

    context.feature.only = function (title, assemblies, fn) {
      return common.suite.only({
        title,
        assemblies,
        file,
        fn
      });
    };

    context.scenario = function (title, fn) {
      var suite = suites[0];
      var testFn = async function () {
        const assembly = suite.CreateAssembly()
        if (typeof assembly.start === 'function') {
          await assembly.start()
        }
        await Promise.resolve(fn(assembly))
        if (typeof assembly.stop === 'function') {
          await assembly.stop()
        }
      }

      if (suite.isPending() || !fn) {
        testFn = null;
      }
      var test = new Test(title, testFn)
      test.file = file;
      suite.addTest(test);
      return test;
    };

    context.scenario.only = function (title, assemblies, fn) {
      return common.test.only(mocha, context.scenario(title, assemblies, fn));
    };

    context.xscenario = context.scenario.skip = function (title) {
      return context.scenario(title);
    };

    context.scenario.retries = function (n) {
      context.retries(n);
    };
  });
};
