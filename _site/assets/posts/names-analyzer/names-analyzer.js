start_year = 1910
num_years = 111
let path = '/assets/posts/names-analyzer/'

m_color = '#7cb5ec'
f_color = '#e19e81'
us_births = undefined
state_births = undefined
autoCompleteJS = undefined
g_page = undefined // global pointer to Page instance
curr_year = undefined
curr_name = undefined

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

class RankChart {
	
	constructor(options) {		
		this.id = options.id
		this.f_data = options.f_data
		this.m_data = options.m_data
		this.sex = options.sex

		this.active = undefined
		this.m_color = m_color
		this.f_color = f_color

		this.options = {
			chart: {
				height: '250px',
			    type: 'column'
			},
			credits: { enabled: false },
			legend: { enabled: false },
			title: {
				text: 'Ranking'
			},
			subtitle: {
				text: this.sex=='f' ? 'Female' : 'Male',
				style: {
					'font-weight': 'bold', 
				},	

			},
			series: [{				
				color: this.sex=='f' ? this.f_color : this.m_color,
				data: this.sex=='f' ? _.cloneDeep(this.f_data) : _.cloneDeep(this.m_data)
				// data: this.sex=='f' ? this.f_data : this.m_data
			}],
			yAxis: {
				// max: 500000,
				type: 'logarithmic',
				labels: {
					enabled: false
				},
				title: {
					text: 'Relative rank'
				}

			},
			tooltip: { 
				useHTML: true,	
				formatter: function() { return capitalize(this.point.name)} 
			},
		}
		this.chart = Highcharts.chart(this.id, this.options)
		
	}

	toggleSex() {
		this.clearActive()		
		this.sex = this.sex=='f' ? this.sex='m' : this.sex='f' // Swap sex

		this.chart.update({
			title: {
				text: 'Ranking'
			},
			subtitle: {
				text: this.sex=='f' ? 'Female' : 'Male',
			},

			series: [{
				color: this.sex=='f' ? this.f_color : this.m_color,
				// data: this.sex=='f' ? _.cloneDeep(this.f_data) : _.cloneDeep(this.m_data)
				data: this.sex=='f' ? this.f_data : this.m_data
			}],
		})
	}

	clearActive() {
		if (this.active != undefined)	{
			this.chart.series[0].data[this.active].update({color: undefined, borderWidth: 0, borderColor: undefined, dataLabels: {enabled:false}})	
		}
		this.active = undefined		
	}
	setActive(name) {
		let data = this.sex=='f' ? this.f_data : this.m_data 
		var idx = data.findIndex( i => i.name==name )
		if (idx==-1) return

		this.active = idx
		this.chart.series[0].data[idx].graphic.toFront()
		this.chart.series[0].data[idx].update({
			color: 'red', 
			borderWidth: 1, 
			borderColor: 'red', 
			labelRank: 0, 
			dataLabels: {
				enabled:true,
				// useHTML: true,
				color: 'black',
				// overflow: 'none',
				formatter: function () {
                	// return '<div class="callout top">I need to have this call out point to 75!</div>';
                	return capitalize(name)
            	}
			} 
		})
	}

	update(name, sex) {
		if (sex != this.sex) this.toggleSex()
		
		this.clearActive()
		this.setActive(name)		
	}
}

