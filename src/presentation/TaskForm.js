import React, { Component } from 'react';

class TaskForm extends Component {
  constructor() {
    super();
    this.state = {
      taskName: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      taskName: e.target.value
    })
  }

  saveTasks = () => {
    const uuid = require('uuid/v4')
    this.props.save(this.state.taskName, uuid())
    this.setState({
      taskName: ""
    })
  }

  render() {
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Add Task"
          value={this.state.taskName}
          onChange={this.handleChange}
        />
        <div className="input-group-append">
          <button className="input-group-text" onClick={this.saveTasks}>
          Add Task</button>
        </div>
      </div>
    )
  }
}

export default TaskForm;
