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

<!-- <img class="banner" src="{{site.baseurl}}/assets/posts/names-analyzer/hero.png"> --> 

Explorable Names
==

### Instructions: 
This tool helps users explore how names change in popularity over time and geographic regions. To start, enter a name and select male/female (if applicable). Below, you’ll see four charts: 

1. Prevalence (national): percentage of babies born _per year_ with the selected name 
2. Prevalence (per state) percentage of babies born _per state_ with the selected name 
3. Age: The number of individuals at each age
4. Ranking: The relative rank of the selected name amongst the top 1000

Try hovering over (or tapping on) the charts for more information. Note: for performance reasons, only the top 1000 male and female names are in the database. 


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

### How does it work?

### Neat things to try