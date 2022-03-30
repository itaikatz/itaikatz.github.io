---
title: Names-analyzer
publish_title: "Placeholder title"
category: blog
layout: charcoal2
thumbnail: assets/posts/names-analyzer/thumbnail.jpg
custom_js: [assets/posts/names-analyzer/names-analyzer.js, assets/posts/names-analyzer/lodash.min.js]
custom_css: assets/posts/names-analyzer/names-analyzer.css
libs:
- highcharts
- highcharts-annotations
- highmaps
- autocomplete
hidden: true
---
<!-- 
<img class="banner" src="{{site.baseurl}}/assets/posts/names-analyzer/hero.png">
 -->
<div class="iface">
	<div class='input'>
		<input type="name" id="name" class="name-input" spellcheck="false" placeholder="Enter a name" autocomplete="off"/>
	</div>
	<div class="toggle"> 
	  <input id="sex" type="checkbox"/>
	  <label for="sex"></label>
	</div>
</div>


<div class='line-charts'>
	<div class="chart" id="prevalence"></div>
	<div class="chart" id="age"></div>
</div>

<div class='aux-charts'>
	<div>
		<input class="slider" id='map-slider' type="range" min="1910" max="2020" value="2020">
		<div class='chart' id='map'></div>
	</div>
	<div class="chart" id="rank"></div>
</div>
