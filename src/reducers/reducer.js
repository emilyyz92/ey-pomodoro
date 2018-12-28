import { combineReducers } from 'redux';

const defaultSetting = {
  focus: '25',
  break: '05'
}

function stopTimerReducer(state = false, action) {
  switch (action.type) {
    case 'stopTimer':
      return false;
    case 'startTimer':
      return true;
    default:
      return state
  }
}

function taskReducer(state = [], action) {
  let task;
  let newState;
  switch (action.type) {
    case 'addTask':
      return [
        ...state,
        {
          id: action.taskID,
          name: action.taskName,
          target: 1,
          completed: false,
          sessionLength: defaultSetting,
          pausedSession: false
        }
      ]
    //set goal number of sessions
    case 'setTarget':
      task = state.filter(task => task.id === action.taskID)[0]
      newState = state.filter(task => task.id !== action.taskID)
      return [
        ...newState,
        Object.assign({}, task,
          {
            target: action.target,
            currentTarget: action.target
          }
        )
      ];
    //set length of each session
    case 'setSession':
      task = state.filter(task => task.id === action.taskID)[0]
      newState = state.filter(task => task.id !== action.taskID)
      return [
        ...newState,
        Object.assign({}, task, {
          sessionLength: {
            ...task.sessionLength,
            [action.setting.session]: action.setting.minute
          }
        })
      ]
    case 'savePausedTime':
      task = state.filter(task => task.id === action.taskID)[0]
      newState = state.filter(task => task.id !== action.taskID)
      return [
        ...newState,
        Object.assign({}, task, {
          pausedSession: {
            focus: action.session.focus,
            minutes: action.session.minutes,
            seconds: action.session.seconds
          }
        })
      ]
    case 'clearPausedSession':
      task = state.filter(task => task.id === action.taskID)[0]
      newState = state.filter(task => task.id !== action.taskID)
      return [
        ...newState,
        Object.assign({}, task, {pausedSession: false})
      ]
    case 'completeTask':
      task = state.filter(task => task.id === action.taskID)[0]
      newState = state.filter(task => task.id !== action.taskID)
      return [
        ...newState,
        Object.assign({}, task, {completed: true})
      ]
    case 'deleteTask':
      task = state.filter(task => task.id === action.taskID)[0]
      newState = state.filter(task => task.id !== action.taskID)
      return newState;
    default:
      return state;
  }
}

const pomoReducer = combineReducers({
  timerRunning: stopTimerReducer,
  tasks: taskReducer,
})

export default pomoReducer;
