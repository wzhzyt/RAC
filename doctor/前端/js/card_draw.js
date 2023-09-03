// card_draw.js

function card_draw(cardData, cardsPerRow) {
    // 获取具有ID "main" 的 div 元素
    var mainDiv = document.getElementById("main");
    
    if(myChart){
        myChart.dispose();
    }

    var toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButton';
    toggleButton.className = 'btn btn-primary btn-floating toggle-button';
    toggleButton.textContent = '诊断分析';
    toggleButton.addEventListener("click", function() {
        sankey_draw(data);
    });
    // 将按钮添加到 main 容器中
    document.getElementById('main').appendChild(toggleButton);


    // 创建特定区域的容器 div
    var cardContainer = document.createElement("div");
    cardContainer.style.width = "100%";
    cardContainer.id = "cardContainer";

    // 将特定区域的容器添加到 mainDiv 中
    mainDiv.appendChild(cardContainer);

    for (var i = 0; i < cardData.length; i++) {
        if (i % cardsPerRow === 0) {
            // 创建一行的外层 div
            var rowDiv = document.createElement("div");
            rowDiv.style.display = "flex";
            rowDiv.style.justifyContent = "space-between";
            rowDiv.style.marginBottom = "20px"; // 调整行间距
            cardContainer.appendChild(rowDiv);
        }

        var card = document.createElement("div");
        card.className = "card";
        card.classList.add("card-item");

        var cardContent = document.createElement("div");
        cardContent.className = "card-content";

        var img = document.createElement("img");
        img.src = cardData[i].imgUrl;
        img.alt = "Card Image";

        var title = document.createElement("div");
        title.className = "card-title";
        title.textContent = cardData[i].title;

        var description = document.createElement("div");
        description.className = "card-description";
        description.textContent = cardData[i].description;

        var link = document.createElement("a");
        link.className = "card-link";
        link.href = cardData[i].link;
        link.target = "_blank";
        link.textContent = "查看详情";

        cardContent.appendChild(title);
        cardContent.appendChild(description);
        cardContent.appendChild(link);

        card.appendChild(img);
        card.appendChild(cardContent);

        rowDiv.appendChild(card);
    }
}
