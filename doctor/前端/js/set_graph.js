function draw(data) {
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: "item"
        },
        // 设置关系图类型
        legend: {
            type: "plain",
            left: "30%"
        },
        series: [{
            zoom: 1,
            roam: true,
            type: 'graph',
            // 设置关系图布局方式为力导向图
            layout: 'force',
            data: data.nodes,
            links: data.links,
            categories: [{
                name: "当前节点",
                symbol: "pin",
                symbolSize: 100,
            }, {
                name: "症状",
            }, {
                name: "治疗建议",
            }, {
                name: "用药建议"
            }, {
                name: "检查建议"
            }],
            force: {
                repulsion: 400,
                friction: 0.1,
                edgeLength: 70
            },
            symbolSize: 40,
            itemStyle: {
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 0.2,
                shadowColor: "rgba(0,0,0,0.5)",
                shadowBlur: 5
            },
            lineStyle: {
                curveness: 0.3
            },
            label: {
                show: true
            },
            labelLayout: {
                hideOverlap: true
            },
            emphasis: {
                lineStyle: {
                    width: 5,
                    color: 'rgba(0,0,0,1)'
                }
            },
            tooltip: {
                //show: false
            },
            animationDurationUpdate: 200
        }] // 设置关系图的布局参数
    };
    myChart.setOption(option);
}