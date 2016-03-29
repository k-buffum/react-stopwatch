function TimeDisplay (time) {
  var seconds = ('0' + time % 60).slice(-2);
  var minutes = '0' + Math.floor(time / 60);
  return minutes + ":" + seconds;
}

const StopWatch = React.createClass({
  getInitialState: function() {
    return {
      secondsElapsed: 0,
      laps: []
    }
  },
  getSeconds: function() {
    return (
      '0' + this.state.secondsElapsed % 60
    ).slice(-2)
  },
  getMinutes: function() {
    return Math.floor(
      this.state.secondsElapsed / 60
    )
  },
  start: function() {
    var _this = this;
    this.incrementer = setInterval(function(){
      _this.setState({
        secondsElapsed: (_this.state.secondsElapsed + 1)
      })
    }, 1000)
  },
  stop: function() {
    clearInterval(this.incrementer);
  },
  clear: function() {
    this.setState({secondsElapsed: 0, laps: []});
  },
  lap: function() {
    this.setState({laps: this.state.laps.concat([this.state.secondsElapsed])});
  },
  render: function() {
    return (
      <div className='well'>
        <h1>{TimeDisplay(this.state.secondsElapsed)}</h1>
        {(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer)
        ? <button className="btn btn-primary" onClick={this.start}>Start</button>
        : <button className="btn btn-primary" onClick={this.stop}>Stop</button>
        }
        {(this.state.secondsElapsed !== 0)
        ? <button className="btn btn-primary" onClick={this.clear}>Clear</button>
        : null
        }
        <button className="btn btn-primary" onClick={this.lap}>Lap</button>
      <ul>
        {this.state.laps.map(function(lap, idx) {
          return <li><strong>{TimeDisplay(lap)}</strong></li>
        })}
      </ul>
      </div>
    );
  }
});
        
ReactDOM.render(<StopWatch />, document.getElementById('container'));