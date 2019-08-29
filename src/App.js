class Timer {
  constructor() {
    this.running = false;
    this.time = {
      miliseconds: 0,
      seconds: 0,
      minutes: 0
    };
    this.renderTime();
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.interval =
        this.running && setInterval(() => this.calculateTime(), 10);
    }
  }

  stop() {
    this.running = false;

    !this.running && clearInterval(this.interval);
  }

  calculateTime() {
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

  formatTwoDigits(input) {
    input = input.toString();
    if (input.length < 2) {
      input = `0${input}`;
    }
    return input;
  }

  renderTime() {
    document.getElementById('test').innerHTML = `${this.formatTwoDigits(
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

    !this.running && this.renderTime();
  }
}

const timer = new Timer('string testowy');

document.getElementById('start').addEventListener('click', function() {
  timer.start();
});
document.getElementById('stop').addEventListener('click', function() {
  timer.stop();
});
document.getElementById('reset').addEventListener('click', function() {
  timer.resetTimer();
});
