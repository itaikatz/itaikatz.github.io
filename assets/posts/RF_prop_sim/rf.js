  var width = 960,
      height = 600;
    
  var projection = d3.geoAlbers()
    .center([0, 9.7])
    .rotate([84.2,0])
    .parallels([8, 11.5])
    //.scale(10200)
    .scale(12240)
    .translate([width / 2, height / 2]);

  var path = d3.geoPath()
    .projection(projection);

   var svg = d3.select("svg.map")
    .attr("width", width)
    .attr("height", height);
/*
  var svg_predictor = d3.select("svg.predictor")
    .attr("width", width)
    .attr("height", height);
*/
   webix.ready(function(){
  
  d3.json("https://crossorigin.me/https://itaikatz.github.io/assets/posts/RF_prop_sim/costarica_min_topo.txt", function(error, data) {
 
    var costarica = topojson.object(data, data.objects.costarica);

    svg.select("image.bg")
//    svg.append("image")
  //    .attr("xlink:href", "https://crossorigin.me/https://itaikatz.github.io/assets/posts/RF_prop_sim/hill-relief.jpg")
      .attr("width", width)
      .attr("height", height);
   //   .attr("class", "bg");

    svg.selectAll(".cr-subunit")
      .data(costarica.geometries)
    .enter().append("path")
      .attr("id", function(d) { return "CRI"; })
      .attr("d", path);


    svg.append("clipPath")
      .attr("id", "clip")
    .append("use")
      .attr("xlink:href", "#CRI");

    svg.select("image.fg")
//    svg.append("image")
      .attr("clip-path", "url(#clip)")
 //     .attr("xlink:href", "https://crossorigin.me/https://itaikatz.github.io/assets/posts/RF_prop_sim/hill-relief.jpg")
      .attr("width", width)
      .attr("height", height);
  //    .attr("class", "fg");

          cursor = svg.append("circle")
              .attr("r", 10)
              .attr("visibility", "hidden")
              .attr("class", "cursor");

      
    // var div = d3.select("body").append("div")   
    //             .attr("class", "tooltip")               
    //             .style("opacity", 0);
    var div = d3.select("div.tooltip").style("opacity", 0);

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    // var canvas2 = document.getElementById('predict');
    // var ctx2 = canvas2.getContext('2d');


      var xhr = new XMLHttpRequest();
      xhr.open('GET', "https://crossorigin.me/https://itaikatz.github.io/assets/posts/RF_prop_sim/relief.tiff", true);
      xhr.responseType = 'arraybuffer';

    

      xhr.onload = function(e) {
        var tiff = GeoTIFF.parse(this.response);
        var image = tiff.getImage();
        var array = image.readRasters({interleave: true});

        var distKernel = new DistanceKernel(100, 40, 1); // extent, sigma, amplitude
  
        var terrainKernel = new TerrainKernel(100, array, {'x':960, 'y':600}); // extent, heightmap, heightmap dimensions
        var rfmap = new RFmap(width, height, terrainKernel, ctx);
 
       // var predictor = new Predictor(svg_predictor);

      //  var rfmap2 = new RFmap(width, height, terrainKernel, ctx2);
      
        var timeout;
        svg.on("mousemove", function() {
          cursor.attr("cx", d3.mouse(this)[0])
                .attr("cy", d3.mouse(this)[1])
                .attr("visibility", "visible");
              


          clearTimeout(timeout);
          div.transition().duration(100).style("opacity", 0);   
          var x = d3.mouse(this)[0],
              y = d3.mouse(this)[1];
          timeout = setTimeout(function() {
            var idx = Math.round(y)*960 + Math.round(x);
            var altitude = Math.max(array[idx], 0);
            div.transition().duration(200).style("opacity", .9);
            div.html('<i class="fa fa-arrows-v" aria-hidden="true"></i> ' + altitude + ' m')
            // div.html("<i class="fa fa-arrows-v" aria-hidden="true"></i> " + array[idx])
                .style("left", x + "px")     
                .style("top", (y-50) + "px");    
              
              console.log(x + ', ' + y + ': ' + array[idx]);
            }, 500);
        })
      
        svg.on("mouseover", function() {
           d3.select(this).style("cursor", "none")
        });
        svg.on("mouseout", function() {
          cursor.attr("visibility", "hidden");
        })


      webix.ui({
        // type:"space", 
        // rows:[
        container:"layout", //corresponds to the ID of the div block 
        cols:[
          { view: "accordion", multi: true, width:400, paddingX: 10, paddingY: 20, rows:[
                    { view: "accordion", multi: true,
          rows:[
                { header:"RF Sources", height:400, body: {
                  type: "template", rows: [
                    {view:"radio", id:"propModel", vertical: true, paddingY: 20,
                    label:"Propagation model:", labelWidth: 200, 
                    value:"Terrain", options:[
                      { "id":"Distance", "value":"Distance" }, // the initially selected item
                      { "id":"Terrain", "value":"Terrain" }
                    ]
                    },


                    {
                      view:"datatable", id:"datatable", select:true, paddingY: 30, scroll: 'y', columns:[
                        { id:"id", header: "ID", width: 50}, {id: "lat", header: "Latitude" }, { id:"lon", header: "Longitude"},
                        // { id:"trash", header:"", template:"{common.trashIcon()}"}
                        { id:"trash", header:"", template:"<input type='button' value='Delete' class='details_button'>"}
                       ],
                       onClick:{
                         details_button:function(ev, id){
                          rfmap.removeSource(id.row);
                          $$("datatable").remove(id.row);
                         }
                       },
                       minWidth:100,
                       select: false
                    }

                    ]
                   } // body [RF Sources]
                  } // header:"RF Sources"
                ]

        },
         { view: "accordion",
        rows:[
                { header:"RF Prediction", height: 250, body: { type: "template", rows: [
                  {view:"select", id: "data_selector", label:"Data set", labelWidth: 130, value:0, options:[{id:0, value:''}, {id:2, value:"Eastern" }, {id:1, value:"Central" } ], labelAlign:"right", inputWidth: 300  },
                  {  container:"layout", cols:[
                  { view:"button", id:"my_button",  value:"Predict", type:"form", inputWidth:100  },
                  // { view:"button", id:"my_button",  value:"Interpolate",  type:"form", inputWidth:100 }
                  ]}
                ]
                }
              }
              ]     
      } 
          ]},
          { view: "accordion", width:1000, paddingX: 10, paddingY: 20, rows: [
            { header: "Shuttle Radar Topography [Costa Rica]", height: 660, body: {view: "template", content: "outer"} }]
          }
        ]
      });

      $$("propModel").attachEvent("onChange", function(newv, oldv){
        //webix.message("Propagation model changed from: "+oldv+" to: "+newv);
        if( newv=="Distance" ) {
          rfmap.changeKernel(distKernel);
        }
        else if( newv=="Terrain" ) {
          rfmap.changeKernel(terrainKernel);
        }
      });

      $$("my_button").attachEvent("onItemClick", function(id, e){
       // rfmap.interpolate()
      });

      $$("data_selector").attachEvent("onChange", function(newv, oldv) {
        predictor.loadData(newv);
      });

        svg.on("click", function() {
          source_id = rfmap.addSource(Math.round(d3.mouse(this)[0]),  Math.round(d3.mouse(this)[1]));
          $$("datatable").add({
            id: source_id,
            lat: Math.round(d3.mouse(this)[0]),
            lon: Math.round(d3.mouse(this)[1])
            });
          source_id += 1;
        });

         // saveJSON([{'x': 616, 'y': 197},
         //           {'x': 533, 'y': 172},
         //           {'x': 605, 'y':  90}],
         //           [500, 80, 700, 250],
         //           "eastern.json");

        function saveJSON(sources, bbox, filename) {  // List of source coordinates, [UL_x ULy LRx LRy], output filename
          var stride = 30;

          // Initialize RF sources
          rfmap.changeKernel(terrainKernel);
          for( var i=0; i < sources.length; i++ ) {
            rfmap.addSource(sources[i].x, sources[i].y);
          }

          // Generate sample datapoints
          var points = [];
          for( var y = bbox[1]; y < bbox[3]; y+=stride) {
          for( var x = bbox[0]; x < bbox[2]; x+=stride) {
            points.push({'cx': x, 'cy': y, 'color':rfmap.getColor(x,y)});
          }            
          }

          // Visualize points
          myCircles = svg.selectAll("circle").data(points).enter().append("circle");

          myCircles.attr("cx", function(d) { console.log('cx: ' + d.cx); return d.cx; })
                 .attr("cy", function(d) { return d.cy; })
                 .attr("r", function(d) { return 5; })
                 .style("fill", function(d) { return 'rgba(' + d.color[0] + ',' + d.color[1] + ',' + d.color[2] + ',' + d.color[3] + ')'; })                 
                 // .style("fill", function(d) { return d.color; })
                 .style("stroke", function(d) { return 'black'; })
                 .style("stroke-width", function(d) { return 1; })                 

             // saveText( JSON.stringify(points), filename);    
         }

         function saveText(text, filename) {
          var a = document.createElement('a');
          a.setAttribute('href', 'data:text/plain;charset=utf-u, '+encodeURIComponent(text));
          a.setAttribute('download', filename);
          a.click();
         }

      } //  xhr.onload = function(e) {
      xhr.send();


      
  });  // d3.json("costarica_min_topo.txt", function(error, data) {
  });  // webix.ready(function(){

  
  function TerrainKernel(extent, heightmap, heightmapSize) {

    this.extent = extent;
    this.size = 2*extent+1;
    this.buffer = new Float32Array(Math.pow(this.size, 2));
    this.heightmap = heightmap;
    this.heightmapSize = heightmapSize;
    //this.bresenham = new Int16Array(this.size * this.size);
    this.bresenham = [];
    this.id = "TerrainKernel"

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

        this.buffer[i] = Math.pow(0.98, aboveGradeNorm) * Math.pow(0.96, belowGradeNorm);

        // Fixed-logic version
        // var aboveGrade = belowGrade = 0;
        // for( j=0; j < this.bresenham[i].length; j++ ) {
        //   if( height[this.bresenham[i][j]] > 500 ) {
        //     belowGrade++;
        //   } else {
        //     aboveGrade++;            
        //   }
        // }  
        // var aboveGradeNorm = dist * (aboveGrade / this.bresenham[i].length); 
        // var belowGradeNorm = dist * (belowGrade / this.bresenham[i].length); 

        // this.buffer[i] = Math.pow(0.98, aboveGradeNorm) * Math.pow(0.96, belowGradeNorm);

        // Distance-only version
        // this.buffer[i] = Math.pow(0.98, dist);
      }

      // return this.buffer;
      var t1 = performance.now();
      console.log('terrain kernel compute time: ' + (t1-t0))
      return this.buffer; 

    }

  }

  function DistanceKernel(extent, sigma, amplitude) {
    var t0 = performance.now();
    
    this.sigma = sigma;
    this.extent = extent;
    this.size = 2*extent+1; // lenght of one side of the kernel, in pixels
    this.amplitude = amplitude;
    this.buffer = new Float32Array(Math.pow(this.size, 2)); 
    this.id = "DistanceKernel";
   
    centerPos = this.extent*this.size + this.extent;
    centerX = centerPos % this.size;
    centerY = Math.floor(centerPos / this.size);

    for( i=0; i < this.buffer.length; i++ ) {
      localX = i % this.size;
      localY = Math.floor(i / this.size);
      var dist = Math.sqrt(Math.pow(localX-centerX, 2) + Math.pow(localY-centerY, 2));

      this.buffer[i] = Math.pow(0.98, dist);
    }
    // for(var x = -extent; x <= extent; x++) {
    // for(var y = -extent; y <= extent; y++) {

    //   var pos = ((y+extent) * this.size + (x+extent)); // position in buffer based on x and y
    //   var gaussian = Math.exp(-(x*x + y*y) / (2*sigma*sigma));
    //   this.buffer[pos] = gaussian;  
    // }
    // }
    var t1 = performance.now();
    // console.log('distance kernel creation time: ' + (t1-t0))

    this.compute = function(x, y) {
      return this.buffer;
    }
  }

  function Predictor(svg) {
    this.svg = svg;

    this.loadData = function(id) {
      var filename = "";
      var myCircles; 

      if( id == 0 ) {
        // clear svgs
        return;
      }
      else if ( id == 2 ) {
        filename = 'data\\eastern.json';
      }

      console.log(id + ': ' + filename)
      d3.json(filename, function(error, data) {
        console.log(data)
        if (error) alert(error);
        //myCircles = svg.data(data).enter().append("circle");
        myCircles = svg.selectAll("circle").data(data).enter().append("circle");

        myCircles.attr("cx", function(d) { console.log('cx: ' + d.cx); return d.cx; })
                 .attr("cy", function(d) { return d.cy; })
                 .attr("r", function(d) { return 5; })
                 .style("fill", function(d) { return  'rgb(' + d.color[0] + ',' + d.color[1] + ',' + d.color[2] + ')'; })
                 //.style("opacity", function(d) { return d.color[3]; })
                 .style("stroke", function(d) { return "black"; })
                 .style("stroke-width", function(d) { return 1; })                                  
                 .style("stroke-opacity", function(d) { return 0.5; })                                                   
      });

    }
  }

  function RFmap( width, height, kernel, ctx ) {    // Maintains a map of signal strength
    this.width       = width;
    this.height      = height;
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

  function wait(ms) {
      var d = new Date();
      var d2 = null;
      do { d2 = new Date(); }
      while(d2-d < ms);
  }

    this.interpolate = function() {
      // start/end
      var x1 = d3.scaleLinear().domain([0,1]).range([100,200]);
      var y1 = d3.scaleLinear().domain([0,1]).range([100,200]);

      s1 = this.addSource(100,100);
      for( var i=0; i <= 1; i+=.1) {
        // update
        idx1 = this.sources.find( function(value) {return value.id === s1; })
        console.log('id: ' + s1 + ', ' + idx1.id)
        idx1.x = x1(i);
        idx1.y = y1(i);
        console.log(idx1.x + ", " + idx1.y)

        // draw
        this.updateStrength();
        this.updateColor();

        // wait
        wait(100);


      }

    }

    this.addSource = function( x_offset, y_offset ) {
      this.id += 1;
      console.log('add source: ' + x_offset + ', ' + y_offset)
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
      this.strengthMap = new Float32Array(width * height);
      for(idx = 0; idx < this.sources.length; idx++) {
        
        var i = 0;
        var source = this.sources[idx];
        var kernBuffer = this.kernel.compute(source.x, source.y);
        
        for(var y = -this.kernel.extent; y <= this.kernel.extent; y++) {
        for(var x = -this.kernel.extent; x <= this.kernel.extent; x++) {
          var pos = ((y+source.y) * width + (x+source.x)); // position in buffer based on x and y
          //if( kernel.buffer[i] > this.strengthMap[pos] ) this.strengthMap[pos] = kernel.buffer[i];        
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
 
