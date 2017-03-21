---
title: RF_prop_sim
layout: charcoal_nav
category: blog
---

RF Propagation Over Varying Terrain
==

<script src="{{site.baseurl}}assets/posts/RF_prop_sim/js/d3.v4.min.js"></script>
<script src="{{site.baseurl}}assets/posts/RF_prop_sim/js/topojson.v0.min.js"></script>
<script src="{{site.baseurl}}assets/posts/RF_prop_sim/js/geotiff.min.js"></script>
<script src="{{site.baseurl}}assets/posts/RF_prop_sim/js/webix.js" type="text/javascript"></script>  
<script src="{{site.baseurl}}assets/posts/RF_prop_sim/js/skin.js" type="text/javascript"></script>  

This is an example of how to create a shaded relief raster with a vector map overlay (using SVG and d3.js).

Step 1 was to create the raster. I used tiled GeoTiffs from the SRTM project, downloading four tiles that completed a map of Costa Rica. To combine the tiff files into a single raster with the correct projection and dimensions, I used gdalwarp:

> gdalwarp \
>   -r lanczos \
>   -te -250000 -156250 250000 156250 \
>   -t_srs "+proj=aea +lat_1=8 +lat_2=11.5 +lat_0=9.7 +lon_0=-84.2 +x_0=0 +y_0=0" \
>   -ts 960 0 \
>   srtm_19_10.tif \
>   srtm_20_10.tif \
>   srtm_19_11.tif \
>   srtm_20_11.tif \
>   relief.tiff

The t_srs option sets an albers equal area projection that will center on Costa Rica. The te option defines the extent of the map, using SRS coordinates. I don't fully understand how this works and used some trial and error. Note that the x/y has a ratio of 1.6, the same as the intended output resolution (960x600).

Note that the projection here mirrors the projection set in index.html.

Step 2 is to create, from this GeoTiff file, two images: one, grayscale, that represents "shade" — given a certain direction of sunlight, it simulates the effect of light on the relief map:

> gdaldem \
>   hillshade \
>   relief.tiff \
>   hill-relief-shaded.tiff \
>   -z 4 -az 20

The second image is a "color relief" that maps certain colors to certain elevations. The color_relief.txt file provides this information in the format: elevation r g b.

> gdaldem \
>   color-relief \
>   relief.tiff \
>   color_relief.txt \
>   hill-relief-c.tiff \

These files are combined using the program hsv_merge.py:

> hsv_merge.py \
>   hill-relief-c.tiff \
>   hill-relief-shaded.tiff \
>   hill-relief-merged.tiff

Here's some more text

