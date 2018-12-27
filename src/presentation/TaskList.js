import React from 'react';

const TaskList = ({tasks, showTask, taskTime, deleteTask}) => (
  <>
    <h4>Your tasks</h4>
    <div className="list-group">
      {tasks.map(task => {
        return (
          <a className="list-group-item list-group-item-action flex-column align-items-start"
          href="#"

          style={{textDecoration: task.completed ? 'line-through' : 'none'}}
          id={`list-${task.id}`} key={task.id}>
            <h5 className="list-group-item-heading" id={`heading-${task.id}`}
            onClick={showTask}>
              Task: {task.name}
            </h5>
            <p className="list-group-item-text" id={`text-${task.id}`}
            onClick={showTask}>
            Time to Complete: {taskTime(task)}</p>
            <button onClick={deleteTask} id={task.id}>Delete Task</button>
          </a>
        )
      })}
    </div>
  </>
)

export default TaskList;
