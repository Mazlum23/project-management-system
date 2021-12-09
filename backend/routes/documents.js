const router = require('express').Router();
let Document = require('../models/document.model');


router.route('/').get((req, res) => {
  Document.find()
    .then(documents => res.json(documents))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const type = req.body.type;

  const newDocument = new Document({
    name,
    type,
  });

  newDocument.save()
  .then(() => res.json('document added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Document.findById(req.params.id)
    .then(document => res.json(document))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Document.findByIdAndDelete(req.params.id)
    .then(() => res.json('document deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Document.findById(req.params.id)
    .then(document => {
      document.name = req.body.name;
      document.type = req.body.type;
      document.save()
        .then(() => res.json('document updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;