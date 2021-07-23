
//
//	Equal height - by Lewi Hussey
//


var matchHeight = function () {

	function init() {
		eventListeners();
		matchHeight();
	}

	function eventListeners() {
		$(window).on('resize', function () {
			matchHeight();
		});
	}

	function matchHeight() {
		var groupName = $('[data-match-height]');
		var groupHeights = [];

		groupName.css('min-height', 'auto');

		groupName.each(function () {
			groupHeights.push($(this).outerHeight());
		});

		var maxHeight = Math.max.apply(null, groupHeights);
		groupName.css('min-height', maxHeight);
	};

	return {
		init: init
	};

}();

$(document).ready(function () {
	matchHeight.init();
});



// Header Sticky
$(window).on("scroll", function () {
	if ($(this).scrollTop() > 150) {
		$(".navbar-custom").addClass("is-sticky");
	} else {
		$(".navbar-custom").removeClass("is-sticky");
	}
});
// // Mean Menu
/* $(".mean-menu").meanmenu({
	meanScreenWidth: "991",
}); */

// Nice Select JS


// Financial Area
/* $(".financial-area").owlCarousel({

// Header Sticky
$(window).on("scroll", function () {
if ($(this).scrollTop() > 150) {
$(".navbar").addClass("is-sticky");
} else {
$(".navbar").removeClass("is-sticky");
}
});
// // Mean Menu
$(".mean-menu").meanmenu({
meanScreenWidth: "991",
});

// Nice Select JS
$("select").niceSelect();

// Financial Area
/* $(".financial-area").owlCarousel({
  items: 1,
  loop: true,
  nav: true,
  autoplay: true,
  autoplayHoverPause: true,
  mouseDrag: true,
  center: false,
  dots: false,
  smartSpeed: 1500,
}); */

// Go to Top
// Scroll Event
$(window).on("scroll", function () {
	var scrolled = $(window).scrollTop();
	if (scrolled > 300) $(".go-top").addClass("active");
	if (scrolled < 300) $(".go-top").removeClass("active");
});

// Click Event
$(".go-top").on("click", function () {
	$("html, body").animate({ scrollTop: "0" }, 500);
});

// FAQ Accordion
$(".accordion")
	.find(".accordion-title")
	.on("click", function () {
		// Adds Active Class
		$(this).toggleClass("active");
		// Expand or Collapse This Panel
		$(this).next().slideToggle("fast");
		// Hide The Other Panels
		$(".accordion-content").not($(this).next()).slideUp("fast");
		// Removes Active Class From Other Titles
		$(".accordion-title").not($(this)).removeClass("active");
	});

// Popup Image
$('a[data-imagelightbox="popup-btn"]').imageLightbox({
	activity: true,
	overlay: true,
	button: true,
	arrows: true,
});

// Popup Video
$('a[data-imagelightbox="video"]').imageLightbox({
	activity: true,
	overlay: true,
	button: true,
});

// HOME TWO JS

// Hero Slider
/* $(".hero-slider").owlCarousel({
	loop: true,
	margin: 0,
	nav: true,
	mouseDrag: false,
	items: 1,
	dots: false,
	autoHeight: true,
	autoplay: true,
	smartSpeed: 1500,
	autoplayHoverPause: true,
	animateOut: "slideOutDown",
	animateIn: "slideInDown",
	navText: [
		"<i class='flaticon-left-arrow-1'></i>",
		"<i class='flaticon-right-arrow-1'></i>",
	],
}); */

//Slider Text Animation
$(".hero-slider-area").on("translate.owl.carousel", function () {
	$(
		".hero-slider-text span, .hero-slider-text h1, .hero-slider-text .typewrite"
	)
		.removeClass("animated fadeInUp")
		.css("opacity", "0");
	$(".hero-slider-text p")
		.removeClass("animated fadeInDown")
		.css("opacity", "0");
	$(".hero-slider-text a")
		.removeClass("animated fadeInDown")
		.css("opacity", "0");
});

$(".hero-slider-area").on("translated.owl.carousel", function () {
	$(
		".hero-slider-text span, .hero-slider-text h1, .hero-slider-text .typewrite"
	)
		.addClass("animated fadeInUp")
		.css("opacity", "1");
	$(".hero-slider-text p").addClass("animated fadeInDown").css("opacity", "1");
	$(".hero-slider-text a").addClass("animated fadeInDown").css("opacity", "1");
});

