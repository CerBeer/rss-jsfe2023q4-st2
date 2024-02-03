let data;
const gamestate = {};

function getRandomInt(max, exclude = -1) {
  let result = Math.floor(Math.random() * max);
  let count = 100;
  while (result === exclude && count > 0) {
    result = Math.floor(Math.random() * max);
    count -= 1;
  }
  return result;
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
}

function pool_create() {
  gamestate.nextfigures = getRandomInt(data.figuresInLevel + 1);
  console.log(data.figures[gamestate.nextfigures].name);
  data.figures[gamestate.nextfigures].data.forEach(element => {
    console.log(element);
  });
}

get_data();
