function computeSvgScale(imWidth, imHeight, divWidth, divHeight) {

	// dWidth = divWidth - imWidth;
	// dHeight = divHeight - imHeight;

	scaleWidth = divWidth / imWidth;
	scaleHeight = divHeight / imHeight;
	return Math.min(scaleWidth, scaleHeight);

}

function GIS(div_class) {
	var width = 960,
	  height = 600;

	var scale = computeSvgScale(width, height,
					document.getElementsByClassName(div_class)[0].clientWidth, 
					document.getElementsByClassName(div_class)[0].clientHeight)
	console.log("div class: " + div_class)
	console.log("div size: " + document.getElementsByClassName(div_class)[0].clientWidth + ', ' +  document.getElementsByClassName(div_class)[0].clientHeight)
	console.log('scale: ' + scale)

	var svg = d3.select("svg.map")
				.style("width", width*scale + 'px')
				.style("height", height*scale + 'px')
				// .style("border", "1px solid red")
				.style("position", "absolute");

	d3.select("canvas.inner")
	 	.attr("width", width + "px")
	 	.attr("height", height + "px")
	 	.style("position", "absolute");
//	 	.style("border", "3 px solid green");

	svg.select("image.bg")
	   .style("width", "100%")
	   .style("height", "100%");
	
	svg.select("image.fg")
       .style("width", "100%")
       .style("height", "100%")
       .style("opacity", 1);

	     cursor = svg.append("circle")
	  .attr("r", scale*10)
	  .attr("visibility", "hidden")
	  .attr("class", "cursor")
	  .style("stroke-width", scale*4 + 'px');

	 d3.select("div.tooltip").style("opacity", 0);


	ctx = document.getElementById("myCanvas").getContext('2d');
	ctx.scale(scale, scale)
	ctx.rect(0,0,960,600);
	ctx.lineWidth = "2";
	ctx.strokeStyle ="blue"
	ctx.stroke();


	d3.json("https://crossorigin.me/https://itaikatz.github.io/assets/posts/RF_prop_sim/costarica_min_topo.txt", function(error, data) {
		var costarica = topojson.object(data, data.objects.costarica);

		var projection = d3.geoAlbers()
    					   .center([0, 9.7])
    					   .rotate([84.2,0])
    					   .parallels([8, 11.5])
						    //.scale(10200)
						   .scale(12240)
						   .translate([width / 2, height / 2]);

	    var path = d3.geoPath()
		             .projection(projection);

		svg.selectAll(".cr-subunit")
			.data(costarica.geometries)
			.enter().append("path")
			.attr("id", function(d) { return "CRI"; })
			.attr("d", path)
			.attr("transform", "scale(" + scale + ")");

		svg.append("clipPath")
			.attr("id", "clip")
			.append("use")
			.attr("xlink:href", "#CRI");

		svg.select("image.fg")
			.attr("clip-path", "url(#clip)")
			.style("opacity", 1);
	});

	var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://crossorigin.me/https://itaikatz.github.io/assets/posts/RF_prop_sim/relief.tiff", true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function(e) {
    	var tiff = GeoTIFF.parse(this.response);
        var image = tiff.getImage();
        var array = image.readRasters({interleave: true});

		var timeout;
		var tooltip = d3.select("div.tooltip");

        svg.on("mousemove", function() {
		console.log("mousemove");
          var x = d3.mouse(this)[0],
          	  y = d3.mouse(this)[1];
          var xScaled = Math.round((1.0/scale) * x),
              yScaled = Math.round((1.0/scale) * y);

          cursor.attr("cx", x)
                .attr("cy", y)
                .attr("visibility", "visible");
              
          clearTimeout(timeout);
          tooltip.transition().duration(100).style("opacity", 0);   

          timeout = setTimeout(function() {
		console.log("mousemove timeout");  
	        var idx = Math.round(yScaled)*width + Math.round(xScaled);
	        var altitude = Math.max(array[idx], 0);
	        tooltip.transition().duration(200).style("opacity", .9);
	        tooltip.html('<i class="fa fa-arrows-v" aria-hidden="true"></i> ' + altitude + ' m')
	            .style("left", x + "px")     
	            .style("top", (y-50) + "px");    
	          
	        }, 500);
    	});

    	svg.on("mouseout", function() {
    		clearTimeout(timeout);
    		cursor.attr("visibility", "hidden");
    		tooltip.attr("visibility", "hidden");
    	});

    	svg.on("click", function() {
	        var x = d3.mouse(this)[0],
          	    y = d3.mouse(this)[1];
	        var xScaled = Math.round((1.0/scale) * x),
                yScaled = Math.round((1.0/scale) * y);

            ctx.beginPath();
            ctx.arc(xScaled, yScaled, scale*20, 0, 2*Math.PI);
            ctx.stroke();    
    	})

    }    
    xhr.send();


}

function Kernel() {
	this.id = "[base] Kernel";
	this.extent = 100;
	this.size = 2*this.extent+1;

	this.whoami = function() {
		console.log("I am a " + this.id);
	}
}

function DistanceKernel() {
	Kernel.call(this);

	this.id = "DistanceKernel";
}

function TerrainKernel() {
	Kernel.call(this);

	this.id = "TerrainKernel";
}

k1 = new Kernel();
k2 = new DistanceKernel();
k3 = new TerrainKernel();

