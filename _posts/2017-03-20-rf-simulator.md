---
title: RF_prop_sim
layout: blog_post
category: blog
---

RF Propagation Over Varying Terrain
==
<link rel="stylesheet" href="{{site.baseurl}}assets/posts/RF_prop_sim/css/webix.css" type="text/css"> 
<style>

path#CRI {
    fill: none;
    stroke: #000;
  }
  image.bg {
    opacity: 0.2;
  }
div.tooltip {   
  border-radius: 8px 8px 8px 0;    
  font: 20px sans-serif; 
  width:100px;
  background: #3498db;
  color: white;
  text-align: center;
  position: relative;
  height: 28px;    
  line-height: 28px;
  pointer-events: none;        
  padding: 4px;        
  border: 0;
  display: inline;
}

  circle.active {
    fill: blue;
  }

  circle.cursor {
    fill: none;
    stroke: blue;
    stroke-width: 4px;
    opacity: 0.5;
  }

  svg {
    position: absolute;
  }
  canvas {
    position: absolute;
    pointer-events:none;
  }

  #ui {
    width:1000px; height:1000px; margin:20px;  
    position: relative;
  }

  #layout {
    height: 1000px;
    width: 1400px;
    margin: 0 auto;
  }

#outer{
    /*width:1000px; height:400px;*/
    position: relative;
  }
/*
 .webix_view.webix_accordionitem.vertical {
    border-radius: 10px;
}

  .webix_accordionitem_label {
    font-size: 23px;
  }

  .webix_accordionitem_header {
    height: 45px;
  }

  .webix_inp_label, .webix_inp_top_label, .webix_label_right {
    font-size: 20px;
}

.webix_el_radio .webix_label_right {
    color: #666666;
    font-size: 18px;
}
*/

</style>

<script src="{{site.baseurl}}assets/posts/RF_prop_sim/js/d3.v4.min.js"></script>
<script src="{{site.baseurl}}assets/posts/RF_prop_sim/js/topojson.v0.min.js"></script>
<script src="{{site.baseurl}}assets/posts/RF_prop_sim/js/geotiff.min.js"></script>
<script src="{{site.baseurl}}assets/posts/RF_prop_sim/js/webix.js" type="text/javascript"></script>  
<script src="{{site.baseurl}}assets/posts/RF_prop_sim/js/skin.js" type="text/javascript"></script>  

<!--
[introduce problem] 

[In a previous tutorial]({{ site.baseurl }}{% link _posts/2017-03-29-topography.md %}) we showed how to generate a visualization of a Digital Elevation Model (DEM). In this post we'll show how 
-->

<div id="layout"></div>
<div class="outer" id="outer">
	<svg class="map">
		<image class="bg" xlink:href="{{site.baseurl}}assets/posts/RF_prop_sim/hill-relief.jpg" />
		<image class="fg" xlink:href="{{site.baseurl}}assets/posts/RF_prop_sim/hill-relief.jpg" />
	</svg>
	<canvas class="inner" id="myCanvas"></canvas>
	<div class="tooltip"></div>
</div>

<!--

<div id="layout" style="width:50%"></div>
<div id="ui"></div>
<div id="outer">
<svg class="map">
<image class="bg" xlink:href="{{site.baseurl}}assets/posts/RF_prop_sim/hill-relief.jpg" />
<image class="fg" xlink:href="{{site.baseurl}}assets/posts/RF_prop_sim/hill-relief.jpg" />
</svg>
<canvas class="inner" id="myCanvas" width="960" height="600"></canvas>
<div class="tooltip"></div>
</div>
-->
<script src="{{site.baseurl}}assets/posts/RF_prop_sim/rf.js" type="text/javascript"></script>  
<script src="{{site.baseurl}}assets/posts/RF_prop_sim/GIS_webix.js" type="text/javascript"></script>

