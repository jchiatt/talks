import React from 'react';
import './Timer.css';

export default function Timer() {
  return (
    <div className="Timer">
      <div className="Timer__count">0s</div>
      <div className="Timer__controls">
        <button className="button">Start</button>
        <button className="button">Reset</button>
      </div>
    </div>
  )
}