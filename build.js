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
    this.triggerTimer = this.triggerTimer.bind(this);
    this.triggerAction = this.triggerAction.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
  }

  componentDidMount() {
    const clockCircle = document.querySelector('.clock-circle');
    const timetab = document.querySelector('.timetab');
    const btns = document.querySelectorAll('.btn');
    const app = document.querySelector('.app');

    const clockPopTimeline = new TimelineMax({ repeat: 0, repeatDelay: 0 });
    const clockPop = () => {
      clockPopTimeline.to(clockCircle, 0.1, { y: -2 }).to(clockCircle, 0.5, { y: 0, ease: Back.easeOut.config(10) });
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

      const sideRotation = btn.dataset.side === 'right' ? true : btn.dataset.side === 'left' && false;

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

  formatTwoDigits(input) {
    input = input.toString();
    if (input.length < 2) {
      input = `0${input}`;
    }
    return input;
  }

  startTimer() {
    this.setState({
      interval: setInterval(() => this.calculateTime(), 10)
    });
  }

  stopTimer() {
    clearInterval(this.state.interval);
  }

  calculateTime() {
    this.setState({
      miliseconds: this.state.miliseconds + 1
    }, () => {
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
    });
  }

  triggerAction() {
    const { minutes, seconds, miliseconds } = this.state;

    if (this.state.running) {
      this.setState({
        records: [`${this.formatTwoDigits(minutes)}:${this.formatTwoDigits(seconds)}:${this.formatTwoDigits(miliseconds)}`, ...this.state.records]
      });
    } else {
      this.setState({
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
        records: []
      });
    }
  }

  triggerTimer() {
    this.setState({
      running: !this.state.running
    }, () => {
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
    });
  }

  render() {
    const { records } = this.state;
    const tipChange = {
      transform: `rotate(${this.state.minutes * 360 + this.state.seconds * 6}deg)`
    };

    return React.createElement(
      'main',
      null,
      React.createElement(
        'div',
        { className: 'container app' },
        React.createElement(
          'section',
          { className: 'clock' },
          React.createElement(
            'div',
            { className: 'clock-circle' },
            React.createElement('div', { className: 'clock-circle-small' }),
            React.createElement('div', { className: 'tip', style: tipChange })
          )
        ),
        React.createElement(
          'section',
          { className: 'timetab' },
          React.createElement(
            'div',
            { id: 'timer-output', className: 'timer-output' },
            React.createElement(
              'span',
              null,
              this.formatTwoDigits(this.state.minutes)
            ),
            ':',
            React.createElement(
              'span',
              null,
              this.formatTwoDigits(this.state.seconds)
            ),
            ':',
            React.createElement(
              'span',
              null,
              this.formatTwoDigits(this.state.miliseconds)
            )
          )
        ),
        React.createElement(
          'section',
          { className: 'btns' },
          React.createElement(
            'button',
            {
              id: 'timer-action',
              'data-side': 'left',
              className: 'btn btn-secondary',
              onClick: this.triggerAction
            },
            this.state.actionBtn
          ),
          React.createElement(
            'button',
            {
              id: 'timer-trigger',
              'data-side': 'right',
              className: 'btn btn-primary',
              onClick: this.triggerTimer
            },
            this.state.timerBtn
          )
        ),
        React.createElement(
          'section',
          { className: 'records' },
          React.createElement(
            'ul',
            { id: 'timer-records' },
            records.map((record, i) => React.createElement(
              'li',
              { key: i },
              record.trim(),
              React.createElement(
                'span',
                null,
                records.length - i,
                ' record'
              )
            ))
          )
        )
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
