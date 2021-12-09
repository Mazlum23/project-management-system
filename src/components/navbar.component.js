import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Project Management</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Tasks</Link>
          </li>
          <li className="navbar-item">
          <Link to="/readuser" className="nav-link">Users</Link>
          </li>
          <li className="navbar-item">
          <Link to="/readproject" className="nav-link">Projects</Link>
          </li>
          <li className="navbar-item">
          <Link to="/readstate" className="nav-link">States</Link>
          </li>
          <li className="navbar-item">
          <Link to="/readmessage" className="nav-link">Messages</Link>
          </li>
          <li className="navbar-item">
          <Link to="/readdocument" className="nav-link">Files</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}