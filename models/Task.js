const {Schema, model} = require("mongoose");

const TaskSchema = Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: Boolean,
        default: false
    },
    create:{
        type: Date,
        default: Date.now()
    },
    project:{
        type: Schema.Types.ObjectId,
        ref:"Project"
    }
})

module.exports=model("Task", TaskSchema)