import React, { Component } from 'react';
import { connect } from 'react-redux'
import Setting from '../presentation/Setting'
import { setSessionLength, savePause } from '../actions/settingActions'
import {Alert} from 'reactstrap'
import sound from '../bell.mp3'

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: '00',
      minutes: '25',
      nInterval: 0,
      focus: true,
      sessionLength: {
        focus: '25',
        break: '05'
      },
      currentSession: 1,
      taskComplete: false,
      alert: ""
    }
    this.audio = React.createRef();
  }

  //this function is to make sure the component re-renders everytime info changes
  connectStateToProp = () => {
    const task = this.props.currentTask
    //set state to have same info of the task from the store
    //set starting minutes to be task's focus session length
    if(task) {
      this.setState({
        taskID: task.id
      })
      // if there is a paused session from the task, set state to paused session
      if(this.props.currentTask.pausedSession) {
        const pausedSession = this.props.currentTask.pausedSession;
        this.setState({
          minutes: pausedSession.minutes,
          seconds: pausedSession.seconds,
          focus: pausedSession.focus
        })
      }
    }
  }

  componentDidMount() {
    this.connectStateToProp()
  }

  //converts minute number to string
  convertDigit = (digit) => {
    if(digit < 10) {
      return `0${digit}`
    } else {
      return digit.toString()
    }
  }

  //after start button is clicked
  //callback function inside setInterval
  timerCallback = () => {
    //check if timer is currently running
    if(this.props.timerRunning) {
      //check if the timer is running out 00:00
      if(!(this.state.seconds === '00' && this.state.minutes === '00')) {
        let second, minute;
        if(this.state.seconds === '00') {
          second = 59;
          minute = parseInt(this.state.minutes) - 1
        } else {
          second = parseInt(this.state.seconds) - 1;
          minute = parseInt(this.state.minutes);
        }
        //convert digits to string
        this.setState({
          seconds: this.convertDigit(second),
          minutes: this.convertDigit(minute)
        })
      } else {
        //if time ran out, session is complete
        this.playAudio()
        if(this.state.focus) {
          this.finishSession()
        } else {
          //if timer ran out but session is not complete
          //stop timer, and switch between focus/rest session
          this.switchSession();
        }
      }
    // end of timer ran out else statement
    } else {
      this.resetTimer();
    }
  }

  //switch between focus and break sessions after session finished
  switchSession = () => {
    clearInterval(this.state.nInterval)
    this.setState({
      focus: !this.state.focus,
      minutes: this.state.focus ? this.state.sessionLength.break : this.state.sessionLength.focus,
      seconds: '00'
    })
    //play session complete sound and restart timer
    this.startTimer();
  }

  //when a focus session is finished
  //called in timer callback function
  finishSession = () => {
    clearInterval(this.state.nInterval)
    const current = this.state.currentSession
    //check if task is complete
    if(current === this.props.target) {
      this.setState({
        taskComplete: true
      })
      //if complete, update completed focus sessions in store
      this.props.completeTask(this.props.currentTask.id)
      //if next task exists, start next task
      const nextTask = this.props.nextTask
      if(nextTask) {
        this.startNextTask(nextTask)
      }
    } else {
      //if task not complete, switch to break session
      this.setState({
        currentSession: current + 1
      })
      this.switchSession()
    }
  }

  startNextTask = (nextTask) => {
    this.setState({
      minutes: this.state.sessionLength.focus,
      taskComplete: false,
      seconds: '00'
    })
    this.startTimer()
  }

  //when start timer button is clicked
  //change store to indicate timer is now running
  startTimer = () => {
    if(!this.state.taskComplete) {
      //reset prev. pause session in store
      if(this.props.currentTask) {
        this.props.clearPause(this.props.currentTask.id)
      }
      this.props.startTimer('startTimer');
      let nInterval;
      nInterval = window.setInterval(this.timerCallback, 1000)
      //save nInterval to state to clear interval later
      this.setState({
        nInterval: nInterval
      })
    }
  }

  //save paused timer session to store
  pauseTimer = () => {
    clearInterval(this.state.nInterval)
    this.props.startTimer('stopTimer');
    const session = {
      focus: this.state.focus,
      minutes: this.state.minutes,
      seconds: this.state.seconds
    }
    if(this.props.currentTask) {
      this.props.savePause(session, this.props.currentTask.id)
    }
  }

  resetTimer = () => {
    clearInterval(this.state.nInterval)
    this.setState({
      seconds: '00',
      minutes: this.state.sessionLength.focus,
      nInterval: 0,
      focus: true
    })
    this.props.startTimer('stopTimer')
    //reset prev. pause session in store
    this.props.tasks.forEach(
      (task) => this.props.clearPause(task.id))
  }

  playAudio = () => {
    const audio = this.audio.current;
    audio.play()
  }

  //when setting changes, stop timer (change store)
  //and change the starting point of timer to the new setting
  changeSetting = (e) => {
    //e.target.id is "focus-plus" or "break-plus" and minus
    let sessionInfo = e.target.id.split('-');
    let session = sessionInfo[0]
    let op = sessionInfo[1]
    let lengths = this.state.sessionLength
    let minute;
    if(!(lengths[session] === '01' && op === 'minus')) {
      //change session length from clicked button
      if(op === 'plus') {
        minute = parseInt(lengths[session]) + 1
      } else {
        minute = parseInt(lengths[session]) - 1
      }
      //save session length in store and stop current timer
      this.props.setSessionLength(session, this.convertDigit(minute))
      this.props.startTimer('stopTimer')
      this.resetTimer();
      //set new session length in state so setting and timer is re-rendered right away
      if(session === 'focus') {
        this.setState({
          minutes: minute,
          sessionLength: {
            ...this.state.sessionLength,
            focus: this.convertDigit(minute)
          }
        })} else {
          this.setState({
            minutes: this.state.sessionLength.focus,
            sessionLength: {
              ...this.state.sessionLength,
              break: this.convertDigit(minute)
            }
          })
        }
    } else {
      this.setState({
        alert: "Session length can't be shorter than 1 minute"
      })
    }
  }

  render() {
    let session;
    if(this.state.focus) {
      session = 'Focus'
    } else {
      session = 'Break'
    }
    const focusLength = this.state.sessionLength.focus
    const breakLength = this.state.sessionLength.break
    return (
      <div className="timer-container">
        {this.state.alert !== "" ? <Alert color="warning">{this.state.alert}</Alert> : null}
        <Setting
          changeSetting={this.changeSetting}
          session="focus" length={focusLength}
        />
        <Setting
          changeSetting={this.changeSetting}
          session="break" length={breakLength}
        />
        <div className="timer">
          <p>{`${session} Session`}</p>
          <p className="timerCountdown">
            {this.state.minutes}:{this.state.seconds}
          </p>
          <div className="control-button">
            <button onClick={this.startTimer}>Start</button>
            <button onClick={this.pauseTimer}>Pause</button>
            <button onClick={this.resetTimer}>Reset</button>
          </div>
          <audio ref={this.audio}>
            <source src={sound} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    timerRunning: state.timerRunning,
    tasks: state.tasks,
    sessionLength: state.sessionLength
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSessionLength: (session, minute) => dispatch(
      setSessionLength(session, minute)),
    startTimer: (type) => dispatch({type: type}),
    completeTask: (taskID) => dispatch({
      type: 'completeTask',
      taskID: taskID
    }),
    savePause: (session, taskID) => dispatch(savePause(session, taskID)),
    clearPause: (taskID) => dispatch({type: 'clearPausedSession', taskID: taskID})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
