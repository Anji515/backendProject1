const mongoose=require('mongoose');

const notesSchema=mongoose.Schema({
    author:{type:String,required:true},
    title:{type:String,required:true},
    body:{type:String,required:true},
    authorID:{type:String,required:true},
    category:{type:String,required:true},
},{
    versionKey:false
})

const NotesModel=mongoose.model('note',notesSchema)

module.exports= {NotesModel} ;