class LineChart {
	constructor(options) {
		const {id, title, mouseOverFunc, mouseOutFunc, xAxisTitle, xRange, yAxisTitle, yAxisFormatter, tooltipFormatter, dataUpdater} = options

		this.m_color = m_color
		this.f_color = f_color
		this.chart = undefined
		this.dataUpdater = dataUpdater

		// let that = this

		this.lineChartOptions = {
			 chart: {
				height: '200px',
		        type: 'spline',
		    },
		    series: [{
		    	point: {
                	events: {
                    	mouseOver: function()  {
                    		mouseOverFunc(this.year)
                    	}
               		}
            	},
            	events: {
	            	mouseOut: function() {
	            		mouseOutFunc()
	            	}
            	}

		    }],
			tooltip: { 
				useHTML: true,
				formatter: tooltipFormatter 
			},
			subtitle: {
				style: {
					'font-weight': 'bold', 
				},				
			},
			credits: { enabled: false },
		    legend: { enabled: false },
		    title: {
				text: title
			},
			xAxis: [
				{
					title: {
						text: xAxisTitle
					},
					min: xRange[0], 
					max: xRange[1],
				},
				{
					min: xRange[0], 
					max: xRange[1],
					offset: 0,
					labels: {
						style: {color: 'rgba(255, 0, 0, 0.75)'}
					},
					tickLength: 0,
					tickPositions: [],

				}
			],
		    yAxis: {
				title: {
					text: yAxisTitle
				},
		    	labels: {
		    		formatter: yAxisFormatter,
                    align: 'left',
                    x: 0,
                    y: -5
		    	}
		    },
			annotations: [{
				draggable: '',
		        shapes: [{
					dashStyle: 'Dash',
		            fill: 'none',
		            stroke: 'rgba(255, 0, 0, 0.25)',
		            strokeWidth: 1,
		            type: 'path',
		            points: []
				}],
				zIndex: 0
			}]
		}

		this.chart = Highcharts.chart(id, this.lineChartOptions);
	}

	setYear(idx) {

		let visible = idx==undefined ? false : true

		let x = idx==undefined ? 0 : this.chart.series[0].data[idx].x
		let y = idx==undefined ? 0 : this.chart.series[0].data[idx].y

		this.chart.update({
			xAxis: [ {}, { tickPositions: [x], visible: visible }],
			annotations: [{
				visible: visible,
				shapes: [{
					points: [
						{x:x, y:0, xAxis: 0, yAxis: 0},
						{x:x, y:y, xAxis: 0, yAxis: 0},							
					]
				}]
			}]
		})


	}

	getUpdateObj(name, sex) {
		return {
			subtitle: {
				style: {
					'color': sex=='f' ? this.f_color : this.m_color
				},
				text: capitalize(name)
			},			
			series: [{
				color: sex=='f' ? this.f_color : this.m_color,
			}]
		}
	}

	update(name, data, sex) {
		// let that = this
		let options = {
			subtitle: {
				style: {
					'color': sex=='f' ? this.f_color : this.m_color
				},
				text: capitalize(name)
			},			
			series: [{
				color: sex=='f' ? this.f_color : this.m_color,
				data: this.dataUpdater(data, sex)
			}]
		}
		this.chart.update(options)
	}
}

class NameChart extends LineChart {
	constructor(_options) {		
		let {id, mouseover, mouseout} = _options
		super({
			id: id,
			title: 'Prevalence (national)', 
			mouseOverFunc: mouseover, 
			mouseOutFunc: mouseout,
			xRange: [start_year, start_year+num_years],
			yAxisTitle: '% Births',
			yAxisFormatter: yAxisFormatter,
			tooltipFormatter: tooltipFormatter,
			dataUpdater: dataUpdater
		})

		function yAxisFormatter(x) {
			return 100*x.value + '%'
		}

		function tooltipFormatter() {
			return  ((100*this.point.y).toPrecision(2)).toString() + '%'
		}

		function dataUpdater(data, sex) {
			return data.map((val,i) => ({x: i+start_year, y: data[i] / (us_births[i] / 2 ), year: i+start_year })) // divide by 2 assumed 50/50 gender split
		}
	}

}

class AgeChart extends LineChart {
	static probBirthTo2022(birth_years, sex) {
		let p = 0
		const clamp = (min, max) => value => Math.max(Math.min(value, max), min)

		if (sex=='m')
			p =  birth_years.map(year => 1.01787573 / (1. + Math.exp(-1.12690403 * ((year-1900)/10 - 4.28420196))) - 0.04680578)
		else // sex=='f'
			p =  birth_years.map(year => 1.01816473 / (1. + Math.exp(-1.29899044 * ((year-1900)/10 - 3.83935259))) - 0.043216)

		return p.map(clamp(0, 1))    
	}


