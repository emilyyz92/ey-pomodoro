import { combineReducers } from 'redux';

const defaultSetting = {
  focus: '25',
  break: '05'
}

//set length of each session
function lengthReducer(state = defaultSetting, action) {
  switch (action.type) {
    case 'setSession':
      return {
        ...state,
        [action.session]: action.minute
      }
    default:
      return state;
  }
}

//set number of sessions goal
function targetReducer(state = 1, action) {
  switch (action.type) {
    case 'setTarget':
      return action.target;
    default:
      return state;
  }
}

const pomoReducer = combineReducers({
  sessionLength: lengthReducer,
  target: targetReducer
})

export default pomoReducer;
