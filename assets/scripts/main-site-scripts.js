const currentMonth = `moment().format("MMMM") moment().format("YYYY")`;

//Modal Script
function openModal() {
  document.getElementById("nav-modal").style = "height: 100%; position: fixed;";
  document.getElementById("nav-modal-footer").style = "transition-property: visibility; transition-delay: 0.95s; visibility: visible";
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById("nav-modal").style.height = "0%";
  document.getElementById("nav-modal-footer").style = "visibility: hidden"
  document.body.style.overflow = 'visible';
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
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 970,
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


$(".gig-listing").filter(function() {
    return !$.trim($(this).text());
}).parent().hide();



