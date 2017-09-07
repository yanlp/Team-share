const funnel = {
	options: {
		title: {
			text: '漏斗图',
			subtext: '纯属虚构'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c}%"
		},
		toolbox: {
			feature: {
				dataView: {
					readOnly: false
				},
				restore: {},
				saveAsImage: {}
			}
		},
		legend: {
			show:true,
			left:10,
			top:20,
			orient:'vertical',
			align:'left',
			itemGap:20,
			selectedMode:"multiple",
			inactiveColor:"pink",
			selected:{
				'展现':true,
				'访问':false
			},
			textStyle:{
				color:"#0ae",
				fontWeight:"bolder",
				fontSize:14
			},
			formatter:(name)=>{
				console.log(this);
				// console.log(echarts.format);
				return `Legend-${name}`;
			},
			tooltip:{
				show:true,
				formatter:(name)=>{
					// return ECharts.format.truncateText(name,40,'14px Microsoft Yahei',"^")
				}
			},
			backgroundColor:"#f0b",
			data: [{
				name:"展现",
				icon:"circle",
				textStyle:{
					color:"#f78"
				}
			}, '点fkj击', '访问', '咨询', '订单']
		},
		calculable: true,
		series: [{
			name: '漏斗图',
			type: 'funnel',
			left: '10%',
			top: 60,
			//x2: 80,
			bottom: 60,
			width: '80%',
			// height: {totalHeight} - y - y2,
			min: 0,
			max: 100,
			minSize: '0%',
			maxSize: '100%',
			sort: 'descending',
			gap: 2,
			label: {
				normal: {
					show: true,
					position: 'inside'
				},
				emphasis: {
					textStyle: {
						fontSize: 20
					}
				}
			},
			labelLine: {
				normal: {
					length: 10,
					lineStyle: {
						width: 1,
						type: 'solid'
					}
				}
			},
			itemStyle: {
				normal: {
					borderColor: '#fff',
					borderWidth: 1
				}
			},
			data: [{
				value: 60,
				name: '访问'
			}, {
				value: 40,
				name: '咨询'
			}, {
				value: 20,
				name: '订单'
			}, {
				value: 80,
				name: '点fkj击'
			}, {
				value: 100,
				name: '展现'
			}]
		}]
	}
}
export default funnel;