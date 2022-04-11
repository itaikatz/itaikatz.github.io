---
title: Names-analyzer
publish_title: "Explorable Names"
category: blog
layout: charcoal2
thumbnail: assets/posts/names-analyzer/thumbnail.png
custom_js: [assets/posts/names-analyzer/names-analyzer.js, assets/posts/names-analyzer/lodash.min.js]
custom_css: assets/posts/names-analyzer/names-analyzer.css
og_image: assets/posts/names-analyzer/opengraph_screenshot.png
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

<br/>
[In a previous post]({{site.baseurl}}/posts/name.html) I analyzed the Social Security Administration's (SSA) name dataset to determine what infomation could be obtained from just a person's first name. It was interesting to discover examples of how pop culture and historical events shaped the evolution of particular names. In this follow-up I expanded that post into an interactive application. Type in a name to get started. The four panels illustrate how the submitted name's popularity compares over time, geographic region, and to other names. Tap on the help button for more information.

### How does it work?

The application combines three datasets:
<ol>
	<li>The original name dataset referenced in the previous blog post. This data lists the number of individuals born with any given name, for the years 1910-2020.</li>
	<li>An expanded dataset that breaks down the first dataset by state.</li>
	<li>US actuarial tables, from which I derived survival curves. This let me compute the number of individuals alive with a given name from any birth year (for the 'Age' panel)</li>
</ol>

### Observations

One interesting outcome we can derive is the most _prominent_ name for each state. If we were to look at the most popular names for each state, they would likely all be similar (in recent years: 'Noah' and 'Emma'). In contrast, prominence looks at how unique a name is for a given state, irrespective of its overall popularity. You can think of a state's most prominent name as the one that best distinguishes it from the rest of the country.

<div class="text-center">
  <h3>Most Prominent Name (Per State)</h3>
</div>

<div class="row my-4">
<div class="col-6 col-md-3">
<table>
	<tr>
		<th>State</th>
		<th>Male</th>
		<th>Female</th>
	</tr>
	{% for val in site.data.names.prominence limit:13 %}
	<tr>
		<td>{{val.state}}</td>
		<td>{{val.male | capitalize}}</td>
		<td>{{val.female | capitalize}}</td>
	</tr>
	{% endfor %}
</table>
</div>
<div class="col-6 col-md-3">
<table>
	<tr>
		<th>State</th>
		<th>Male</th>
		<th>Female</th>
	</tr>
	{% for val in site.data.names.prominence limit:13 offset:13 %}
	<tr>
		<td>{{val.state}}</td>
		<td>{{val.male | capitalize}}</td>
		<td>{{val.female | capitalize}}</td>
	</tr>
	{% endfor %}
</table>
</div>
<div class="col-6 col-md-3">
<table>
	<tr>
		<th>State</th>
		<th>Male</th>
		<th>Female</th>
	</tr>
	{% for val in site.data.names.prominence limit:13 offset:26 %}
	<tr>
		<td>{{val.state}}</td>
		<td>{{val.male | capitalize}}</td>
		<td>{{val.female | capitalize}}</td>
	</tr>
	{% endfor %}
</table>
</div>
<div class="col-6 col-md-3 order-md-1">
<table>
	<tr>
		<th>State</th>
		<th>Male</th>
		<th>Female</th>
	</tr>
	{% for val in site.data.names.prominence offset:39 %}
	<tr>
		<td>{{val.state}}</td>
		<td>{{val.male | capitalize}}</td>
		<td>{{val.female | capitalize}}</td>
	</tr>
	{% endfor %}
</table>

</div>
</div>

Some of these promiment names relate to a state's natural environment, such as 'Aspen' in Colorado, or 'Orion' and 'Aurora' in Alaska. Others prominences are associated with a state's demographics: New York has 'Chaim' and 'Chaya' oweing to their large Orthodox Jewish population. Similarly, Michigan ('Hassan') and Texas ('Santos') have names corresponding to their Muslim and Hispanic populations, respectively.

### Limitations

<ul>
	<li> Only the top 1000 male and female names (as measured from 2000-2020) are considered due to performance constraints. As this website is being served statically, keeping download sizes small were a challenge in developing this application. For comparison, there are approximately 250,000 unique names in the name database, half of which have fewer than five individuals.</li>
	<li> As the names come from the SSA, the dataset only covers names of individuals born in the US</li>
	<li> For privacy reasons, any names with fewer than five individuals in a given year are omitted. This means that if you have a particularly obscure name, you might not see any births registered in your birth year (assuming it's in the dataset at all)</li>
</ul>

<div class="row my-4 justify-content-center">
<div class="col-12 col-md-8 offset-md-2">

<div class="embed-responsive embed-responsive-4by3">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/6D95k6xJ4Ho" frameborder="0"></iframe>
</div>
<figcaption align = "center">Perhaps one day I too will enjoy a novelty miniature license plate. To paraphrase a friend of mine with an equally obscure name: I dream of the day I enter a gift shop, spin that rotating stand, and see those magical four letters...
</figcaption>

</div>
</div>

