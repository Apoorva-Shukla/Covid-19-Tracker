// constant variables
const APIURL = "https://corona-api.com/countries";
const form = document.getElementById("form");
const main = document.getElementById("main");
const input = document.getElementById("input");


async function fetchData(country) {
    const data = await fetch(APIURL);
    const jsonData = await data.json();

    for (let i = 0; i < jsonData.data.length; i++) {
        if (jsonData.data[i].name.toLowerCase() == country.toLowerCase()) {
            showData(jsonData.data[i]);
        }
    }
}

function showData(country) {
    console.log(country);
    let today = country.today;
    let total = country.latest_data;

    main.style.padding = '33px';
    main.innerHTML = `
        <div style="text-align: center; margin-bottom: 3rem;"><h1 style="text-decoration: underline;">${country.name}<h1></div>

        <div id="data">

            <ul>
                <li>Population</li>
            </ul>
            <div class="data-tags" id="today-data">
                <p class="real-data">${country.population}</p>
            </div>

            <ul>
                <li>Today</li>
            </ul>
            <div class="data-tags" id="today-data">
                <p class="real-data">Confirmed: ${today.confirmed}</p>
                <p class="real-data">Deaths: ${today.deaths}</p>
            </div>
            
            <ul>
                <li>Total</li>
            </ul>
            <div class="data-tags" id="total-data">
                <p class="real-data">Confirmed: ${total.confirmed}</p>
                <p class="real-data">Recovered: ${total.recovered}</p>
                <p class="real-data">Deaths: ${total.deaths}</p>
                <p class="real-data">Death Rate: ${total.calculated.death_rate}</p>
                <p class="real-data">Recovery Rate: ${total.calculated.recovery_rate}</p>
                <p class="real-data">Cases per million: ${total.calculated.cases_per_million_population}</p>
            </div>

        </div>
    `;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let inp = input.value;
    fetchData(inp);
    input.value = "";
});