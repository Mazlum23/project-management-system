const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fileRoute = require('./routes/file');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname+ '/dist/pms')));
app.use(fileRoute);

app.post('*', (req, res) => {
  res.sendFile(path.join(__dirname+ '/dist/pms/index.html'));
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const statesRouter = require('./routes/states');
const documentsRouter = require('./routes/documents');
const messagesRouter = require('./routes/messages');
const filesRouter = require('./routes/file');

app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/states', statesRouter);
app.use('/documents', documentsRouter);
app.use('/messages', messagesRouter);
app.use('/files', filesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

