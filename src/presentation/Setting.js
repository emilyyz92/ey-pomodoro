import React from 'react';

const Setting = ({changeSetting, session, length}) => (
  <div className='setting-container'>
    <p>{session} session</p>
    <button className="circular-button" onClick={changeSetting}
    id={`${session}-plus`}>+</button>
    <strong>{length}</strong>
    <button className="circular-button" onClick={changeSetting}
    id={`${session}-minus`}>-</button>
  </div>
)

export default Setting;
