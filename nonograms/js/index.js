let data;

function getRandomInt(max, exclude = -1) {
  let result = Math.floor(Math.random() * max);
  let count = 100;
  while (result === exclude && count > 0) {
    result = Math.floor(Math.random() * max);
    count -= 1;
  }
  return result;
}

function localStorage_init() {
  let keys = Object.keys(localStorage);
  if (keys.indexOf('nonograms') < 0) localStorage_save();
}

function localStorage_save() {
  localStorage.setItem('nonograms', JSON.stringify(data.gameStates));
}

function localStorage_read() {
  data.gameStates = JSON.parse(localStorage.nonograms);
}

function pool_create_or_find_one_element(element) {
  let parent = document.body;
  if (element.parent.length > 0) {
    parent = document.querySelector(`.${element.parent}`);
  };
  const elementClass = element.classes.split(" ")[0];
  let new_element = parent.querySelector(`.${elementClass}`);
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
  if (element.value.length > 0) {
    new_element.dataset.value = element.value;
  }
  element.imp = new_element;
  return new_element;
}

function game_playSound(sound) {
  if (!data.gameStates.soundOn) return;
  sound.volume = 0.5;
  sound.play();
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
  localStorage_init();
  localStorage_read();
  data.gameStates.figure = getRandomInt(data.gameStates.figuresInLevel);
  pool_create();
}

function pool_create() {
  console.log(data.figures[data.gameStates.figure].name);
  pool_create_sounds();
  pool_create_base();
  pool_create_named();
  gameNameList_recreate(5);
  data.gameStates.state = data.enum.game_state.stop;
}

function pool_create_sounds() {
  for (const [key, value] of Object.entries(data.sounds)) {
    value.imp = new Audio(value.path);
  }
}

function pool_create_base() {
  data.elements.base.forEach(element => {
    pool_create_one_element(element);
  });
}

function pool_create_named() {
  for (const [key, value] of Object.entries(data.elements.named)) {
    pool_create_or_find_one_element(value);
  }
  data.elements.named.gameSizeList5.imp.addEventListener('click', button_click_gameSizeList);
  data.elements.named.gameSizeList10.imp.addEventListener('click', button_click_gameSizeList);
  data.elements.named.gameSizeList15.imp.addEventListener('click', button_click_gameSizeList);
  data.elements.named.table.imp.addEventListener('click', button_click_table);
  data.elements.named.table.imp.addEventListener('contextmenu', button_rightclick_table);
  data.elements.named.button_solution.imp.addEventListener('click', button_click_solution);
  data.elements.named.button_reset.imp.addEventListener('click', button_click_reset);
  data.elements.named.button_theme.imp.addEventListener('click', button_click_theme);
  data.elements.named.button_sound.imp.addEventListener('click', button_click_sound);

  data.elements.named.button_sound.imp.dataset.state = "on";
}

function button_click_gameSizeList(e) {
  e.stopPropagation();
  const figures_size = parseInt(e.target.dataset.value);
  data.elements.named.gameSizeValue.imp.innerText = `${figures_size}x${figures_size}`;
  gameNameList_recreate(figures_size);
}

function gameNameList_recreate(figures_size) {
  data.elements.named.gameNameList.imp.innerText = '';
  let index_firstElement = -1;
  data.figures.forEach((v, i) => {
    if (v.size === figures_size) {
      const element = {type: "div", value: `${i}`, text: v.name, classes: "game-status-field-name-list-item", parent: "game-status-field-name-list"};
      const new_element = pool_create_one_element(element, data.elements.named.gameNameList.imp);
      new_element.addEventListener('click', button_click_gameNameList);
      if (index_firstElement < 0) index_firstElement = i;
    }
  })
  data.gameStates.figure = index_firstElement;
  data.elements.named.gameNameValue.imp.innerText = data.figures[data.gameStates.figure].name;
  pool_recreate_comb();
}

function button_click_gameNameList(e) {
  e.stopPropagation();
  data.gameStates.figure = parseInt(e.target.dataset.value);
  data.elements.named.gameNameValue.imp.innerText = data.figures[data.gameStates.figure].name;
  pool_recreate_comb();
}

