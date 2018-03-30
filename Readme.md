# Peace 2
Second go at building a nice test runner

# Usage
Clone this repo

`yarn` to install dependencies
`node run.js`

This opens an interactive shell

It starts monitoring files matching the pattern `**/*Spec.js`

When they change the tests will be run (using mocha) in a child process

Results are reported back to the shell

`.test` will run all the tests

Plans

`.debug` run the test in visible electron
`.failures` show the failures from the last run

add tab completion
add assembly support (set only one assembly to run)

# Elephant

there are no tests :scream:!
