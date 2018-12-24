import React, { Component } from 'react';
import { connect } from 'react-redux'
import Setting from '../presentation/Setting'
import { setSessionLength } from '../actions/settingActions'


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
        break: '00'
      }
    }
  }

  connectStateToProp = () => {
    this.setState({
      sessionLength: {
        focus: this.props.sessionLength.focus,
        break: this.props.sessionLength.break
      }
    })
    if(this.state.focus) {
      this.setState({
        minutes: this.props.sessionLength.focus
      })
    } else {
      this.setState({
        minutes: this.props.sessionLength.break
      })
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
        //session complete
        //if current session is focus session, update completed focus sessions in store
        if(this.state.focus) {this.props.finishSession(this.props.taskID)}
        //if timer ran out, stop timer, and switch between focus/rest session
        clearInterval(this.state.nInterval)
        this.setState({
          focus: !this.state.focus,
          minutes: this.state.focus ? this.props.sessionLength.break : this.props.sessionLength.focus,
          seconds: '00'
        })
        //start a new timer
        this.startTimer();
      }
    } else {
      this.resetTimer();
    }
  }

  //when start timer button is clicked
  //change store to indicate timer is now running
  startTimer = () => {
    this.props.startTimer('startTimer');
    let nInterval;
    nInterval = window.setInterval(this.timerCallback, 1000)
    //save nInterval to state for later's clearInterval
    this.setState({
      nInterval: nInterval
    })
  }

  pauseTimer = () => {
    clearInterval(this.state.nInterval)
    this.props.startTimer('stopTimer');
  }

  resetTimer = () => {
    clearInterval(this.state.nInterval)
    this.setState({
      seconds: '00',
      minutes: this.props.sessionLength.focus,
      nInterval: 0,
      focus: true
    })
    this.props.startTimer('stopTimer')
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
    if(op === 'plus') {
      minute = parseInt(lengths[session]) + 1
    } else {
      if(parseInt(lengths[session]) !== 0) {
        minute = parseInt(lengths[session]) - 1
      } else {
        minute = parseInt(lengths[session])
      }
    }
    this.props.setSessionLength(session, this.convertDigit(minute), this.props.taskID)
    this.props.startTimer('stopTimer')
    this.resetTimer();
    if(session === 'focus') {
      this.setState({
        minutes: minute,
        sessionLength: {
          ...this.state.sessionLength,
          focus: minute
        }
      })} else {
        this.setState({
          minutes: this.state.sessionLength.focus,
          sessionLength: {
            ...this.state.sessionLength,
            break: minute
          }
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
      <div className="tomato-container">
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
          <button onClick={this.startTimer}>Start</button>
          <button onClick={this.pauseTimer}>Pause</button>
          <button onClick={this.resetTimer}>Reset</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    timerRunning: state.timerRunning
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSessionLength: (session, minute, taskID) => dispatch(
      setSessionLength(session, minute, taskID)),
    startTimer: (type) => dispatch({type: type}),
    finishSession: (taskID) => dispatch({
      type: 'finishSession',
      taskID: taskID
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
