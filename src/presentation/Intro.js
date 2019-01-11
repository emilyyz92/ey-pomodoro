import React from 'react';

const Intro = () => (
  <div className="jumbotron">
    <p>
      This app is built on the concept of the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">Pomodoro technique.</a>
    </p>
    <p>
      It helps you manage time and tasks by listing your tasks, setting goals, and utilize focus and break sessions to maximize your productivity.
    </p>
    <p>To start, add a task below.</p>
    <p className="hint">Hint: drag tasks to set timer priority</p>
  </div>
)

export default Intro;