// FAQ Accordion
$(".accordion")
	.find(".accordion-title")
	.on("click", function () {
		// Adds Active Class
		$(this).toggleClass("active");
		// Expand or Collapse This Panel
		$(this).next().slideToggle("fast");
		// Hide The Other Panels
		$(".accordion-content").not($(this).next()).slideUp("fast");
		// Removes Active Class From Other Titles
		$(".accordion-title").not($(this)).removeClass("active");
	});

// Popup Image
$('a[data-imagelightbox="popup-btn"]').imageLightbox({
	activity: true,
	overlay: true,
	button: true,
	arrows: true,
});

// Popup Video
$('a[data-imagelightbox="video"]').imageLightbox({
	activity: true,
	overlay: true,
	button: true,
});

// HOME TWO JS

// Hero Slider
/* $(".hero-slider").owlCarousel({
	loop: true,
	margin: 0,
	nav: true,
	mouseDrag: false,
	items: 1,
	dots: false,
	autoHeight: true,
	autoplay: true,
	smartSpeed: 1500,
	autoplayHoverPause: true,
	animateOut: "slideOutDown",
	animateIn: "slideInDown",
	navText: [
		"<i class='flaticon-left-arrow-1'></i>",
		"<i class='flaticon-right-arrow-1'></i>",
	],
}); */

//Slider Text Animation
$(".hero-slider-area").on("translate.owl.carousel", function () {
	$(
		".hero-slider-text span, .hero-slider-text h1, .hero-slider-text .typewrite"
	)
		.removeClass("animated fadeInUp")
		.css("opacity", "0");
	$(".hero-slider-text p")
		.removeClass("animated fadeInDown")
		.css("opacity", "0");
	$(".hero-slider-text a")
		.removeClass("animated fadeInDown")
		.css("opacity", "0");
});

$(".hero-slider-area").on("translated.owl.carousel", function () {
	$(
		".hero-slider-text span, .hero-slider-text h1, .hero-slider-text .typewrite"
	)
		.addClass("animated fadeInUp")
		.css("opacity", "1");
	$(".hero-slider-text p")
		.addClass("animated fadeInDown")
		.css("opacity", "1");
	$(".hero-slider-text a")
		.addClass("animated fadeInDown")
		.css("opacity", "1");
});
// Mix JS
// $("#Container").mixItUp();

// Input Plus & Minus Number JS
$(".input-counter").each(function () {
	var spinner = jQuery(this),
		input = spinner.find('input[type="text"]'),
		btnUp = spinner.find(".plus-btn"),
		btnDown = spinner.find(".minus-btn"),
		min = input.attr("min"),
		max = input.attr("max");

	btnUp.on("click", function () {
		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue + 1;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});
	btnDown.on("click", function () {
		var oldValue = parseFloat(input.val());
		if (oldValue <= min) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue - 1;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});
});

// Tabs
$(".tab ul.tabs").addClass("active").find("> li:eq(0)").addClass("current");
$(".tab ul.tabs li a").on("click", function (g) {
	var tab = $(this).closest(".tab"),
		index = $(this).closest("li").index();
	tab.find("ul.tabs > li").removeClass("current");
	$(this).closest("li").addClass("current");
	tab
		.find(".tab_content")
		.find("div.tabs_item")
		.not("div.tabs_item:eq(" + index + ")")
		.slideUp();
	tab
		.find(".tab_content")
		.find("div.tabs_item:eq(" + index + ")")
		.slideDown();
	g.preventDefault();
});

$("#accordion").on("hide.bs.collapse show.bs.collapse", (e) => {
	$(e.target).prev().find("i:last-child").toggleClass("fa-minus fa-plus");
});

$(document).ready(function () {
	$(".editinfo").click(function () {
		$(".savebtn").slideToggle();
	});
});
/* $(document).ready(function () {
	$(".js-select2-multi").select2();
}); */

// This changes the lightbox image to the next or previous
// image by adding an event listener.
("use strict");

var link;
var imageCount = 4;
var regExDigit = /\d+/;

function imageLink() {
	let regExImage = /#image\d+/;
	let image = location.href;

	link = regExImage.exec(image)[0];
	link = regExDigit.exec(link)[0];
}

var next = document.getElementById("next-lightbox");
var prev = document.getElementById("prev-lightbox");

/* next.addEventListener("click", (evt) => {
	evt.preventDefault();
	imageLink();
	let newLinks = Number(link) + 1;
	if (newLinks > imageCount) newLinks = 1;
	location.href = location.href.replace(regExDigit, newLinks);
}); */

/* prev.addEventListener("click", (evt) => {
	evt.preventDefault();
	imageLink();
	let newLink = Number(link) - 1;
	if (newLink < 1) newLink = imageCount;
	location.href = location.href.replace(regExDigit, newLink);
}); */
