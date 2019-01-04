export function setSessionLength(session, minute) {
  return {
    type: 'setSession',
    setting: {
      session: session,
      minute: minute,
    },
  }
}

export function addTaskAction(task) {
  return {
    type: 'addTask',
    taskName: task
  }
}

export function savePause(session, taskID) {
  return {
    type: 'savePausedTime',
    taskID: taskID,
    session: session
  }
}

export function setPriority(taskID, priority) {
  return {
    type: 'setPriority',
    taskID: taskID,
    priority: priority
  }
}

export function saveTask(name, id) {
  return {
    type: 'addTask',
    taskName: name,
    taskID: id,
    created: Date.now()
  }
}

export function deleteTask(id) {
  return {
    type: 'deleteTask',
    taskID: id,
  }
}
