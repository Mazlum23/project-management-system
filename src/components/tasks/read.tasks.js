/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TaskForm from "./create.tasks"

const Task = (props) => (
  <tr>
    <td>{props.task.username}</td>
    <td>{props.task.task_name}</td>
    <td>{props.task.description}</td>
    <td>{props.task.priority}</td>
    <td>{props.task.date.substring(0, 10)}</td>
    <td>
      <Link to={"/src/components/tasks/edit.tasks.js/edit/" + props.task._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteTask(props.task._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class TaskList extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);

    this.state = { tasks: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tasks/")
      .then((response) => {
        this.setState({ tasks: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTask(id) {
    axios.delete("http://localhost:5000/tasks/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      tasks: this.state.tasks.filter((el) => el._id !== id),
    });
  }

  taskList() {
    return this.state.tasks.map((currenttask) => {
      return (
        <Task
          task={currenttask}
          deleteTask={this.deleteTask}
          key={currenttask._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Task</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Target Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.taskList()}</tbody>
        </table>
        <TaskForm/>
      </div>
    );
  }
}
