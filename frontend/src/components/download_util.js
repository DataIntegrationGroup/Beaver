import {toCSV} from "react-csv/lib/core";

function down(filename, text){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

}

export function downloadGeoJSON(filename, data){
    // down(filename, JSON.stringify(data))
}

export function downloadCSV(filename, rows, headers=null){
    if (headers === null){
        headers =rows.shift()
    }
    console.log('downloadCSV', rows)
    down(filename+'.csv', toCSV(rows, headers, ',', ''))
}