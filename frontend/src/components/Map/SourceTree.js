
import { Tree } from 'primereact/tree';
import {useEffect, useState} from "react";
import './SourceTree.css'

export function SourceTree({handleSourceSelection}) {

    const [nodes, setNodes] = useState(null);

    useEffect(() => {
        const nmbgmr_pressure = {key: "nmbgmr_groundwater_levels_pressure",
            label: "Pressure",
            className: "nmbgmr_groundwater_levels_pressure"}

        const nmbgmr_acoustic = {key: "nmbgmr_groundwater_levels_acoustic",
            label: "Acoustic",
            className: "nmbgmr_groundwater_levels_acoustic"}

        const nmbgmr = {"key": "nmbgmr_groundwater_levels",
            "checked": false,
            "label": "NMBGMR",
            "className": "nmbgmr_groundwater_levels",
            children: [nmbgmr_pressure, nmbgmr_acoustic]
        }

        const usgs = {"key": "usgs_groundwater_levels",
            "label": "USGS",
            "className": "usgs_groundwater_levels",}

        const ose_stream = {"key": "ose_stream_flow",
            "label": "OSE RealTime"}
        const usgs_stream = {"key": "usgs_stream_flow",
            "label": "USGS",
            "className": "usgs_stream_flow",}

        const gwl = {"key":"groundwater_levels",
            "label":"Groundwater Levels",
            "children": [nmbgmr, usgs]}
        const streamflow = {"key":"streamflow",
            "label":"Streamflow",
            "children": [ose_stream, usgs_stream]}
        const data = [gwl,streamflow]

        // const data = [
        //     {
        //         "key": "0",
        //         "label": "Groundwater Levels",
        //         "data": "Documents Folder",
        //         "icon": "pi pi-fw pi-inbox",
        //         "children": [{
        //             "key": "0-0",
        //             "label": "Work",
        //             "data": "Work Folder",
        //             "icon": "pi pi-fw pi-cog",
        //             "children": [{ "key": "0-0-0", "label": "Expenses.doc", "icon": "pi pi-fw pi-file", "data": "Expenses Document" }, { "key": "0-0-1", "label": "Resume.doc", "icon": "pi pi-fw pi-file", "data": "Resume Document" }]
        //         },
        //             {
        //                 "key": "0-1",
        //                 "label": "Home",
        //                 "data": "Home Folder",
        //                 "icon": "pi pi-fw pi-home",
        //                 "children": [{ "key": "0-1-0", "label": "Invoices.txt", "icon": "pi pi-fw pi-file", "data": "Invoices for this month" }]
        //             }]
        //     },
        //
        // ]
        setNodes(data);
    }, [])

    const defaultSelection = {'nmbgmr_groundwater_levels': {'checked': false, 'partialChecked': false},
                                    'groundwater_levels': {'checked': false, 'partialChecked': false}}

    const [selectedFileKeys, setSelectedFileKeys] = useState(defaultSelection)
    return (
                <Tree
                    className={'w-full md:w-30rem'}
                    selectionKeys={selectedFileKeys}
                    onSelectionChange={(e) => {setSelectedFileKeys(e.value)
                        handleSourceSelection(e.value)}}
                    selectionMode={'checkbox'}
                    filter={true}
                    value={nodes} />

    )
}