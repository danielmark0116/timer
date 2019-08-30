const clockCircle = document.querySelector('.clock-circle');
const timetab = document.querySelector('.timetab');
const btns = document.querySelectorAll('.btn');
const app = document.querySelector('.app');

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
    btn.dataset.side === 'right' ? true : btn.dataset.side === 'left' && false;

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
    TweenMax.to(timetab, 0.7, { rotationY: 0, ease: Back.easeOut.config(5) });
    if (!clockPopTimeline._active) {
      clockPop();
    }
    btnAnimation(btn, false);
  });

  btn.addEventListener('touchend', () => {
    TweenMax.to(timetab, 0.7, { rotationY: 0, ease: Back.easeOut.config(5) });
    if (!clockPopTimeline._active) {
      clockPop();
    }
    btnAnimation(btn, false);
  });
});
