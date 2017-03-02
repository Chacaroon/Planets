var planets = document.getElementsByClassName('planets');
var width_px;
var height_px;
var left_px;
var top_px;

for (var i = 0; i < planets.length; i++) {
	planets[i].addEventListener('mouseover', over);
	planets[i].addEventListener('mouseout', out);
}

function over() {
	var elem = this;

	width_px = getComputedStyle(elem).width;
	height_px = getComputedStyle(elem).height;
	left_px = getComputedStyle(elem).marginLeft;
	top_px = getComputedStyle(elem).marginTop;

	width = +width_px.substr(0, width_px.length-2);
	height = +height_px.substr(0, height_px.length-2);
	var m_left = +left_px.substr(0, left_px.length-2);
	var m_top = +top_px.substr(0, top_px.length-2);

	elem.style.width = width + width * 0.15 + 'px';
	elem.style.height = height + height * 0.15 + 'px';
	elem.style.marginLeft = m_left - width * 0.075 + 'px';
	elem.style.marginTop = m_top - height * 0.075 + 'px';
}

function out() {
	var elem = this;
	elem.style.width = width_px;
	elem.style.height = height_px;
	elem.style.marginLeft = left_px;
	elem.style.marginTop = top_px;
}