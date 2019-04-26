const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/group-admin');
const {Task, validate} = require('../models/task');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Group} = require('../models/group');

router.get('/:id', [auth, validateObjectId], async (req, res) => {
  const grouptasks = await Task.find({ owner: req.params.id});
  if (!grouptasks) return res.status(400).send("Group have no tasks")
  res.send(grouptasks);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Task({ 
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || "to-do",
    tags: req.body.tags,
    owner: req.body.owner
  });
  const check = await Group
    .findById(task.owner);

  if (req.user._id !== check.groupAdmin) return res.status(403).send('Access denied.');

  task = await task.save();
  
  res.send(task);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const taskToCheck = await Task
    .findById(req.params.id);

  const group = await Group
    .findById (taskToCheck.owner);
    
  if (!group.members.includes(req.user._id)) res.status(403).send('Access denied.');

  const task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        tags: req.body.tags,
      });

  if (!task) return res.status(404).send('The task with the given ID was not found.');
  
  res.send(task);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const check = await Group
    .findById(req.params.id);

  if (req.user._id !== check.groupAdmin) return res.status(403).send('Access denied.');

  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
});

router.get('/task/:id', [auth, validateObjectId], async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
});

module.exports = router;