	constructor(_options) {

		super({
			id: _options.id,
			title: 'Age', 
			mouseOverFunc: _options.mouseover, 
			mouseOutFunc: _options.mouseout,
			xAxisTitle: 'Years Old',
			xRange: [0, num_years-1],
			yAxisTitle: 'Count',
			tooltipFormatter: tooltipFormatter,
			dataUpdater: dataUpdater
		})

		function tooltipFormatter() {
			return (parseInt(this.point.y)).toLocaleString('en-US');
		}

		function dataUpdater(data, sex) {
			let prob = sex=='f' ? this.f_prob : this.m_prob
			return data.reverse().map((val,i) => ({ x: i, y: data[i]*prob[i], id:i.toString(), year: start_year+num_years-i-1 }))
		}

		this.m_prob = AgeChart.probBirthTo2022(_.range(start_year, start_year+num_years), 'm').reverse()
		this.f_prob = AgeChart.probBirthTo2022(_.range(start_year, start_year+num_years), 'f').reverse()
	}
}

class MapChart {
	static start_year = 1910

	constructor(options) {
		let {id, slider_id, onslide, topology, year} = options
		this.data = undefined
		this.slider = document.getElementById(slider_id);
		this.onslide = onslide
		this.max_val = 0

    	this.chart = Highcharts.mapChart(id, {
		    chart: {
		        map: topology,
       			borderWidth: 1,
       			height: '250px'
      		},
      		credits: { enabled: false },      	
      		legend: { enabled: false },	
			colorAxis: {
				// min: 1,
				// max: 1500,
				type: 'linear',
				minColor: '#EEEEFF',
				maxColor: '#000022',
				stops: [
					[0, '#EFEFFF'],
					[0.67, '#4444FF'],
					[1, '#000022']
				],
				custom: { allowNegativeLog: true },
			},
 			series: [{
		        // data: data[year-MapChart.start_year],
		        joinBy: null
		    }],
		    title: {
		    	// enabled: false,
		    	text: 'Prevalence (per state)'
		    	// text: undefined
		    },
		    subtitle: {
		    	// text: '% Births in ' + curr_year,
		    	floating: true
		    },
	    	tooltip: { 
				useHTML: true,
				formatter: function() { 
					return (this.point.value.toFixed(2)).toString() + '%'
				}
			},
		})

    	let that = this
		
		this.slider.addEventListener("input", function(event) {
			onslide(this.value)
		})
	}

	setYear(year, moveSlider=true) {
		let data_view = new Int16Array(this.data, 51*(year-MapChart.start_year)*2, 51);		
		let births_view = new Int32Array(state_births, 51*(year-MapChart.start_year)*4, 51);
		let normalized = new Float32Array(births_view).map((births, i) => 100 * data_view[i] / (births / 2.0)) // divide by 2.0 because assuming births are split equally betwene boys/girls
		this.chart.series[0].setData(normalized, true, {duration: 50});
		this.chart.update({
			 subtitle: {
		    	text: '% Births in <b>' + year + '</b>',
		    }
		})
		if (moveSlider==true) {
			this.slider.value = year	
		}		
	}

	update(name, sex) {
		let filename = name + (sex=='f' ? '_f':'m') +'.dat'
		let fetchReq1 = fetch(path+filename).then((res) => res.arrayBuffer());

		Promise.all([fetchReq1])
		.then((val) => {
			this.data = val[0]
			this.chart.update({
				colorAxis: {
					min: 0,
					max: 2.0
				}
			})
			this.setYear(this.slider.value, false)
		})
	}
}

