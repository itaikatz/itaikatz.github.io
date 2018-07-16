function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}

$(document).ready(function() {

$('#collapseOne').on('show.bs.collapse', function () {
  $(".panel-fade").css("background-image", "none");
})
$('#collapseOne').on('hidden.bs.collapse', function () {
  $(".panel-fade").css("background-image", "linear-gradient(to bottom, transparent, #656565)");
})




female_actuarial = {﻿0:1,1:0.99469,2:0.99434,3:0.99412,4:0.99396,5:0.99383,6:0.99372,7:0.99361,8:0.99351,9:0.99342,10:0.99334,11:0.99325,12:0.99317,13:0.99307,14:0.99294,15:0.99279,16:0.9926,17:0.99237,18:0.9921,19:0.9918,20:0.99146,21:0.99109,22:0.99069,23:0.99025,24:0.98978,25:0.98929,26:0.98877,27:0.98822,28:0.98765,29:0.98705,30:0.98641,31:0.98575,32:0.98505,33:0.98431,34:0.98351,35:0.98266,36:0.98175,37:0.98076,38:0.9797,39:0.97856,40:0.97735,41:0.97604,42:0.97463,43:0.97311,44:0.97146,45:0.96966,46:0.96771,47:0.96559,48:0.96327,49:0.96072,50:0.95794,51:0.95488,52:0.95155,53:0.94794,54:0.94405,55:0.93987,56:0.93539,57:0.93057,58:0.92542,59:0.91997,60:0.9142,61:0.90809,62:0.90157,63:0.89461,64:0.88715,65:0.87914,66:0.87049,67:0.86114,68:0.85102,69:0.84006,70:0.82818,71:0.81525,72:0.80117,73:0.78591,74:0.76947,75:0.75182,76:0.7328,77:0.71225,78:0.69008,79:0.66621,80:0.64059,81:0.61304,82:0.5835,83:0.55213,84:0.51913,85:0.48467,86:0.44889,87:0.41191,88:0.37394,89:0.33531,90:0.2965,91:0.25811,92:0.22083,93:0.18536,94:0.1524,95:0.1225,96:0.0962,97:0.07378,98:0.05525,99:0.04043,100:0.02893,101:0.02021,102:0.01375,103:0.00909,104:0.00583,105:0.00361,106:0.00215,107:0.00123,108:0.00067,109:0.00035,110:0.00017,111:0.00008,112:0.00003,113:0.00001,114:0,115:0,116:0,117:0,118:0,119:0}
clara_count = {1880: 1226, 1881: 1242, 1882: 1490, 1883: 1548, 1884: 1852, 1885: 1910, 1886: 1916, 1887: 1984, 1888: 2230, 1889: 2319, 1890: 2496, 1891: 2360, 1892: 2661, 1893: 2532, 1894: 2603, 1895: 2613, 1896: 2582, 1897: 2454, 1898: 2731, 1899: 2441, 1900: 2826, 1901: 2319, 1902: 2432, 1903: 2342, 1904: 2281, 1905: 2397, 1906: 2228, 1907: 2319, 1908: 2352, 1909: 2403, 1910: 2665, 1911: 2691, 1912: 3480, 1913: 3633, 1914: 4240, 1915: 5285, 1916: 5544, 1917: 5626, 1918: 5778, 1919: 5404, 1920: 5470, 1921: 5606, 1922: 5125, 1923: 5134, 1924: 4989, 1925: 4775, 1926: 4463, 1927: 4367, 1928: 4102, 1929: 4149, 1930: 4123, 1931: 3900, 1932: 3561, 1933: 3414, 1934: 3223, 1935: 3067, 1936: 2682, 1937: 2573, 1938: 2662, 1939: 2450, 1940: 2315, 1941: 2299, 1942: 2247, 1943: 2083, 1944: 1933, 1945: 1799, 1946: 1914, 1947: 1934, 1948: 1793, 1949: 1711, 1950: 1573, 1951: 1549, 1952: 1510, 1953: 1384, 1954: 1184, 1955: 1297, 1956: 1148, 1957: 1109, 1958: 1030, 1959: 982, 1960: 914, 1961: 879, 1962: 797, 1963: 751, 1964: 698, 1965: 569, 1966: 551, 1967: 512, 1968: 416, 1969: 416, 1970: 357, 1971: 338, 1972: 366, 1973: 332, 1974: 316, 1975: 337, 1976: 312, 1977: 297, 1978: 287, 1979: 342, 1980: 391, 1981: 320, 1982: 326, 1983: 310, 1984: 319, 1985: 357, 1986: 387, 1987: 404, 1988: 418, 1989: 424, 1990: 466, 1991: 525, 1992: 536, 1993: 593, 1994: 588, 1995: 659, 1996: 664, 1997: 649, 1998: 762, 1999: 784, 2000: 869, 2001: 954, 2002: 1024, 2003: 1053, 2004: 1163, 2005: 1324, 2006: 1494, 2007: 1549, 2008: 1647, 2009: 1647, 2010: 1838, 2011: 2073, 2012: 2332, 2013: 2504, 2014: 2848, 2015: 3058}
lillian_count = {1880: 672, 1881: 723, 1882: 830, 1883: 907, 1884: 1109, 1885: 1143, 1886: 1282, 1887: 1308, 1888: 1656, 1889: 1640, 1890: 1862, 1891: 1812, 1892: 2154, 1893: 2193, 1894: 2441, 1895: 2495, 1896: 2702, 1897: 2683, 1898: 3061, 1899: 2703, 1900: 3414, 1901: 2681, 1902: 3063, 1903: 2972, 1904: 3139, 1905: 3185, 1906: 3293, 1907: 3542, 1908: 3634, 1909: 3596, 1910: 4127, 1911: 4367, 1912: 5568, 1913: 6015, 1914: 7354, 1915: 9546, 1916: 9592, 1917: 9843, 1918: 9986, 1919: 9515, 1920: 10049, 1921: 9769, 1922: 9428, 1923: 9327, 1924: 9097, 1925: 8353, 1926: 7661, 1927: 7184, 1928: 6573, 1929: 5711, 1930: 5449, 1931: 4806, 1932: 4352, 1933: 3998, 1934: 3972, 1935: 3423, 1936: 3116, 1937: 2899, 1938: 2824, 1939: 2554, 1940: 2523, 1941: 2460, 1942: 2489, 1943: 2394, 1944: 2118, 1945: 2017, 1946: 2159, 1947: 2089, 1948: 2115, 1949: 1944, 1950: 1885, 1951: 1825, 1952: 1730, 1953: 1659, 1954: 1631, 1955: 1654, 1956: 1629, 1957: 1603, 1958: 1420, 1959: 1469, 1960: 1431, 1961: 1309, 1962: 1307, 1963: 1167, 1964: 1063, 1965: 1015, 1966: 879, 1967: 841, 1968: 814, 1969: 773, 1970: 782, 1971: 676, 1972: 620, 1973: 564, 1974: 482, 1975: 454, 1976: 479, 1977: 470, 1978: 398, 1979: 439, 1980: 510, 1981: 518, 1982: 474, 1983: 451, 1984: 468, 1985: 542, 1986: 553, 1987: 531, 1988: 646, 1989: 695, 1990: 722, 1991: 768, 1992: 749, 1993: 736, 1994: 881, 1995: 942, 1996: 1127, 1997: 1393, 1998: 1716, 1999: 2190, 2000: 2598, 2001: 2949, 2002: 3396, 2003: 4029, 2004: 4731, 2005: 5211, 2006: 6230, 2007: 6547, 2008: 6807, 2009: 6853, 2010: 6950, 2011: 6914, 2012: 7153, 2013: 7066, 2014: 6905, 2015: 6597}
amelia_count = {1880: 221, 1881: 235, 1882: 252, 1883: 262, 1884: 315, 1885: 298, 1886: 326, 1887: 344, 1888: 358, 1889: 346, 1890: 368, 1891: 353, 1892: 385, 1893: 385, 1894: 390, 1895: 379, 1896: 365, 1897: 408, 1898: 360, 1899: 332, 1900: 398, 1901: 350, 1902: 355, 1903: 347, 1904: 353, 1905: 365, 1906: 358, 1907: 380, 1908: 370, 1909: 388, 1910: 449, 1911: 430, 1912: 672, 1913: 721, 1914: 926, 1915: 1115, 1916: 1159, 1917: 1160, 1918: 1115, 1919: 1085, 1920: 1054, 1921: 995, 1922: 1032, 1923: 965, 1924: 911, 1925: 889, 1926: 745, 1927: 755, 1928: 755, 1929: 687, 1930: 680, 1931: 591, 1932: 637, 1933: 608, 1934: 553, 1935: 604, 1936: 580, 1937: 646, 1938: 570, 1939: 489, 1940: 504, 1941: 529, 1942: 543, 1943: 560, 1944: 475, 1945: 475, 1946: 547, 1947: 538, 1948: 564, 1949: 588, 1950: 483, 1951: 533, 1952: 550, 1953: 550, 1954: 511, 1955: 530, 1956: 525, 1957: 522, 1958: 483, 1959: 501, 1960: 541, 1961: 572, 1962: 494, 1963: 503, 1964: 502, 1965: 475, 1966: 430, 1967: 450, 1968: 390, 1969: 465, 1970: 493, 1971: 483, 1972: 406, 1973: 441, 1974: 507, 1975: 524, 1976: 523, 1977: 601, 1978: 642, 1979: 703, 1980: 768, 1981: 849, 1982: 834, 1983: 759, 1984: 1094, 1985: 1014, 1986: 1018, 1987: 1006, 1988: 1128, 1989: 1265, 1990: 1511, 1991: 1535, 1992: 1344, 1993: 1248, 1994: 1253, 1995: 1206, 1996: 1289, 1997: 1316, 1998: 1422, 1999: 1419, 2000: 1531, 2001: 1634, 2002: 2440, 2003: 3093, 2004: 3350, 2005: 3906, 2006: 4061, 2007: 4192, 2008: 4346, 2009: 4695, 2010: 5455, 2011: 6365, 2012: 7240, 2013: 8030, 2014: 8781, 2015: 9838}

var optionsDefault = {  
	chart: { 
		/* backgroundColor: '#252525', */ 
		//height: null,
		spacingTop: 30,
	},
	title: {
		text: '',
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
		// min: 0,
		// max: 90,
		// tickInterval: 10,
		gridLineWidth: 0
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
// Highcharts.setOptions(optionsDefault);


	function buildSingleNameChart(name, sex, data) {
		var options = {
		    chart: {
				height: '200px',
		        type: 'spline'
		    },
		    credits: { enabled: false },
		    legend: { enabled: false },
		    tooltip: {
		    	// formatter: function () {
       //             return (100*this.y).toPrecision(1) + ' %';
       //          }
               formatter: function() {
			        // var s = '<b>'+ this.x +'</b>';
			        var s = this.x;
			        s += '<br/> <b>' + (100*this.y).toPrecision(1) + ' %</b>';
			        // $.each(this.points, function(i, point) {
			        //     s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + (100*this.y).toPrecision(1) + ' %</b>';
			        // });

			        return s;
			    }, 

		    },
		    title: {
				text: name
			},
		    series: [{
		    	data: []
		    }],
		    yAxis: {
    			max: 0.1,
    			labels: {
    				formatter: function () {
                		return (100*this.value).toPrecision(2) + ' %';
                	}
    			},
    			title: {  text: "Prevalence (%)" }
    		},
		};
		if (sex=='M') {
			options.series[0].color = '#7cb5ec';
			options.yAxis.max = 0.1;
		} else {
			options.series[0].color = '#f7a35c';			
			options.yAxis.max = 0.02;
		}

		$.each(data, function(x, y) { 
			options.series[0].data.push({'x': parseFloat(x), 'y': parseFloat(y)}); 
		})

		return options;
	}

	function buildDoubleNameChart(name, mData, fData) {
		var options = {
		    chart: {
				height: '200px',
		        type: 'spline'
		    },
		    credits: { enabled: false },
		    legend: { enabled: true },
		    tooltip: {
			       formatter: function() {
			        // var s = '<b>'+ this.x +'</b>';
			        var s = this.x;
			        $.each(this.points, function(i, point) {
			            s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + (100*this.y).toPrecision(1) + ' %</b>';
			        });

			        return s;
			    }, 
                shared: true
		    },
		    title: {
				text: name
			},
		    series: [
			    { name: 'Male', color: '#7cb5ec', data: [], marker: {enabled: false} },
				{ name: 'Female', color: '#f7a35c', data: [], marker: {enabled: false}  }
		    ],
		    yAxis: {
    			labels: {
    				formatter: function () {
                		return (100*this.value).toPrecision(2) + ' %';
                	}
    			},
    			title: {  text: "Prevalence (%)" }
	    	
    			//max: 0.1
    		},
		};

		$.each(mData, function(x, y) { 
			options.series[0].data.push({'x': parseFloat(x), 'y': parseFloat(y)}); 
		})
		$.each(fData, function(x, y) { 
			options.series[1].data.push({'x': parseFloat(x), 'y': parseFloat(y)}); 
		})		

		return options;
	}

	singleNameData = {};
	doubleNameData = {};
	$.getJSON('/assets/posts/names/result.json', function (data) {
		$.each(data, function(i, el) {
			var options = buildSingleNameChart(el.name, el.sex, el.data);
			switch(el.name) {
				case 'William':
				case 'Michael':
				case 'Noah':
				case 'Mason':
				case 'Emma':
				case 'Olivia':
				case 'Isabella':
				case 'Harper':
					singleNameData[el.name] = {};
					singleNameData[el.name][el.sex] = el.data;
					break;
				// case 'Lauren':
				// case 'Ashley':
				// case 'Allison':
				// case 'Meredith':
				// case 'Whitney':
				// case 'Beverly':
				// case 'Jessie':
				// case 'Dakota':
				case 'Rory':
					// Highcharts.chart('rory', options, function(chart) {
						// var point = chart.series[0].data[6],
						// x = point.plotX + chart.plotLeft,
						// y = point.plotY + chart.plotTop,
						// text = chart.renderer.text('Splash<br>(1984)', x-60, y-60).attr({zIndex: 5}).add();
						// box = text.getBBox();
						// chart.renderer.path(['M', box.x+0.5*box.width, box.y+box.height, 'L', x, y])	
					// })
				case 'Leslie':
				// case 'Jackie':
				case 'Jaime':
				case 'Jamie':
					if (!doubleNameData[el.name]) doubleNameData[el.name] = {};
					doubleNameData[el.name][el.sex] = el.data;		
					console.log(el.data)
					break;			
				case 'Madison' : 
					Highcharts.chart('madison', options, function(chart) {
						var point = chart.series[0].data[6],
						x = point.plotX + chart.plotLeft,
						y = point.plotY + chart.plotTop,
						text = chart.renderer.text('Splash<br>(1984)', x-60, y-60).attr({zIndex: 5}).add();
						box = text.getBBox();
						chart.renderer.path(['M', box.x+0.5*box.width, box.y+box.height, 'L', x, y])						
						.attr({
	                        'stroke-width': 1,
	                        stroke: 'silver',
	                        dashstyle: 'solid'
                    	}).add();
						chart.update({
							yAxis: { max: 0.012 },
							chart: { height: null }
						}, true);						
					}); 
					break;														
				case 'Samantha' : 
					Highcharts.chart('samantha', options, function(chart) {
						var point = chart.series[0].data[84],
						x = point.plotX + chart.plotLeft,
						y = point.plotY + chart.plotTop,
						text = chart.renderer.text('Bewitched<br>(1964)', x-60, y-60).attr({zIndex: 5}).add();
						box = text.getBBox();
						chart.renderer.path(['M', box.x+0.5*box.width, box.y+box.height, 'L', x, y])						
						.attr({
	                        'stroke-width': 1,
	                        stroke: 'silver',
	                        dashstyle: 'solid'
                    	}).add();
						chart.update({
							yAxis: { max: 0.012 }
						});
					}); 
					break;		
				case 'Isis': 
					Highcharts.chart('isis', options, function(chart) {
						chart.series[0].update({
							marker: {
								enabled: false
							}
						}, false)
						chart.update({
							yAxis: { max: 0.0003 }
						}, true);
						var point = chart.series[0].data[32],
						x = point.plotX + chart.plotLeft,
						y = point.plotY + chart.plotTop,
						text = chart.renderer.text('ISIS declares<br>caliphate (2014)', x-80, y-40).attr({zIndex: 5}).add();
						// text = chart.renderer.label('Hurricane\nKatrina (2005)', x-60, y-60).attr({zIndex: 5}).add();
						box = text.getBBox();
						chart.renderer.path(['M', box.x+0.5*box.width, box.y+box.height, 'L', x, y])						
						.attr({
	                        'stroke-width': 1,
	                        stroke: 'silver',
	                        dashstyle: 'solid'
                    	}).add();												
					}); 
					break;		
				case 'Katrina': 
					Highcharts.chart('katrina', options, function(chart) {
						chart.update({
							yAxis: { max: 0.002 }
						}, true);
						var point = chart.series[0].data[54],
						x = point.plotX + chart.plotLeft,
						y = point.plotY + chart.plotTop,
						text = chart.renderer.text('Hurricane<br>Katrina (2005)', x-60, y-60).attr({zIndex: 5}).add();
						// text = chart.renderer.label('Hurricane\nKatrina (2005)', x-60, y-60).attr({zIndex: 5}).add();
						box = text.getBBox();
						chart.renderer.path(['M', box.x+0.5*box.width, box.y+box.height, 'L', x, y])						
						.attr({
	                        'stroke-width': 1,
	                        stroke: 'silver',
	                        dashstyle: 'solid'
                    	}).add();												
					}); 
					break;	
					case 'Amelia':
					/*
						Highcharts.chart('clara', options, function(chart) {
							chart.update({
								yAxis: { max: 0.005 }
							}, true);							
						});

						data = []
						$.each(amelia_count, function(x, y) {
							// data.push(y*parseFloat(female_actuarial[2016-x]))
							data.push({'x': x-2016, 'y': y*parseFloat(female_actuarial[2016-x])})
							// console.log(y + ': ' + parseFloat(female_actuarial[2016-x]) )
						})

						Highcharts.chart('clara-age', {
							chart: { type: 'area' },
							title: { text: 'Amelia (age)' },
							plotOptions: {
						        area: { pointStart: 1880 }
						    },
							series: [{
								name: 'Clara',
								data: data
							}]
						});
						*/
						break;

			}
		});
		
		for(name in singleNameData) {
			for( sex in singleNameData[name]) {
				if (sex=='M') {
					root = $("#male-single")
				} else {
					root = $("#female-single")
				}
				root.append('<div class="col-6 col-md-3"> <div class="names-chart" id="' + name + '"></div> </div>');
				var options = buildSingleNameChart(name, sex, singleNameData[name][sex]);
				Highcharts.chart(name, options);
			}
		}

		for (name in doubleNameData) {
			console.log('double name: ' + name)
			switch (name) {
				case 'Leslie':
				// case 'Jessie':
				// case 'Dakota':
				case 'Jackie':
				case 'Rory':
					$("#male-female").append('<div class="col-6"> <div class="names-chart" id="' + name + '"></div> </div>');
					break;
				case 'Jaime':
				case 'Jamie':
					$("#jaime-jamie").append('<div class="col-6"> <div class="names-chart" id="' + name + '"></div> </div>');					
					break;
			}

			var options = buildDoubleNameChart(name, doubleNameData[name]['M'], doubleNameData[name]['F']);
			Highcharts.chart(name, options);

			if (name=='Rory')
			{
				Highcharts.chart('Rory', options, function(chart) {
					chart.update({
						xAxis: { 
							plotLines: [{
								color: 'silver',
								dashStyle: 'dash',
							    value: 2000,
							    width: 1 
							}]
						}
					}, true);
					var point = chart.series[0].data[10],
					x = point.plotX + chart.plotLeft,
					y = point.plotY + chart.plotTop,
					// text = chart.renderer.text('Splash<br>(1984)', x-60, y-60).attr({zIndex: 5}).add();
					text = chart.renderer.text('\'Gilmore Girls\'<br>premiers', x, y-45).attr({zIndex: 5}).add();
					box = text.getBBox();
					// chart.renderer.path(['M', box.x+0.5*box.width, box.y+box.height, 'L', x, y])	
					// chart.renderer.path(['M', x, box.y+box.height, 'L', x, chart.plotTop])	
					// 	.attr({
					// 		'stroke-width': 1,
					// 		stroke: 'silver',
					// 		dashstyle: 'solid'
					// 	}).add();	
				})
			}

		}



		// var opt_base = {
		// 	val1: 'a'
		// };
		// var opt_deriv1 =  {
		// 	val1: 'b'
		// };
		// var opt_deriv2 =  {
		// 	val1: 'c'
		// };

		// opt_deriv1 = jQuery.extend(true, {}, opt_base, opt_deriv1);
		// opt_deriv2 = jQuery.extend(true, {}, opt_base, opt_deriv2);
		// console.log(opt_deriv1.val1)
		// console.log(opt_deriv2.val1)
		// console.log(opt_base.val1)
	});

/*
	Highcharts.chart('fed-salary-chart', {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'Federal salary (by pay grade)'
		    },
		    xAxis: {
		    	title: { text: 'Pay grade (GS schedule)' },
		        categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15']
		    },
		    yAxis: {
		    	title: { text: 'Salary ($USD)' },
		    },

		    credits: {
		        enabled: false
		    },

		    series: [{
		        name: 'Male',
		        color: '#7cb5ec',
		        data: [21464.97338,
						24735.58315,
						27032.97891,
						31291.20607,
						36309.1374,
						42294.26451,
						46400.89478,
						53887.45937,
						57793.42737,
						65023.13156,
						70477.34584,
						86423.5256,
						104760.0865,
						126239.7624,
						150187.7794
						]
		    }, {
		        name: 'Female',
		        color: '#f7a35c',
		        data: [21854.0172,
						24515.60172,
						27260.61798,
						32199.21674,
						37227.47243,
						43762.9881,
						47946.03604,
						55219.39615,
						58546.7157,
						67170.19257,
						70989.8607,
						86997.81606,
						104921.4385,
						125367.7933,
						149397.8391
						]
		    }]
		});

	Highcharts.chart('fed-count-chart', {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'Federal employee count (by pay grade)'
		    },
		    xAxis: {
		    	title: { text: 'Pay grade (GS schedule)' },
		        categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15']
		    },
		    yAxis: {
		    	title: { text: 'Employee Count' },
		    },

		    credits: {
		        enabled: false
		    },

		    series: [{
		        name: 'Male',
		        color: '#7cb5ec',
		        data: [219.3669188,
						486.6447506,
						3483.629431,
						10062.29595,
						19974.83789,
						18769.79264,
						22287.64596,
						9146.513827,
						24750.0849,
						3096.948633,
						38070.24461,
						50547.93204,
						52497.60716,
						35247.19331,
						23006.87373
						]
		    }, {
		        name: 'Female',
		        color: '#f7a35c',
		        data: [207.6330812,
						557.3552494,
						2675.370569,
						10967.70405,
						28072.16211,
						37344.20736,
						30913.35404,
						15291.48617,
						30968.9151,
						3600.051367,
						48531.75539,
						56992.06796,
						52791.39284,
						29354.80669,
						16078.12627
						]
		    }]
		});
		
	Highcharts.chart('fed-salary-by-occupation', {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'Federal salary (by occupation)'
		    },
		    xAxis: {
		    	title: { text: 'Occupation' },
		    	labels: { rotation: -45, },
		        categories: ['GENERAL PHYSICAL SCIENCE',
							'NURSE',
							'COMPUTER SCIENCE',
							'MISCELLANEOUS CLERK AND ASSISTANT',
							'MANAGEMENT AND PROGRAM ANALYSIS',
							'GENERAL ATTORNEY',
							'MEDICAL OFFICER',
							'ACCOUNTING',
							'AIR TRAFFIC CONTROL',
							]
		    },
		    yAxis: {
		    	title: { text: 'Salary ($USD)' },
		    },

		    credits: {
		        enabled: false
		    },

		    series: [{
		        name: 'Male',
		        color: '#7cb5ec',
		        data: [120001.3832,
						82342.75568,
						128318.5263,
						41777.45625,
						103593.8407,
						138621.2127,
						220272.315,
						118209.013,
						124538.4357,
						]
		    }, {
		        name: 'Female',
		        color: '#f7a35c',
		        data: [111669.3429,
						86001.45944,
						126991.6963,
						43709.80529,
						99646.68558,
						131421.9508,
						205427.6212,
						107521.4492,
						121821.1303,
						]
		    }]
		});		
*/
 Highcharts.chart('gender-ratio-chart', {
        chart: {
            type: 'bar',
            height: 350
        },
        title: {
    		text: null
    	},
		credits: {
			enabled: false
		},    	
		tooltip: {
			enabled: false
		},
        colors: ['#7cb5ec', '#f7a35c'],
	    xAxis: {
	    	visible: false,
            categories: ['Samantha', 'Courtney', 'Tracy', 'Jessie', 'Casey', 'Jordan', 'Terry', 'Charlie', 'Nathan', 'Jacob', 'Hayden', 'Sofia'],
            reversed: false,
            labels: {
                step: 1
            }
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return this.value==0 ? 0 : Math.abs(this.value)/1000 + 'k';
                }
            }
        },

        plotOptions: {
            series: {
        	  // dataLabels: {
           //          enabled: true,
           //          inside: true,
           //          formatter: function() {return this.x}
           //      },
                stacking: 'normal',
    	        pointWidth: 20
	    	}
        },
        series: [{
            name: 'Male',
            data: [-1193, -22428, -61063, -109567, -109115, -358936, -421822, -164506, -527156, -891717, -91510, -106],
             dataLabels: {
                    enabled: true,
                    inside: false,
                    formatter: function() {return this.x}
                },
	   
        }, {
            name: 'Female',
            data: [561382, 256667, 250591, 166094, 75405, 128149, 96866, 19395, 1724, 2213, 22622, 108906]
        }]
    });

Highcharts.chart('classifier-chart', {
    title: {
    	text: null
    },
    credits: {
      enabled: false
  	},
    chart: {
    	// inverted: true,
    	height: 200,
    	// backgroundColor: 'transparent'
    },
    legend: {
    	enabled: false
    },
    xAxis: {
	        categories: ['Jacob', 'Hayden', 'Casey', 'Jessie', 'Tracy', 'Sofia'],
	        visible: true,
	        lineWidth: 1,
	        gridLineWidth: 0,
	        tickLength: 5,
	        tickmarkPlacement: 'on',
	        lineColor: 'silver'	,
        },
    yAxis: [
    	{
    		title: {
    			text: 'Probability (Male)',
    			style: {
    				color: '#7cb5ec'
    			}			
    		},
			labels: {
				enabled: true,
			    formatter: function () {
			        return this.value + '%';
			    }
			},
			tickPositions: [0,20,40,60,80,100],
		},
		{
			title: {
    			text: 'Probability (Female)',
    			style: {
					color: '#f7a35c'
    			}
    		},

			labels: {
				enabled: true,
			    formatter: function () {
			        return (100-this.value) + '%';
			    },
			    style: {
			    	// color: '#f7a35c'
			    },
			},
			tickPositions: [0,20,40,60,80,100],
			opposite: true,
		}
	],
    series: [{
        data: [
	        {y:100-.24, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .055)}}, 
	        {y:100-19.8, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .055)}}, 
	        {y:100-40.8, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .055)}}, 
        	{y:100-60.25, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .299)}}, 
        	{y:100-80.4, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .715)}}, 
        	{y:100-99.9, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .904)}}
    	],
        lineWidth: 0,
        marker: {
            enabled: true,
            radius: 10
        },
        states: {
	        hover: {
	        	lineWidth: 0,
	        	lineWidthPlus: 0
	        }
    	}
    },
    { 
    	marker: {
    		enabled: false
    	},
    	states: {
	        hover: {
	        	enabled: false,
	        	// lineWidth: 0,
	        	// lineWidthPlus: 0
	        }
    	},
    	lineWidth: 0,
    	data: [0,50],
    	// visible: false,
    	yAxis:1
    }]    
        

});

