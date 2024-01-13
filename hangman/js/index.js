
let data;
const keyboard_buttons = {};

const keyboard = document.querySelector(".right-side-keyboard");

async function get_data() {
  const requestURL = "./resource/data.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  data = await response.json();
  data_read();
}

function data_read() {
  // let products = structuredClone(data);
  for (let key in data) {
    console.log(`${key}:${data[key]}`);
  }
  pool_createKeyboard();
}

function pool_createKeyboard() {
  data.symbols_en.split("").forEach(element => {
    const button = document.createElement("div");
    button.innerText = element;
    button.className='right-side-keyboard-key';
    button.dataset.letter = element;
    keyboard.appendChild(button);
    keyboard_buttons[element] = button;
  });
}

function keyboard_click(e) {
  e.stopPropagation();
  keyboard_click_target(e.target);
}

function keyboard_click_target(target) {
  const isRightTarget = target.classList.contains('right-side-keyboard-key') 
    && !target.classList.contains('right-side-keyboard-key-pushed');
  if (isRightTarget) {
    console.log(target.dataset.letter);
    target.classList.add("right-side-keyboard-key-pushed");
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

document.addEventListener('keydown', keyboard_push);
keyboard.addEventListener('click', keyboard_click);

get_data();
