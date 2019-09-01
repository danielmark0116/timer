'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.formatTwoDigits = function (input) {
      input = input.toString();
      if (input.length < 2) {
        input = '0' + input;
      }
      return input;
    };

    _this.startTimer = function () {
      _this.setState({
        interval: setInterval(function () {
          return _this.calculateTime();
        }, 10)
      });
    };

    _this.stopTimer = function () {
      clearInterval(_this.state.interval);
    };

    _this.calculateTime = function () {
      _this.setState({
        miliseconds: _this.state.miliseconds + 1
      }, function () {
        if (_this.state.miliseconds >= 100) {
          _this.setState({
            seconds: _this.state.seconds + 1,
            miliseconds: 0
          });
        }
        if (_this.state.seconds >= 60) {
          _this.setState({
            minutes: _this.state.minutes + 1,
            seconds: 0
          });
        }
      });
    };

    _this.triggerAction = function () {
      var _this$state = _this.state,
          minutes = _this$state.minutes,
          seconds = _this$state.seconds,
          miliseconds = _this$state.miliseconds;


      if (_this.state.running) {
        _this.setState({
          records: [_this.formatTwoDigits(minutes) + ':' + _this.formatTwoDigits(seconds) + ':' + _this.formatTwoDigits(miliseconds)].concat(_toConsumableArray(_this.state.records))
        });
      } else {
        _this.setState({
          minutes: 0,
          seconds: 0,
          miliseconds: 0,
          records: []
        });
      }
    };

    _this.triggerTimer = function () {
      _this.setState({
        running: !_this.state.running
      }, function () {
        if (_this.state.running) {
          _this.startTimer();
          _this.setState({
            timerBtn: 'stop',
            actionBtn: 'round'
          });
        } else {
          _this.stopTimer();
          _this.setState({
            timerBtn: 'start',
            actionBtn: 'reset'
          });
        }
      });
    };

    _this.state = {
      miliseconds: 0,
      seconds: 0,
      minutes: 0,
      timerBtn: 'start',
      actionBtn: 'reset',
      running: false,
      interval: null,
      records: []
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var clockCircle = document.querySelector('.clock-circle');
      var timetab = document.querySelector('.timetab');
      var btns = document.querySelectorAll('.btn');

      var clockPopTimeline = new TimelineMax({ repeat: 0, repeatDelay: 0 });
      var clockPop = function clockPop() {
        clockPopTimeline.to(clockCircle, 0.1, { y: -2 }).to(clockCircle, 0.5, { y: 0, ease: Back.easeOut.config(10) });
      };

      var btnAnimationTimeline = new TimelineMax({ repeat: 0, repeatDelay: 0 });
      var btnAnimation = function btnAnimation(btn, isStart) {
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

      btns.forEach(function (btn) {
        var rotationValue = 5;
        var startTiltTime = 0.1;

        var sideRotation = btn.dataset.side === 'right' ? true : btn.dataset.side === 'left' && false;

        btn.addEventListener('mousedown', function () {
          TweenMax.to(timetab, startTiltTime, {
            rotationY: '' + (sideRotation ? rotationValue : -rotationValue)
          });

          if (!btnAnimationTimeline._active) {
            btnAnimation(btn, true);
          }
        });

        btn.addEventListener('touchstart', function () {
          TweenMax.to(timetab, startTiltTime, {
            rotationY: '' + (sideRotation ? rotationValue : -rotationValue)
          });
          if (!btnAnimationTimeline._active) {
            btnAnimation(btn, true);
          }
        });

        btn.addEventListener('mouseup', function () {
          TweenMax.to(timetab, 0.7, {
            rotationY: 0,
            ease: Back.easeOut.config(5)
          });
          if (!clockPopTimeline._active) {
            clockPop();
          }
          btnAnimation(btn, false);
        });

        btn.addEventListener('touchend', function () {
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
  }, {
    key: 'render',
    value: function render() {
      var records = this.state.records;

      var tipChange = {
        transform: 'rotate(' + (this.state.minutes * 360 + this.state.seconds * 6) + 'deg)'
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
              records.map(function (record, i) {
                return React.createElement(
                  'li',
                  { key: i },
                  record.trim(),
                  React.createElement(
                    'span',
                    null,
                    records.length - i,
                    ' record'
                  )
                );
              })
            )
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
