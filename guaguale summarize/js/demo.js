require([
	'zepto',
	'guaguale',
	'echarts'
	], function($, guaguale, echarts) {
		let echartsDom = document.getElementById('echartsId');
		let echartsInstance = echarts.init(echartsDom);
		let now = new Date();
		let nowDate = {
			year: now.getFullYear(),
			month: +now.getMonth() + 1,
			day : now.getDate(),
		}
		function getVirtulData(year) {
		    year = year || '2017';
		    var date = +echarts.number.parseDate((+year-1) + `-${nowDate.month}-${nowDate.day}`);
		    var end = +echarts.number.parseDate((+year) + `-${nowDate.month}-${nowDate.day}`);
		    var dayTime = 3600 * 24 * 1000;
		    var data = [];
		    for (var time = date; time < end; time += dayTime) {
	        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
	        ]);
		    }
 console.log(data)
		    return data;
		}

		var data = getVirtulData(2017);
		options = {
		    backgroundColor: '#404a59',

		    title: {
		        top: 30,
		        text: '2016年某人每天的步数',
		        subtext: '数据纯属虚构',
		        left: 'center',
		        textStyle: {
		            color: '#fff'
		        }
		    },
		    tooltip : {
		        trigger: 'item'
		    },
		    legend: {
		        top: '30',
		        left: '100',
		        data:['步数', 'Top 12'],
		        textStyle: {
		            color: '#fff'
		        }
		    },
		    calendar: [{
		        top: 100,
		        left: 'center',
		        range: [`${+ nowDate.year - 1}-${nowDate.month}-${nowDate.day}`, `${+ nowDate.year}-${nowDate.month}-${nowDate.day}`],
		        splitLine: {
		            show: true,
		            lineStyle: {
		                color: '#000',
		                width: 4,
		                type: 'solid'
		            }
		        },
		        yearLabel: {
		            formatter: '{start}  1st',
		            textStyle: {
		                color: '#fff'
		            }
		        },
		        itemStyle: {
		            normal: {
		                color: '#323c48',
		                borderWidth: 1,
		                borderColor: '#111'
		            }
		        }
		    }],
		    series : [
		        {
		            name: '步数',
		            type: 'scatter',
		            coordinateSystem: 'calendar',
		            data: data,
		            symbolSize: function (val) {
		                return val[1] / 500;
		            },
		            itemStyle: {
		                normal: {
		                    color: '#ddb926'
		                }
		            }
		        },
		        {
		            name: '步数',
		            type: 'scatter',
		            coordinateSystem: 'calendar',
		            calendarIndex: 1,
		            data: data,
		            symbolSize: function (val) {
		                return val[1] / 500;
		            },
		            itemStyle: {
		                normal: {
		                    color: '#ddb926'
		                }
		            }
		        },
		        {
		            name: 'Top 12',
		            type: 'effectScatter',
		            coordinateSystem: 'calendar',
		            calendarIndex: 1,
		            data: data.sort(function (a, b) {
		                return b[1] - a[1];
		            }).slice(0, 12),
		            symbolSize: function (val) {
		                return val[1] / 500;
		            },
		            showEffectOn: 'render',
		            rippleEffect: {
		                brushType: 'stroke'
		            },
		            hoverAnimation: true,
		            itemStyle: {
		                normal: {
		                    color: '#f4e925',
		                    shadowBlur: 10,
		                    shadowColor: '#333'
		                }
		            },
		            zlevel: 1
		        },
		        {
		            name: 'Top 12',
		            type: 'effectScatter',
		            coordinateSystem: 'calendar',
		            data: data.sort(function (a, b) {
		                return b[1] - a[1];
		            }).slice(0, 12),
		            symbolSize: function (val) {
		                return val[1] / 500;
		            },
		            showEffectOn: 'render',
		            rippleEffect: {
		                brushType: 'stroke'
		            },
		            hoverAnimation: true,
		            itemStyle: {
		                normal: {
		                    color: '#f4e925',
		                    shadowBlur: 10,
		                    shadowColor: '#333'
		                }
		            },
		            zlevel: 1
		        }
		    ]
		};
		echartsInstance.on("click", function(e){
			console.log(e, "param");
		})

		echartsInstance.setOption(options);
	});