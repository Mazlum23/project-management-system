/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserForm from "./create.users"



const User = (props) => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.password}</td>
    <td>{props.user.name}</td>
    <td>{props.user.surname}</td>
    <td>{props.user.email}</td>
    <td>
      <Link to={"/src/components/users/edit.users.js/edit/" + props.user._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteUser(props.user._id);
          
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = { users: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        this.setState({ users : response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUser(id) {
    axios.delete("http://localhost:5000/users/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    });
  }

  userList() {
    return this.state.users.map((currentuser) => {
      return (
        <User
          user={currentuser}
          deleteUser={this.deleteUser}
          key={currentuser._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged User</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Name</th>
              <th>Surname</th>
              <th>E-mail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
        <UserForm/>
      </div>
    );
  }
}
