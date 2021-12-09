/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProjectForm from "./create.projects"

const Project = (props) => (
  <tr>
    <td>{props.project.project_name}</td>
    <td>{props.project.project_desc}</td>
    <td>{props.project.username}</td>
    <td>{props.project.progress}</td>
    <td>
      <Link to={"/src/components/projects/edit.projects.js/edit/" + props.project._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteProject(props.project._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.deleteProject = this.deleteProject.bind(this);

    this.state = { projects: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/projects/")
      .then((response) => {
        this.setState({ projects: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProject(id) {
    axios.delete("http://localhost:5000/projects/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
        projects: this.state.projects.filter((el) => el._id !== id),
    });
  }

  projectList() {
    return this.state.projects.map((currentproject) => {
      return (
        <Project
          project={currentproject}
          deleteProject={this.deleteProject}
          key={currentproject._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Projects</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Username</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.projectList()}</tbody>
        </table>
        <ProjectForm/>
      </div>
    );
  }
}
