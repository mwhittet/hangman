const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.hangman-part');

const words = [
  'alex',
  'blaze',
  'creeper',
  'diamonds',
  'dragon',
  'enderman',
  'ghast',
  'minecraft',
  'mob',
  'pro',
  'nether',
  'noob',
  'pickaxe',
  'sheep',
  'steve',
  'sword',
  'tree',
  'zombie'
];
const correctLetters = [];
const wrongLetters = [];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// Show hidden word
const displayWord = () => {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'You won! 😃';
    popup.style.display = 'flex';
  }
};

// Update the wrong letters
const updateWrongLettersEl = () => {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong letters:</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`).join(', ')}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    index < errors
      ? (part.style.display = 'block')
      : (part.style.display = 'none');
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Better luck next time 😕';
    popup.style.display = 'flex';
  }
};

// Show notification
const showNotification = () => {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};

// Keydown letter press
window.addEventListener('keydown', e => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      !correctLetters.includes(letter)
        ? (correctLetters.push(letter), displayWord())
        : showNotification();
    } else {
      !wrongLetters.includes(letter)
        ? (wrongLetters.push(letter), updateWrongLettersEl())
        : showNotification();
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});

displayWord();
