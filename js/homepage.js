function getJSON(response) {
    let data = response.json()
    return data
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function getReports() {

    let url = "https://covid19-server.chrismichael.now.sh/api/v1/AllReports"

    fetch(url)
        .then(getJSON)
        .then(data => {
            //PRIMA CARD
            let total_case = Object.values(data.reports)[0].table[0][0].TotalCases;
            let total_deaths = Object.values(data.reports)[0].table[0][0].TotalDeaths;
            let total_recovered = Object.values(data.reports)[0].table[0][0].TotalRecovered;


            document.querySelector("#cases").innerHTML = `Totale casi: <b>${ total_case }</b>`
            document.querySelector("#deaths").innerHTML = `Totale morti: <b>${ total_deaths }</b>`
            document.querySelector("#recovered").innerHTML = `Totale guariti: <b>${ total_recovered }</b>`


            //SECONDA CARD
            let new_case = Object.values(data.reports)[0].table[0][0].NewCases;
            let new_deaths = Object.values(data.reports)[0].table[0][0].NewDeaths;
            let new_recovered = Object.values(data.reports)[0].table[0][0].NewRecovered;


            document.querySelector("#newcases").innerHTML = `Nuovi casi: <b>${ new_case }</b>`
            document.querySelector("#newdeaths").innerHTML = `Nuove morti: <b>${ new_deaths }</b>`
            document.querySelector("#newrecovered").innerHTML = `Nuovi guariti: <b>${ new_recovered }</b>`


            //TERZA CARD
            let active_case = Object.values(data.reports)[0].active_cases[0].currently_infected_patients;
            let mid_condition = Object.values(data.reports)[0].active_cases[0].inMidCondition;
            let critical_condition = Object.values(data.reports)[0].active_cases[0].criticalStates;

            active_case = formatNumber(active_case);
            mid_condition = formatNumber(mid_condition);
            critical_condition = formatNumber(critical_condition);


            document.querySelector("#currentlycases").innerHTML = `Casi attivi: <b>${ active_case }</b>`
            document.querySelector("#mid").innerHTML = `Positivi con sintomi lievi o in isolamento domicialiare: <b>${ mid_condition }</b>`
            document.querySelector("#critical").innerHTML = `Ricoverati in gravi condizioni: <b>${ critical_condition }</b>`

        })

        .catch(err => {
            // console.log("Error: ", err)
            document.querySelector("#error").innerHTML = `Errore: ${ err }`
        })
}

document.addEventListener("DOMContentLoaded", () => {

    getReports()

})
