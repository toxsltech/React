$(".banner-area").scroll(function () {
  if ($(this).scrollTop() > 150) {
    $(".navbar").addClass("is-sticky");
  } else {
    $(".navbar").removeClass("is-sticky");
  }
});
