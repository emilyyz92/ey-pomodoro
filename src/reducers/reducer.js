import { combineReducers } from 'redux';

const defaultSetting = {
  focus: '25',
  break: '05'
}

const initialTime = {
  minutes: '25',
  seconds: '00'
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

function sessionReducer(state = defaultSetting, action) {
  switch (action.type) {
    case 'setSession':
      return {
        ...state,
        [action.setting.session]: action.setting.minute
      }
    default:
      return state
  }
}

function timerReducer(state = initialTime, action) {
  switch (action.type) {
    case 'setTimer':
      return action.timer
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
          timeCreated: action.created,
          target: 1,
          completed: false,
          pausedSession: false,
          priority: 0
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
    case 'setPriority':
      task = state.filter(task => task.id === action.taskID)[0]
      newState = state.filter(task => task.id !== action.taskID)
      return [
        ...newState,
        Object.assign({}, task, {
          priority: action.priority
        })
      ]
    //set length of each session
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
  sessionLength: sessionReducer,
  currentTimer: timerReducer
})

export default pomoReducer;
