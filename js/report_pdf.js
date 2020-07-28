function getJSON(response) {
    let data = response.json()
    return data
}

function getDataLenght(data){
    arr = data.reports;
    return(Object.keys(arr).length)
}

function getPdfReport() {
    let url = "https://covid19-server.chrismichael.now.sh/api/v1/SituationReports"

    fetch(url)
        .then(getJSON)
        .then(data => {

            let dimensione = getDataLenght(data)
            let j=0
            var date = new Array(dimensione)
            var pdf = new Array(dimensione)
            var temp = "";

            for(i = 0; i < dimensione ; i++) {
                date[j] = (data.reports[i]).date
                pdf[j] = (data.reports[i]).pdf
                //document.querySelector("#reports").innerHTML += date[j] + `&#9 <a href="${ pdf[j] }"> PDF </a> <br>`
                temp += "<tr>";
                temp += `<td style="width:150px">` + date[j] + "</td>";
                temp += "<td>" + `<img src="media\\iconfinder_PDF_104818.png" height="25"> ` + "<a href=" + pdf[j] + ">" + pdf[j] + "</a>" + "</td></tr>";
                document.getElementById("dati").innerHTML = temp;
                j++;         
            }
        })
        
}

document.addEventListener("DOMContentLoaded", () => {
    getPdfReport()
})
