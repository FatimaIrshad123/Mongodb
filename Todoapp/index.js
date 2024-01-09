const mongoose = require('mongoose');
const express = require("express")
const app = express();
app.use(express.json())

mongoose.connect('your_mongo_url')

let todoSchema = {id : Number,title : String,description : String}
let todo = mongoose.model('Todo',todoSchema)

app.post('/todo',async function(req,res){
    let title = req.body.title;
    let description = req.body.description;

    let newtodo = await todo.create({
        id : Math.round(Math.random()*100),
        title : title,
        description : description
    })
    //console.log(newtodo);
    res.json({'msg':'Todo Created successfully' , Todoid : newtodo._id})
})

app.get('/todo',async function(req,res){
    let response = await todo.find({});
    res.json({todo : response})
})

app.post('/todo/:todoId',async function(req,res){
    let todoId = req.params.todoId;
    let final = await todo.findById(todoId) 
    res.send(final)
})

app.put('/todo/:todoId',async function(req,res){
    let todoId = req.params.todoId;
    let update = await todo.findByIdAndUpdate(todoId,req.body)
    if (update){
        res.json({msg:'Todo updated successfully'})
    }else{
        res.json({msg:'Course not found'})
    }
})

app.listen(3000)