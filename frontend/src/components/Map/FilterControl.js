import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {useEffect, useMemo, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";


const loadCounties = async () => {
    const resp = await fetch('https://newmexico-s3-bucket.s3.amazonaws.com/newmexico-s3-bucket/resources/184a9ff9-05e1-4d50-9a13-260883eb0a78/tl_2018_nm_county.geojson')
        .then(response => response.json())
        .then(data => {
        return data.features.map(feature => {
            return {label: feature.properties.NAME,
                    value: JSON.stringify(feature)}
        })
    })
    return resp
}

const COUNTIES = await loadCounties()

export default function FilterControl({county, setCounty}){
    const [checked1, setChecked1] = useState(false);

    return (
        <div>
            <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Checkbox checked={checked1} onChange={(e) => {
                                    setCounty(county, !checked1)
                                    setChecked1(!checked1)
                                }} />
                            </span>
                <MultiSelect
                    display={'chip'}
                    value={county}
                    options={COUNTIES}
                    onChange={(e) => setCounty(e.value, checked1)}
                    placeholder="Select a County" />
            </div>
        </div>
    )
}