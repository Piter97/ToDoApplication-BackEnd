const Joi = require('joi');
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    members:{
        type:Array,
    },
    groupAdmin:{
        type: String,
    },
    tasks:{
        type: Array
    }
});

const Group = mongoose.model('Group', groupSchema);

function validateGroup(group) {
    const schema = {
        name: Joi.string().required(),
        members: Joi.array(),
        groupAdmin: Joi.string(),
        tasks: Joi.array()
    };

    return Joi.validate(group, schema);
}

exports.groupSchema = groupSchema;
exports.Group = Group;
exports.validate = validateGroup;