class Page {

constructor() {

	this.rankChart = undefined
	this.nameChart = undefined
	this.ageChart = undefined

	this.f_names = undefined
	this.f_rank = undefined
	this.f_data = undefined

	this.m_names = undefined
	this.m_rank = undefined
	this.m_data = undefined

	g_page = this

	let pageLoad = new Promise((resolve, reject) => {
		window.onload = function() { resolve () }
	})

	// https://melvingeorge.me/blog/do-multiple-fetch-requests-parallel-javascript
	let fetchReq1 = fetch(path+'female_names.json').then((res) => res.json());
	let fetchReq2 = fetch(path+'female_rank.json').then((res) => res.json());
	let fetchReq3 = fetch(path+'female_data.dat').then((res) => res.arrayBuffer());
	let fetchReq4 = fetch(path+'male_names.json').then((res) => res.json());
	let fetchReq5 = fetch(path+'male_rank.json').then((res) => res.json());
	let fetchReq6 = fetch(path+'male_data.dat').then((res) => res.arrayBuffer());
	let fetchReq7 = fetch(path+'us_births.json').then((res) => res.json());
	let fetchReq8 = fetch(path+'us-all.topo.json').then((res) => res.json());
	let fetchReq9 = fetch(path+'state_births.dat').then((res) => res.arrayBuffer());

	Promise.all([pageLoad])
	.then(() => {
		this.nameChart = new NameChart({id: 'prevalence', mouseover: this.mouseover, mouseout: this.mouseout})
		this.ageChart = new AgeChart({id: 'age', mouseover: this.mouseover, mouseout: this.mouseout})

		// put loading message here
	})

	// Initialize autocomplete
	Promise.all([pageLoad, fetchReq1, fetchReq4])
	.then(val => {
		let female_names = val[1].map(name => ({name:name, sex:'f'}))
		let male_names = val[2].map(name => ({name:name, sex:'m'}))
		let names = [...female_names, ...male_names]
		names.sort( (a,b)=> {
			if ( a.name < b.name ){
				return -1;
			}
			if ( a.name > b.name ){
				return 1;
			}
			return 0;
		})
		let that = this
		autoCompleteJS = new autoComplete({ 
		 	selector: "#name",
		 	placeHolder: 'Enter a name',
			data: {
				src: names,
				keys: ['name'],
				cache: true,
			},
			searchEngine: function(query, record) {
				query = query.toLowerCase();
				let re = new RegExp('^'+query, 'i')
				if (re.test(record)) {
					return record.replace(query, '<mark>'+capitalize(query)+'</mark>')
				}
				return undefined
			},

			resultItem: {
				element: (item, data) => {
					let sex = data.value.sex=='f' ? 'female' : 'male'

					// Modify Results Item Style
					item.style = "display: flex; justify-content: space-between;";
					item.setAttribute(sex, '');
					// Modify Results Item Content
					item.innerHTML = `
					<span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
					${data.match}
					</span>
					<span class="${sex}" style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; opacity: 0.7;">
					${sex}
					</span>`;
				},
				// <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
				highlight: true
			},
			resultsList: {
				element: (list, data) => {
					if (!data.results.length) {
						// Create "No Results" message list element
						const message = document.createElement("div");
						message.setAttribute("class", "no_result");
						// Add message text content
						message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
						// Add message list element to the list
						list.appendChild(message);
						}
				},
				noResults: true,
			},
			events: {
				input: {
					selection(evt) {						
						let {name, sex} = evt.detail.selection.value
						that.update(name, sex)
						$(".name-input").val(capitalize(name))
					},
					focus() {
						const inputValue = autoCompleteJS.input.value;
						if (inputValue.length) autoCompleteJS.start();
					},
				}
			}
		 	
		 });
	})

	Promise.all([fetchReq1, fetchReq2, fetchReq3, fetchReq4, fetchReq5, fetchReq6, fetchReq7, pageLoad])
	.then(val => {

		this.f_names = val[0]
		this.f_rank = val[1]
		this.f_data = this.formatBinaryData(val[2])

		this.m_names = val[3]
		this.m_rank = val[4]
		this.m_data = this.formatBinaryData(val[5])

		us_births = val[6]
	
		// this.f_rankSeries = this.f_names.map((val,i) => ({x: i, y: this.f_rank[i], name: val}))
		// this.m_rankSeries = this.m_names.map((val,i) => ({x: i, y: this.m_rank[i], name: val}))

		this.f_rankSeries = this.f_names.map((val,i) => ({x: i, y: this.f_rank[i], name: val}))
		this.m_rankSeries = this.m_names.map((val,i) => ({x: i, y: this.m_rank[i], name: val}))
		this.rankChart = new RankChart({id:'rank', 
										f_data:this.f_rankSeries, 
										m_data:this.m_rankSeries, 
										sex:'m'
									})
		
		this.initCallbacks()		
		// this.nameChart.chart.reflow()
		// this.ageChart.chart.reflow()
	})
	.catch(file => {
		console.log(file + ' failed to load');
	})

	Promise.all([pageLoad, fetchReq8, fetchReq9])
	.then(val => {
		let topology = val[1]
		state_births = val[2]

		this.mapChart = new MapChart({id: 'map',
									  slider_id: 'map-slider',
									  onslide: this.mouseover,
									  topology: topology,
									  year: 2020
									})

	})
	.catch(file => {
		console.log(file + ' failed to load');
	})


	}


