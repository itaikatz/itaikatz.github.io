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
hidden: false
---

<!-- <img class="banner" src="{{site.baseurl}}/assets/posts/names-analyzer/hero.png"> --> 
<!-- 
Explorable Names
==
 -->

<div class='title-mobile'> 
<h1>Explorable Names</h1>
</div>
<div class='title'>
	<span>Explorable</span>
	<span>Names</span>
</div>

<!--
### Instructions: 
This tool helps users explore how names change in popularity over time and geographic regions. To start, enter a name and select male/female (if applicable). Below, you’ll see four charts: 

1. Prevalence (national): percentage of babies born _per year_ with the selected name 
2. Age: The number of individuals at each age
3. Prevalence (per state) percentage of babies born _per state_ with the selected name 
4. Ranking: The relative rank of the selected name amongst the top 1000

Try hovering over (or tapping on) the charts for more information. Note: for performance reasons, only the top 1000 male and female names are in the database. 
-->


<div class="modal fade" id="instructionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Instructions</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<p>This tool helps users explore how names change in popularity over time and geographic regions. To start, enter a name and select male/female (if applicable). Below, you’ll see four charts: </p>
        <ol>
		<li><b>Prevalence (national)</b>: Percentage of babies born <span style="font-style:italic">per year</span> with the selected name</li>
		<li><b>Age</b>: Number of individuals at each age</li>
		<li><b>Prevalence (per state)</b>: Percentage of babies born <span style="font-style:italic">per state</span> with the selected name</li>
		<li><b>Ranking</b>: Relative rank of the selected name amongst the top 1000</li>
		</ol>
		Try hovering over (or tapping on) the charts for more information. Note: for performance reasons, only the top 1000 male and female names are in the database.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


<div class="iface">
 	<div class='input'>
		<input type="name" id="name" class="name-input" spellcheck="false" placeholder="Enter a name" autocomplete="off"/>
	</div>
	<div class='button-set'>
		<div class="toggle"> 
		  <input id="sex" type="checkbox"/>
		  <label class="sex"></label>
		</div>
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#instructionModal"></button>
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