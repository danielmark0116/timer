'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
  function Timer() {
    _classCallCheck(this, Timer);

    this.running = false;
    this.time = {
      miliseconds: 0,
      seconds: 0,
      minutes: 0
    };
    this.renderTime();
  }

  _createClass(Timer, [{
    key: 'start',
    value: function start() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.interval = this.running && setInterval(function () {
          return _this.calculateTime();
        }, 10);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.running = false;

      !this.running && clearInterval(this.interval);
    }
  }, {
    key: 'calculateTime',
    value: function calculateTime() {
      this.time.miliseconds += 1;
      if (this.time.miliseconds >= 100) {
        this.time.seconds += 1;
        this.time.miliseconds = 0;
      }
      if (this.time.seconds >= 60) {
        this.time.minutes += 1;
        this.time.seconds = 0;
      }
      this.renderTime();
    }
  }, {
    key: 'formatTwoDigits',
    value: function formatTwoDigits(input) {
      input = input.toString();
      if (input.length < 2) {
        input = '0' + input;
      }
      return input;
    }
  }, {
    key: 'renderTime',
    value: function renderTime() {
      document.getElementById('test').innerHTML = this.formatTwoDigits(this.time.minutes) + ':' + this.formatTwoDigits(this.time.seconds) + ':' + this.formatTwoDigits(this.time.miliseconds);
    }
  }, {
    key: 'resetTimer',
    value: function resetTimer() {
      this.time = {
        miliseconds: 0,
        seconds: 0,
        minutes: 0
      };

      !this.running && this.renderTime();
    }
  }]);

  return Timer;
}();

var timer = new Timer('string testowy');

document.getElementById('start').addEventListener('click', function () {
  timer.start();
});
document.getElementById('stop').addEventListener('click', function () {
  timer.stop();
});
document.getElementById('reset').addEventListener('click', function () {
  timer.resetTimer();
});
