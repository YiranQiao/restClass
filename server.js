var express = require('express');
var app = express();
var jsonOb = require('./data.json');
var fs= require('fs');
var path = require('path');

app.use(express.static('public'));
app.get('/api/get/all',(req, res)=> {
   console.log(jsonOb);
   res.send(jsonOb);
})

app.get('/', (req, res)=> {
   res.send('Hello');
})

app.post('/:id', (req, res)=> {
	id="pc"+req.params.id;
	name="picture"+req.params.id;
	size="23"+req.params.id+"kb";
   jsonOb[id]={
   	"name":name,
   	"size":size
   }
   console.log(jsonOb);
   res.send('Hello POST'+jsonOb);
   fs.writeFile('./data.json', JSON.stringify(jsonOb), ()=>{
   	console.log("post successfully!");
   })
})


app.delete('/:id', (req, res)=> {
	id="pc"+req.params.id;
	delete jsonOb[id];
	fs.writeFile('./data.json', JSON.stringify(jsonOb), ()=>{
   	console.log("delete successfully!");
   })
  
   res.send('Hello DELETE');
})


app.get('/api/get/:id', (req, res)=> {
   str="pc"+req.params.id;
 
   res.send(jsonOb[str]);
})





var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})