function pool_recreate_comb() {
  data.elements.named.corner.imp.innerText = "";
  data.elements.named.clue_h.imp.innerText = "";
  data.elements.named.clue_v.imp.innerText = "";
  data.elements.named.table.imp.innerText = "";
  figure_calculation_parts();
  data.elements.named.comb.imp.classList.remove('big');
  data.elements.named.comb.imp.classList.remove('medium');
  if (data.figures[data.gameStates.figure].size === 5) {
    data.elements.named.comb.imp.classList.add('big');
  } else if (data.figures[data.gameStates.figure].size === 10) {
    data.elements.named.comb.imp.classList.add('medium');
  }
}

function button_click_table(e) {
  e.stopPropagation();
  const cell_state = e.target.dataset.state || "0";
  if (cell_state === "0") {
    e.target.dataset.state = "1";
    game_playSound(data.sounds.fill.imp);
  } else {
    e.target.dataset.state = "0";
    game_playSound(data.sounds.empty.imp);
  }
}

function button_rightclick_table(e) {
  e.preventDefault();
  e.stopPropagation();
  const cell_state = e.target.dataset.state || "0";
  if (cell_state !== "-1") {
    e.target.dataset.state = "-1";
    game_playSound(data.sounds.cross.imp);
  } else {
    e.target.dataset.state = "0";
    game_playSound(data.sounds.empty.imp);
  }
  return false;
}

function button_click_solution(e) {
  data.gameStates.state = data.enum.game_state.solution;
  game_playSound(data.sounds.solution.imp);
  e.stopPropagation();
  data.figureParts.table.elements.forEach((row) => {
    row.forEach((ceil) => {
      ceil.imp.dataset.state = ceil.imp.dataset.value;
    })
  });
}

function button_click_reset(e) {
  e.stopPropagation();
  data.figureParts.table.elements.forEach((row) => {
    row.forEach((ceil) => {
      ceil.imp.dataset.state = "0";
    })
  });
}

function button_click_theme() {
  document.body.classList.toggle('dark-theme');
}

function button_click_sound() {
  data.gameStates.soundOn = !data.gameStates.soundOn;
  if (data.gameStates.soundOn)
    data.elements.named.button_sound.imp.dataset.state = "on";
  else
    data.elements.named.button_sound.imp.dataset.state = "off";
}

function figure_calculation_parts() {
  figure_calculation_parts_clue_h();
  figure_calculation_parts_clue_v();
  figure_calculation_parts_corner();
  figure_calculation_parts_table();
  figure_calculation_parts_create_structure(data.figureParts.corner, data.elements.named.corner.imp, true);
  figure_calculation_parts_create_structure(data.figureParts.clue_h, data.elements.named.clue_h.imp);
  figure_calculation_parts_create_structure(data.figureParts.clue_v, data.elements.named.clue_v.imp);
  figure_calculation_parts_create_structure(data.figureParts.table, data.elements.named.table.imp, true);
}

function figure_calculation_parts_clue_h() {
  const f = data.figures[data.gameStates.figure].data;
  const clue_h_t = [];
  let clue_max = 0;
  for (let x = 0; x < f[0].length; x += 1) {
    let count_fill = 0;
    const clue_curr = [];
    for (let y = 0; y < f.length; y += 1) {
      clue_curr.push(0);
    }
    for (let y = 0; y < f.length; y += 1) {
      if (f[y][x] === 1) {
        count_fill += 1;
      }
      else if (count_fill > 0) {
        clue_curr.push(count_fill);
        count_fill = 0;
      }
    }
    if (count_fill > 0) clue_curr.push(count_fill);
    clue_h_t.push(clue_curr);
    if ((clue_curr.length - f[0].length) > clue_max) clue_max = clue_curr.length - f[0].length;
  }
  for (let x = 0; x < clue_h_t.length; x += 1) {
    clue_h_t[x] = clue_h_t[x].slice(-clue_max);
  }
  const clue_h = [];
  for (let x = 0; x < clue_h_t[0].length; x += 1) {
    const clue_curr = [];
    for (let y = 0; y < clue_h_t.length; y += 1) {
      clue_curr.push(clue_h_t[y][x]);
    }
    clue_h.push(clue_curr);
  }
  data.figureParts.clue_h.raw = clue_h;
}

