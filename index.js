const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;



const buttonHandler = () => {
  const selectedDate = document.getElementById('flatpickr-control').value;
  if (selectedDate) {
    hideExpired();
    clearInterval(timerInterval);
    timerInterval = startTimer(new Date(selectedDate).getTime());
  }
};

const button = document.getElementsByTagName('button')[0];
button.addEventListener('click', buttonHandler);

const startTimer = (targetTime) => {
  const timer = () => {
    const now = new Date().getTime();

    const diff = targetTime - now;

    if (diff < 0) {
      if (typeof timerInterval != null) {
        clearInterval(timerInterval);
      }
      showExpired();
    } else {
      const timerObj = {
        days: Math.floor(diff / DAY),
        hours: Math.floor((diff % DAY) / HOUR),
        minutes: Math.floor((diff % HOUR) / MINUTE),
        seconds: Math.floor((diff % MINUTE) / SECOND)
      }
      displayTimer(timerObj);
    }
  };

  timer();
  const timerInterval = setInterval(timer, SECOND);

  return timerInterval;
}

const displayTimer = (timerObj) => {
  const timerContainerDiv = document.querySelector('.timer-container');

  const timerBoxes = timerContainerDiv.querySelectorAll('.timer-box');
  [...timerBoxes].forEach(box => {
    const type = box.dataset.type;

    const template = document.querySelector('#timerBoxTemplate');

    const timerTemplateValueDiv = template.content.querySelector('.timer-box-value');
    timerTemplateValueDiv.textContent = timerObj[type];
    const timerTemplateValueTitle = template.content.querySelector('.timer-box-title');
    timerTemplateValueTitle.textContent = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;

    const templateNode = document.importNode(template.content, true);

    box.innerHTML = '';
    box.appendChild(templateNode);
  });
};

const showExpired = () => {  
  const expiredBanner = document.querySelector('.expired-banner');
  expiredBanner.classList.remove('hidden');
};

const hideExpired = () => {  
  const expiredBanner = document.querySelector('.expired-banner');
  expiredBanner.classList.add('hidden');
};


const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

let timerInterval = startTimer(tomorrow.getTime());
