import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateState extends Component {
  constructor(props) {
    super(props);

    this.onChangeTaskName = this.onChangeTaskName.bind(this);
    this.onChangeStateName = this.onChangeStateName.bind(this);
    this.onChangeStateDesc = this.onChangeStateDesc.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      state_name: '',
      state_desc: '',
      task_name: '',
      tasks: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/states/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          state_name: response.data.state_name,
          state_desc: response.data.state_desc,
          task_name: response.data.task_name,
         
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
      axios.get('http://localhost:5000/tasks/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            tasks: response.data.map(task => task.task_name),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeTaskName(e) {
    this.setState({
      task_name: e.target.value
    })
  }

  onChangeStateName(e) {
    this.setState({
      state_name: e.target.value
    })
  }

  onChangeStateDesc(e) {
    this.setState({
      state_desc: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const state = {
      state_name: this.state.state_name,
      state_desc: this.state.state_desc,
      task_name: this.state.task_name,
    }

    console.log(state);

    axios.post('http://localhost:5000/states/update/' + this.props.match.params.id, state)
      .then(res => console.log(res.data));
    window.location = '/readstate';
  }

  render() {
    return (
    <div>
      <h3>Edit State Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Task Name: </label>
          <select ref="taskInput"
              required
              className="form-control"
              value={this.state.task_name}
              onChange={this.onChangeTaskName}>
              {
                this.state.tasks.map(function(task) {
                  return <option 
                    key={task}
                    value={task}>{task}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>State Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.state_name}
              onChange={this.onChangeStateName}
              />
        </div>
        <div className="form-group">
          <label>State Desc (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.state_desc}
              onChange={this.onChangeStateDesc}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit State Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}