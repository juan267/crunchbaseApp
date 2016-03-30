var express = require('express')
var app = express()
var engines = require('consolidate')
var mongoClient = require('mongodb').MongoClient
var assert = require('assert')
var bodyParser = require('body-parser');
var commandLineOptions = require('./js/commandLineOptions')
var queryDocument = require('./js/query')
var queryProyection = require('./js/proyection')

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')
app.use(bodyParser.urlencoded({extended: true}))

var options = commandLineOptions();

mongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

  assert.equal(null, err)
  console.log('Succesfully conected to mongodb database')
  console.log(options.firstYear)

  if (options.clean === 'yes') {
    console.log('Hoooll')
    var query = {permalink: {$exists: true, $ne: null}}
    var proyection = {permalink: 1, updated_at: 1}
    var clean = true
    var markForDelete = []
    var previous = {permalink: '', updated_at: ''}
  } else {
    var query = queryDocument(options)
    var projection = queryProyection(options)
    var clean = false
  }

  var cursor = db.collection('companies').find(query)
  clean ? cursor.sort({permalink: 1}) : cursor.sort([['founded_year', 1], ['employees', -1]])
  // var matches = db.collection('companies').find(query).count()
  cursor.project(projection)
  cursor.skip(options.skip)
  cursor.limit(options.limit)


  cursor.forEach(
    function(doc){
      if (clean) {
        if ((doc.permalink === previous.permalink) && (doc.updated_at === previous.updated_at)) {
          console.log(doc.permalink)
          markForDelete.push(doc._id)
        }
        previous = doc
      } else {
        console.log(doc)
        numMatches += 1
      }
    },
    function(err){
      assert.equal(null, err)
      var filter = {_id: {$in: markForDelete}}
      console.log("Query that was generated " + JSON.stringify(query))
      console.log("Number of Matches " + JSON.stringify(numMatches))
      console.log("remove items "+ markForDelete.length)
      db.collection('companies').deleteMany(filter, function(err, res){
        assert(null, err)
        console.log(res.result)
        db.close()
      })
    }
  )
})



