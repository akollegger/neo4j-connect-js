/* cypher commander component
 * To use add require('../cmds/cypher.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

var Neo4jConnect = require('../build/neo4j-connect');
var JSON3 = require('json3');
var Table = require('cli-table');

module.exports = function(program) {

  program.config.defaults({
    url: "http://localhost:7474",
    format:'table'
  });

  function resultAsTable(result) {
    // instantiate
    var table = new Table({
        head: result.body.columns,
        style: {
          head: ['green'],
          border: ['cyan']
        }
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    for (var i=0; i<result.body.data.length; i++) {
      var row = [];
      for (var j=0; j<result.body.data[i].length; j++) {
        row.push(JSON3.stringify(result.body.data[i][j], null, " "))
      }
      table.push(row);
    }
    console.log(table.toString());
  }

  function errorAsTable(result) {
    // instantiate
    var table = new Table({
        head: ["ERROR"],
        style: {
          head: ['red'],
          border: ['grey']
        }
    });

    table.push([result.body.message]);
    table.push([result.body.fullname]);
    console.log(table.toString());
  }

  function cypherRepl(/* args? */) {

    var readline = require('readline')
      , rl;

    rl = readline.createInterface(process.stdin, process.stdout, null);

    var url = program.config.get('url');
    var format = program.config.get('format');

    var neo4jConnect = new Neo4jConnect(url);

    rl.setPrompt('(cypher) ');

    rl.on('line', function(line) {
      if (line === 'quit') {
        rl.close();
      } else {
        neo4jConnect.cypher(line).then(
          function (result) {
            switch (format) {
            case 'raw':
              console.log("\n-->", JSON3.stringify(result.body, null, "  "));
              break;
            case 'table':
              resultAsTable(result);
              break;
            }
            rl.prompt();
          },function (error) {
            switch (format) {
            case 'raw':
              console.log("\n-#>", error);
              break;
            case 'table':
              errorAsTable(error);
              break;
            }
            rl.prompt();
          }
        )
      }

    });

    rl.on('close', function() {
      console.log('Bye');
      process.exit();
    });

    rl.prompt();
  };

	program
		.command('cypher').option('-f, --format <raw|table>', 'Format of query results')
		.version('0.1.0')
		.description('Simple Cypher REPL')
    .action(cypherRepl);

};
