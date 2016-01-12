import express from 'express'
import mongoose from 'mongoose'
const { Schema } = mongoose

if(! mongoose.connection.readyState){
  mongoose.connect('mongodb://localhost/trellux');
}

// Model
const CardSchema = new Schema({
    name: String,
    desc: String,
    status: { type: String, enum: ["Todo", "In Progress", "Done"] },
    dueDate: Date,
    position: Number,
    listId: Schema.Types.ObjectId
})


const Card = mongoose.model("Card", CardSchema)

function all(cb) {
  Card.find({}, (err, cards) => {
    cb(cards)
  })
}

function getListCards(listId, cb) {
  Card.find({listId}, (err, cards) => {
    console.log(cards)
    cb(cards)
  })
}

// CRUD Functions
function add(model, cb) {
  const card = new Card(model)
  console.log(card)
  card.save(cb)
}

function remove(){

}

// Init Lists Module
function Init() {
  let router = express.Router()
  // POSTS: /cards/
  router.post('/:listid/cards', function(req, res) {
    const card = req.body
    card.listId = req.params.listid
    add(card, (err) => {
      if(err) res.send("Error !")
      res.send(card)
    })
  });

  // GET: /cards

  router.get('/:listid/cards', (req, res) => {
    getListCards(req.params.listid, (cards) => {
        res.json(cards)
    })
  })

  return router
}

export default Init()
