let data;
let timer;

function getRandomInt(max, exclude = -1) {
  let result = Math.floor(Math.random() * max);
  let count = 100;
  while (result === exclude && count > 0) {
    result = Math.floor(Math.random() * max);
    count -= 1;
  }
  return result;
}

function tick() {
  if (data.gameStates.state === data.enum.game_state.play) {
    data.gameStates.timer += 1;
    setView_timer();
  }
}

function setView_timer() {
  data.elements.named.timer.imp.innerText = getView_timer();
}

function getView_timer() {
  const minutes = Math.floor(data.gameStates.timer / 60);
  const seconds = data.gameStates.timer - (minutes * 60);
  format = `00${minutes}`.slice(-2) + ':' + `00${seconds}`.slice(-2);
  return format;
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

function setView_game() {
  if (data.gameStates.themeLight)
    document.body.classList.remove('dark-theme');
  else
    document.body.classList.add('dark-theme');

  if (data.gameStates.soundOn)
    data.elements.named.button_sound.imp.dataset.state = "on";
  else
    data.elements.named.button_sound.imp.dataset.state = "off";
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
  pool_create();
  setView_game();
}

function pool_create() {
  console.log(data.figures[data.gameStates.figure].name);
  pool_create_sounds();
  pool_create_base();
  pool_create_named();
  gameNameList_recreate(5);
  data.gameStates.state = data.enum.game_state.stop;
  data.gameStates.timer = 0;
  timer = setInterval(tick, 1000);
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
  data.elements.named.button_random.imp.addEventListener('click', button_click_random);
  data.elements.named.button_reset.imp.addEventListener('click', button_click_reset);
  data.elements.named.button_solution.imp.addEventListener('click', button_click_solution);
  data.elements.named.button_theme.imp.addEventListener('click', button_click_theme);
  data.elements.named.button_sound.imp.addEventListener('click', button_click_sound);
  data.elements.named.button_save.imp.addEventListener('click', button_click_save);
  data.elements.named.button_load.imp.addEventListener('click', button_click_load);
  data.elements.named.button_top.imp.addEventListener('click', button_click_top);

  data.elements.named.button_save.imp.dataset.state = "hide";
  data.elements.named.button_load.imp.dataset.state = "hide";
}

function button_click_top(e) {
  showModal_Top();
}

function button_click_save(e) {
  if (data.gameStates.state !== data.enum.game_state.play) {
    return;
  }
  data.elements.named.button_save.imp.dataset.state = "show";
  data.gameStates.save.state = data.gameStates.state;
  data.gameStates.save.figure = data.gameStates.figure;
  data.gameStates.save.timer = data.gameStates.timer;
  const ceil_state = [];
  data.figureParts.table.elements.forEach((row) => {
    const state_row = [];
    row.forEach((ceil) => {
      state_row.push(ceil.imp.dataset.state || "0");
    })
    ceil_state.push(state_row);
  });
  data.gameStates.save.ceil_state = ceil_state;
  localStorage_save();
  setTimeout(() => {data.elements.named.button_save.imp.dataset.state = "hide"}, 500);
}

function button_click_load(e) {
  if (data.gameStates.save.ceil_state.length === 0) {
    return;
  }
  data.elements.named.button_load.imp.dataset.state = "show";
  data.gameStates.figure = data.gameStates.save.figure;
  data.elements.named.gameNameValue.imp.innerText = data.figures[data.gameStates.figure].name;
  const figures_size = data.figures[data.gameStates.figure].size;
  data.elements.named.gameSizeValue.imp.innerText = `${figures_size}x${figures_size}`;
  pool_recreate_comb();

  data.figureParts.table.elements.forEach((row, ir) => {
    row.forEach((ceil, ic) => {
      ceil.imp.dataset.state = data.gameStates.save.ceil_state[ir][ic];
    })
  });

  data.gameStates.state = data.gameStates.save.state;
  data.gameStates.timer = data.gameStates.save.timer;
  setTimeout(() => {data.elements.named.button_load.imp.dataset.state = "hide"}, 500);
}

function button_click_gameSizeList(e) {
  const figures_size = parseInt(e.target.dataset.value);
  data.elements.named.gameSizeValue.imp.innerText = `${figures_size}x${figures_size}`;
  gameNameList_recreate(figures_size);
}

function gameNameList_recreate(figures_size) {
  data.elements.named.gameNameList.imp.innerText = '';
  data.figures.forEach((v, i) => {
    if (v.size === figures_size) {
      const element = {type: "div", value: `${i}`, text: v.name, classes: "game-status-field-name-list-item", parent: "game-status-field-name-list"};
      const new_element = pool_create_one_element(element, data.elements.named.gameNameList.imp);
      new_element.addEventListener('click', button_click_gameNameList);
    }
  })
  data.gameStates.figure = figures_size - 5 + getRandomInt(data.gameStates.figuresInLevel);
  data.elements.named.gameNameValue.imp.innerText = data.figures[data.gameStates.figure].name;
  pool_recreate_comb();
}

function button_click_gameNameList(e) {
  data.gameStates.figure = parseInt(e.target.dataset.value);
  data.elements.named.gameNameValue.imp.innerText = data.figures[data.gameStates.figure].name;
  pool_recreate_comb();
}

function pool_recreate_comb() {
  data.gameStates.state = data.enum.game_state.stop;
  data.gameStates.timer = 0;
  setView_timer();

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
  if (data.gameStates.state === data.enum.game_state.stop) {
    data.gameStates.state = data.enum.game_state.play;
  }
  if (data.gameStates.state !== data.enum.game_state.play) {
    return;
  }
  const cell_state = e.target.dataset.state || "0";
  if (cell_state === "0") {
    e.target.dataset.state = "1";
    game_playSound(data.sounds.fill.imp);
  } else {
    e.target.dataset.state = "0";
    game_playSound(data.sounds.empty.imp);
  }
  game_checkWin();
}

function button_rightclick_table(e) {
  e.preventDefault();
  e.stopPropagation();
  if (data.gameStates.state === data.enum.game_state.stop) {
    data.gameStates.state = data.enum.game_state.play;
  }
  if (data.gameStates.state !== data.enum.game_state.play) {
    return;
  }
  const cell_state = e.target.dataset.state || "0";
  if (cell_state !== "-1") {
    e.target.dataset.state = "-1";
    game_playSound(data.sounds.cross.imp);
  } else {
    e.target.dataset.state = "0";
    game_playSound(data.sounds.empty.imp);
  }
  game_checkWin();
}

function game_checkWin() {
  if (data.gameStates.state !== data.enum.game_state.play) {
    return;
  }
  let result = true;
  data.figureParts.table.elements.forEach((row) => {
    row.forEach((ceil) => {
      const value = ceil.imp.dataset.value || "0";
      const state = ceil.imp.dataset.state === "-1" ? "0" : (ceil.imp.dataset.state || "0");
      result = result && state === value;
    })
  });
  if (result) {
    data.gameStates.state = data.enum.game_state.win;
    const topName = data.figures[data.gameStates.figure].name;
    const topSize = data.figures[data.gameStates.figure].size;
    const topTime = data.gameStates.timer;
    data.gameStates.top.push({name: topName, size: `${topSize}x${topSize}`, time: topTime, timeS: getView_timer()});
    data.gameStates.top = data.gameStates.top.sort((a, b) => a.time - b.time).slice(0, 5);
    localStorage_save();
    showModal_Win();
  }
}

function showModal_Win() {
  if (document.querySelector(".modal-window-overlay") !== null) return;
  game_playSound(data.sounds.win.imp);
  for (let key in data.elements.modal) {
    pool_create_or_find_one_element(data.elements.modal[key]);
  }
  data.elements.modal.nonogram.imp.innerText = data.figures[data.gameStates.figure].name;
  data.elements.modal.time.imp.innerText = getView_timer();
  data.elements.modal.button.imp.addEventListener('click', hideModal);
  setTimeout(pool_create_modal_continue, 100);
}

function showModal_Top() {
  if (document.querySelector(".modal-window-overlay") !== null) return;
  game_playSound(data.sounds.win.imp);
  for (let key in data.elements.modal_top) {
    pool_create_or_find_one_element(data.elements.modal_top[key]);
  }
  
  let element = {type: "div", value: "", text: "", classes: "modal-window-list-row modal-window-list-row-title"};
  const row_el = pool_create_one_element(element, data.elements.modal_top.list.imp);
  element = {type: "div", value: "", text: "Name", classes: "modal-window-list-name"};
  pool_create_one_element(element, row_el);
  element = {type: "div", value: "", text: "Size", classes: "modal-window-list-size"};
  pool_create_one_element(element, row_el);
  element = {type: "div", value: "", text: "Time", classes: "modal-window-list-time"};
  pool_create_one_element(element, row_el);

  data.gameStates.top.forEach((el) => {
    let element = {type: "div", value: "", text: "", classes: "modal-window-list-row"};
    const row_el = pool_create_one_element(element, data.elements.modal_top.list.imp);
    element = {type: "div", value: "", text: el.name, classes: "modal-window-list-name"};
    pool_create_one_element(element, row_el);
    element = {type: "div", value: "", text: el.size, classes: "modal-window-list-size"};
    pool_create_one_element(element, row_el);
    element = {type: "div", value: "", text: el.timeS, classes: "modal-window-list-time"};
    pool_create_one_element(element, row_el);
  })
  
  data.elements.modal_top.button.imp.addEventListener('click', hideModal_top);
  setTimeout(pool_create_modal_top_continue, 100);
}

function hideModal() {
  if (document.querySelector(".modal-window-overlay") !== null) {
    data.elements.modal.overlay.imp.classList.remove('element-visible');
    setTimeout(pool_hide_modal, 1000);
  }
}

function hideModal_top() {
  if (document.querySelector(".modal-window-overlay") !== null) {
    data.elements.modal_top.overlay.imp.classList.remove('element-visible');
    setTimeout(pool_hide_modal_top, 1000);
  }
}

function pool_create_modal_continue() {
  data.elements.modal.overlay.imp.classList.add('element-visible');
  data.elements.modal.button.imp.focus();
}

function pool_create_modal_top_continue() {
  data.elements.modal_top.overlay.imp.classList.add('element-visible');
  data.elements.modal_top.button.imp.focus();
}

function pool_hide_modal() {
  data.elements.modal.overlay.imp.remove();
}

function pool_hide_modal_top() {
  data.elements.modal_top.overlay.imp.remove();
}

function button_click_solution(e) {
  data.gameStates.state = data.enum.game_state.solution;
  data.gameStates.timer = 0;
  setView_timer();
  game_playSound(data.sounds.solution.imp);
  data.figureParts.table.elements.forEach((row) => {
    row.forEach((ceil) => {
      ceil.imp.dataset.state = ceil.imp.dataset.value;
    })
  });
}

function button_click_random(e) {
  data.gameStates.figure = getRandomInt(data.gameStates.figuresInLevel * 3, data.gameStates.figure);
  data.elements.named.gameNameValue.imp.innerText = data.figures[data.gameStates.figure].name;
  const figures_size = data.figures[data.gameStates.figure].size;
  data.elements.named.gameSizeValue.imp.innerText = `${figures_size}x${figures_size}`;
  pool_recreate_comb();
}

function button_click_reset(e) {
  if (data.gameStates.state === data.enum.game_state.solution) {
    return;
  }
  data.figureParts.table.elements.forEach((row) => {
    row.forEach((ceil) => {
      ceil.imp.dataset.state = "0";
    })
  });
  if (data.gameStates.state === data.enum.game_state.win) {
    data.gameStates.state = data.enum.game_state.play;
    data.gameStates.timer = 0;
    setView_timer();
  }
}

function button_click_theme() {
  data.gameStates.themeLight = !data.gameStates.themeLight;
  if (data.gameStates.themeLight)
    document.body.classList.remove('dark-theme');
  else
    document.body.classList.add('dark-theme');
    localStorage_save();
}

function button_click_sound() {
  data.gameStates.soundOn = !data.gameStates.soundOn;
  if (data.gameStates.soundOn)
    data.elements.named.button_sound.imp.dataset.state = "on";
  else
    data.elements.named.button_sound.imp.dataset.state = "off";
  localStorage_save();
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
