//Modal Script
function openModal() {
  document.getElementById("nav-modal").style = "height: 100%; position: fixed;";
}

function closeModal() {
  document.getElementById("nav-modal").style.height = "0%";
}


//Carousel Scrips
$(document).ready(function(){
  $('.gig-grid-nr').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: '.gig-panel-nr',
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
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        }
      }
    ]
  });
  $('.gig-panel-nr').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.gig-grid-nr'
});

$('.gig-grid-ug').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  asNavFor: '.gig-panel-ug',
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
      breakpoint: 970,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
      }
    }
  ]
});
$('.gig-panel-ug').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.gig-grid-ug'
});
});

