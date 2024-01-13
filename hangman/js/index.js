
let data;
const keyboard_buttons = {};
const question_letters = [];
let game_question = 0;
let game_score = 0;
let game_score_max = 0;
let game_letters_probing = [];

const keyboard = document.querySelector(".right-side-keyboard");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function get_data() {
  const requestURL = "./resource/data.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  if (response.ok) {
    data = await response.json();
    data_read();
  } else {
    alert("Reload page please, somebody wrong: " + response.status);
  }
}

function data_read() {
  pool_create();
  new_game();
}

function pool_create() {
  pool_create_base();
  pool_create_body();
  pool_create_single();
  pool_create_keyboard();
}

function pool_create_base() {
  data.elements.base.forEach(element => {
    pool_create_one_element(element);
  });
}

function pool_create_body() {
  data.elements.body.forEach(element => {
    pool_create_or_find_one_element(element);
  });
  game_score_max = data.elements.body.length;
}

function pool_create_single() {
  pool_create_or_find_one_element(data.elements.question);
  pool_create_or_find_one_element(data.elements.hint);
  pool_create_or_find_one_element(data.elements.score);
  pool_create_or_find_one_element(data.elements.score_max);
  data.elements.score_max.imp.innerText = game_score_max;
}

function pool_create_keyboard() {
  const keyboard = pool_create_or_find_one_element(data.elements.keyboard);
  data.symbols_en.split("").forEach(element => {
    const new_button = pool_create_one_element(data.elements.keyboard_key, keyboard);
    new_button.innerText = element;
    new_button.dataset.letter = element;
    keyboard_buttons[element] = new_button;
  });
  keyboard.addEventListener('click', keyboard_click);
}

function pool_create_or_find_one_element(element) {
  let parent = document.body;
  if (element.parent.length > 0) {
    parent = document.querySelector(`.${element.parent}`);
  };
  let new_element = parent.querySelector(`.${element.classes}`);
  if (new_element === null) {
    new_element = pool_create_one_simple_element(element);
    parent.appendChild(new_element);
  };
  element.imp = new_element;
  return new_element;
}

function pool_create_one_element(element, parent = undefined) {
  const new_element = pool_create_one_simple_element(element);
  if (parent === undefined) {
    if (element.parent.length === 0) {
      document.body.appendChild(new_element);
    } else {
      const parent_element = document.querySelector(`.${element.parent}`);
      parent_element.appendChild(new_element);
    }
  } else {
    parent.appendChild(new_element);
  }
  return new_element;
}

function pool_create_one_simple_element(element) {
  const new_element = document.createElement(element.type);
  new_element.innerText = element.text;
  new_element.className = element.classes;
  element.imp = new_element;
  return new_element;
}

function keyboard_click(e) {
  e.stopPropagation();
  keyboard_click_target(e.target);
}

function keyboard_click_target(target) {
  const isRightTarget = target.classList.contains('right-side-keyboard-key') 
    && !target.classList.contains('right-side-keyboard-key-pushed');
  if (isRightTarget) {
    // console.log(target.dataset.letter);
    target.classList.add("right-side-keyboard-key-pushed");
    game_letters_probing.push(target.dataset.letter);
    game_check_letter(target.dataset.letter);
  }
}

function keyboard_push(event) {
  const pushedKey = event.key.toUpperCase();
  let key = undefined;
  if (data.symbols_en.indexOf(pushedKey) >= 0) {
    key = pushedKey;
  } else {
    if (data.symbols_ru.indexOf(pushedKey) >= 0) {
      key = data.symbols_en[data.symbols_ru.indexOf(pushedKey)];
    } else {
      return;
    }
  }
  keyboard_click_target(keyboard_buttons[key]);
};

function new_game() {
  game_question = getRandomInt(data.questions.length);
  game_score = 0;
  game_letters_probing = [];
  while (question_letters.length > 0) {
    question_letters.pop().remove();
  };
  data.questions[game_question].question.split("").forEach( element => {
    const question = data.elements.question.imp;
    const new_letter = pool_create_one_element(data.elements.question_sign, question);
    new_letter.dataset.letter = element;
    question_letters.push(new_letter);
  });
  data.elements.hint.imp.innerHTML = "<b>Hint: </b>" + data.questions[game_question].hint;
  let modal = document.querySelector(".modal-window-overlay");
  if (modal !== null) modal.remove();
  document.querySelectorAll(".right-side-keyboard-key-pushed").forEach(el => {
    el.classList.remove("right-side-keyboard-key-pushed")
  });
  game_score_check();
  console.log(data.questions[game_question].question);
}

function game_check_letter(letter) {
  let thisLetterIs = false;
  question_letters.forEach(element => {
    if (element.dataset.letter.toUpperCase() === letter) {
      thisLetterIs = true;
      element.innerText = element.dataset.letter;
    }
  });
  if (thisLetterIs) {
    game_word_check();
  } else {
    game_score += 1;
    if (game_score > game_score_max) game_score = game_score_max;
    game_score_check();
  }
}

function game_word_check() {
}

function game_score_check() {
  data.elements.score.imp.innerText = game_score;
  data.elements.body.forEach((element, i) => {
    if (i < game_score) {
      element.imp.classList.add("element-visible");
    }
  });
  if (game_score === game_score_max) {
    console.log("Game over!");
    pool_create_modal();
  }
}

function pool_create_modal() {
  for (let key in data.elements.modal) {
    pool_create_or_find_one_element(data.elements.modal[key]);
  }
  data.elements.modal.word.imp.innerText = data.questions[game_question].question;
  data.elements.modal.button.imp.addEventListener('click', new_game);
}

document.addEventListener('keydown', keyboard_push);

get_data();
