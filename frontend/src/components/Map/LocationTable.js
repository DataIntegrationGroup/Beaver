import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import {useEffect, useState} from "react";


function dms(dd) {
    const deg = dd | 0; // truncate dd to get degrees
    const frac = Math.abs(dd - deg); // get fractional part
    const min = (frac * 60) | 0; // multiply fraction by 60 and truncate
    const sec = frac * 3600 - min * 60;
    return `${deg}° ${min}' ${sec.toFixed(2)}"`;
}

export default function LocationTable({sourceData}) {

    const [rows, setRows] = useState([])

    useEffect(() => {
        // const rs = sourceData.map((item) => {
        //
        // })
        let rs=[]

        for (const [key, s] of Object.entries(sourceData)) {
            console.log(key, s)
            if (s===null || s===undefined){
                continue
            }
            const rr = s.features.map((f) => {

                const lat = dms(f.geometry.coordinates[1])
                const lng = dms(f.geometry.coordinates[0])
                return {
                    name: f.properties.name,
                    latitude: lat,
                    longitude: lng,
                    datasource: key
                }
            })
            rs.push(...rr)
        }
        setRows(rs)

    }, [sourceData]);

    return (
        <Card>
            <DataTable
                className={'smallTable'}
                size={'small'} value={rows} stripedRows paginator rows={10}>
                <Column field={'name'} header={'Name'}></Column>
                <Column field={'datasource'} header={'Source'}></Column>
                <Column field={'latitude'} header={'Latitude'}></Column>
                <Column field={'longitude'} header={'Longitude'}></Column>
            </DataTable>
        </Card>

    )
}