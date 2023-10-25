const mongoose=require('../src/db')

const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
      type:String,
      required:true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

schema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

schema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

schema.statics.findByCredentials = async (email, password) => {
    const User = await user.findOne({ email })

    if (!User) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
schema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const user=new mongoose.model('user',schema)

module.exports=user


