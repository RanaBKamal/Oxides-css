function Slider(){
  var that = this;
  
  var sliderWrp = document.getElementsByClassName("slider-wrp")[0];
  var sliderWidth = window.getComputedStyle(sliderWrp);
  this.imgWidth = parseInt(sliderWidth.getPropertyValue('width'));

  this.active = 1;
  this.slider = document.getElementsByClassName("sliderLong")[0];
  this.sliderLong = that.slider.children[0];
  this.slides = that.slider.children;
  this.slideEl = document.getElementById("slideId");

  this.leftclick = document.getElementById("leftArrow");
  this.rightclick = document.getElementById("rightArrow");
  var animator = new Animator(that.slideEl);


  //function to show next image
  this.showNextImage = function(){
    if (that.active != that.slides.length) {
      that.active = that.active == that.slides.length ? that.active = 1 : ++that.active;
      animator.stopAnimation();
      var ml = (that.imgWidth * (that.active-1) * -1);
      animator.animate("margin-left",ml,100);
      that.changeState(that.active, that.slides.length);
    }
  }

  //function to show previous image
  this.showPreviousImage = function(){
    if (that.active != 1) {
      that.active--;
      animator.stopAnimation();
      var ml = (that.imgWidth * (that.active-1) * -1);
      animator.animate("margin-left",ml,100);
      that.changeState(that.active, that.slides.length);
    }
  }

  //here is the left click function
  that.leftclick.onclick = function() {that.showPreviousImage()};
  //here is right click function
  that.rightclick.onclick = function() {that.showNextImage()};


  //function to create navigation button
  this.createNavBar = function(numberOfImg){
    var ul = document.createElement('UL');
    ul.style.width = '100%';
    ul.style.height = 'auto';
    ul.style['list-style'] ="none";

    for (var i = 0; i < numberOfImg; i++) {
      var li1 = document.createElement('li');
      li1.style.float = 'left';
      var div1 = document.createElement('DIV');
      div1.id=i;
      //event listener
      div1.addEventListener('click',function(){
        animator.stopAnimation();
        that.changeState(that.active, that.slides.length);
        that.active = this.id;
        var ml = (that.imgWidth * (that.active) * -1);
        animator.animate("margin-left",ml,100);
      });

      div1.style.width = '9px';
      div1.style.height = '9px';

      if (i == 0) {
        var slideLnav = document.getElementById('leftArrow');
        slideLnav.style.fontSize = '12px';
        slideLnav.style.display = 'none';
        var slideRnav = document.getElementById('rightArrow');
        slideRnav.style.fontSize = '10px';
        slideRnav.innerHTML = (that.slides.length - 1) + '/' + that.slides.length;
        div1.style.background = 'white';
      }
      else{
        div1.style.background = '#bababa';
      }

      //indicator on left-right sides
      div1.style['border-radius'] ='4px';
      div1.style['margin-left'] = '5px';
      li1.appendChild(div1);
      ul.appendChild(li1);
    }

    var myid = document.getElementById('navDiv');
    myid.style.left = (that.imgWidth/2 - (that.slides.length/2) * 8) -14 + 'px';
    myid.appendChild(ul);
  }

  //position navigator
  this.changeState = function(pos,length){
    var navbar = document.getElementById("navDiv");

    //for changing window 
    navbar.style.left = (that.imgWidth/2 - (that.slides.length/2) * 8) -14 + 'px';
    var navul = navbar.children[0];
    var navlist = navul.children;

    //navigation div here
    for (var i = 0; i < that.slides.length; i++) {
      if (i == pos -1 ) {
        navlist[i].children[0].style.background = 'white';
      }
      else{
        navlist[i].children[0].style.background = '#bababa';
      }
    }

    //changing the state of the slide
    var slideLnav = document.getElementById('leftArrow');
    slideLnav.innerHTML = (pos - 1) + '/' + that.slides.length;
    var slideRnav = document.getElementById('rightArrow');
    slideRnav.innerHTML = (that.slides.length - pos) + '/' + that.slides.length;

    //hide or unhide 
    if (pos == that.slides.length) {
      slideRnav.style.display = 'none';
      slideLnav.style.display = 'block';
    }
    else if((pos - 1) == 0){
      slideLnav.style.display = 'none';
      slideRnav.style.display = 'block';
    }
    else{
      slideRnav.style.display = 'block';
      slideLnav.style.display = 'block';
    }
  }

  //navigation function here
  that.createNavBar(that.slides.length);

  that.slide = function(){ 
    //update the window size
    var sliderWidth = window.getComputedStyle(sliderWrp);
    that.imgWidth = parseInt(sliderWidth.getPropertyValue('width')); 

    that.active = that.active == that.slides.length ? that.active = 1 : ++that.active;
    var ml = (that.imgWidth * (that.active-1) * -1);
    animator.animate("margin-left",ml,800);
    that.changeState(that.active, that.slides.length);
  }
  //call it continuosly
  setInterval(that.slide,3000);
}
var slider = new Slider();