const auth = require('../middleware/auth');
const admin = require('../middleware/group-admin');
const {Task, validate} = require('../models/task');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const task = await Task.find(elem => {if (elem.owner === req.body.id) return elem});
  res.send(task);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Task({ 
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || "to-do",
    tag: req.body.tag,
    owner: req.body.owner
  });
  task = await task.save();
  
  res.send(task);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        tag: req.body.tag,
      }, 
      {
    new: true
  });

  if (!task) return res.status(404).send('The task with the given ID was not found.');
  
  res.send(task);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
});

router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
});

module.exports = router;