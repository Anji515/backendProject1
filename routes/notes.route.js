const {Router} = require('express');
const { NotesModel } = require('../models/notes.model');
const notesRouter=Router();

notesRouter.post('/create',async(req,res)=>{
    try {
        const note=NotesModel(req.body);
        await note.save()
        res.status(200).send({'msg':'Notes data posted !!'})
    } catch (error) {
        res.status(400).send({'err':error.message})
    }
})

notesRouter.get('/',async(req,res)=>{
       try {
        const notes=await NotesModel.find({authorID:req.body.authorID});
        res.status(200).send(notes)
       } catch (error) {
        res.status(400).send({'err':error.message})
       }
})

notesRouter.patch('/update/:id',async(req,res)=>{
    const {id}=req.params ;
    const notes=await NotesModel.findOne({_id:id});
    try {
        if(req.body.authorID!==notes.authorID){
            res.status(200).send('Your not authorised Person')
        }else{
            const updatedNotes=await NotesModel.findByIdAndUpdate({_id:id},req.body,{new:true});
            res.status(200).send(updatedNotes)
        }
       } catch (error) {
        res.status(400).send({'err':error.message})
       }
})

// 644b76d5126938bef1d672ec - anji

notesRouter.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params ;
    const notes=await NotesModel.findOne({_id:id});
    try {
        if(req.body.authorID!==notes.authorID){
            res.status(200).send('Your not authorised Person')
        }else{
        const deletedNotes=await NotesModel.findByIdAndDelete({_id:id});
        res.status(200).send(deletedNotes)
        }
       } catch (error) {
        res.status(400).send({'err':error.message})
       }
})

module.exports = {notesRouter}
