import Plot from 'react-plotly.js';
import React, {useEffect, useState} from "react";
import {retrieveItems} from "../../util";
import {ProgressSpinner} from "primereact/progressspinner";
import {OverlayPanel} from "primereact/overlaypanel";
// import {Hourglass} from "react-loader-spinner";

export default function Hydrograph({selected, data, setData}) {

    const [layout, setLayout] = useState({title: 'Hydrograph',
            // width: 400,
            width: 520,
            xaxis: {title: 'Date'},
            yaxis: {title: 'Depth to Water (ft bgs)',
                    autorange: 'reversed'}
        }
    )
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        console.log('get data for selected', selected)
        if (selected != null) {
            setLayout({...layout, title: selected.properties.name})
        }
        const fetchdata = async (url) => {
            return await retrieveItems(url, [])
        }

        const get_datastream_url = (ds_name) => {
            if (selected !== undefined && selected !== null) {
                const things = JSON.parse(selected.properties.Things)
                console.log(things)
                // for (const ui of [ds_name, 'Groundwater Levels']){
                for (const ds of things[0]['Datastreams']){
                    if (ds.name === ds_name){
                        return ds['@iot.selfLink']+'/Observations?$orderby=phenomenonTime asc'
                    }
                }
            }
        }

        const get_ds_data = async (name, url) => {
            if (url === undefined || url === null){
                return {x: [], y: [], mode: 'lines+markers', 'name': name}
            }

            const data = await fetchdata(url)
            const x = data.map((item) => {
                return item.phenomenonTime
            })
            const y = data.map((item) => {
                return item.result
            })
            const p = data.map((item) => {
                return item.parameters
            })
            return {x: x,
                y: y,
                properties: p,
                mode: 'lines+markers', 'name': name}
        }

        if (selected != null) {
            let series = []
            // let ds_name = selected['ds_name']
            let ds_name = 'Groundwater Levels(Pressure)'

            setLoading(true)
            // if (ds_name === null || ds_name === undefined) {
                // ds_name = ''
                // for (const ds of selected['datastreams']){
                //     if (ds.name === 'Groundwater Levels(Pressure)' || (ds.name === 'Groundwater Levels(Acoustic)')){
                //         ds_name = ds.name
                //         console.log('found', ds_name)
                //         break
                //     }
                // }
                // ds_name = selected['datastreams'].find((ds)=>
                //     ds.name === 'Groundwater Levels(Pressure)' || ds.name === 'Groundwater Levels(Acoustic)'
            // }

            get_ds_data('Continuous',  get_datastream_url(ds_name)).then(data => {
                series.push(data)
                ds_name = 'Groundwater Levels'
                get_ds_data('Manual', get_datastream_url(ds_name)).then(data => {
                    series.push(data)
                    setData(series)
                    setLoading(false)
                })
            })
        }

    }, [selected])

    return (
        <div className={'container'}>
            {loading && <ProgressSpinner
                strokeWidth={3}
                className={'overlay'}/>}
            <Plot
                divId={'hydrograph'}
                data={data}
                layout={layout}
            >
            </Plot>
        </div>


    )
}
