import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    console.log('component did mount');
    this.timerID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    console.log('Component will unmount');
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const { date } = this.state;
    return (
      <div>
        <h1>Hello, world</h1>
        <h2>It is {date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Timer;
