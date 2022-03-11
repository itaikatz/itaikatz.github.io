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
hidden: true
---

<div class="iface">
	<div>
		<label for="name">Name</label>
		<input type="name" id="name" class="name-input" placeholder="Enter a name" />
		<input type="submit" value="Submit" class="submit-btn" />
	</div>
	<div>
		<div class='no-name'>Error: <b><span id='name'></span></b> is not in the database</div>
	</div>
</div>

<div class='guess'>We guessed <span id='guess-name'></span> is a <span id='gender1'></span>'s name. Did you mean a <span id='gender2'></span>?</div>

<div class='line-charts'>
	<div class="chart" id="prevalence"></div>
	<div class="chart" id="age"></div>
</div>
<div class="chart" id="rank"></div>

