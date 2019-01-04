import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App.css';
import Timer from './Timer'
import TaskForm from '../presentation/TaskForm'
import TaskList from '../presentation/TaskList'
import Task from '../presentation/Task'
import Intro from '../presentation/Intro'
import Footer from '../presentation/Footer'
import {setPriority, saveTask, deleteTask} from '../actions/settingActions'

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

  //time it takes to complete the task
  taskTime = (task) => {
    const minutes = task.target * parseInt(this.props.sessionLength.focus)
    return `${Math.floor(minutes/60)} hrs ${minutes%60} minutes`
  }

  // this function persists changes in Target component inside Task
  // to the Timer function, so the task complete functionality works;
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

  //called as props to TaskList
  sortedTasks = () => {
    const tasks = this.props.tasks
    if(tasks.length > 0) {
      let sortedTasks = tasks
      //sort by user DnD priority, completed status and time created
      sortedTasks = this.props.tasks.sort(
        (a, b) => a.priority - b.priority || a.completed - b.completed || a.timeCreated - b.timeCreated
      )
      return sortedTasks
    }
  }

  //enable drag and drop in task list
  dropList = (e) => {
    e.preventDefault();
    //original sorted tasks list
    const sortedTasks = this.sortedTasks()
    const targetTaskId = e.target.id.split('-').slice(1).join('-')
    const selectedTaskID = e.dataTransfer.getData("text").split('-').slice(1).join('-')
    const targetTask = this.props.tasks.filter(task => task.id === targetTaskId)[0]
    const selectedTask = this.props.tasks.filter(task => task.id === selectedTaskID)[0]
    const index = sortedTasks.indexOf(targetTask)
    if(targetTaskId) {
      //increase the priority index of the other tasks
      sortedTasks.slice(index + 1).filter(
        task => task.id !== selectedTaskID
      ).forEach(
        task => this.props.setPriority(task.id, task.priority + 2)
      )
      //set selected task's priority to be same as target task's priority
      this.props.setPriority(selectedTask.id, targetTask.priority + 1)
    }
  }

  //send current task to Timer as prop
  currentTask = () => {
    let currentTaskId;
    let listNode = document.getElementById('tasks-list');
    if(listNode) {
      let tasks = document.getElementById('tasks-list').childNodes;
      if(tasks.length > 0) {
        currentTaskId = tasks[0].id.split('-').slice(1).join('-')
        const currentTask = this.props.tasks.filter(task => task.id === currentTaskId)[0]
        return currentTask
      } else {
        return this.props.tasks[0];
      }
    }
  }

  nextTask = () => {
    if(this.props.tasks.length > 1) {
      return this.sortedTasks()[1]
    } else {
      return false
    }
  }

  render() {
    return (
      <div className="App">
        <Intro />
        <div className="task-timer-container">
          <div className="task-body">
            <TaskForm save={this.props.saveTask}/>
            <TaskList tasks={this.sortedTasks() || []}
              showTask={this.showTask}
              taskTime={this.taskTime}
              deleteTask={this.deleteTask}
              dropList={this.dropList}
            />
            <Task task={this.state.task}
              isOpen={this.state.modal}
              toggle={this.toggleModal}
              changeTarget={this.changeTarget}
            />
          </div>
          <Timer
            currentTask={this.currentTask()}
            nextTask={this.nextTask()}
            target={this.state.taskTarget}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    sessionLength: state.sessionLength
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startTimer: (type) => dispatch({type: type}),
    saveTask: (name, id) => dispatch(saveTask(name, id)),
    deleteTask: (id) => dispatch(deleteTask(id)),
    setPriority: (id, priority) => dispatch(setPriority(id, priority))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