/*
Highcharts.chart('classifier-chart2', {

    title: {
    	text: null
    },
    credits: {
      enabled: false
  	},
    chart: {
    	// inverted: true,
    	height: 200,
    	// backgroundColor: 'transparent'
    },
    legend: {
    	enabled: false
    },
    yAxis: {
    	visible: true,
    	gridLineWidth: 0,
    	min: 0,
    	max: 100,
    	labels: {
    		enabled: false
    	},
    	title: {
    		text: null
    	},
    	plotLines: [{
				color: 'silver',
				dashStyle: 'dash',
			    value: 50,
			    width: 1 
			}]

    },
    xAxis: [
    	{
	        categories: ['Jacob', 'Hayden', 'Casey', 'Jessie', 'Tracy', 'Sofia'],
	        visible: true,
	        lineWidth: 2,
	        gridLineWidth: 1,
	        tickLength: 0,
	        tickmarkPlacement: 'on',
	        lineColor: '#7cb5ec',
        },
        {
            visible: true,
	        lineWidth: 2,
	        tickLength: 0,
	        tickmarkPlacement: 'on',
	        lineColor: '#f7a35c',
	        opposite: true,
        }
    ],
    series: [{
        data: [
	        {y:.24, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .055)}}, 
	        {y:19.8, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .055)}}, 
	        {y:40.8, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .055)}}, 
        	{y:60.25, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .299)}}, 
        	{y:80.4, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .715)}}, 
        	{y:99.9, marker: {fillColor: blendColors('#7cb5ec', '#f7a35c', .904)}}
    	],
        lineWidth: 0,
        marker: {
            enabled: true,
            radius: 10
        },
        states: {
	        hover: {
	        	lineWidth: 0,
	        	lineWidthPlus: 0
	        }
    	}
    }]
});
*/
	// Highcharts.chart('classifier-chart', {
	//     chart: {
	//         type: 'bar'
	//     },
	//     // title: {
	//     //     text: 'Stacked bar chart'
	//     // },
	//     xAxis: {
	//         categories: ['Name1', 'Name2', 'Name3', 'Name4', 'Name5']
	//     },
	//     yAxis: {
	//         min: 0,
	//         max: 100,
	//         title: {
	//             text: 'Male/Female probability'
	//         }
	//     },
	//     legend: {
	//         reversed: true
	//     },
	//     plotOptions: {
	//         series: {
	//             stacking: 'normal'
	//         }
	//     },
	//     series: [{
	//         name: 'Male',
	//         data: [50, 30, 40, 70, 20]
	//     }, {
	//         name: 'Female',
	//         data: [50, 70, 60, 30, 80]
	//     }]
	// });
});
