//Modal Script

function openNav() {
  document.getElementById("nav-modal").style = "height:100%; position: fixed; overflow: hidden;";
}

function closeNav() {
  document.getElementById("nav-modal").style.height = "0%";
}



$(document).ready(function(){
  $('.gig-grid-x4').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: '.gig-panel',
    centerMode: true,
    centerPadding: '40px',
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $('.gig-panel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.gig-grid-x4'
});
});

