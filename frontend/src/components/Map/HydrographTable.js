import {Message} from "primereact/message";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {useEffect, useState} from "react";

export default function HydrographTable({selected, data}){
    const [rows, setRows] = useState([])
    useEffect(()=>{
        console.log('set sellecteddaaasd', selected)
        console.log('set data', data)
        // if (data !== undefined && data !== null && data.length > 0){
        //     console.log('set sellected', data)

        try {
            let result = data[1].x.map((item, index) => {
                return {x: item, y: data[1].y[index]}
            })
            setRows(result)
        } catch (e) {
            console.log(e)
        }
        // }

    }, [data])

    return (
        <div>
            <DataTable value={rows}
                       stripedRows
                       size={'small'}
                       paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                      >
                <Column field={'x'} header={'Time'}></Column>
                <Column field={'y'} header={'Depth To Water (bgs)'}></Column>
            </DataTable>
        </div>


    )
}