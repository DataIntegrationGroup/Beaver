import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {useEffect, useState} from "react";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";

export default function FilterControl({county, setCounty}){
    const [checked1, setChecked1] = useState(false);
    const [counties, setCounties] = useState([]);

    useEffect(() => {
        const url = 'https://newmexico-s3-bucket.s3.amazonaws.com/newmexico-s3-bucket/resources/184a9ff9-05e1-4d50-9a13-260883eb0a78/tl_2018_nm_county.geojson'
        fetch(url).then(response => response.json()).then(data => {
            setCounties(data.features.map(feature => {
                return {label: feature.properties.NAME,
                        value: feature}
            }))
        })

    }, []);
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
                    options={counties}
                    onChange={(e) => setCounty(e.value, checked1)}
                    placeholder="Select a County" />
            </div>
        </div>
    )
}