# Peace 2
Second go at building a nice test runner

# Usage
`yarn add https://github.com/dereke/peace2` to install

execute `./node_modules/.bin/peace`

It starts monitoring files matching the pattern `**/*Spec.js`

When they change the tests will be run (using mocha) in a child process

Results are reported back to the shell

`test` will run all the tests
`test test/specificFile.js` will run the tests in the specific file

# Config

You can change the default pattern by adding a `peace-config.json` in the root of your project.

```
{
  "ui": "bdd",
  "testPattern": "test/**/*Spec.js",
  "testPatternIgnore": "test/pending/*.js"
}
```

Plans

`debug` run the test in visible electron
`failures` show the failures from the last run

add tab completion
add assembly support (set only one assembly to run)
