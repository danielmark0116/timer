'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var timerOutput = document.getElementById('timer-output');
var recordsList = document.getElementById('timer-records');
var timerTrigger = document.getElementById('timer-trigger');
var timerAction = document.getElementById('timer-action');

var Timer = function () {
  function Timer(domTimerOutputObject, domRecordsOutputObject, timerTriggerBtn, timerActionBtn) {
    _classCallCheck(this, Timer);

    this.running = false;
    this.time = {
      miliseconds: 0,
      seconds: 0,
      minutes: 0
    };
    this.records = [];
    this.domTimerOutputObject = domTimerOutputObject;
    this.domRecordsOutputObject = domRecordsOutputObject;
    this.timerTriggerBtn = timerTriggerBtn;
    this.timerActionBtn = timerActionBtn;
    this.renderTime();
    this.updateBtns();
  }

  _createClass(Timer, [{
    key: 'updateBtns',
    value: function updateBtns() {
      this.timerTriggerBtn.innerHTML = !this.running ? 'Start' : 'Stop';
      this.timerActionBtn.innerHTML = !this.running ? 'Zero' : 'Round';
    }
  }, {
    key: 'trigger',
    value: function trigger() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.interval = this.running && setInterval(function () {
          return _this.calculateTime();
        }, 10);
      } else if (this.running) {
        this.running = false;
        clearInterval(this.interval);
      }
      this.updateBtns();
    }
  }, {
    key: 'action',
    value: function action() {
      if (this.running) {
        this.addRecord();
      } else if (!this.running) {
        this.resetRecords();
        this.resetTimer();
      }
    }
  }, {
    key: 'calculateTime',
    value: function calculateTime() {
      this.time.miliseconds += 1;
      if (this.time.miliseconds >= 100) {
        this.time.seconds += 1;
        this.time.miliseconds = 0;
        this.animateTip();
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
    key: 'animateTip',
    value: function animateTip() {
      if (document.querySelector('.tip')) {
        document.querySelector('.tip').style.transform = 'rotate(' + this.time.seconds * 6 + 'deg)';
      }
    }
  }, {
    key: 'renderTime',
    value: function renderTime() {
      this.domTimerOutputObject.innerHTML = this.formatTwoDigits(this.time.minutes) + ':' + this.formatTwoDigits(this.time.seconds) + ':' + this.formatTwoDigits(this.time.miliseconds);
    }
  }, {
    key: 'resetTimer',
    value: function resetTimer() {
      this.time = {
        miliseconds: 0,
        seconds: 0,
        minutes: 0
      };

      this.resetRecords();
      this.animateTip();
      !this.running && this.renderTime();
    }
  }, {
    key: 'addRecord',
    value: function addRecord() {
      var record = this.formatTwoDigits(this.time.minutes) + ':' + this.formatTwoDigits(this.time.seconds) + ':' + this.formatTwoDigits(this.time.miliseconds);
      this.running && this.records.push(record);
      this.domRecordsOutputObject.innerHTML = this.records.map(function (x) {
        return '<li>' + x.trim() + '</li>';
      }).join('');
    }
  }, {
    key: 'resetRecords',
    value: function resetRecords() {
      this.domRecordsOutputObject.innerHTML = '';
      this.records = [];
    }
  }]);

  return Timer;
}();

var timer = new Timer(timerOutput, recordsList, timerTrigger, timerAction);

timerTrigger.addEventListener('click', function () {
  timer.trigger();
});

timerAction.addEventListener('click', function () {
  timer.action();
});
