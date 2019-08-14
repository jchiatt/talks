import React from 'react';

class Exercise extends React.Component {
  state = {
    inProgress: false,
  }

  start() {
    this.setState(() => {
      inProgress: true
    });
  }

  stop() {
    this.setState(() => {
      inProgress: false
    });
  }

  render() {
    const { inProgress } = this.state;

    return (
      <p>The exercise is {inProgress ? 'started' : 'not started'}</p>
    );
  }
}

export default Exercise;


function Exercise() {
  const [inProgress, setInProgress] = React.useState(false);
  function start() {
    setInProgress(true);
  }
  function stop() {
    setInProgress(false);
  }

  return (
    <p>The exercise is {inProgress ? 'started' : 'not started'}</p>
  );
}