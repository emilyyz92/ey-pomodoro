import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../App.css';
import Timer from './Timer'
import Tasks from '../presentation/Tasks'
import Setting from '../presentation/Setting'
import { setSessionLength } from '../actions/settingActions'

class App extends Component {

  //converts minute number to string
  convertDigit = (digit) => {
    if(digit < 10) {
      return `0${digit}`
    } else {
      return digit.toString()
    }
  }

  changeMinute = (e) => {
    let sessionInfo = e.target.id.split('-');
    let session = sessionInfo[0]
    let op = sessionInfo[1]
    let lengths = this.props.sessionLength
    let minute;
    if(op === 'plus') {
      minute = parseInt(lengths[session]) + 1
    } else {
      minute = parseInt(lengths[session]) - 1
    }
    this.props.setSessionLength(session, this.convertDigit(minute))
  }

  render() {
    const focusLength = this.props.sessionLength.focus
    const breakLength = this.props.sessionLength.break
    return (
      <div className="App">
        <Setting
          changeMinute={this.changeMinute}
          session="focus" length={focusLength}
        />
        <Setting
          changeMinute={this.changeMinute}
          session="break" length={breakLength}
        />
        <Timer convertDigit={this.convertDigit}/>
        <Tasks />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessionLength: state.sessionLength,
    target: state.target
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSessionLength: (session, minute) => dispatch(
      setSessionLength(session, minute))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
