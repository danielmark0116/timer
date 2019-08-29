const timerOutput = document.getElementById('timer-output');
const recordsList = document.getElementById('timer-records');
const timerTrigger = document.getElementById('timer-trigger');
const timerAction = document.getElementById('timer-action');

class Timer {
  constructor(
    domTimerOutputObject,
    domRecordsOutputObject,
    timerTriggerBtn,
    timerActionBtn
  ) {
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

  updateBtns() {
    this.timerTriggerBtn.innerHTML = !this.running ? 'Start' : 'Stop';
    this.timerActionBtn.innerHTML = !this.running ? 'Zero' : 'Round';
  }

  trigger() {
    if (!this.running) {
      this.running = true;
      this.interval =
        this.running && setInterval(() => this.calculateTime(), 10);
    } else if (this.running) {
      this.running = false;
      clearInterval(this.interval);
    }
    this.updateBtns();
  }

  action() {
    if (this.running) {
      this.addRecord();
    } else if (!this.running) {
      this.resetRecords();
      this.resetTimer();
    }
  }

  calculateTime() {
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

  formatTwoDigits(input) {
    input = input.toString();
    if (input.length < 2) {
      input = `0${input}`;
    }
    return input;
  }

  animateTip() {
    if (document.querySelector('.tip')) {
      document.querySelector('.tip').style.transform = `rotate(${this.time
        .seconds * 6}deg)`;
    }
  }

  renderTime() {
    this.domTimerOutputObject.innerHTML = `${this.formatTwoDigits(
      this.time.minutes
    )}:${this.formatTwoDigits(this.time.seconds)}:${this.formatTwoDigits(
      this.time.miliseconds
    )}`;
  }

  resetTimer() {
    this.time = {
      miliseconds: 0,
      seconds: 0,
      minutes: 0
    };

    this.resetRecords();
    this.animateTip();
    !this.running && this.renderTime();
  }

  addRecord() {
    let record = `${this.formatTwoDigits(
      this.time.minutes
    )}:${this.formatTwoDigits(this.time.seconds)}:${this.formatTwoDigits(
      this.time.miliseconds
    )}`;
    this.running && this.records.push(record);
    this.domRecordsOutputObject.innerHTML = this.records
      .map(x => `<li>${x.trim()}</li>`)
      .join('');
  }

  resetRecords() {
    this.domRecordsOutputObject.innerHTML = '';
    this.records = [];
  }
}

const timer = new Timer(timerOutput, recordsList, timerTrigger, timerAction);

timerTrigger.addEventListener('click', function() {
  timer.trigger();
});

timerAction.addEventListener('click', function() {
  timer.action();
});