function figure_calculation_parts_clue_v() {
  const f = data.figures[data.gameStates.figure].data;
  const clue_v = [];
  let clue_max = 0;
  for (let y = 0; y < f.length; y += 1) {
    const fy = f[y];
    let count_fill = 0;
    const clue_curr = [];
    for (let x = 0; x < fy.length; x += 1) {
      clue_curr.push(0);
    }
    for (let x = 0; x < fy.length; x += 1) {
      if (fy[x] === 1) {
        count_fill += 1;
      }
      else if (count_fill > 0) {
        clue_curr.push(count_fill);
        count_fill = 0;
      }
    }
    if (count_fill > 0) clue_curr.push(count_fill);
    clue_v.push(clue_curr);
    if ((clue_curr.length - fy.length) > clue_max) clue_max = clue_curr.length - fy.length;
  }
  for (let y = 0; y < clue_v.length; y += 1) {
    clue_v[y] = clue_v[y].slice(-clue_max);
  }
  data.figureParts.clue_v.raw = clue_v;
}

function figure_calculation_parts_corner() {
  const clue_h_length = data.figureParts.clue_h.raw.length;
  const clue_v_length = data.figureParts.clue_v.raw[0].length;
  const corner = [];
  for (let x = 0; x < clue_h_length; x += 1) {
    const clue_curr = [];
    for (let y = 0; y < clue_v_length; y += 1) {
      clue_curr.push(0);
    }
    corner.push(clue_curr);
  }
  data.figureParts.corner.raw = corner;
}

function figure_calculation_parts_table() {
  const f = data.figures[data.gameStates.figure].data;
  const table = [];
  for (let y = 0; y < f.length; y += 1) {
    const table_curr = [];
    for (let x = 0; x < f[y].length; x += 1) {
      table_curr.push(f[y][x]);
    }
    table.push(table_curr);
  }
  data.figureParts.table.raw = table;
}

function figure_calculation_parts_create_structure(part, parent, isDataset = false) {
  const f = part.raw;
  const struct = [];
  const elements = [];
  for (let y = 0; y < f.length; y += 1) {
    const elements_curr = [];
    for (let x = 0; x < f[y].length; x += 1) {
      elements_curr.push({value: f[y][x]});
    }
    elements.push(elements_curr);
  }
  const road_length = Math.floor((f.length - 1) / 5);
  for (let road_i = 0; road_i <= road_length; road_i += 1) {
    const road = [];
    const element = {type: "div", value: "", text: "", classes: "road", parent: parent};
    const road_el = pool_create_one_element(element, parent);
    const jack_length = Math.floor((f[0].length - 1) / 5);
    for (let jack_i = 0; jack_i <= jack_length; jack_i += 1) {
      const jack = [];
      const element = {type: "div", value: "", text: "", classes: "jack", parent: road_el};
      const jack_el = pool_create_one_element(element, road_el);
        for (let row_i = 0; row_i < 5; row_i += 1) {
        const y = (road_i * 5) + row_i;
        if (y >= f.length) {
          break;
        }
        const row = [];
        const element = {type: "div", value: "", text: "", classes: "row", parent: road_el};
        const row_el = pool_create_one_element(element, jack_el);
          for (let ceil_i = 0; ceil_i < 5; ceil_i += 1) {
          const x = (jack_i * 5) + ceil_i;
          if (x >= f[0].length) {
            break;
          }
          ceil_value = f[y][x];
          row.push(ceil_value);
          const element = {type: "div", value: "", text: "", classes: "ceil", parent: row_el};
          if (isDataset) element.value = `${ceil_value}`;
          else element.text = ceil_value !== 0 ? `${ceil_value}` : '';
          const ceil_el = pool_create_one_element(element, row_el);
          elements[y][x].imp = ceil_el;
        }
        jack.push(row);
      }
      road.push(jack);
    }
    struct.push(road);
  }
  data.figureParts.table.struct = struct;
  data.figureParts.table.elements = elements;
}

get_data();
