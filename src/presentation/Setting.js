import React from 'react';

const Setting = ({changeMinute, session, length}) => (
  <div className='setting-container'>
    <p>{session} session length</p>
    <button className="circular-button" onClick={changeMinute}
    id={`${session}-plus`}>+</button>
    <strong>{length}</strong>
    <button className="circular-button" onClick={changeMinute}
    id={`${session}-minus`}>-</button>
  </div>
)

export default Setting;
