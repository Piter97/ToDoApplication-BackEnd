const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Group, validate} = require('../models/group');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const group = await Group
        .find({ members: req.user._id})
        .select({name: 1});
    
        res.send(group);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let group = new Group({
        name: req.body.name,
        members: req.body.members,
        groupAdmin: req.user._id,
    })

    group = await group.save();
    res.send(group);
});

module.exports = router; 