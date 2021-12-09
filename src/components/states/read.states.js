/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StateForm from "./create.states"

const States = (props) => (
  <tr>
    <td>{props.state.state_name}</td>
    <td>{props.state.state_desc}</td>
    <td>{props.state.task_name}</td>
    <td>
      <Link to={"/src/components/states/edit.states.js/edit/" + props.state._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteState(props.state._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class StateList extends Component {
  constructor(props) {
    super(props);

    this.deleteState = this.deleteState.bind(this);

    this.state = { states: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/states/")
      .then((response) => {
        this.setState({ states: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteState(id) {
    axios.delete("http://localhost:5000/states/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
        states: this.state.states.filter((el) => el._id !== id),
    });
  }

  stateList() {
    return this.state.states.map((currentstate) => {
      return (
        <States
          state={currentstate}
          deleteState={this.deleteState}
          key={currentstate._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged State</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>State Name</th>
              <th>State Desc</th>
              <th>Task Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.stateList()}</tbody>
        </table>
        <StateForm/>
      </div>
    );
  }
}
