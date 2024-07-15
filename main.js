const divCreateCards = document.querySelector('.create-flash-cards');
const btnAddCards = document.querySelector('.add-cards');
const btnDelCards = document.querySelector('.del-cards');
const btnCloseCards = document.querySelector('.close-card');
const btnSave = document.querySelector('.save-cards');
let contentCards = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : [];

btnCloseCards.addEventListener('click', () => {
  closeCard();
});

btnDelCards.addEventListener('click', () => {
  delAllCards();
});

btnAddCards.addEventListener('click', () => {
  openCard();
});

btnSave.addEventListener('click', () => {
  saveCard();
});

function closeCard() {
  divCreateCards.style.display = 'none';
  const inputs = divCreateCards.querySelectorAll('[type="text"]');
  for (let i = 0; inputs.length > i; i++) {
    inputs[i].value = '';
  }
}

function openCard() {
  divCreateCards.style.display = 'flex';
}

function delAllCards() {
  localStorage.clear();
  contentCards = [];
  window.location.reload();
}

function saveCard() {
  const flashCards = {
    question: divCreateCards.querySelector('#question').value,
    answer: divCreateCards.querySelector('#answer').value,
  };

  contentCards.push(flashCards);
  localStorage.setItem('cards', JSON.stringify(contentCards));

  createFlashCard(contentCards[contentCards.length - 1], contentCards.length - 1);

  divCreateCards.querySelector('#question').value = '';
  divCreateCards.querySelector('#answer').value = '';
}

function createFlashCard(text, delIndex) {
  const divFlashCards = document.querySelector('.flashcards');
  const divFlashCard = document.createElement('div');
  const question = document.createElement('div');
  const answer = document.createElement('div');
  const delCard = document.createElement('div');

  divFlashCard.classList.add('flashcard');
  question.classList.add('question');
  answer.classList.add('answer');
  delCard.classList.add('del-card');

  question.textContent = text.question;
  answer.textContent = text.answer;

  divFlashCard.appendChild(question);
  divFlashCard.appendChild(answer);
  divFlashCard.appendChild(delCard);

  const answerCard = divFlashCard.querySelector('.answer');
  const questionCard = divFlashCard.querySelector('.question');
  answerCard.style.display = 'none';
  questionCard.style.display = 'block';

  delCard.addEventListener('click', () => {
    event.stopPropagation();
    contentCards.splice(delIndex, 1);
    localStorage.setItem('cards', JSON.stringify(contentCards));
    window.location.reload();
  });

  divFlashCard.addEventListener('click', () => {
    if (answerCard.style.display === 'none') {
      answerCard.style.display = 'block';
      questionCard.style.display = 'none';
    } else {
      answerCard.style.display = 'none';
      questionCard.style.display = 'block';
    }
  });

  divFlashCards.appendChild(divFlashCard);
}

contentCards.forEach(createFlashCard);
