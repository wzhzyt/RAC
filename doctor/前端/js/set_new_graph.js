function new_draw(data) {
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: "item"
        },
        series: [{
            roam: true,
            type: 'graph',
            // 设置关系图布局方式为力导向图
            layout: 'force',
            data: data.nodes,
            links: data.links,
            force: {
                repulsion: 400,
                friction: 0.1,
                edgeLength: 80
            },
            symbolSize: 40,
            itemStyle: {
                color: "rgba(255, 0, 0, 0.75)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 0.2,
                shadowColor: "rgba(0,0,0,0.5)",
                shadowBlur: 5
            },
            lineStyle: {
                curveness: 0.3,
            },
            label: {
                show: true
            },
            edgeLabel:{
              show: true,
              //formatter: "{b}"
            },
            animationDurationUpdate: 200
        }] // 设置关系图的布局参数
    };
    myChart.setOption(option);
}