---
title: Topography
publish_title: "Visualizing Digital Elevation Maps"
category: tutorial
layout: blog_post
---

Visualizing Digital Elevation Maps
==
<style>
figcaption {
  text-align: center;
  font-style: italic;
  font-size: 100%;
}

.highlighter-rouge, code {
   background-color: #2b2b2b;
}
.highlighter-rouge {
   border-radius: 5px;
   padding: 10px;
   margin-bottom: 30px;
   -moz-box-shadow:    inset 0 0 10px #161616;
   -webkit-box-shadow: inset 0 0 10px #161616;
   box-shadow:         inset 0 0 10px #161616;

}
</style>

<figure>
  <img src="{{site.baseurl}}assets/posts/topography/cr_mountain_crop.jpg" />
  <figcaption>Orosí valley, Costa Rica</figcaption>
</figure>

What is the highest geographic point in your country? The lowest? What if you could answer both questions at a glance?

In this tutorial we'll demonstrate how to convert a [Digital Elevation Model](https://en.wikipedia.org/wiki/Digital_elevation_model) (DEM) into a visualization suitable for use in a website or other application. A DEM is simply a 3D representation of a terrain's surface. Typically these are used for mapping the Earth's surface, but the same principle applies to mapping the Moon, other planets, or even microscopic surfaces. You may have encountered a similar concept in computer graphics, where it's referred to as a [heightmap](https://en.wikipedia.org/wiki/Heightmap). 

Here's what a DEM of the earth looks like (white regions represent higher elevation). Note the prominence of the Rockies, Andes, and Himalayan mountain ranges:

<img src="{{site.baseurl}}assets/posts/topography/global_dem.jpg" style="width: 75%; display: block; margin: 0 auto;"/>

DEMs have many applications:
* Estimating potential sites for avalanches or landslides
* Modeling water flow for hydrology
* Digital flight planning
* Improving satellite navigation, such as GPS
* Optimizing position of RF sources (e.g. cell towers)

For this example we'll use a DEM to create a topographic map of Costa Rica. Costa Rica is an especially interesting example as it contains a variety of surface features ranging from relatively flat plains to rugged peaks.

To begin, we'll need to collect raw topographical data. Fortunately, NASA has taken care of this for us with the [Shuttle Radar Topography Mission](http://www2.jpl.nasa.gov/srtm/) (SRTM), a research effort that collected global elevation data with a resolution of 30 m per pixel. 

### 1. Create a heightmap

The first step is to download the data, which comes in the form of "tiles" of approximately 300,000 km<sup>2</sup>. This data can be downloaded directly from the SRTM website or, more interactively, with the [SRTM Tile Grabber](http://dwtkns.com/srtm/). A complete map of Costa Rica spans four tiles:

<style>

#image_grid {
  width: 50%; 
  margin: 0 auto;
  overflow: hidden;
}
#image_grid_element {
  float: left;
  width: 48%;
  padding-bottom: 0;
  margin: 1%;
}
#image_grid_element image {
  width: 100%
}
</style>
<div id="image_grid">
  <figure id="image_grid_element">
  <img src="{{site.baseurl}}assets/posts/topography/srtm_19_10_small.jpg"/>
  <figcaption>srtm_19_10.tif</figcaption>
  </figure>
    <figure id="image_grid_element">
  <img src="{{site.baseurl}}assets/posts/topography/srtm_20_10_small.jpg"/>
  <figcaption>srtm_20_10.tif</figcaption>
  </figure>
    <figure id="image_grid_element">
  <img src="{{site.baseurl}}assets/posts/topography/srtm_19_11_small.jpg"/>
  <figcaption>srtm_19_11.tif</figcaption>
  </figure>
    <figure id="image_grid_element">
  <img src="{{site.baseurl}}assets/posts/topography/srtm_20_11_small.jpg"/>
  <figcaption>srtm_20_11.tif</figcaption>
  </figure>
</div>


