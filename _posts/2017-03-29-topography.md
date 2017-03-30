---
title: Topography
publish_title: "Visualizing Digital Elevation Maps"
category: tutorial
layout: blog_post
---

Visualizing Digital Elevation Maps
==

<img src="{{site.baseurl}}assets/posts/topography/cr_mountain_crop.jpg" />

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

1. Create a heightmap

The first step is to download the data, which comes in the form of "tiles" of approximately 300,000 km<sup>2</sup>. This data can be downloaded directly from the SRTM website or, more interactively, with the [SRTM Tile Grabber](http://dwtkns.com/srtm/). A complete map of Costa Rica spans four tiles:

<style>

#image_grid {
  width: 75%; 
  margin: 0 auto;
  overflow: hidden;
}
#image_grid_element {
  float: left;
  width: 48%;
  padding-bottom: 0;
  margin: 1%;
}
figcaption {
  text-align: center;
  font-style: italic;
  font-size: 75%;
}
</style>
<div id="image_grid">
  <figure id="image_grid_element">
  <img src="{{site.baseurl}}assets/posts/topography/global_dem.jpg"/>
  <figcaption>srtm_19_10.tif</figcaption>
  </figure>
    <figure id="image_grid_element">
  <img src="{{site.baseurl}}assets/posts/topography/global_dem.jpg"/>
  <figcaption>srtm_19_10.tif</figcaption>
  </figure>
    <figure id="image_grid_element">
  <img src="{{site.baseurl}}assets/posts/topography/global_dem.jpg"/>
  <figcaption>srtm_19_10.tif</figcaption>
  </figure>
    <figure id="image_grid_element">
  <img src="{{site.baseurl}}assets/posts/topography/global_dem.jpg"/>
  <figcaption>srtm_19_10.tif</figcaption>
  </figure>
</div>


To combine them with the correct cartographic projection we'll use the _gdalwarp_ function, part of the [Geospatial Data Abstraction Library](http://www.gdal.org/), an open-source package for manipulating geospatial data formats.

Step 1 was to create the raster. I used tiled GeoTiffs from the SRTM project, downloading four tiles that completed a map of Costa # Rica. To combine the tiff files into a single raster with the correct projection and dimensions, I used gdalwarp:

<style>
#command_table,
#command_table tr,
#command_table tr.even, 
#command_table tr.alt, 
#command_table tr:nth-of-type(even) {
  background-color: inherit;
  padding: 0;
}

#command_table {
td {
  color: white;
}
#command {
    font-family: Consolas, "Liberation Mono", Courier, monospace;
} 
}
</style>

<table id="command_table">
  <tr>
    <td id="command">gdalwarp</td><td></td>
  </tr>
  <tr>
    <td id="command">  -r lanczos</td><td>Some explanation</td>
  </tr>
  <tr>
    <td id="command">   -te -250000 -156250 250000 156250</td><td>Another explanation</td>
  </tr>
</table>

~~~
gdalwarp \
 -r lanczos \
 -te -250000 -156250 250000 156250 \
 -t_srs "+proj=aea +lat_1=8 +lat_2=11.5 +lat_0=9.7 +lon_0=-84.2 +x_0=0 +y_0=0" \
 -ts 960 0 \
 srtm_19_10.tif srtm_20_10.tif srtm_19_11.tif srtm_20_11.tif \
 relief.tiff
~~~

# Stitch multiple tiles together and project
# ----------
gdalwarp -r lanczos -te -250000 -156250 250000 156250 -t_srs "+proj=aea +lat_1=8 +lat_2=11.5 +lat_0=9.7 +lon_0=-84.2 +x_0=0 +y_0=0"  -ts 960 0 srtm_19_10.tif srtm_20_10.tif srtm_19_11.tif srtm_20_11.tif relief.tiff

# Create shaded relief map (simulating light coming from an angle)
# ----------
gdaldem hillshade relief.tiff hill-relief-shaded.tiff -z 4 -az 20

# Create color relief map
# -----------------------
gdaldem color-relief relief.tiff color_relief.txt hill-relief-c.tiff

# Merge shade and color
# ---------------------
hsv_merge.py hill-relief-c.tiff hill-relief-shaded.tiff hill-relief-merged.tiff

# Get costa rica geographic data
# ------------------------------
curl -o CRI_adm.zip http://gadm.org/data/shp/CRI_adm.zip

# Convert SHP to JSON
# -------------------
ogr2ogr -f GeoJSON costarica.json CRI_adm0.shp

# topoJSON
# ---------
topojson -p name=NAME -p name -q 1e4 -o costarica_min_topo.json costarica.json

putting it together with D3js
