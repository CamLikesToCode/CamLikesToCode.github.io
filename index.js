const hoverTitle = document.getElementById('hoverTitle');

hoverTitle.addEventListener('mouseenter', () => {
  const newWordsLeft = document.createElement('span');
  newWordsLeft.textContent = 'coder in training';
  newWordsLeft.classList.add('shooting-words-left');
  hoverTitle.appendChild(newWordsLeft);
  
  const newWordsDown = document.createElement('span');
  newWordsDown.textContent = 'learner';
  newWordsDown.classList.add('shooting-words-down');
  hoverTitle.appendChild(newWordsDown);
  /*
  const newWordsRight = document.createElement('span');
  newWordsRight.textContent = 'math';
  newWordsRight.classList.add('shooting-words-right');
  hoverTitle.appendChild(newWordsRight);
  */
  const newWordsUp = document.createElement('span');
  newWordsUp.textContent = 'math';
  newWordsUp.classList.add('shooting-words-up');
  hoverTitle.appendChild(newWordsUp);

});



hoverTitle.addEventListener('mouseleave', () => {
  const shootingWordsLeft = hoverTitle.querySelector('.shooting-words-left');
  const shootingWordsDown = hoverTitle.querySelector('.shooting-words-down');
  //const shootingWordsRight = hoverTitle.querySelector('.shooting-words-right');
  const shootingWordsUp = hoverTitle.querySelector('.shooting-words-up');
  if (shootingWordsLeft) {
    shootingWordsLeft.remove();
  }
  if (shootingWordsDown) {
    shootingWordsDown.remove();
  }
  //if (shootingWordsRight) {
    //shootingWordsRight.remove();
  //}
  if (shootingWordsUp) {
    shootingWordsUp.remove();
  }
});