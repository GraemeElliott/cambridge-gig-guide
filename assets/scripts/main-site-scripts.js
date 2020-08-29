const currentMonth = `moment().format("MMMM") moment().format("YYYY")`;

//Flash messages dissapear
setTimeout(function() {
  $('.alert-error').fadeOut('slow');
  $('.alert-success').fadeOut('slow');
}, 3000);

//Modal Script

function openModal() {
  document.getElementById("nav-modal").style = "height: 100%; position: fixed;";
  document.getElementById("nav-modal-gigs").style = "transition-property: visibility; transition-delay: 0.9s; visibility: visible";

  document.getElementById("nav-modal-venues").style = "transition-property: visibility; transition-delay: 0.9s; visibility: visible";

  document.getElementById("nav-modal-contact").style = "transition-property: visibility; transition-delay: 0.9s; visibility: visible";

  document.getElementById("nav-modal-sm").style = "transition-property: visibility; transition-delay: 0.9s; visibility: visible";

  document.getElementById("nav-modal-footer").style = "transition-property: visibility; transition-delay: 0.9s; visibility: visible";

  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById("nav-modal").style.height = "0%";
  document.getElementById("nav-modal-gigs").style = "visibility: hidden"
  document.body.style.overflow = 'visible';

  document.getElementById("nav-modal-venues").style = "visibility: hidden"
  document.body.style.overflow = 'visible';

  document.getElementById("nav-modal-contact").style = "visibility: hidden"
  document.body.style.overflow = 'visible';

  document.getElementById("nav-modal-sm").style = "visibility: hidden"
  document.body.style.overflow = 'visible';

  document.getElementById("nav-modal-footer").style = "visibility: hidden"
  document.body.style.overflow = 'visible';
}

//Carousel Scripts

$(document).ready(function(){
  $('.gig-grid-nr').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    arrows: true,
    asNavFor: '.gig-panel-nr',

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
    centerMode: true,
    focusOnSelect: true,
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
  centerMode:true,
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
