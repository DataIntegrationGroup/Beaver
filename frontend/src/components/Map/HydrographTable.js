import {Message} from "primereact/message";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {useEffect, useState} from "react";
import moment from "moment";

export default function HydrographTable({selected, data}){
    const [rows, setRows] = useState([])
    useEffect(()=>{
        console.log('set sellecteddaaasd', selected)
        console.log('set data', data)

        try {
            let result = data[1].x.map((item, index) => {
                return {
                    x: moment(new Date(item)).format('MM/DD/YYYY h:mm:ss a'),
                    y: data[1].y[index].toFixed(2),
                    datasource: data[1].properties[index]?.DataSource,
                    measuringagency: data[1].properties[index]?.MeasuringAgency,
                }
            })
            setRows(result)
        } catch (e) {
            console.log(e)
        }
        // }

    }, [selected, data])

    return (
        <div>
            <DataTable value={rows}
                       stripedRows
                       paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                      >
                <Column field={'x'} header={'Time'}></Column>
                <Column field={'y'} header={'Depth To Water (bgs)'}></Column>
                <Column field={'datasource'} header={'Data Source'}></Column>
                <Column field={'measuringagency'} header={'Measuring Agency'}></Column>
            </DataTable>
        </div>


    )
}