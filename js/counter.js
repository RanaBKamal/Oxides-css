function Counter(){
	this.flag=1;
	this.counterElement;
	this.totalLength;
	this.count = [];
	this.finalCount = [4,6,4,2];
	var that = this;
	this.initialize = function(){
		that.counterELement =  document.getElementsByClassName('employee-number');
		that.totalLength = that.counterELement.length;
		window.onscroll = function(){
		  	for(var i = 0 ; i<4;i++){
			  	that.count[i]=0;
		  	}
		  	that.counterNumbers();
	  	}
	  	this.counterNumbers = function(){
		  	var intervalId;
		  	if(window.scrollY > 610 && that.flag!=0){
			  	intervalId = setInterval(function(){
				  	for (var i = 0; i < that.counterELement.length; i++) {
					  	if (that.count[i] <= that.finalCount[i]) {
						  	that.counterELement[i].innerHTML = that.count[i]++;
					  	}
				  	}
				  	if (that.count[0] > that.finalCount[0] && 
				  		that.count[1] > that.finalCount[1] && 
				  		that.count[2] > that.finalCount[2] && 
				  		that.count[3] > that.finalCount[3]) {
					  	that.flag=0;
					  	clearInterval(intervalId);
				  	}
			  	},800);
		  	}
	  	}
	}
}
var counter = new Counter();
counter.initialize();