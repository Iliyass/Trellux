import express from 'express'
import mongoose from 'mongoose'
const { Schema } = mongoose

if(! mongoose.connection.readyState){
  mongoose.connect('mongodb://localhost/trellux');
}
// Model
const ListSchema = new Schema({
    name: String,
    position: Number,
    createdAt: Date
})


const List = mongoose.model("List", ListSchema)

function all(cb) {
  List.find({}, (err, lists) => {
    cb(lists)
  })
}

// CRUD Functions
function add(model, cb) {
  List.count({}, (err, count) => {
    model.position = count + 1
    const list = new List(model)
    list.save(cb)
  })

}

function remove(listId, cb){
  List.remove({_id: listId}, (err) =>{
    if(err) console.log("Error")
    cb()
  })
}

// Init Lists Module
function Init() {
  let router = express.Router()

  router.delete('/:listId', function(req, res) {
    remove(req.params.listId, () => {
      res.send({status: "success"})
    })
  })

  // POSTS: /lists/
  router.post('/', function(req, res) {
    const list = req.body
    add(list, (err, savedList) => {
      if(err) res.send("Error !")
      res.send(savedList)
    })
  });

  // GET: /lists

  router.get('/', (req, res) => {
    setTimeout( () => {
      all((lists) => {
          res.json(lists)
      })
    }, 500)
  })

  return router
}

export default Init()
