//function to animate
function Animator(element) {
  this.el = element;
  var that = this;
  var intervalId;

  this.animate = function(cssProperty, value,duration) {
    var style = window.getComputedStyle(element);
    var initial = style.getPropertyValue(cssProperty);
    initial = parseInt(initial);
    var step = (value - initial) / (duration / 50);
    var counter = 0;
    //using request animation frame for better  animation
    window.requestAnimationFrame(animate);
    function animate(){
      counter++;
      element.style[cssProperty] = parseInt(style.getPropertyValue(cssProperty)) + step + 'px';
      intervalId = requestAnimationFrame(animate);
      if(counter >= duration/50){
        cancelAnimationFrame(intervalId);
      }
    }  
  }

  //to stop the animation
  this.stopAnimation = function(){
    cancelAnimationFrame(intervalId);
  }
}
