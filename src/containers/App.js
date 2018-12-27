import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App.css';
import Timer from './Timer'
import TaskForm from '../presentation/TaskForm'
import Target from './Target'
import TaskList from '../presentation/TaskList'
import Task from '../presentation/Task'
import Intro from '../presentation/Intro'
import Footer from '../presentation/Footer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      task: {},
      taskTarget: 1
    }
  }

  showTask = (e) => {
    e.preventDefault();
    let task;
    const id = e.target.id.split('-').slice(1).join('-')
    task = this.props.tasks.filter(task => task.id === id)[0]
    //set state's task to be current task that's open (from store)
    this.setState({
      modal: true,
      task: task
    })
  }

  deleteTask = (e) => {
    e.preventDefault();
    this.props.deleteTask(e.target.id)
    this.setState({
      task: {}
    })
  }

  taskTime = (task) => {
    const minutes = task.target * parseInt(task.sessionLength.focus)
    return `${Math.floor(minutes/60)} hrs ${minutes%60} minutes`
  }

  // this function persists changes in Target component inside Task
  // to the Timer function, so the task complete functionality works
  // gets called when plus/minus button is clicked in Target Component
  changeTarget = (target) => {
    this.setState({
      taskTarget: target
    })
  }

  toggleModal = () => {
    this.setState({
      modal: false
    })
  }

  //to display alert in task's modal when task is completed
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
        <Intro />
        <TaskForm save={this.props.saveTask}/>
        <TaskList tasks={this.props.tasks}
        showTask={this.showTask}
        taskTime={this.taskTime}
        deleteTask={this.deleteTask}
        />
        <Task task={this.state.task}
        isOpen={this.state.modal}
        toggle={this.toggleModal}
        completed={this.taskComplete()}
        changeTarget={this.changeTarget}
        target={this.state.taskTarget}
        />
        <Footer />
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
    }),
    deleteTask: (id) => dispatch({
      type: 'deleteTask',
      taskID: id
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
