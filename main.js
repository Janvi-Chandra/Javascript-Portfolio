/** 
 * ===================================================================
 * main js
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

})(jQuery);

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = inputField.value;

  // Clear input field
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);

  // Generate chatbot response
  const response = generateResponse(input);

  // Add chatbot response to conversation
  message = document.createElement('div');
  message.classList.add('chatbot-message','chatbot');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
  conversation.appendChild(message);
  message.scrollIntoView({behavior: "smooth"});
});

// Generate chatbot response function
function generateResponse(input) {
    // Initialize response variable
    let response;

    // Determine response based on user input
    if (input.toLowerCase().includes("programming languages")) {
        response = "I'm proficient in HTML5, CSS3, JavaScript, and popular frameworks like React.js. I also have experience with web designing and prototyping using Figma";
    } else if (input.toLowerCase().includes("ui/ux design") || input.toLowerCase().includes("experience")) {
        response = "I have extensive experience in creating intuitive user interfaces and engaging user experiences. I focus on user research, wireframing, prototyping, and conducting usability tests to ensure optimal design solutions.";
    } else if (input.toLowerCase().includes("design tools")) {
        response = "I primarily use tools like Adobe XD, Sketch, and Figma for designing prototypes and mockups. These tools allow me to efficiently create and iterate on designs while collaborating with team members.";
    } else if (input.toLowerCase().includes("responsive web design")) {
        response = "I approach responsive web design by using a mobile-first approach, ensuring that the website looks great and functions well on all devices, from smartphones to desktops. I utilize media queries and flexible grids to adapt the layout and content based on screen size.";
    } else if (input.toLowerCase().includes("projects")) {
        response = "Certainly! Some of the projects I've worked on include designing e-commerce platforms, creating interactive web applications, and revamping corporate websites for improved user experience. You can explore my portfolio section to see detailed case studies and project highlights.";
    } else if (input.toLowerCase().includes("latest design trends")) {
        response = "I stay updated by regularly reading design blogs, following industry leaders on social media, and participating in online courses and workshops. Additionally, I attend design conferences and meetups to network with fellow professionals and exchange ideas.";
    } else if (input.toLowerCase().includes("design philosophy")) {
        response = "My design philosophy revolves around creating designs that are not only visually appealing but also functional and user-centric. I believe in simplicity, clarity, and empathy towards the end user, aiming to deliver seamless experiences that meet both user needs and business goals.";
    } else if (input.toLowerCase().includes("feedback and iterate")) {
        response = "I welcome feedback as an opportunity for improvement. I gather feedback from stakeholders, users, and team members through various channels such as user testing sessions and design critiques. I then analyze the feedback, prioritize changes, and iterate on designs to refine them further.";
    } else if (input.toLowerCase().includes("accessibility")) {
        response = "Yes, accessibility is a crucial aspect of my design process. I ensure that websites I design are compliant with WCAG standards, making them accessible to users with disabilities. I implement features like semantic HTML, proper contrast ratios, and keyboard navigation to enhance accessibility.";
    } else if (input.toLowerCase().includes("collaboration")) {
        response = "Collaboration is key to successful project delivery. I maintain open communication with developers and product managers throughout the design process, ensuring alignment on goals and requirements. I provide detailed design specifications and actively participate in discussions to address any implementation challenges and ensure the final product meets everyone's expectations.";
    } else {
        response = "Wow that's great question, let me get back to you with the answer in a while. Is there anything else I can help with?";
    }

    // Return the response
    return response;
}

function toggleChatbot() {
	const chatbot = document.getElementById('chatbot');
	chatbot.style.display = chatbot.style.display === 'none' ? 'block' : 'none';
  }
  
  