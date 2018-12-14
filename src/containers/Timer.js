import React, { Component } from 'react';
import { connect } from 'react-redux'


class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: '00',
      minutes: '25',
      nInterval: 0,
      focus: true
    }
  }

  componentDidMount() {
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

  //time's countdown logic
  timerCallback = () => {
    let second, minute;
    if(this.state.seconds === '00') {
      second = 59;
      minute = parseInt(this.state.minutes) - 1
    } else {
      second = parseInt(this.state.seconds) - 1;
      minute = this.state.minutes;
    }
    //convert digits to string
    this.setState({
      seconds: this.props.convertDigit(second),
      minutes: this.props.convertDigit(minute)
    })
  }

  //when start timer button is clicked
  startTimer = () => {
    let nInterval;
    let minutes;
    this.state.focus ? minutes = '25' : minutes = '05'
    //first, check if the timer is running out 00:00
    if(!(this.state.seconds === '00' && this.state.minutes === '00')) {
      nInterval = window.setInterval(this.timerCallback, 1000)
      this.setState({
        nInterval: nInterval
      })
    } else {
      //if timer ran out, stop timer, and switch between focus/rest session
      //start timer again
      clearInterval(this.state.nInterval)
      this.setState({
        focus: !this.state.focus,
        minutes: minutes,
        seconds: '00'
      })
      this.startTimer();
    }
  }

  pauseTimer = () => {
    clearInterval(this.state.nInterval)
  }

  resetTimer = () => {
    clearInterval(this.state.nInterval)
    this.setState({
      seconds: '00',
      minutes: '25',
      nInterval: 0
    })
  }

  render() {
    let session;
    if(this.state.focus) {
      session = 'Focus'
    } else {
      session = 'Break'
    }
    return (
      <div className="tomato">
        <p>{`${session} Session`}</p>
        <p>{this.state.minutes}:{this.state.seconds}</p>
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.pauseTimer}>Pause</button>
        <button onClick={this.resetTimer}>Reset</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sessionLength: state.sessionLength
  }
}

export default connect(mapStateToProps)(Timer)
