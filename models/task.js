const Joi = require('joi');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 35
    },
    description:{
        type: String,
        maxlength:1024
    },
    status:{
        type: String,
        required: true,
        enum: ['to-do','in progress','done']
    },
    tags:{
        type: Array,
        validate:{
            validator: function(v){
                return v && v.length>0
            },
            message:'A task should have and least one tag.'
        }
    },
    owner:{
        type: String
        //required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
    const schema = {
        title: Joi.string().min(1).required(),
        description: Joi.string().max(1024),
        tags: Joi.array(),
        status: Joi.string(),
        owner: Joi.string()
    };

    return Joi.validate(task, schema);
}

exports.taskSchema = taskSchema;
exports.Task = Task;
exports.validate = validateTask;