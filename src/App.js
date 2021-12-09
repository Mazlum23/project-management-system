import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import TasksList from "./components/tasks/read.tasks";
import EditTasks from "./components/tasks/edit.tasks";
import CreateTasks from "./components/tasks/create.tasks";
import CreateUser from "./components/users/create.users";
import UserList from "./components/users/read.users";
import EditUsers from "./components/users/edit.users";
import CreateProject from "./components/projects/create.projects";
import ProjectList from "./components/projects/read.projects";
import EditProject from "./components/projects/edit.projects";
import CreateState from "./components/states/create.states";
import StateList from "./components/states/read.states";
import EditState from "./components/states/edit.states";
import CreateDocument from "./components/documents/create.documents";
import DocumentList from "./components/documents/new";
import EditDocument from "./components/documents/edit.documents";
import CreateMessages from "./components/messages/create.messages";
import MessagesList from "./components/messages/read.messages";
import EditMessages from "./components/messages/edit.messages";
import Document from './components/Document';
import FilesList from './components/FilesList';


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        
        <Route path="/" exact component={TasksList} />
        <Route path="/src/components/tasks/edit.tasks.js/edit/:id" component={EditTasks} />
        <Route path="/create" component={CreateTasks} />
        <Route path="/createuser" component={CreateUser} />
        <Route path="/readuser" component={UserList} />
        <Route path="/src/components/users/edit.users.js/edit/:id"  component={EditUsers} />
        <Route path="/createproject" component={CreateProject} />
        <Route path="/readproject" component={ProjectList} />
        <Route path="/src/components/projects/edit.projects.js/edit/:id"  component={EditProject} />
        <Route path="/createstate" component={CreateState} />
        <Route path="/readstate" component={StateList} />
        <Route path="/src/components/states/edit.states.js/edit/:id"  component={EditState} />
        <Route path="/createdocument" component={CreateDocument} />
        <Route path="/readddocument" component={DocumentList} />
        <Route path="/src/components/document/edit.document.js/edit/:id"  component={EditDocument} />
        <Route path="/createmessage" component={CreateMessages} />
        <Route path="/readmessage" component={MessagesList} />
        <Route path="/src/components/messages/edit.messages.js/edit/:id"  component={EditMessages} />
        <Route component={FilesList} path="/filelist" />
        <Route component={Document} path="/readdocument" />
      </div>
    </Router>
  );
}
export default App;
