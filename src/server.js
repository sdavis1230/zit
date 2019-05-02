const express = require('express');
const app = express();


var Dictionary = require("oxford-dictionary-api");
const cors = require('cors');

app.use(cors());

var def;

var word = "apple";

var dumb;

var app_id = "def79c41";
var app_key = "3e3bc4a30febd5b1eea684aaca0e20a9";
var dict = new Dictionary(app_id, app_key);

app.get('/definition', function(req,res){
      word = req.query.word
      console.log(req.param)
      dict.find(word,function(error,data){
      if(error) return console.log(error);
      def = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
      res.send(def);
   });
})
   
app.get('/partOfSpeech', function(req,res){
   word = req.query.word
   console.log(req.param)
 dict.find(word,function(error,data){
    if(error) return console.log(error);
    partOfSpeech = data.results[0].lexicalEntries[0].lexicalCategory;
    console.log(partOfSpeech)
    res.send(partOfSpeech)
   });
})
app.listen(3210, ()=>{
   console.log('Server running on port 3210')
  });