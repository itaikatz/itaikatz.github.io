var jsonCircles = [
   { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
   { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
   { "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}];
 
var svgContainer = d3.select("#lsbSliderDiv").append("svg")
                                     .attr("width", 200)
                                     .attr("height", 200)
                                     .attr("style", "background-color:blue; position:absolute; top:0; left:0");

var rectangle = svgContainer.append("rect")
    .attr("x", 10)
    .attr("y", 95)
    .attr("width", 10)
    .attr("height", 20)
    .style({'stroke':'rgb(128,128,128)', 'stroke-width': '3'});
    //style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"

$("#lsbSlider").foundation({
  slider: {
    on_change: function(){    	
    	
    	var val = $("#lsbSlider").attr('data-slider');
    	var path = $("#lsbSliderImage").attr("src");
    	path = path.substring(0, path.lastIndexOf("/")+1); 
    	$("#lsbSliderImage").attr("src", path + "lena_" + val + ".jpg")    	

		d3.select('#lsbSliderSource').style('border', val + 'px solid white');
		switch(val) {
			case '1':
				$('#lsbSliderNotes').text('This is the original LSB algorithm that uses seven bit source target and one bit of secret data. To the eye it appears identical to the original target image.');
				break;
			case '2':
			case '3':
			case '4':
				$('#lsbSliderNotes').text('Using 2, 3, or 4 bits of secret data we still get an excellent result. With a good monitor and a sharp eye you might detect a slight difference from the original, but nothing that wouldn\'t pass a cursory inspection');
				break;
			case '5':
				$('#lsbSliderNotes').text('5 bits');
				break;
			case '6':
				$('#lsbSliderNotes').text('6 bits');
				break;			
			case '7':
				$('#lsbSliderNotes').text('7 bits');
				break;
			case '8':
				$('#lsbSliderNotes').text('8 bits');
				break;
			default:
				break;    
		} 

    	//rectangle.transition()
    	//		 .attr('width', 15*val);

		//console.log(path + "lena_" + val + ".jpg");
    	//console.log(val);
    }
  }
});


/*
$(document).foundation({
  accordion: {
    // specify the class used for accordion panels
    content_class: 'content',
    // specify the class used for active (or open) accordion panels
    active_class: 'active',
    // allow multiple accordion panels to be active at the same time
    multi_expand: false,
    // allow accordion panels to be closed by clicking on their headers
    // setting to false only closes accordion panels when another is opened
    toggleable: true
  }
});
*/

d3.selection.prototype.position = function() {

    var el = this.node();
    var elPos = el.getBoundingClientRect();
    var vpPos = getVpPos(el);

    function getVpPos(el) {
        if(el.parentElement.tagName === 'svg') {
            return el.parentElement.getBoundingClientRect();
        }
        return getVpPos(el.parentElement);
    }

    return {
        top: elPos.top - vpPos.top,
        left: elPos.left - vpPos.left,
        width: elPos.width,
        bottom: elPos.bottom - vpPos.top,
        height: elPos.height,
        right: elPos.right - vpPos.left
    };

};