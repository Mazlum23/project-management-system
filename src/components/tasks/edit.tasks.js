import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTaskName = this.onChangeTaskName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      task_name: '',
      description: '',
      priority: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          task_name: response.data.task_name,
          description: response.data.description,
          priority: response.data.priority,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeTaskName(e) {
    this.setState({
      task_name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const task = {
      username: this.state.username,
      task_name: this.state.task_name,
      description: this.state.description,
      priority: this.state.priority,
      date: this.state.date
    }

    console.log(task);

    axios.post('http://localhost:5000/tasks/update/' + this.props.match.params.id, task)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Task Log</h3>
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
          <label>Task Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.task_name}
              onChange={this.onChangeTaskName}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Priority (%): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.priority}
              onChange={this.onChangePriority}
              />
        </div>
        <div className="form-group">
          <label> Target Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Task Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}