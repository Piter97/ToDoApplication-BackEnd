const Joi = require('joi');
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name:{
        type: String,
        maxlength: 50,
        required: true
    },
    members:{
        type:Array,
    },
    groupAdmin:{
        type: String,
    }
});

const Group = mongoose.model('Group', groupSchema);

function validateGroup(group) {
    const schema = {
        name: Joi.string().required(),
        members: Joi.array(),
        groupAdmin: Joi.string(),
    };

    return Joi.validate(group, schema);
}

exports.groupSchema = groupSchema;
exports.Group = Group;
exports.validate = validateGroup;