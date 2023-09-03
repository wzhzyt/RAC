var myChart

window.addEventListener('DOMContentLoaded', function () {
    // 检查 main 容器中是否存在 cardContainer 容器
    if (!document.getElementById('main').querySelector('#cardContainer')) {
        // 如果不存在，执行以下代码

        // 添加 resize 监听，当窗口大小改变时重新绘制图表
        window.addEventListener('resize', function () {
            myChart.resize();
        });
    }
});


function sankey_draw(data) {
    if (document.getElementById('main').querySelector('#cardContainer')) {
        var mainDiv = document.getElementById("main");
        mainDiv.innerHTML = '';
    }
    if(myChart){
        myChart.dispose();
    }
    myChart = echarts.init(document.getElementById('main'));
    // 创建一个按钮元素
    var toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButton';
    toggleButton.className = 'btn btn-primary btn-floating toggle-button';
    toggleButton.textContent = '文章搜寻';
    toggleButton.addEventListener("click", function() {
        card_draw(cardData, 3);
    });

    // 将按钮添加到 main 容器中
    document.getElementById('main').appendChild(toggleButton);

    var option;
    // 修改节点数据，为每个节点添加 click 属性
    data.nodes.forEach(function(node) {
        node.click = function(params) {
            // 这里是节点点击时的处理逻辑，可以根据实际情况进行修改
            var updatedOptions = {
                says: [],
                reply: []
            };

            // 为每个 reply 元素生成一个回复选项
            node.reply.forEach(function(replyItem) {``
                updatedOptions.reply.push({
                    answer: "over",
                    question: replyItem
                });
            });
            

            // 隐藏原来的气泡
            var replyBubbles = document.querySelectorAll('.bubble.reply.say:not(.reply-freeform):not(.bubble-hidden)');
            replyBubbles.forEach(function(bubble) {
                bubble.classList.add('bubble-hidden');
            });

            chatWindow.reply(updatedOptions);
        };
    });

    option = {
        backgroundColor: '#fff',
        // title: {
        //     subtext: 'Data From lisachristina1234 on GitHub',
        //     left: 'center'
        // },
        series: [
            {
            type: 'sankey',
            left: 50.0,
            top: 20.0,
            right: 150.0,
            bottom: 25.0,
            data: data.nodes,
            links: data.links,
            lineStyle: {
                color: 'source',
                curveness: 0.5
            },
            // itemStyle: {
            //     color: '#1f77b4',
            //     borderColor: '#1f77b4'
            // },
            label: {
                color: 'rgba(0,0,0,0.7)',
                fontFamily: 'Arial',
                fontWeight: "bold",
                fontSize: 20
                
            }
            }
        ],
        tooltip: {
            trigger: 'item'
        }
    };

    var lastClickTime = 0; // 记录上次点击的时间
    var delay = 1000; // 延迟时间（毫秒）

    // myChart.off('mousedown');   
    myChart.on('mousedown', { dataType: 'node' }, function(params) {
        var currentTime = new Date().getTime(); // 获取当前时间
        if (currentTime - lastClickTime > delay) {
            lastClickTime = currentTime; // 更新上次点击时间
            params.data.click(params);
        }
    });

    option && myChart.setOption(option);

}