To combine them with the correct cartographic projection we'll use the _gdalwarp_ function, part of the [Geospatial Data Abstraction Library](http://www.gdal.org/), an open-source package for manipulating geospatial data formats.

<!--
<style>
#command_table {
  border: none;
}

#command_table,
#command_table tr,
#command_table tr.even, 
#command_table tr.alt, 
#command_table tr:nth-of-type(even) {
  background-color: inherit;
}

#command_table td {
  padding: 0 15px 5px 0;
  color: white;
  font-size: 100%;
}
#command_table #command {
    font-family: Consolas, "Liberation Mono", Courier, monospace;
} 

</style>

<table id="command_table">
  <tr>
    <td id="command">gdalwarp</td><td></td>
  </tr>
  <tr>
    <td id="command">&nbsp;&nbsp; -r lanczos \</td><td>Interpolation method</td>
  </tr>
  <tr>
    <td id="command">&nbsp;&nbsp; -te -250000 -156250 250000 156250 \</td><td>Georeferenced extents of output file to be created</td>
  </tr>
  <tr>
    <td id="command">&nbsp;&nbsp; -t_srs "+proj=aea +lat_1=8 +lat_2=11.5 +lat_0=9.7 +lon_0=-84.2 +x_0=0 +y_0=0" \</td><td>Output lat/long</td>
  </tr>
  <tr>
    <td id="command">&nbsp;&nbsp; -ts 960 0 \</td><td>Output dimensions in pixels [0=computed]</td>
  </tr>
  <tr>
    <td id="command">&nbsp;&nbsp; srtm_19_10.tif srtm_20_10.tif srtm_19_11.tif srtm_20_11.tif \</td><td>Source files</td>
  </tr>
  <tr>
    <td id="command">&nbsp;&nbsp; relief.tiff </td><td>Output file</td>
  </tr>
</table>
-->

~~~
gdalwarp
  -r lanczos
  -te -250000 -156250 250000 156250
  -t_srs "+proj=aea +lat_1=8 +lat_2=11.5 +lat_0=9.7 +lon_0=-84.2 +x_0=0 +y_0=0"
  -ts 960 0
  srtm_19_10.tif srtm_20_10.tif srtm_19_11.tif srtm_20_11.tif
  heightmap.tiff
~~~

The t_srs option sets an albers equal area projection that will center on Costa Rica. The te option defines the extent of the map, using Spatial Reference System (SRS) coordinates. Lastly, the ts option specifies the output image size in pixels. Here's what the merged and projected heightmap looks like:

<img src="{{site.baseurl}}assets/posts/topography/relief.jpg" style="width: 75%; display: block; margin: 0 auto;"/>

### 2. Create color relief map

Next let's add some color. We'll do this with the GDAL utility _gdaldem_ which will combine the heightmap we generated with a list of colors. The colors are defined as a list of [_elevation x y z_] tuples, which _gdaldem_ will interpolate. We'll choose green for low elevation and brown for high elevation, but the choice of colors is arbitrary. 

~~~
gdaldem
  color-relief 
  heightmap.tiff 
  color_relief.txt 
  hill-relief-c.tiff
~~~

Where color_relief.txt contains the following values:

<table>
  <thead>
  <tr>
  <td>Elevation (m)</td><td>Red</td><td>Green</td><td>Blue</td>
  </tr>
  </thead>
  <tr>
    <td>65535</td><td>255</td><td>255</td><td>255</td>
  </tr>
  <tr>
    <td>5800</td><td>254</td><td>254</td><td>254</td>
  </tr>
  <tr>
    <td>3000</td><td>121</td><td>117</td><td>10</td>
  </tr>
  <tr>
    <td>1500</td><td>151</td><td>106</td><td>47</td>
  </tr>
  <tr>
    <td>800</td><td>127</td><td>166</td><td>122</td>
  </tr>
  <tr>
    <td>500</td><td>213</td><td>213</td><td>149</td>
  </tr>
  <tr>
    <td>1</td><td>201</td><td>213</td><td>166</td>
  </tr>
