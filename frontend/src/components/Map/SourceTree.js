
import { Tree } from 'primereact/tree';
import {useEffect, useState} from "react";


export function SourceTree({handleSourceSelection}) {

    const [nodes, setNodes] = useState(null);

    useEffect(() => {
        const nmbgmr = {"key": "nmbgmr_groundwater_levels",
            "checked": true,
            "label": "NMBGMR"}
        const usgs = {"key": "usgs_groundwater_levels",
            "label": "USGS"}

        const ose_stream = {"key": "ose_streamflow",
            "label": "OSE RealTime"}
        const usgs_stream = {"key": "usgs_streamflow",
            "label": "USGS"}

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

    const defaultSelection = {'nmbgmr_groundwater_levels': {'checked': true, 'partialChecked': false},
                                    'groundwater_levels': {'checked': false, 'partialChecked': true}}

    const [selectedFileKeys, setSelectedFileKeys] = useState(defaultSelection)
    return (
                <Tree
                    selectionKeys={selectedFileKeys}
                    onSelectionChange={(e) => {setSelectedFileKeys(e.value)
                        handleSourceSelection(e.value)}}
                    selectionMode={'checkbox'}
                    filter={true}
                    value={nodes} />

    )
}