const mongoose=require('../src/db')

const schema=mongoose.Schema({
    medicine:{
        type:String,
        required:true
    },
    remideAt:{
        type:String,
        required:true
    },
    isReminded:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }
})

const reminder=new mongoose.model('reminder',schema)

module.exports=reminder