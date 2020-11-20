class Marquee {
    constructor(div) {
        this.div = div;
    }

    async realTimePrice() {
        const ul = document.createElement('ul');
        ul.id = "company_prices";
        this.div.appendChild(ul);
        const currentStockUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse";
        const response = await fetch(currentStockUrl);
        const data3 = await response.json();
        for (let index = 1; index < 100; index++) {
            const element = data3[index];
            const li = document.createElement('li');
            li.id = "li_marquee";
            li.innerText = element.symbol;
            const span = document.createElement("span");
            span.innerHTML = element.price;
            span.style.color = "#22db22";
            span.style.marginLeft = "3px";
            li.appendChild(span);
            ul.appendChild(li);
        }
    }
}