</table>


<figure>
<img src="{{site.baseurl}}assets/posts/topography/hill-relief-c.jpg" style="width: 75%; display: block; margin: 0 auto;"/>
<figcaption>Color relief map</figcaption>
</figure>

### 3. Create a shaded relief map

To add a bit more visual interest we can create a shaded relief map that simulates the appearance of light coming from an angle
simulating light coming from an angle. We turn again to the _gdaldem_ utility, this time with the <span style="font-family: Consolas, 'Liberation Mono', Courier, monospace;">hillshade</span> option.

~~~
gdaldem 
  hillshade 
  relief.tiff 
  hill-relief-shaded.tiff 
  -z 4 -az 20
~~~

<figure>
<img src="{{site.baseurl}}assets/posts/topography/hill-relief-shaded.jpg" style="width: 75%; display: block; margin: 0 auto;"/>
<figcaption>Shaded relief map</figcaption>
</figure>

### 4. Merge shade and color

Next we'll combine the color and shaded relief maps with a simple python script (see the end of this tutorial for the code):
~~~
hsv_merge.py 
  hill-relief-c.tiff 
  hill-relief-shaded.tiff 
  hill-relief-merged.tiff
~~~

<figure>
<img src="{{site.baseurl}}assets/posts/topography/hill-relief-merged.jpg" style="width: 75%; display: block; margin: 0 auto;"/>
<figcaption>Merged relief map</figcaption>
</figure>

### 5. Get costa rica geographic data

Looking pretty good! As a last step let's incorporate geographic data so we can clearly see the country's boundaries. To do this, we'll use get Costa Rica's administrative boundaries from [GADM.org](gadm.org), and convert them into a format suitable for use on the web, namely TopoJSON. 

For reasons that aren't terribly interesting we'll have to first convert from GADL's shapefile format to GeoJSON and then to TopoJSON using GDAL's ogr2ogr and [Mike Bostock's topojson](https://github.com/topojson/topojson) utilities, respectively:

~~~
curl -o CRI_adm.zip http://gadm.org/data/shp/CRI_adm.zip
ogr2ogr -f GeoJSON costarica.json CRI_adm0.shp
topojson -p name=NAME -p name -q 1e4 -o costarica_min_topo.json costarica.json
~~~

With a a little D3js magic (the topic of a future tutorial, i.e. "left as an exercise for the reader") we can combine the geographic data with the merged relief map:

<style>
  path#CRI {
    fill: none;
    stroke: #000;
  }
  image.bg {
    opacity: 0.2;
  }
</style>

<div id="merged-map"></div>

<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://d3js.org/topojson.v0.min.js"></script>
<script>
  var width = 960,
      height = 600;

  var projection = d3.geo.albers()
    .center([0, 9.7])
    .rotate([84.2,0])
    .parallels([8, 11.5])
    //.scale(10200)
    .scale(12240)
    .translate([width / 2, height / 2]);

  var path = d3.geo.path()
    .projection(projection);

  var svg = d3.select("#merged-map").append("svg")
    .attr("class", "map")
    .attr("width", width)
    .attr("height", height);

  d3.json("{{site.baseurl}}assets/posts/topography/costarica_min_topo.json", function(error, data) {
    var costarica = topojson.object(data, data.objects.costarica);

    svg.append("image")
      //.attr("clip-path", "url(#clip)")
      .attr("xlink:href", "{{site.baseurl}}assets/posts/topography/hill-relief.jpg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "bg");

    svg.selectAll(".cr-subunit")
      .data(costarica.geometries)
    .enter().append("path")
      .attr("id", function(d) { return "CRI"; })
      .attr("d", path);

    svg.append("clipPath")
      .attr("id", "clip")
    .append("use")
      .attr("xlink:href", "#CRI");

    svg.append("image")
      .attr("clip-path", "url(#clip)")
      .attr("xlink:href", "{{site.baseurl}}assets/posts/topography/hill-relief.jpg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "fg");
  });

  // Script here...
</script>

