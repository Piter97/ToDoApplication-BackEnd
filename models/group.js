const Joi = require('joi');
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    members:{
        type:Array,
        required: true
    },
    groupAdmin:{
        type: String,
        required: true
    },
    tasks:{
        type: Array
    }
});

const Group = mongoose.model('Group', groupSchema);

function validateGroup(group) {
    const schema = {
        required: Joi.required(),
        groupAdmin: Joi.string().required()
    };

    return Joi.validate(group, schema);
}

exports.groupSchema = groupSchema;
exports.Group = Group;
exports.validate = validateGroup;