class App extends React.Component {
  constructor() {
    super();
    this.state = {
      miliseconds: 0,
      seconds: 0,
      minutes: 0,
      timerBtn: 'start',
      actionBtn: 'reset',
      running: false,
      interval: null,
      records: []
    };
  }

  componentDidMount() {
    const clockCircle = document.querySelector('.clock-circle');
    const timetab = document.querySelector('.timetab');
    const btns = document.querySelectorAll('.btn');

    const clockPopTimeline = new TimelineMax({ repeat: 0, repeatDelay: 0 });
    const clockPop = () => {
      clockPopTimeline
        .to(clockCircle, 0.1, { y: -2 })
        .to(clockCircle, 0.5, { y: 0, ease: Back.easeOut.config(10) });
    };

    const btnAnimationTimeline = new TimelineMax({ repeat: 0, repeatDelay: 0 });
    const btnAnimation = (btn, isStart) => {
      if (isStart) {
        btnAnimationTimeline.to(btn, 0.1, { scale: 0.9 });
      } else {
        btnAnimationTimeline.to(btn, 0.3, {
          scale: 1,
          ease: Back.easeOut.config(4)
        });
      }
    };

    TweenMax.set(timetab, {
      transformPerspective: 400,
      transformOrigin: 'center center'
    });

    btns.forEach(btn => {
      const rotationValue = 5;
      const startTiltTime = 0.1;

      const sideRotation =
        btn.dataset.side === 'right'
          ? true
          : btn.dataset.side === 'left' && false;

      btn.addEventListener('mousedown', () => {
        TweenMax.to(timetab, startTiltTime, {
          rotationY: `${sideRotation ? rotationValue : -rotationValue}`
        });

        if (!btnAnimationTimeline._active) {
          btnAnimation(btn, true);
        }
      });

      btn.addEventListener('touchstart', () => {
        TweenMax.to(timetab, startTiltTime, {
          rotationY: `${sideRotation ? rotationValue : -rotationValue}`
        });
        if (!btnAnimationTimeline._active) {
          btnAnimation(btn, true);
        }
      });

      btn.addEventListener('mouseup', () => {
        TweenMax.to(timetab, 0.7, {
          rotationY: 0,
          ease: Back.easeOut.config(5)
        });
        if (!clockPopTimeline._active) {
          clockPop();
        }
        btnAnimation(btn, false);
      });

      btn.addEventListener('touchend', () => {
        TweenMax.to(timetab, 0.7, {
          rotationY: 0,
          ease: Back.easeOut.config(5)
        });
        if (!clockPopTimeline._active) {
          clockPop();
        }
        btnAnimation(btn, false);
      });
    });
  }

  formatTwoDigits = input => {
    input = input.toString();
    if (input.length < 2) {
      input = `0${input}`;
    }
    return input;
  };

  startTimer = () => {
    this.setState({
      interval: setInterval(() => this.calculateTime(), 10)
    });
  };

  stopTimer = () => {
    clearInterval(this.state.interval);
  };

  calculateTime = () => {
    this.setState(
      {
        miliseconds: this.state.miliseconds + 1
      },
      () => {
        if (this.state.miliseconds >= 100) {
          this.setState({
            seconds: this.state.seconds + 1,
            miliseconds: 0
          });
        }
        if (this.state.seconds >= 60) {
          this.setState({
            minutes: this.state.minutes + 1,
            seconds: 0
          });
        }
      }
    );
  };

  triggerAction = () => {
    const { minutes, seconds, miliseconds } = this.state;

    if (this.state.running) {
      this.setState({
        records: [
          `${this.formatTwoDigits(minutes)}:${this.formatTwoDigits(
            seconds
          )}:${this.formatTwoDigits(miliseconds)}`,
          ...this.state.records
        ]
      });
    } else {
      this.setState({
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
        records: []
      });
    }
  };

  triggerTimer = () => {
    this.setState(
      {
        running: !this.state.running
      },
      () => {
        if (this.state.running) {
          this.startTimer();
          this.setState({
            timerBtn: 'stop',
            actionBtn: 'round'
          });
        } else {
          this.stopTimer();
          this.setState({
            timerBtn: 'start',
            actionBtn: 'reset'
          });
        }
      }
    );
  };

  render() {
    const { records } = this.state;
    const tipChange = {
      transform: `rotate(${this.state.minutes * 360 +
        this.state.seconds * 6}deg)`
    };

    return (
      <main>
        <div className="container app">
          <section className="clock">
            <div className="clock-circle">
              <div className="clock-circle-small"></div>

              <div className="tip" style={tipChange}></div>
            </div>
          </section>
          <section className="timetab">
            <div id="timer-output" className="timer-output">
              <span>{this.formatTwoDigits(this.state.minutes)}</span>
              {':'}
              <span>{this.formatTwoDigits(this.state.seconds)}</span>
              {':'}
              <span>{this.formatTwoDigits(this.state.miliseconds)}</span>
            </div>
          </section>
          <section className="btns">
            <button
              id="timer-action"
              data-side="left"
              className="btn btn-secondary"
              onClick={this.triggerAction}
            >
              {this.state.actionBtn}
            </button>
            <button
              id="timer-trigger"
              data-side="right"
              className="btn btn-primary"
              onClick={this.triggerTimer}
            >
              {this.state.timerBtn}
            </button>
          </section>
          <section className="records">
            <ul id="timer-records">
              {records.map((record, i) => (
                <li key={i}>
                  {record.trim()}
                  <span>{records.length - i} record</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
