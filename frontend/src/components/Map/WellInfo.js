import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect, useState} from "react";

export default function WellInfo({selected}){

    const [rows, setRows] = useState([])
    useEffect(()=>{
        console.log('wellinfo', selected)
        if (selected !== undefined && selected !== null) {
            const things = JSON.parse(selected.properties.Things)
            for (const thing of things){
                if (thing.name === 'Water Well'){
                    console.log('tnin',thing)
                    setRows([{key: 'WellDepth (ft)', value: thing.properties['WellDepth']},
                            {key: 'Use', value: thing.properties['Use']},
                            {key: 'Status', value: thing.properties['Status']},
                            {key: 'Agency', value: thing.properties['agency']},
                            {key: 'Geologic Formation', value: thing.properties['GeologicFormation']},
                    ])
                    break
                    }
                }
            }
        }
    , [selected])

    return (
        <DataTable value={rows}
                     stripedRows
            className={'smallTable'}
                   size={'small'}
        >
            <Column field={'key'} header={'Name'}></Column>
            <Column field={'value'} header={'Value'}></Column>

        </DataTable>
    )

}