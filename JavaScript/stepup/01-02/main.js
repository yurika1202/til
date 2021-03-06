class StopWatch {
  constructor(options = {}) {
    this.options = options;
  }

  init() {
    const displayElm = document.querySelector('.display');
    let { color, backgroundColor } = options;
    color = color || 'lightblue';
    backgroundColor = backgroundColor || 'black';
    displayElm.style.color = color;
    displayElm.style.backgroundColor = backgroundColor;

    let seconds = 0;
    let timer = null;

    this.timeAry = [];

    const startBtn = document.querySelector('.startButton');
    const stopBtn = document.querySelector('.stopButton');

    this.logElm = document.querySelector('.log');

    startBtn.addEventListener('click', () => {
      if (timer === null) {
        timer = setInterval(function () {
          seconds++;
          displayElm.innerText = seconds;
          return seconds;
        }, 1000);

        // 改造２：ボタンの無効化
        startBtn.setAttribute('disabled', true);
        stopBtn.removeAttribute('disabled');

        this.addMessage('開始');
      }
    });

    stopBtn.addEventListener('click', () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;

        // 改造２：ボタンの無効化
        startBtn.removeAttribute('disabled');
        stopBtn.setAttribute('disabled', true);

        this.addMessage('終了');
      }
    });
  }

  addMessage(message) {
    const messageElm = document.createElement('div');
    messageElm.innerText = message;
    messageElm.classList.add('message');

    const now = new Date();
    messageElm.innerText = `${now.getHours()}時${now.getMinutes()}分${now.getSeconds()}秒${message}`;

    // 改造１：最新順にソート
    this.timeAry.push(messageElm);
    const reverseTime = [...this.timeAry].reverse();

    reverseTime.forEach(time => {
      this.logElm.appendChild(time);
    });
  }
}

const options = {
  color: 'limegreen',
  backgroundColor: '#333',
};
const stopWatch = new StopWatch(options);
stopWatch.init();
