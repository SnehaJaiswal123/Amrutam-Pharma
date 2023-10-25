const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONG0_URL)
.then(()=>{
    console.log("Db connected");
})
.catch((e)=>{
    console.log(e);
})

module.exports=mongoose