k1.whoami();
k2.whoami();
k3.whoami();

  // function DistanceKernel(extent, sigma, amplitude) {
  //   var t0 = performance.now();
    
  //   this.sigma = sigma;
  //   this.extent = extent;
  //   this.size = 2*extent+1; // length of one side of the kernel, in pixels
  //   this.amplitude = amplitude;
  //   this.buffer = new Float32Array(Math.pow(this.size, 2)); 
  //   this.id = "DistanceKernel";
   
  //   centerPos = this.extent*this.size + this.extent;
  //   centerX = centerPos % this.size;
  //   centerY = Math.floor(centerPos / this.size);

  //   for( i=0; i < this.buffer.length; i++ ) {
  //     localX = i % this.size;
  //     localY = Math.floor(i / this.size);
  //     var dist = Math.sqrt(Math.pow(localX-centerX, 2) + Math.pow(localY-centerY, 2));

  //     this.buffer[i] = Math.pow(0.98, dist);
  //   }
  //   var t1 = performance.now();
  //   // console.log('distance kernel creation time: ' + (t1-t0))

  //   this.compute = function(x, y) {
  //     return this.buffer;
  //   }
  // }

  function RFmap(  kernel, ctx ) {    // Maintains a map of signal strength
    this.width       = ctx.canvas.clientWidth;
    this.height      = ctx.canvas.clientHeight;
    this.kernel      = kernel;
    this.strengthMap = new Float32Array(width * height);
    this.colorMap    = new Uint8ClampedArray(width * height * 4);  

    // Initialize
    this.ctx   = ctx;
    this.idata = ctx.createImageData(width, height);      // create imageData object
    this.sources = []
    this.id = 0;

    var colorScale = d3.scaleLinear()
                        .domain([1, 0.7, 0.45, 0.35, 0])
                        .range(["red", "orange" ,"yellow", "green", "blue"]);

    var alphaScale = d3.scaleLinear()
                        .domain([1, .2, 0.11])
                        .range([200, 200, 0]);

    this.changeKernel = function(kernel) {
      this.kernel = kernel;
      this.updateStrength();
      this.updateColor();
      console.log('Kernel updated')

      return this;
    }

  // function wait(ms) {
  //     var d = new Date();
  //     var d2 = null;
  //     do { d2 = new Date(); }
  //     while(d2-d < ms);
  // }

    // this.interpolate = function() {
    //   // start/end
    //   var x1 = d3.scaleLinear().domain([0,1]).range([100,200]);
    //   var y1 = d3.scaleLinear().domain([0,1]).range([100,200]);

    //   s1 = this.addSource(100,100);
    //   for( var i=0; i <= 1; i+=.1) {
    //     // update
    //     idx1 = this.sources.find( function(value) {return value.id === s1; })
    //     console.log('id: ' + s1 + ', ' + idx1.id)
    //     idx1.x = x1(i);
    //     idx1.y = y1(i);
    //     console.log(idx1.x + ", " + idx1.y)

    //     // draw
    //     this.updateStrength();
    //     this.updateColor();

    //     // wait
    //     wait(100);


    //   }

    // }

    this.addSource = function( x_offset, y_offset ) {
      this.id += 1;
      console.log('add source: ' + x_offset + ', ' + y_offset)
      this.sources.push({ x: (1.0/scale)*x_offset, y: (1.0/scale)*y_offset, id: this.id });
      this.updateStrength();
      this.updateColor();

      return this.id;
    }

    this.removeSource = function(idx) {
      for( var i=this.sources.length - 1; i >= 0; i-- ) {
        if( this.sources[i].id == idx ) {
          this.sources.splice(i,1);
          break;
        }
      }
      this.updateStrength();
      this.updateColor();

    }

    this.updateStrength = function() {
      var t0 = performance.now();
      this.strengthMap = new Float32Array(width * height);
      for(idx = 0; idx < this.sources.length; idx++) {
        
        var i = 0;
        var source = this.sources[idx];
        var kernBuffer = this.kernel.compute(source.x, source.y);
        
        for(var y = -this.kernel.extent; y <= this.kernel.extent; y++) {
        for(var x = -this.kernel.extent; x <= this.kernel.extent; x++) {
          var pos = ((y+source.y) * width + (x+source.x)); // position in buffer based on x and y
          if( kernBuffer[i] > this.strengthMap[pos] ) this.strengthMap[pos] = kernBuffer[i];        
          i++;
        }
        }
      }
      var t1 = performance.now();
      console.log('updateStrength time: ' + (t1-t0))
    }

    this.getColor = function(x,y) {
        var posC = (y * width + x) * 4;
        var posS = (y * width + x)
        return [this.colorMap[posC], this.colorMap[posC+1], this.colorMap[posC+2], this.strengthMap[posS]];
    }

    this.updateColor = function() {
      var t0 = performance.now();

      this.colorMap = new Uint8ClampedArray(width * height * 4);
      for(idx = 0; idx < this.sources.length; idx++) {
        
        var source = this.sources[idx];
        
        for(var y = -this.kernel.extent; y <= this.kernel.extent; y++) {
        for(var x = -this.kernel.extent; x <= this.kernel.extent; x++) {
          var posC = ((y+source.y) * width + (x+source.x)) * 4;  // position in    colormap based on x and y
          var posS = ((y+source.y) * width + (x+source.x));      // position in strengthmap based on x and y
          var color = d3.color(colorScale(this.strengthMap[posS]));
          var alpha = alphaScale(this.strengthMap[posS]);
          this.colorMap[posC  ] = color.r;          // some R value [0, 255]
          this.colorMap[posC+1] = color.g;             // some G value
          this.colorMap[posC+2] = color.b;             // some B value
          this.colorMap[posC+3] = alpha;           // set alpha channel
          }
        }
      }
      this.idata.data.set(this.colorMap);
      this.ctx.putImageData(this.idata, 0, 0);

      var t1 = performance.now();
      console.log('updateColor time: ' + (t1-t0))
      }
  }
 
