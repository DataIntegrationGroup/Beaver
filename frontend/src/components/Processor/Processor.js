// import {Button} from "react-bootstrap";
// import './Processor.css'
// import {CSVDownload, CSVLink} from "react-csv";
// import {useRef, useState} from "react";
// import {toCSV} from "react-csv/lib/core";
//
//
// function downloadFile(filename, text){
//     var element = document.createElement('a');
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     element.setAttribute('download', filename);
//
//     element.style.display = 'none';
//     document.body.appendChild(element);
//
//     element.click();
//
//     document.body.removeChild(element);
//
// }
//
// export default function Processor(props){
//
//     const handler = async () => {
//         await props.onClick().then(resp => {
//             const headers = resp.shift()
//             downloadFile(props.button+'.csv', toCSV(resp, headers, ',', ''))
//         })
//     }
//
//     return (
//         <div className='processor'>
//             <Button onClick={handler}>{props.button}</Button>
//         </div>
//     )
// }