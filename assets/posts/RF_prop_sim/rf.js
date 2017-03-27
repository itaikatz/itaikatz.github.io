function computeSvgScale(imWidth, imHeight, divWidth, divHeight) {

	// dWidth = divWidth - imWidth;
	// dHeight = divHeight - imHeight;

	scaleWidth = divWidth / imWidth;
	scaleHeight = divHeight / imHeight;
	return Math.min(scaleWidth, scaleHeight);

}

function GIS(div_class, updateTableFunc, path_file, relief_file ) {
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
	// ctx.rect(0,0,960,600);
	// ctx.lineWidth = "2";
	// ctx.strokeStyle ="red"
	// ctx.stroke();

	d3.json(path_file, function(error, data) {
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
	xhr.open('GET', relief_file, true);
    xhr.responseType = 'arraybuffer';

    var distKernel = new DistanceKernel(); // extent, sigma, amplitude  
// terrainKernel = new TerrainKernel(array, {'x':960, 'y':600}); // extent, heightmap, heightmap dimensions
  	var terrainKernel = new TerrainKernel(); // extent, heightmap, heightmap dimensions
    var rfmap = new RFmap(scale, ctx, terrainKernel);

    xhr.onload = function(e) {
    	var tiff = GeoTIFF.parse(this.response);
        var image = tiff.getImage();
        var array = image.readRasters({interleave: true});

    	terrainKernel.setHeightmap(array);
    	terrainKernel.setHeightmapSize( {'x':width, 'y':height } );
      //  var rfmap = new RFmap(scale, terrainKernel, ctx);


		var timeout;
		var tooltip = d3.select("div.tooltip");

        svg.on("mousemove", function() {
			tooltip.attr("visibility", "visible");
	      var x = d3.mouse(this)[0],
          	  y = d3.mouse(this)[1];
          var xScaled = Math.round((1.0/scale) * x),
              yScaled = Math.round((1.0/scale) * y);

          cursor.attr("cx", x)
                .attr("cy", y)
                .attr("visibility", "visible");
              
          clearTimeout(timeout);
//          tooltip.transition().duration(100).style("opacity", 0);   

          timeout = setTimeout(function() {
	 
	        var idx = Math.round(yScaled)*width + Math.round(xScaled);
	        var altitude = Math.max(array[idx], 0);
	        tooltip.transition().duration(200).style("opacity", .9);
	        tooltip.html('<i class="fa fa-arrows-v" aria-hidden="true"></i> ' + altitude + ' m')
	            .style("left", (x+5) + "px")     
	            .style("top", (y-40) + "px");    
	          
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

            source_id = rfmap.addSource(xScaled, yScaled);
            updateTableFunc(source_id, xScaled, yScaled);
    	})



    }    
    xhr.send();

	this.changeKernel = function(kernelName) {
		if( kernelName=="Distance" ) {
    		rfmap.changeKernel(distKernel);
		}
		else if( kernelName=="Terrain" ) {
			rfmap.changeKernel(terrainKernel);
		}
	}
	this.removeSource = function(id) {
		rfmap.removeSource(id);
	}

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
	this.buffer = new Float32Array(Math.pow(this.size, 2)); 

	centerPos = this.extent*this.size + this.extent;
    centerX = centerPos % this.size;
    centerY = Math.floor(centerPos / this.size);

    for( i=0; i < this.buffer.length; i++ ) {
      localX = i % this.size;
      localY = Math.floor(i / this.size);
      var dist = Math.sqrt(Math.pow(localX-centerX, 2) + Math.pow(localY-centerY, 2));

      this.buffer[i] = Math.pow(0.98, dist);
  	}

  	this.compute = function(x, y) {
      return this.buffer;
    }
}

  function TerrainKernel(heightmap, heightmapSize) {
  	Kernel.call(this);

    this.bresenham = [];
	this.id = "TerrainKernel";
    this.buffer = new Float32Array(Math.pow(this.size, 2));

//    this.heightmap = heightmap;
 //   this.heightmapSize = heightmapSize;
 	heightmap ? this.heightmap = heightmap : this.heightmap = [];
 	heightmapSize ? this.heightmapSize = heightmapSize : this.heightmapSize = [];


    this.setHeightmap = function(heightmap) {
    	this.heightmap = heightmap;
    }

    this.setHeightmapSize = function(heightmapSize) {
    	this.heightmapSize = heightmapSize;
    }

    this.precomputeBresenham = function(x0, y0, x1, y1) {
      var path = [];

      var dx = Math.abs(x1-x0);
      var dy = Math.abs(y1-y0);
      var sx = (x0 < x1) ? 1 : -1;
      var sy = (y0 < y1) ? 1 : -1;
      var err = dx-dy;

      while(true){
        currIdx = y0*this.size+x0;
        path.push(currIdx);

        if ((x0==x1) && (y0==y1)) break;
        var e2 = 2*err;
        if (e2 >-dy){ err -= dy; x0  += sx; }
        if (e2 < dx){ err += dx; y0  += sy; }
      }
   
      return path;
    }

    for( x=0; x<this.size; x++ ) {
    for( y=0; y<this.size; y++ ) {
      var pos = y*this.size + x;
      this.bresenham[pos] = this.precomputeBresenham(this.extent, this.extent, x,y);
    }
    }
 
    this.compute = function(x, y) {
      var t0 = performance.now();

      // Get ROI of heightmap
      var i=0;
      var maxh = 0;
      var height = new Int16Array(this.size * this.size);
      for( y_ = y-this.extent; y_ <= y+this.extent; y_++) {
      for( x_ = x-this.extent; x_ <= x+this.extent; x_++) {
        pos = y_*this.heightmapSize.x + x_;
        height[i] = this.heightmap[pos];
        if( height[i] > maxh ) maxh = height[i];
        i++
      }
      }

      centerPos = this.extent*this.size + this.extent;
      centerX = centerPos % this.size;
      centerY = Math.floor(centerPos / this.size);
   
      var h0 = height[this.extent*this.size + this.extent];
      h0 = Math.max(h0, 0); // ocean (and no data) is coded as -32768

      for( i=0; i < this.bresenham.length; i++ ) {
        localX = i % this.size;
        localY = Math.floor(i / this.size);
        var dist = Math.sqrt(Math.pow(localX-centerX, 2) + Math.pow(localY-centerY, 2));

        // Line-of-sight version       
        var h1 = height[i];
        h1 = Math.max(h1, 0); // ocean (and no data) is coded as -32768
        var slope = (h1-h0) / this.bresenham[i].length;
        var currHeight = h0;
        var aboveGrade = belowGrade = 0;

        for( j=0; j < this.bresenham[i].length; j++ ) {
          if( height[this.bresenham[i][j]] > currHeight ) {
            belowGrade++;
          } else {
            aboveGrade++           
          }
          currHeight += slope;
        }  
        var aboveGradeNorm = dist * (aboveGrade / this.bresenham[i].length); 
        var belowGradeNorm = dist * (belowGrade / this.bresenham[i].length); 

	    this.buffer[i] = Math.pow(.98, aboveGradeNorm) * Math.pow(.96, belowGradeNorm);

      }

      // return this.buffer;
      var t1 = performance.now();
      console.log('terrain kernel compute time: ' + (t1-t0))
      return this.buffer; 

    }

  }

  function RFmap( scale, ctx, kernel ) {    // Maintains a map of signal strength
    this.width       = ctx.canvas.clientWidth;
    this.height      = ctx.canvas.clientHeight;
    this.kernel      = kernel;
    this.scale       = scale;
    this.strengthMap = new Float32Array(this.width * this.height);
    this.colorMap    = new Uint8ClampedArray(this.width * this.height * 4);  
    
    // Initialize
    this.id = 0;
    this.ctx   = ctx;
    this.idata = ctx.createImageData(this.width, this.height);      // create imageData object
    this.sources = []

    console.log('canvas size: ' + this.width + ', ' + this.height)

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

    this.addSource = function( x_offset, y_offset ) {
      console.log('add source: ' + x_offset + ', ' + y_offset)

      this.id += 1;
      this.sources.push({ x: x_offset, y: y_offset, id: this.id });
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
      this.strengthMap = new Float32Array(this.width * this.height);
      for(idx = 0; idx < this.sources.length; idx++) {

        var i = 0;
        var source = this.sources[idx];
        var kernBuffer = this.kernel.compute(source.x, source.y);
        
        for(var y = -this.kernel.extent; y <= this.kernel.extent; y++) {
        for(var x = -this.kernel.extent; x <= this.kernel.extent; x++) {
          var pos = ((y+source.y) * this.width + (x+source.x)); // position in buffer based on x and y
          if( kernBuffer[i] > this.strengthMap[pos] ) this.strengthMap[pos] = kernBuffer[i];        
          i++;
        }
        }
      }
      var t1 = performance.now();
      console.log('updateStrength time: ' + (t1-t0))
    }

    this.getColor = function(x,y) {
        var posC = (y * this.width + x) * 4;
        var posS = (y * this.width + x)
        return [this.colorMap[posC], this.colorMap[posC+1], this.colorMap[posC+2], this.strengthMap[posS]];
    }

    this.updateColor = function() {
      var t0 = performance.now();

      this.colorMap = new Uint8ClampedArray(this.width * this.height * 4);
      for(idx = 0; idx < this.sources.length; idx++) {
        
        var source = this.sources[idx];
        
        console.log('---------')
        console.log(this.kernel.extent)
		console.log(source.x + ', ' + source.y)
        console.log(-this.kernel.extent + source.x + ', ' + (this.kernel.extent + source.x))
      	console.log(-this.kernel.extent + source.y + ', ' + (this.kernel.extent + source.y))
        console.log('---------')

        for(var y = -this.kernel.extent; y <= this.kernel.extent; y++) {
        for(var x = -this.kernel.extent; x <= this.kernel.extent; x++) {
	          var posC = ((y+source.y) * this.width + (x+source.x)) * 4;  // position in    colormap based on x and y
	          var posS = ((y+source.y) * this.width + (x+source.x));      // position in strengthmap based on x and y
	          var color = d3.color(colorScale(this.strengthMap[posS]));
	          var alpha = alphaScale(this.strengthMap[posS]);
	          this.colorMap[posC  ] = color.r;          // some R value [0, 255]
	          this.colorMap[posC+1] = color.g;             // some G value
	          this.colorMap[posC+2] = color.b;             // some B value
	          this.colorMap[posC+3] = alpha;           // set alpha channel
          }
        }
      }
//      this.idata.data.set(this.colorMap);
 //     this.ctx.putImageData(this.idata, 0, 0);
	var t1 = performance.now();
	var newCanvas = document.createElement('canvas')
	newCanvas.width = this.idata.width;
	newCanvas.height = this.idata.height;

	this.idata.data.set(this.colorMap)
	newCanvas.getContext("2d").putImageData(this.idata, 0, 0);

	//this.ctx.scale(this.scale, this.scale);
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.ctx.drawImage(newCanvas, 0, 0);

      var t2 = performance.now();
      console.log('canvas update time: ' + (t2-t1))
      console.log('total updateColor time: ' + (t2-t0))
      }
  }
 
