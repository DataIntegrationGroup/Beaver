import {useEffect, useRef, useState} from "react";
import Map, {Layer, Source, useMap} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {SourceTree} from "./SourceTree";
import {Col, Row} from "react-bootstrap";
import {retrieveItems} from "../../util";
import {ProgressSpinner} from "primereact/progressspinner";


function make_feature_collection(locations){
    return {'type': 'FeatureCollection',
            'features': locations.map((location) => {
            return {'geometry': location['location'],
                    'properties': {'name': location['name'],
                    'Things': location['Things']}}})
    }
}

export default function MapComponent(){
    const [usgs_gwl, setUSGSGWL] = useState(null);
    const [nmbgmr_gwl, setNMBGMRGWL] = useState(null);
    const [layerVisibility, setLayerVisibility] = useState({'nmbgmr_groundwater_levels': 'none'})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // const url ='https://st2.newmexicowaterdata.org/FROST-Server/v1.1/Locations' +
        //     '?$filter=startswith(Things/Datastreams/name, \'Groundwater\')'+
        //     '&$expand=Things/Datastreams'
        // // fetch(url).then(res => res.json()).then(data => {
        // //     setData(make_feature_collection(data.value))
        // // })
        // retrieveItems(url, [], 2000).then(data => {
        //     setNMBGMRGWL(make_feature_collection(data))
        //     setLoading(false)
        // })
    }, [])

    const handleSourceSelection = (e) => {
        if (e.nmbgmr_groundwater_levels?.checked===true){
            setLayerVisibility({...{"nmbgmr_groundwater_levels": 'visible'}})
        }else{
            setLayerVisibility({...{"nmbgmr_groundwater_levels": 'none'}})
        }
    }

    const setupMap = (map) => {
        map.setTerrain({source: 'mapbox-dem', exaggeration: 3})

        const url ='https://st2.newmexicowaterdata.org/FROST-Server/v1.1/Locations' +
            '?$filter=startswith(Things/Datastreams/name, \'Groundwater\')'+
            '&$expand=Things/Datastreams'

        retrieveItems(url, [], 2000).then(data => {
            setNMBGMRGWL(make_feature_collection(data))
            setLoading(false)
        })
    }

    return (
        <div>
            <Row>
                <Col xs={4}><SourceTree handleSourceSelection={handleSourceSelection}/></Col>
                <Col><Map
                    onLoad={(e)=>{
                        console.log('map loaded')
                        setupMap(e.target)
                    }}
                    mapboxAccessToken={"pk.eyJ1IjoiamFrZXJvc3N3ZGkiLCJhIjoiY2s3M3ZneGl4MGhkMDNrcjlocmNuNWg4bCJ9.4r1DRDQ_ja0fV2nnmlVT0A"}
                    initialViewState={{
                        longitude: -106.4,
                        latitude: 34.5,
                        zoom: 6
                    }}
                    style={{width: '100%', height: '650px', margin: 10}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                    <Source type="geojson" data={nmbgmr_gwl}>
                        <Layer
                            id= 'data'
                            type= 'circle'
                            paint= {{
                                'circle-radius': 4,
                                'circle-color': '#007cbf',
                                'circle-stroke-color': 'black',
                                'circle-stroke-width': 1}}
                            layout={{visibility: layerVisibility['nmbgmr_groundwater_levels']}}/>
                    </Source>
                    <Source type='geojson' data={usgs_gwl}>
                        <Layer
                            id= 'usgs_groundwater_levels'
                            type= 'circle'
                            paint= {{
                                'circle-radius': 4,
                                'circle-color': '#007cbf',
                                'circle-stroke-color': 'black',
                                'circle-stroke-width': 1}}
                        />
                    </Source>
                    <Source id={'mapbox-dem'}
                        type="raster-dem"
                        url="mapbox://mapbox.mapbox-terrain-dem-v1"
                        tileSize={512}
                        maxzoom={14}
                    >

                    </Source>


                    {loading && <ProgressSpinner />}
                </Map></Col>
            </Row>


        </div>
    );
}