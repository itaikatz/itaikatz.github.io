$(document).ready(function() {

var options1 = {
	xAxis: {
		title: {
			text: 'Year of prize'
		}	
    },
    yAxis: {
        min: 0,
        title: { 
        	text: 'Age (years)' 
        }
    },
    title: {
        text: 'Nobel laureates: age at highest degree'
    },
    credits: { enabled: false },
    tooltip: { formatter: function() {return this.point.name } },
	series: [
		{
			type: 'scatter',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle', fillColor: 'rgba(0, 132, 169, 0.7)'},
			tooltip: { enabled: false } //, formatter: function() {return this.y} }
		},
		{	
			type: 'scatter',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle', fillColor: 'rgba(122, 157, 0, 0.7)' },
			tooltip: { enabled: false }
		},
		{
			type: 'scatter',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle', fillColor: 'rgba(178, 56, 20, 0.7)' },
			tooltip: { enabled: false }
		}
	]
}

var options2 = {
	xAxis: {
		title: {
			text: 'Year of prize'
		}	
    },
    yAxis: {
        min: 0,
        title: { 
        	text: 'Age (years)' 
        }
    },
    title: {
        text: 'Nobel laureates: age at discovery'
    },
    credits: { enabled: false },
    tooltip: { formatter: function() {return this.point.name } },
	series: [
		{
			type: 'scatter',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle', fillColor: 'rgba(0, 132, 169, 0.7)'},
			tooltip: { enabled: false } //, formatter: function() {return this.y} }
		},
		{	
			type: 'scatter',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle', fillColor: 'rgba(122, 157, 0, 0.7)' },
			tooltip: { enabled: false }
		},
		{
			type: 'scatter',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle', fillColor: 'rgba(178, 56, 20, 0.7)' },
			tooltip: { enabled: false }
		}
	]
}

var options3 = {
	xAxis: {
		title: {
			text: 'Year of prize'
		}	
    },
    yAxis: {
        min: 0,
        title: { 
        	text: 'years' 
        }
    },
    title: {
        text: 'Nobel laureates: delay between discovery and prize (years)'
    },
    credits: { enabled: false },
    tooltip: { formatter: function() {return this.point.name } },
	series: [
		{
			type: 'scatter',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle', fillColor: 'rgba(0, 132, 169, 0.7)'},
			tooltip: { enabled: false } //, formatter: function() {return this.y} }
		},
		{	
			type: 'scatter',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle', fillColor: 'rgba(122, 157, 0, 0.7)' },
			tooltip: { enabled: false }
		},
		{
			type: 'scatter',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle', fillColor: 'rgba(178, 56, 20, 0.7)' },
			tooltip: { enabled: false }
		}
	]
}
  
  $.getJSON('/assets/posts/nobel/nobel_data.json', function (data) {	
//$.getJSON('assets/posts/nobel/nobel_data.json', function (data) {
	var degree = [];
	var discovery = [];
	var delay = [];
	for( i=0; i < 3; i++ ) {
		degree[i] = [];
		discovery[i] = [];
		delay[i] = [];
	}
	$.each(data.data, function(i, el) {

		// Age of highest degree
		switch( el.field ) {
			case 'Chemistry':
					idx = 0;
			break;
			case 'Physics':
					idx = 1;
			break;
			case 'Medicine':
					idx = 2;
			break;
		}
		degree[idx].push({'x': parseFloat(el.year_prize), 'y': parseFloat(el.age_highdegree), 'name': el.name})
		discovery[idx].push({'x': parseFloat(el.year_prize), 'y': parseFloat(el.year_research_mid)-parseFloat(el.year_birth), 'name': el.name})		
		//discovery[idx].push({'x': parseFloat(el.year_prize), 'y': parseFloat(el.year_research_mid)-parseFloat(el.year_birth), 'name': el.name})
		delay[idx].push({'x': parseFloat(el.year_prize), 'y': parseFloat(el.year_prize)-parseFloat(el.year_research_mid), 'name': el.name})		

	});
	console.log(degree)
	options1.series[0].data = degree[0];
	options1.series[0].name = 'Chemistry';

	options1.series[1].data = degree[1];
	options1.series[1].name = 'Physics';

	options1.series[2].data = degree[2];
	options1.series[2].name = 'Medicine';

	options2.series[0].data = discovery[0];
	options2.series[0].name = 'Chemistry';

	options2.series[1].data = discovery[1];
	options2.series[1].name = 'Physics';

	options2.series[2].data = discovery[2];
	options2.series[2].name = 'Medicine';

	options3.series[0].data = delay[0];
	options3.series[0].name = 'Chemistry';

	options3.series[1].data = delay[1];
	options3.series[1].name = 'Physics';

	options3.series[2].data = delay[2];
	options3.series[2].name = 'Medicine';

	Highcharts.chart('container1', options1);
	Highcharts.chart('container2', options2);
	Highcharts.chart('container3', options3);		
});
});

