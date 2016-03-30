var commandLineArgs = require('command-line-args')

function commandLineOptions() {
  var cli = commandLineArgs([
    {name: "firstYear", alias: "f", type: Number},
    {name: "lastYear", alias: "l", type: Number},
    {name: "employees", alias:"e", type: Number},
    {name: "overview", alias:"o", type: String},
    {name: "milestones", alias:"m", type: String},
    {name: "ipo", alias:"i", type: String},
    {name: "country", alias:"c", type: String},
    {name: "skip", defaultValue: 0, type: Number},
    {name: "limit", defaultValue: 20000, type: Number},
    {name: "clean", defaultValue: 'no', type: String},
  ])

  var options = cli.parse()
  if (!(('firstYear' in options) && ('lastYear' in options))) {
    console.log(cli.getUsage({
      title: "Usage",
      description: "The first two arguments are required",
    }))
    process.exit() //node exiting the process
  };
  return options
}

module.exports = commandLineOptions
