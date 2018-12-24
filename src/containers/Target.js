import React, { Component } from 'react';
import { connect } from 'react-redux'
import Setting from '../presentation/Setting'

class Target extends Component {
  constructor() {
    super()
    this.state = {
      target: 1
    }
  }

  componentDidMount() {
    this.setState({
      target: this.props.target
    })
  }

  setTarget = (e) => {
    let op = e.target.id.split('-')[1];
    let target = this.state.target;
    if(op === 'plus') {
      target += 1
    } else {
      if(target > 0) {target -= 1}
    }
    this.props.setTarget(target, this.props.taskID)
    this.setState({
      target: target
    })
  }

  render() {
    return (
      <div className="target-container">
        <Setting session='Goal'
        length={this.state.target} changeSetting={this.setTarget} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTarget: (n, taskID) => dispatch({
      type: 'setTarget',
      target: n,
      taskID: taskID})
  }
}

export default connect(null, mapDispatchToProps)(Target)
