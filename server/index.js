const express=require('express')
const app=express();
const router1=require('./Routes/userrouter')
const router2=require('./Routes/medicinerouter')
const Reminder=require('./Model/medicinemodel')

app.use('/',router1)
app.use('/',router2)


setInterval(() => {
    Reminder.find({})
    .then((err, reminderList) => {
        if(err) {
            console.log(err)
        }
        if(reminderList){
            reminderList.forEach(reminder => {
                if(!reminder.isReminded){
                    const now = new Date()
                    if((new Date(reminder.remindAt) - now) < 0) {
                       
                         reminder.populate('owner').execPopulate()
                        const ph_no=reminder.owner.phone_number

                        Reminder.findByIdAndUpdate(reminder._id, {isReminded: true}, (err, remindObj)=>{
                            if(err){
                                console.log(err)
                            }
                            const accountSid = 'AC1df4eb9d8ef3c2e9df19cf98be077d36';
                            const authToken = '65f5240f4b6ea1effce62b1986a2def4';
                            const client = require('twilio')(accountSid, authToken);
                            client.messages 
                                .create({ 
                                    body: reminder.reminderMsg, 
                                    from: 'whatsapp:+14155238886',       
                                    to: ph_no //YOUR PHONE NUMBER INSTEAD OF 8888888888
                                }) 
                                .then(message => console.log(message.sid)) 
                                .done()
                        })
                    }
                }
            })
        }
    })
},1000)

// const main = async () => {
//     const task = await Task.findById('5c2e505a3253e18a43e612e6')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)

//     const user = await User.findById('5c2e4dcb5eac678a23725b5b')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

app.listen('7000',()=>{
    console.log("Server is running on 7000");
})