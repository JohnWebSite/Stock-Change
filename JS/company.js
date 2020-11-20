const companyName = document.getElementById('company-name');
const stockPrice = document.getElementById('stock-price');
const description = document.getElementById('description');
const logo = document.getElementById('logo');
const changePercentage = document.getElementById('change-percentage');
const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');
const companyProfileURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
const chart = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;


async function getDataCompany() {
    const data = await getDataFetch(companyProfileURL);
    const profile = data.profile;
    logo.src = profile.image;
    companyName.innerHTML += profile.companyName;
    companyName.href = profile.website;
    stockPrice.innerHTML = " " + profile.price + " ";
    changePercentage.innerHTML = profile.changesPercentage;
    if (profile.changes < 0) {
        changePercentage.style.color = "red";
    } else {
        changePercentage.style.color = "#22db22";
    }
    description.innerHTML = profile.description;
}


async function displayChart() {
    const data = await getDataFetch(chart);
    let dataChartHorizontal = [];
    let dataChartVertical = [];
    const step = getTheStep(data.historical.length);
    for (let index = data.historical.length - 1; index > 0; index -= step) {
        const element = data.historical[index];
        dataChartHorizontal.push(element.date);
        dataChartVertical.push(element.close);
    }
    creationChart(dataChartHorizontal, dataChartVertical);
}

function creationChart(dataChartHorizontal, dataChartVertical) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart1 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: dataChartHorizontal,
            datasets: [{
                label: 'Stock Price History',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dataChartVertical
            }]
        },

        // Configuration options go here
        options: {}
    });
}

function getTheStep(theLength) {
    let step = 0;
    if (theLength < 200) {
        step = 10;
    } else if (theLength < 500) {
        step = 30;
    } else {
        step = 100;
    }
    return step;
}

async function getDataFetch(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

getDataCompany();
displayChart()