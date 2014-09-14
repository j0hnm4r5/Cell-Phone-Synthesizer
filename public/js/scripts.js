var $body = $('body');

// Random color on page load
$body.css('background-color', '#' + (Math.random() * 0xFFFFFF<<0).toString(16));

// Open streamer when clicked or tapped
$('#play').on('tap', function() {
	var height = $('#mixlr').height();
	if (height > 0) {
		$('#mixlr').height(0);
	} else {
		$('#mixlr').height(180);
	}
});

// prevent scrolling on mobile devices
document.body.addEventListener('touchstart', function(e){e.preventDefault();});

// Lab Color Space Ranges
var max_a = 98,
	min_a = -86,
	max_b = 94,
	min_b = -107;

// Colorspaces to be used by c0lor
var labD50 = c0lor.space.lab(c0lor.white.D50);
var sRGB = c0lor.space.rgb.sRGB;

// Map a value to a new range
function map(current_val, current_min, current_max, new_min, new_max) {
	return ((current_val - current_min) / (current_max - current_min)) * (new_max - new_min) + new_min;
}

// Change color on movement
$body.on('mousemove drag', function(e) {
	changeColor(e.x, e.y); //for touch
	changeColor(e.pageX, e.pageY); //for mouse
});

function changeColor(x, y) {
	var a = map(x, 0, $body.width(), min_a, max_a),
		b = map(y, 0, $body.height(), min_b, max_b);

	// Conversion between colorspaces, from Lab to Hex. This is convoluted, but its the best I have right now.
	var userLab = c0lor.Lab(30, a, b),
		userXYZ = labD50.XYZ(userLab),
		userrgb = sRGB.rgb(userXYZ),
		userRGB = userrgb.RGB(),
		userHex = userRGB.hex();

	$body.css('background-color', "#" + userHex);
}


