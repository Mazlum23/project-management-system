import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangepProjectDesc = this.onChangepProjectDesc.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeProgress = this.onChangeProgress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      project_name: '',
      project_desc: '',
      username: '',
      progress: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeProjectName(e) {
    this.setState({
      project_name: e.target.value
    })
  }

  onChangepProjectDesc(e) {
    this.setState({
      project_desc: e.target.value
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeProgress(e) {
    this.setState({
      progress: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      project_name: this.state.project_name,
      project_desc: this.state.project_desc,
      username: this.state.username,
      progress: this.state.progress
    }

    console.log(project);

    axios.post('http://localhost:5000/projects/add', project)
      .then(res => console.log(res.data));

    window.location = '/readproject';
  }

  render() {
    return (
    <div>
      <h3>Create New Project Log</h3>
      <form onSubmit={this.onSubmit}>
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
          <label>Project Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.project_name}
              onChange={this.onChangeProjectName}
              />
        </div>
        <div className="form-group">
          <label>Project Desc (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.project_desc}
              onChange={this.onChangepProjectDesc}
              />
        </div>
        <div className="form-group">
          <label>Progress (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.progress}
              onChange={this.onChangeProgress}
              />
        </div>
        
        <div className="form-group">
          <input type="submit" value="Create Project Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}