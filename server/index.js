import express from 'express'
import bodyParser from 'body-parser'
import ListsRouter from './lists'
import CardsRouter from './cards'

const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/lists', ListsRouter)
app.use('/lists', CardsRouter)

app.listen(3000, function(){
  console.log("Started")
})
