export function setSessionLength(session, minute, id) {
  return {
    type: 'setSession',
    setting: {
      session: session,
      minute: minute,
    },
    taskID: id
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
