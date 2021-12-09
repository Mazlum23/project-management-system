const router = require('express').Router();
let Message = require('../models/message.model');

router.route('/').get((req, res) => {
  Message.find()
    .then(message => res.json(message))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const message_text = req.body.message_text;
  const to_id = req.body.to_id;
  const from_id = req.body.from_id;
  const date = Date.parse(req.body.date);

  const newMessage = new Message({
    message_text,
    to_id,
    from_id,
    date,
  });

  newMessage.save()
  .then(() => res.json('message added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Message.findById(req.params.id)
    .then(message => res.json(message))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Message.findByIdAndDelete(req.params.id)
    .then(() => res.json('message deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Message.findById(req.params.id)
    .then(message => {
      message.message_text = req.body.message_text;
      message.to_id = req.body.to_id;
      message.from_id = req.body.from_id;
      message.date = Date.parse(req.body.progress);

      message.save()
        .then(() => res.json('message updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;