import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App.css';
import Timer from './Timer'
import TaskForm from '../presentation/TaskForm'
import Target from './Target'
import TaskList from '../presentation/TaskList'
import Task from '../presentation/Task'

class App extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      task: {}
    }
  }

  showTask = (e) => {
    e.preventDefault();
    let task;
    task = this.props.tasks.filter(task => task.id === e.target.id)[0]
    //set state's task to be current task that's open (from store)
    this.setState({
      modal: true,
      task: task
    })
  }

  toggleModal = () => {
    this.setState({
      modal: false
    })
  }

  taskComplete = () => {
    const task = this.props.tasks.filter(
      task => task.id === this.state.task.id
    )
    if(task.length > 0 && task[0].completed) {
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div className="App">
        <TaskForm save={this.props.saveTask}/>
        <TaskList tasks={this.props.tasks}
        showTask={this.showTask}/>
        <Task task={this.state.task}
        isOpen={this.state.modal}
        toggle={this.toggleModal}
        completed={this.taskComplete()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startTimer: (type) => dispatch({type: type}),
    saveTask: (name, id) => dispatch({
      type: 'addTask',
      taskName: name,
      taskID: id
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
