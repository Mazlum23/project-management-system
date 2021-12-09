const router = require('express').Router();
let Project = require('../models/project.model');

router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const project_name = req.body.project_name;
  const project_desc = req.body.project_desc;
  const username = req.body.username;
  const progress = req.body.progress;

  const newProject = new Project({
    project_name,
    project_desc,
    username,
    progress,
  });

  newProject.save()
  .then(() => res.json('project added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json('project deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      project.project_name = req.body.project_name;
      project.project_desc = req.body.project_desc;
      project.username = req.body.username;
      project.progress = req.body.progress;

      project.save()
        .then(() => res.json('project updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;