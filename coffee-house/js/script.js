window.addEventListener('resize', function(event) {
    burgerMenu_Close();
}, true);

var observer = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting === true)
        console.log('Element has just become visible in screen');
}, { threshold: [0] });

observer.observe(document.querySelector(".favorite-coffee-slider"));

// slider

const slider_element_last = 2;
const slider_element_speed_up = 2;
const slider_element_speed_down = 20;
const slider_control = document.querySelector(".favorite-coffee-slider-control");
const slider_items = document.querySelector(".favorite-coffee-slider-row-side-c-items");
let slider_element_active = 0;
let slider_state_continues = true;


let slider_timerId = setInterval(slider_elements_calc_state, 130);
function slider_elements_calc_state() {
    slider_elements_calc_state_controls();
}

function slider_move_next() {
	slider_element_active += 1;
    if (slider_element_active > slider_element_last) slider_element_active = 0;
    slider_elements_calc_state_slide();
//    slider_elements_calc_state_controls();
};

function slider_move_prev() {
	slider_element_active -= 1;
    if (slider_element_active < 0) slider_element_active = slider_element_last;
    slider_elements_calc_state_slide();
//    slider_elements_calc_state_controls();
};

function slider_elements_calc_state_slide() {

    const sliderWidth  = document.querySelector(".favorite-coffee-slider-row-side-c-items-item").getBoundingClientRect().width;
    const positionX = slider_element_active * sliderWidth;
    slider_items.style["transform"] = `translateX(-${positionX}px)`;

}

function slider_elements_calc_state_controls() {

	if (!slider_state_continues) return;

    // slide-control
    let index = 0;
	for (let element of slider_control.children) {
		let element_fill = element.children[0];
        let element_current_width = parseInt(element_fill.style.width) || 0;
		if (index === slider_element_active) {
            element_fill.classList.add('favorite-coffee-slider-control-element-fill-active');
            // console.log(element_current_width);
            if (element_current_width < 100) {
                element_new_width = element_current_width + slider_element_speed_up;
                if (element_new_width > 100) element_new_width = 100;
                if (element_new_width !== element_current_width) element_fill.style.width = `${element_new_width}%`;
            }
            else {
                slider_move_next();
            }
		}
		else {
            element_fill.classList.remove('favorite-coffee-slider-control-element-fill-active');
            if (element_current_width > 0) {
                element_new_width = element_current_width - slider_element_speed_down;
                if (element_new_width < 0) element_new_width = 0;
                if (element_new_width !== element_current_width) element_fill.style.width = `${element_new_width}%`;
            }
		}
		index++;
	}

}

function slider_pause(e) {
    e.stopPropagation();
    slider_state_continues = false;
}

function slider_continues(e) {
    e.stopPropagation();
    slider_state_continues = true;
}

const slider_button_prev = document.querySelector(".favorite-coffee-slider-row-side-l");
slider_button_prev.addEventListener('click', slider_move_prev);
const slider_button_next = document.querySelector(".favorite-coffee-slider-row-side-r");
slider_button_next.addEventListener('click', slider_move_next);

const slider_row_side_c = document.querySelector(".favorite-coffee-slider-row-side-c");
slider_row_side_c.addEventListener('mouseover', slider_pause);
slider_row_side_c.addEventListener('mouseout', slider_continues);
