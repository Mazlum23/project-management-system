import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateDocument extends Component {
  
  constructor(props) {
    super(props);
    this.onChangeDocName = this.onChangeDocName.bind(this);
    this.onChangeDocType = this.onChangeDocType.bind(this);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      doc_name: '',
      doc_type: '',
      project_name: '',
      username: '',
      projects: [],
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/projects/')
      .then(responses => {
        if (responses.data.length > 0) {
          this.setState({
            projects: responses.data.map(project => project.project_name),
            project_name: responses.data[0].project_name
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((errorr) => {
        console.log(errorr);
      })

  }

  onChangeDocName(e) {
    this.setState({
      doc_name: e.target.value
    })
  }

  onChangeDocType(e) {
    this.setState({
      doc_type: e.target.value
    })
  }

  onChangeProjectName(e) {
    this.setState({
      project_name: e.target.value
    })
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const document = {
      doc_name: this.state.doc_name,
      doc_type: this.state.doc_type,
      project_name: this.state.project_name,
      username: this.state.username
    }

    console.log(document);

    axios.post('http://localhost:5000/documents/add', document)
      .then(res => console.log(res.data));

    window.location = '/readdocument';
  }

  render() {
    return (
    <div>
      <h3>Create New Document Log</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
          <label>Project Name: </label>
          <select ref="projectInput"
              required
              className="form-control"
              value={this.state.project_name}
              onChange={this.onChangeProjectName}>
              {
                this.state.projects.map(function(project) {
                  return <option 
                    key={project}
                    value={project}>{project}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Doc Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.doc_name}
              onChange={this.onChangeDocName}
              />
        </div>
        <div className="form-group"> 
          <label>Doc Type: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.doc_type}
              onChange={this.onChangeDocType}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Create Document Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}