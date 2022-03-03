---
---

$(document).ready(function() {
var optionsDefault = {  
	chart: { 
		/* backgroundColor: '#252525', */ 
		//height: null,
		spacingTop: 30,
	},
	title: {
		text: 'Nobel Laureates:',
		style: {
			'font-size': '18px',	
			'color': '#666666'	
		}
	},
	subtitle: {
		style: {
			'font-size': '24px',
			'color': '#333333'				
		},
		y: 40 
	},
	xAxis: { 
		labels: {
			y: 25
		} 
	},
	yAxis: {
		min: 0,
		max: 90,
		tickInterval: 10,
		gridLineWidth: 0,
		title: {  
				style: {
				 	'font-size' : '18px'
				 }
		},
	},
    credits: { enabled: false },
  /*  responsive: {
    	rules: [{
    		condition: {
    			maxWidth: 544
    		},
    		chartOptions: {
    			chart: {
					//height: '100%'
    			},
    			yAxis: {
    				max: 80,
    				tickInterval: 20
    			}
    		}
    	}]
    }
*/
}
Highcharts.setOptions(optionsDefault)

var avg_age_disc = {
    legend: {enabled: false },
    subtitle: { text: 'Average age at peak scientific discovery' },
    yAxis: {
    	title: { text: 'Age' }
    },
 	series: [
		{
			name: 'Age',
			data: [{'x': 1900, 'y': 39.0,
						marker: {fillColor: '#df9100'},
				   		dataLabels: {enabled:true, y:-10, color:'#df9100'}
				   	}, 
				   {'x': 1910, 'y': 35.0}, 
				   {'x': 1920, 'y': 37.5}, 
				   {'x': 1930, 'y': 37.5}, 
				   {'x': 1940, 'y': 40.6}, 
				   {'x': 1950, 'y': 36.8},
				   {'x': 1960, 'y': 41.2},
				   {'x': 1970, 'y': 43.1},
				   {'x': 1980, 'y': 38.0},
				   {'x': 1990, 'y': 36.6},
				   {'x': 2000, 'y': 42.3, 
				   		marker: {fillColor: '#7a9d00'},
				   		dataLabels: {enabled:true, y:-10, color:'#7a9d00'}
				   	}] 
		}
	]
}

var avg_years_delay = {
    legend: {enabled: false },
    subtitle: { text: 'Average delay between discovery and prize' },
    yAxis: {
    	title: { text: 'Years' },
    	max: 30,
    },
 	series: [
		{
			name: 'Delay (years)',
			data: [{'x': 1900, 'y': 13.0,
						marker: {fillColor: '#df9100'},
				   		dataLabels: {enabled:true, y:-10, color:'#df9100'}
				   	}, 
				   {'x': 1910, 'y': 12.4}, 
				   {'x': 1920, 'y': 12.9}, 
				   {'x': 1930, 'y': 10.4}, 
				   {'x': 1940, 'y': 10.6}, 
				   {'x': 1950, 'y': 13.2},
				   {'x': 1960, 'y': 16.5},
				   {'x': 1970, 'y': 17.0},
				   {'x': 1980, 'y': 18.9},
				   {'x': 1990, 'y': 22.2},
				   {'x': 2000, 'y': 23.2, 
				   		marker: {fillColor: '#7a9d00'},
				   		dataLabels: {enabled:true, y:-10, color:'#7a9d00'}
				   	}] 
		}
	]
}

var avg_num_winners = {
    legend: {enabled: false },
    subtitle: { text: 'Average number of winners (per field)' },
    yAxis: {
    	title: { text: 'Years' },
    	max: 3,
    	min: 1,
		tickInterval: 1

    },
 	series: [
		{
			name: 'Avg # laureates',
			data: [{'x': 1900, 'y': 1.2,
						marker: {fillColor: '#df9100'},
				   		dataLabels: {enabled:true, y:-10, color:'#df9100'}
				   	}, 
				   {'x': 1910, 'y': 1.1}, 
				   {'x': 1920, 'y': 1.2}, 
				   {'x': 1930, 'y': 1.4}, 
				   {'x': 1940, 'y': 1.4}, 
				   {'x': 1950, 'y': 1.8},
				   {'x': 1960, 'y': 1.9},
				   {'x': 1970, 'y': 2.1},
				   {'x': 1980, 'y': 2.2},
				   {'x': 1990, 'y': 2.0},
				   {'x': 2000, 'y': 2.6, 
				   		marker: {fillColor: '#7a9d00'},
				   		dataLabels: {enabled:true, y:-10, color:'#7a9d00'}
				   	}] 
		}
	]
}

var individual_age_disc = {
	plotOptions: {
	    series: {
	        states: {
	            inactive: {
	                opacity: 1
	            }
	        }
	    }
	},

    subtitle: {
         text: 'Age at peak scientific discovery'
    },

	tooltip: { 
		useHTML: true,
		formatter: function() {return "<b>" + this.point.name + '</b><br/>Age: ' + this.point.y + '<br/><br/>' + this.point.rationale } 
	},
    yAxis: {
    	title: { text: 'Age' },
    	max: 60
    },	
    xAxis: {
    	title: { text: 'Year of award' }
    },    
	series: [
		{
			name: 'Chemistry',
			data: [],
			type: 'scatter',
			color: 'rgba(0, 132, 169, 0.7)',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle'},
			states: { hover: {enabled: false }},
	
			//tooltip: { enabled: false } //, formatter: function() {return this.y} }
		},
		{	
			name: 'Physics',
			data: [],
			type: 'scatter',
			color: 'rgba(122, 157, 0, 0.7)',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle' },
			tooltip: { enabled: false }
		},
		{
			name: 'Medicine',
			data: [],
			type: 'scatter',
			color: 'rgba(178, 56, 20, 0.7)',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle' },
			tooltip: { enabled: false }
		}
	]
}

var individual_years_delay = {
	plotOptions: {
	    series: {
	        states: {
	            inactive: {
	                opacity: 1
	            }
	        }
	    }
	},


    subtitle: {
         text: 'Years between discovery and prize'
    },
    yAxis: {
    	title: { text: 'Years' },
    	max: 60
    },    
    xAxis: {
    	title: { text: 'Year of award' }
    },    
	tooltip: { 
		useHTML: true,
		formatter: function() {return "<b>" + this.point.name + '</b><br/>Delay: ' + this.point.y + ' years<br/><br/>' + this.point.rationale } 
		// formatter: function() {return "<b>" + this.point.name + '</b><br/>' + this.point.rationale } 
	},
	series: [
		{
			name: 'Chemistry',
			data: [],
			type: 'scatter',
			color: 'rgba(0, 132, 169, 0.7)',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle',},
			//tooltip: { enabled: false } //, formatter: function() {return this.y} }
		},
		{	
			name: 'Physics',
			data: [],
			type: 'scatter',
			color: 'rgba(122, 157, 0, 0.7)',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle' },
			tooltip: { enabled: false }
		},
		{
			name: 'Medicine',
			data: [],
			type: 'scatter',
			color: 'rgba(178, 56, 20, 0.7)',
			marker: { radius: 4, lineWidth: 1, lineColor: 'rgba(255,255,255,0.7)', symbol: 'circle' },
			tooltip: { enabled: false }
		}
	]
}

  $.getJSON('{{site.baseurl}}/assets/posts/nobel/nobel_data2.json', function (data) {	
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
		individual_age_disc.series[idx].data.push({'x': parseFloat(el.year_prize), 'y': parseFloat(el.year_research_mid)-parseFloat(el.year_birth), 'name': el.name, 'rationale': el.rationale})		
		individual_years_delay.series[idx].data.push({'x': parseFloat(el.year_prize), 'y': parseFloat(el.year_prize)-parseFloat(el.year_research_mid), 'name': el.name, 'rationale': el.rationale})	
	});
	Highcharts.chart('avg-age-of-discovery', avg_age_disc);	
	Highcharts.chart('individual-age-of-discovery', individual_age_disc);
	Highcharts.chart('avg-years-of-delay', avg_years_delay);	
	Highcharts.chart('individual-years-of-delay', individual_years_delay);
	Highcharts.chart('avg-num-winners', avg_num_winners);		

});
});

