import React from 'react';

const allowDrop = (e) => {
  e.preventDefault();
}

const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id)
}

const isCurrentTask = (task, currentTask, timerRunning) => {
  return task.id === currentTask.id && timerRunning
}

const TaskList = ({tasks, showTask, taskTime, deleteTask, dropList, currentTask, currentTime, timerRunning}) => (
  <>
    <div className="list-group" id="tasks-list">
      {tasks.map(task => {
        return (
          <div id={`div-${task.id}`} onDrop={dropList} onDragOver={allowDrop}
            key={task.id} >
            <a className="list-group-item list-group-item-action flex-column align-items-start"
            href="#"
            onDragStart={drag} draggable="true"
            style={{textDecoration: task.completed ? 'line-through' : 'none'}}
            id={`list-${task.id}`} >
              <h5 className="list-group-item-heading" id={`heading-${task.id}`}
              onClick={showTask}>
                Task: {task.name}
              </h5>
              <p className="list-group-item-text" id={`text-${task.id}`}
              onClick={showTask}>
                {isCurrentTask(task, currentTask, timerRunning) ? `${currentTime.minutes}:${currentTime.seconds}`: taskTime(task)}
              </p>
              <button onClick={deleteTask} id={task.id}>Delete Task</button>
            </a>
          </div>
        )
      })}
    </div>
  </>
)

export default TaskList;
