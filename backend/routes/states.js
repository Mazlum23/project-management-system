const router = require('express').Router();
let State = require('../models/state.model');

router.route('/').get((req, res) => {
  State.find()
    .then(state => res.json(state))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const state_name = req.body.state_name;
  const state_desc = req.body.state_desc;
  const task_name = req.body.task_name;

  const newState = new State({
    state_name,
    state_desc,
    task_name,
  });

  newState.save()
  .then(() => res.json('state added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  State.findById(req.params.id)
    .then(state => res.json(state))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  State.findByIdAndDelete(req.params.id)
    .then(() => res.json('state deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  State.findById(req.params.id)
    .then(state => {
      state.state_name = req.body.state_name;
      state.state_desc = req.body.state_desc;
      state.task_name = req.body.task_name;

      state.save()
        .then(() => res.json('state updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;