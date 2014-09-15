/* GOOGLE MAPS */

var map = new google.maps.Map(d3.select("#map").node(), {
  zoom: 18,
  //center: new google.maps.LatLng(37.76487, -122.41948),
  center: new google.maps.LatLng( 38.9085108, -77.0398785),  
  mapTypeId: google.maps.MapTypeId.ROADMAP
  //mapTypeId: google.maps.MapTypeId.HYBRID
});

// Load the station data. When the data comes back, create an overlay.
d3.json("waypoints.json", function(data) {
  var overlay = new google.maps.OverlayView();

  // Add the container when the overlay is added to the map.
  overlay.onAdd = function() {
    //var layer = d3.select(this.getPanes().overlayLayer).append("div")
    var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
        .attr("class", "stations")
        .on('mouseover', function() { console.log('layer mousover'); })
        .on('mouseout', function() { console.log('layer mouseout'); });
  
    
    // Draw each marker as a separate SVG element.
    // We could use a single SVG, but what size would it have?
    overlay.draw = function() {
      var projection = this.getProjection(),
          padding = 10;

/*
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                //.offset([-10, 0])
                .offset([25, 130])
                .html(function(d) {
                //return "<strong>Frequency:</strong> <span style='color:red'>" + " [freq] " + "</span>";
                return "<strong>Pos:</strong> <span style='color:red'>(" +  d.value[0] + ", " + d.value[1] + ")</span><br/><strong>Depth:</strong> <span style='color:red'> " +  d.value[2] + "</span>"; //<br/>depth: " + d.value[2] + "</span>";
            })
*/

  
      var marker = layer.selectAll("svg")
          .data(d3.entries(data))
          .each(transform) // update existing markers
        .enter().append("svg:svg")
          .each(transform)
          .attr("class", "marker")
          .call(tip)
         .on('mouseover', tip.show)
        .on('mouseout', tip.hide);


      // Add a circle.
      marker.append("svg:circle")
          .attr("r", 4.5)
          .attr("cx", padding)
          .attr("cy", padding);
          //.on('mouseover', tip.show)
          //.on('mouseout', tip.hide);
          
      // Add a label.   
      marker.append("svg:text")
          .attr("x", padding + 7)
          .attr("y", padding)
          .attr("dy", ".31em")          
          .text(function(d) { return d.key; });

      function transform(d) {
        d = new google.maps.LatLng(d.value[1], d.value[0]);
        d = projection.fromLatLngToDivPixel(d);
        return d3.select(this)
            .style("left", (d.x - padding) + "px")
            .style("top", (d.y - padding) + "px");
      }
    };
     d3.selectAll(".stations").on("click", function(d) { console.log("click"); } );
  };

  // Bind our overlay to the mapâ€¦
  overlay.setMap(map);
});

/*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
nv.addGraph(function() {
  var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(false)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .yDomain([0, 65])
                .showXAxis(true)        //Show the x-axis   
                .tooltips(true);
                
                chart.options({
                tooltips: true,
                tooltipContent: function (key, x, y, e, graph) {
                  return '<h3>' + key + '</h3>' +
                        '<p>' + e.point.y.toFixed(0) + 'mph at ' + x + '</p>'
                }                                
              });
                

  chart.xAxis     //Chart x-axis settings
      .axisLabel('Frame #')
      .tickFormat(d3.format(',r'));

  chart.yAxis     //Chart y-axis settings
      .axisLabel('Velocity (mph)')
      .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  //var myData = sinAndCos();   //You need data...
  var myData = getData();

  d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
      .datum(myData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!



  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */

function getData() {
  var data = [];
  data.push({x: 215, y: 21.1249350972});
  data.push({x: 277, y: 21.5594434154});
  data.push({x: 441, y: 26.7137386364});
  data.push({x: 449, y: 24.8678571297});
  data.push({x: 522, y: 19.248163785});
  data.push({x: 570, y: 12.2295549598});
  data.push({x: 611, y: 4.0895923484});
  data.push({x: 640, y: 0});
  data.push({x: 700, y: 0});

  var data2 = [];
  data2.push({x: 215, y: 35});
  data2.push({x: 700, y: 35});

  return [
  {
    values: data,
    key: 'Velocity',
    color: '#ff7f0e'
  },
  {
    values: data2,
    key: 'Speed limit',
    color: '#2ca02c',
    dashed: 'true'
  }
  ];
}

function sinAndCos() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  //Line chart data should be sent as an array of series objects.
  return [
    {
      values: sin,      //values - represents the array of {x,y} data points
      key: 'Sine Wave', //key  - the name of the series.
      color: '#ff7f0e'  //color - optional: choose your own line color.
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    },
    {
      values: sin2,
      key: 'Another sine wave',
      color: '#7777ff',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
  ];
}
