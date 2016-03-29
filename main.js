var express = require('express')
var app = express()
var engines = require('consolidate')
var mongoClient = require('mongodb').MongoClient
var assert = require('assert')
var bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')
app.use(bodyParser.urlencoded({extended: true}))

mongoClient.connect('mongodb://localhost:27017/', function(err, db) {

  assert.equal(null, err)
  console.log('Succesfully conected to mongodb database')

  app.get('/', function(req, res){
    res.render("index")
  })

  // var query = {'category_code': 'enterprise'}

  // db.collection('companies').find(query).toArray(function(err, docs) {
  //   assert.equal(null, err)

  //   docs.forEach(function(doc){
  //     console.log(doc.name + "is a " + doc.category_code)
  //   })
  // })

})
