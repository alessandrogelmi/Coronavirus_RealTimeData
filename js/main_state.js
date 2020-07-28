function getJSON(response) {
    let data = response.json()
    return data
}

function formatNumber(num) {
    if (num != undefined || num != null){
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
}

function getCovidData(state) {

    let url = "https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/" + state

    fetch(url)
        .then(getJSON)
        .then(data => {
            //PRIMA CARD
            console.log(data)
            let total_case = Object.values(data.report)[2];
            let total_deaths = Object.values(data.report)[3];
            let total_recovered = Object.values(data.report)[4];

            total_case = formatNumber(total_case);
            total_deaths = formatNumber(total_deaths);
            total_recovered = formatNumber(total_recovered);

            document.querySelector("#totalcases").innerHTML = `Totale casi: <b>${ total_case }</b>`
            document.querySelector("#totaldeaths").innerHTML = `Totale morti: <b>${ total_deaths }</b>`
            document.querySelector("#totalrecovered").innerHTML = `Totale guariti: <b>${ total_recovered }</b>`


            //SECONDA CARD
            let active_case = "";
            let mid_condition = "";
            let critical_condition = "";

            if (Object.values(data.report)[5][0] != undefined || Object.values(data.report)[5][0] != null) {
                active_case = Object.values(data.report)[5][0].currently_infected_patients;
                mid_condition = Object.values(data.report)[5][0].inMidCondition;
                critical_condition = Object.values(data.report)[5][0].criticalStates;

                active_case = formatNumber(active_case);
                mid_condition = formatNumber(mid_condition);
                critical_condition = formatNumber(critical_condition);


                document.querySelector("#currentlycases").innerHTML = `Casi attivi: <b>${ active_case }</b>`
                document.querySelector("#mid").innerHTML = `Positivi con sintomi lievi o in isolamento domicialiare: <b>${ mid_condition }</b>`
                document.querySelector("#critical").innerHTML = `Ricoverati in gravi condizioni: <b>${ critical_condition }</b>`
            }
            else {
                window.alert("Dati casi attivi non disponibili!");
                document.querySelector("#currentlycases").innerHTML = ""
                document.querySelector("#mid").innerHTML = ""
                document.querySelector("#critical").innerHTML = ""
            }

        })

}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#form").onsubmit = event => {
        event.preventDefault();

        const state = document.querySelector("#stateselector").value
        getCovidData(state)

        // document.querySelector("#currency").value="";

    }
})
