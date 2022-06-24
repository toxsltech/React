$(document).ready(function () {
  //HamBurger
  var forEach = function (t, o, r) {
    if ("[object Object]" === Object.prototype.toString.call(t))
      for (var c in t)
        Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
    else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t);
  };
  var hamburgers = document.querySelectorAll(".hamburger");
  if (hamburgers.length > 0) {
    forEach(hamburgers, function (hamburger) {
      hamburger.addEventListener(
        "click",
        function () {
          this.classList.toggle("is-active");
        },
        false
      );
    });
  }



  $(document).ready(function () {
    $(".button-menu-mobile").click(function () {
      $(".left-side-menu").toggleClass('showsidebar');
    });
  });


  //WOW
  new WOW().init();

  //padding-top
  $(".inner-page").css("padding-top", $("#main-header").height() + "px");

  $(".navbar-toggler").click(function () {
    $("#navbarNav").toggleClass("menu-show");
    $(this).toggleClass("collapsed");
    $("body").toggleClass("menu-open");
  });

  var equalWidthHeight = $(".equal-wh").width();
  $(".equal-wh").css({ "min-height": equalWidthHeight + "px" });

  $("#trending-slider").owlCarousel({
    loop: false,
    nav: true,
    dots: false,
    margin: 20,
    left: true,
    stagePadding: 50,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      767: {
        items: 3,
        stagePadding: 0,
        responsiveClass: false,
      },
      1000: {
        items: 5,
        stagePadding: 0,
        responsiveClass: false,
      },
      1366: {
        items: 6,
        stagePadding: 0,
        responsiveClass: false,
      },
    },
  });
  $("#gallery-slider").owlCarousel({
    loop: false,
    nav: true,
    dots: true,
    margin: 20,
    left: true,
    stagePadding: 50,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 1,
      },
      767: {
        items: 1,
        stagePadding: 0,
        responsiveClass: false,
      },
      1000: {
        items: 1,
        stagePadding: 0,
        responsiveClass: false,
      },
      1366: {
        items: 1,
        stagePadding: 0,
        responsiveClass: false,
      },
    },
  });

  $(".owl-prev").html('<i class="fa fa-chevron-left"></i>');
  $(".owl-next").html('<i class="fa fa-chevron-right"></i>');
});

$(window).scroll(function () {
  //padding-top
  $(".inner-page").css("padding-top", $("#main-header").height() + "px");

  //Top
  $(".nav-item.dropdown .dropdown-menu").css(
    "top",
    $("#main-header").height() + "px"
  );
});

$(window).resize(function () {
  //padding-top
  $(".inner-page").css("padding-top", $("#main-header").height() + "px");

  //Top
  $(".nav-item.dropdown .dropdown-menu").css(
    "top",
    $("#main-header").height() + "px"
  );

  var equalWidthHeight = $(".equal-wh").width();
  $(".equal-wh").css({ "min-height": equalWidthHeight + "px" });
});

// $(document).ready(function () {
//   $(".multi-field-wrapper").each(function () {
//     var $wrapper = $(".multi-fields", this);
//     $(".add-field", $(this)).click(function (e) {
//       $(".multi-field:first-child", $wrapper)
//         .clone(true)
//         .appendTo($wrapper)
//         .find("input")
//         .val("")
//         .focus();
//     });
//     $(".multi-field .remove-field", $wrapper).click(function () {
//       if ($(".multi-field", $wrapper).length > 1)
//         $(this).parent(".multi-field").remove();
//     });
//   });
// });
/*
$("multi-field").each(function () {
  alert("here");
  var $wrapper = $(".multi-fields", this);
  $(".add-field", $(this)).click(function (e) {
    $(".multi-field:first-child", $wrapper)
      .clone(true)
      .appendTo($wrapper)
      .find("input")
      .val("")
      .focus();
  });
  $(".multi-field .remove-field", $wrapper).click(function () {
    if ($(".multi-field", $wrapper).length > 1)
      $(this).parent(".multi-field").remove();
  });
});
 */