	mouseover(year) {
		curr_year = year

		g_page.nameChart.setYear(year-start_year)
		g_page.ageChart.setYear(-1*year + start_year + num_years - 1)
		g_page.mapChart.setYear(year)		
	}

	mouseout() {
		// g_page.nameChart.setYear()
		// g_page.ageChart.setYear()
	}


	formatBinaryData(dataIn) {
		let num_names = dataIn.byteLength / 4 / num_years
		let view = new Int32Array(dataIn) // Convert to 4-byte ints			
		return new Array(num_names) // Convert the name data into subarrays
				.fill('')
				.map((_, i) => view.slice(i * num_years, (i + 1) * num_years));
	}

	initCallbacks() {		
		var that = this
		document.querySelector('input[id=sex]').addEventListener('change', function() {
			if (this.checked) { // female
				that.update(curr_name, 'f')
			} else { // male
				that.update(curr_name, 'm')				
			}
		})
		$(".name-input").keydown( evt => {
			if (evt.key==='Enter') {
				let name = document.querySelector('.name-input').value.toLowerCase()
				
				var m_idx = this.m_names.findIndex( i => i==name )
				var f_idx = this.f_names.findIndex( i => i==name )
				
				if (f_idx==-1 && m_idx == -1) {  // name not found
					return
				}
				if (f_idx==-1 && m_idx >= 0) {  // male
					that.update(name, 'm')
				}
				if (f_idx>=0 && m_idx==-1) {  // female
					that.update(name, 'f')
				}
				if (f_idx>=0 && m_idx>=0) {  // ambiguous, choose "best" ranked name
					if (m_idx < f_idx) that.update(name,'m')
					else that.update(name,'f')
				}
				autoCompleteJS.close();

			}
		})
	}

	update(name, sex) {
		function enableSelector() {
			document.querySelector('#sex').disabled = false
			document.querySelector('#sex + label').removeAttribute('disabled')
		}
		function disableSelector(sex) {
			document.querySelector('#sex').setAttribute('disabled', sex)
			document.querySelector('#sex + label').setAttribute('disabled', '')
		}

		var that = this
		
		if (name==undefined) {
			that.rankChart.update(name, sex)
			return
		}

		// Clear annotations
		g_page.nameChart.setYear()
		g_page.ageChart.setYear()

		name = name.toLowerCase();

		let checkbox = document.querySelector('#sex')
		var m_idx = this.m_names.findIndex( i => i==name )
		var f_idx = this.f_names.findIndex( i => i==name )
		
		if (sex=='m') {	
			var series = m_idx==-1 ? undefined : Array.from(this.m_data[m_idx])
			checkbox.checked = false
			f_idx==-1 ? disableSelector('f') : enableSelector()
		}
		else { // sex=='f'
			var series = f_idx==-1 ? undefined : Array.from(this.f_data[f_idx])
			checkbox.checked = true
			m_idx==-1 ? disableSelector('m') : enableSelector()
		}
		
		// Update charts
		that.rankChart.update(name, sex)
		that.nameChart.update(name, series, sex)
		that.ageChart.update(name, series, sex)
		that.mapChart.update(name, sex)


		curr_name = name // Update global

	}

}

var page = new Page()