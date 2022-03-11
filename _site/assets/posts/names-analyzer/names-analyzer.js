start_year = 1900
num_years = 121

m_color = '#7cb5ec'
f_color = '#e19e81'
us_pop = undefined

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function probBirthTo2022(birth_years, sex) {
	const clamp = (min, max) => value => Math.max(Math.min(value, max), min)

	if (sex=='m')
		p =  birth_years.map(year => 1.01787573 / (1. + Math.exp(-1.12690403 * ((year-1900)/10 - 4.28420196))) - 0.04680578)
	else // sex=='f'
		p =  birth_years.map(year => 1.01816473 / (1. + Math.exp(-1.29899044 * ((year-1900)/10 - 3.83935259))) - 0.043216)

	return p.map(clamp(0, 1))    
    // return 1.01787573 / (1. + Math.exp(-1.12690403 * ((birth_year-1900)/10 - 4.28420196))) - 0.04680578
    // return a / (1. + np.exp(-c * (x - d))) + b
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
				height: '200px',
			    type: 'column'
			},
			credits: { enabled: false },
			legend: { enabled: false },
			title: {
				// text: this.sex=='f' ? 'Ranking (female)' : 'Ranking (male)'
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
				// formatter: function() {return capitalize(this.point.name) + ' (' + this.point.y + ')'} 
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
				// text: this.sex=='f' ? 'Popularity (female)' : 'Popularity (male)'
				text: 'Ranking'
			},
			subtitle: {
				text: this.sex=='f' ? 'Female' : 'Male',
			},

			series: [{
				color: this.sex=='f' ? this.f_color : this.m_color,
				data: this.sex=='f' ? _.cloneDeep(this.f_data) : _.cloneDeep(this.m_data)
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
			labelRank: 10, 
			dataLabels: {
				enabled:true,
				useHTML: true,
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

class NameChart {
	constructor(id) {		
		this.chart = undefined
		this.m_color = m_color
		this.f_color = f_color

		this.options = {
		    chart: {
				height: '200px',
		        type: 'spline',
		        ignoreHiddenSeries: false,
		        animation: false
		    },
		    credits: { enabled: false },
		    legend: { enabled: false },
		    title: {
				text: 'Prevalence'
			},
		    series: [{
		    	data: [{x:start_year, y: 0}, {x:start_year+num_years, y:0.001}],
		    	visible: false
		    }],
			tooltip: { 
				useHTML: true,
				formatter: function() {return  ((100*this.point.y).toPrecision(2)).toString() + '%'} 
			},		    
		    yAxis: {
				title: {
					text: 'Prevalence'
				},
		    	labels: {
		    		// format: '{value}%'
		    		formatter: function(x) {
		    			return 100*x.value + '%'
		    		},
                    align: 'left',
                    x: 0,
                    y: -5
		    	}
		    }
		}

		this.chart = Highcharts.chart(id, this.options);		
	}

	update(name, data, sex) {
		this.chart.update({
			chart: {
				// animation: true
			},
			title: {
				text: 'Prevalence',
				style: {
					// 'font-size': '14px'
				}			
			},
			subtitle: {
				style: {
					'font-weight': 'bold', 
					'color': sex=='f' ? this.f_color : this.m_color
				},
				text: capitalize(name)
			},
			series: [{
				color: sex=='f' ? this.f_color : this.m_color,
				data: data.map((val,i) => ({x: i+start_year, y: data[i] / (us_pop[i] * 1000000 / 2 ) })), // divide by 2 assumed 50/50 gender split
				visible: true
			}],
		})
		this.chart.update({
			chart: {
				animation: true
			},
		})
	}
}

class AgeChart {
	constructor(id) {
		this.m_color = m_color
		this.f_color = f_color

		this.m_prob = probBirthTo2022(_.range(start_year, start_year+num_years), 'm').reverse()
		this.f_prob = probBirthTo2022(_.range(start_year, start_year+num_years), 'f').reverse()

		this.options = {
		    chart: {
				height: '200px',
		        type: 'spline',
		        ignoreHiddenSeries: false,
		        animation: false
		    },
		    credits: { enabled: false },
		    legend: { enabled: false },
		    title: {
				text: 'Age'
			},			
		    series: [{
		    	data: [{x:0, y: 0}, {x:num_years, y:50000}],
		    	visible: false
		    }],
			tooltip: { 
				useHTML: true,
				formatter: function() {return (parseInt(this.point.y)).toLocaleString('en-US'); } 
			},
			yAxis: {
				labels: {
                    align: 'left',
                    x: 0,
                    y: -5
                },
				title: {
					text: 'Count'
				}
			},
			xAxis: {
				title: {
					text: 'Years old'
				}
			}

		}

		this.chart = Highcharts.chart(id, this.options);
	}

	update(name, data, sex) {
		let prob = sex=='f' ? this.f_prob : this.m_prob

		this.chart.update({
		    series: [{
		    	color: sex=='f' ? this.f_color : this.m_color,
		    	data: data.reverse().map((val,i) => ({ x: i, y: data[i]*prob[i] })),
		    	visible: true
		    }],			
		    title: {
				text: 'Age'
			},

			subtitle: {
				style: {
					'font-weight': 'bold', 
					'color': sex=='f' ? this.f_color : this.m_color
				},				
				text: capitalize(name)
			}

		})
		this.chart.update({
			chart: {
				animation: true
			},
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

	// https://melvingeorge.me/blog/do-multiple-fetch-requests-parallel-javascript
	let path = '/assets/posts/names-analyzer/'
	let fetchReq1 = fetch(path+'female_names.json').then((res) => res.json());
	let fetchReq2 = fetch(path+'female_rank.json').then((res) => res.json());
	let fetchReq3 = fetch(path+'female_data.dat').then((res) => res.arrayBuffer());
	let fetchReq4 = fetch(path+'male_names.json').then((res) => res.json());
	let fetchReq5 = fetch(path+'male_rank.json').then((res) => res.json());
	let fetchReq6 = fetch(path+'male_data.dat').then((res) => res.arrayBuffer());
	let fetchReq7 = fetch(path+'us_pop.json').then((res) => res.json());
	let pageLoad = new Promise((resolve, reject) => {
		window.onload = function() { resolve () }
	})

	Promise.all([pageLoad])
	.then(() => {
		this.nameChart = new NameChart('prevalence')
		this.ageChart = new AgeChart('age')

		// put loading message here
	})

	Promise.all([fetchReq1, fetchReq2, fetchReq3, fetchReq4, fetchReq5, fetchReq6, fetchReq7, pageLoad])
	.then(val => {

		this.f_names = val[0]
		this.f_rank = val[1]
		this.f_data = this.formatData(val[2])

		this.m_names = val[3]
		this.m_rank = val[4]
		this.m_data = this.formatData(val[5])

		us_pop = val[6]
	
		this.f_rankSeries = this.f_names.map((val,i) => ({x: i, y: this.f_rank[i], name: val}))
		this.m_rankSeries = this.m_names.map((val,i) => ({x: i, y: this.m_rank[i], name: val}))
		this.rankChart = new RankChart({id:'rank', 
										f_data:this.f_rankSeries, 
										m_data:this.m_rankSeries, 
										sex:'m'
									})
		
		this.initCallbacks()		
		this.nameChart.chart.reflow()
		this.ageChart.chart.reflow()
	})
	.catch(file => {
		console.log(file + ' failed to load');
	})

	}

	formatData(dataIn) {
		let num_names = dataIn.byteLength / 4 / num_years
		let view = new Int32Array(dataIn) // Convert to 4-byte ints			
		return new Array(num_names) // Convert the name data into subarrays
				.fill('')
				.map((_, i) => view.slice(i * num_years, (i + 1) * num_years));
	}

	initCallbacks() {
		$(".submit-btn").click(evt => {
			this.update()
		})
		$(".name-input").keydown( evt => {
			if (evt.key==='Enter') this.update()
		})		
	}

	update_f(name, series) {
		this.rankChart.update(name,'f')
		this.nameChart.update(name, series, 'f')
		this.ageChart.update(name, series, 'f')
	}
	update_m(name, series) {
		this.rankChart.update(name,'m')
		this.nameChart.update(name, series, 'm')
		this.ageChart.update(name, series, 'm')
	}

	update() {

		let name = $(".name-input").val().toLowerCase();;

		let m_idx = this.m_names.findIndex( i => i==name )		
		let f_idx = this.f_names.findIndex( i => i==name )	
		
		let m_series = m_idx==-1 ? undefined : Array.from(this.m_data[m_idx])
		let f_series = f_idx==-1 ? undefined : Array.from(this.f_data[f_idx])

		$('.guess').css({visibility: 'hidden'})
		$('.no-name').css({visibility: 'hidden'})
		if (m_idx==-1 && f_idx==-1) { // name not in database
			$('.no-name').css({visibility: 'visible'})
			$('.no-name #name').text(name)
			console.log('NAME NOT FOUND')
		}
		else if (m_idx==-1 && f_idx!=-1) { // update female name
			this.update_f(name, f_series)
		}
		else if (m_idx!=-1 && f_idx==-1) { // update male name
			this.update_m(name, m_series)
		}
		else if (m_idx < f_idx) { // ambiguous: guessing MALE
			$('.guess').css({visibility: 'visible'})
			$('#guess-name').text(capitalize(name))
			$('#gender1').text('boy')
			$('#gender2').text('girl')
			$('#gender2').css({color: f_color})
			$('#gender2').click(() => {
				this.update_f(name, f_series)
				$('.guess').css({visibility: 'hidden'})			
			})
			this.update_m(name, m_series)
			console.log('guessing MALE. did you mean FEMALE?')
		}
		else if (m_idx > f_idx) { // ambiguous: guessing FEMALE
			$('.guess').css({visibility: 'visible'})
			$('#guess-name').text(capitalize(name))
			$('#gender1').text('girl')
			$('#gender2').text('boy')
			$('#gender2').css({color: m_color})
			$('#gender2').click(() => {
				this.update_m(name, m_series)
				$('.guess').css({visibility: 'hidden'})			
			})
			this.update_f(name, f_series)
			console.log('guessing FEMALE. did you mean MALE?')
		}
	}

}

var page = new Page()