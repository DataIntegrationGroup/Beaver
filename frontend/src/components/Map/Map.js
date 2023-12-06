import {useEffect, useRef, useState} from "react";
import Map, {Layer, Source} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {SourceTree} from "./SourceTree";
import {Col, Row} from "react-bootstrap";

const dataLayer = {

}

function make_feature_collection(locations){
    return {'type': 'FeatureCollection',
            'features': locations.map((location) => {
            return {'geometry': location['location'],
                    'properties': {'name': location['name'],
                    'Things': location['Things']}}})
    }
}

export default function MapComponent(){
    const [data, setData] = useState(null);
    const [nmbgmr_visible, set_nmbgmr_visible] = useState('none')

    useEffect(() => {
        const url ='https://st2.newmexicowaterdata.org/FROST-Server/v1.1/Locations'
        fetch(url).then(res => res.json()).then(data => {
            setData(make_feature_collection(data.value))
        })
    }, [])

    const handleSourceSelection = (e) => {
        if (e.nmbgmr_groundwater_levels?.checked===true){
            set_nmbgmr_visible('visible')
        }else{
            set_nmbgmr_visible('none')
        }
    }

    return (
        <div>
            <Row>
                <Col xs={4}><SourceTree handleSourceSelection={handleSourceSelection}/></Col>
                <Col><Map
                    mapboxAccessToken={"pk.eyJ1IjoiamFrZXJvc3N3ZGkiLCJhIjoiY2s3M3ZneGl4MGhkMDNrcjlocmNuNWg4bCJ9.4r1DRDQ_ja0fV2nnmlVT0A"}
                    initialViewState={{
                        longitude: -106.4,
                        latitude: 34.5,
                        zoom: 6
                    }}
                    style={{width: '100%', height: '650px', margin: 10}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                    <Source type="geojson" data={data}>
                        <Layer
                            id= 'data'
                            type= 'circle'
                            paint= {{
                                'circle-radius': 4,
                                'circle-color': '#007cbf',
                                'circle-stroke-color': 'black',
                                'circle-stroke-width': 1}}
                            layout={{visibility: nmbgmr_visible}}/>
                    </Source>
                </Map></Col>
            </Row>


        </div>
    );
}