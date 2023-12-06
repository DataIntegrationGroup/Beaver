import 'mapbox-gl/dist/mapbox-gl.css';

import {useCallback, useEffect, useRef, useState} from "react";
import Map, {Layer, Source, useMap} from 'react-map-gl';
import {SourceTree} from "./SourceTree";
import {Col, Row} from "react-bootstrap";
import {retrieveItems} from "../../util";
import {ProgressSpinner} from "primereact/progressspinner";
import DownloadControl from "./DownloadControl";
import DrawControl from './DrawControl';

import * as turf from '@turf/turf'
import {downloadCSV} from "../download_util";
import {Panel} from "primereact/panel";

function make_feature_collection(locations){
    return {'type': 'FeatureCollection',
            'features': locations.map((location) => {
            return {'geometry': location['location'],
                    'properties': {'name': location['name'],
                    'Things': location['Things']}}})
    }
}

export default function MapComponent(){
    const [sourceData, setSourceData] = useState({'nmbgmr_groundwater_levels': null,
                        'usgs_groundwater_levels': null})
    const [layerVisibility, setLayerVisibility] = useState({'nmbgmr_groundwater_levels': 'visible',
    'usgs_groundwater_levels': 'none'})
    const [loading, setLoading] = useState(true)
    const mapRef = useRef();

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
        const visibility = {"usgs_groundwater_levels": e.usgs_groundwater_levels?.checked===true? 'visible': 'none',
            "nmbgmr_groundwater_levels": e.nmbgmr_groundwater_levels?.checked===true? 'visible': 'none'}
        setLayerVisibility({...visibility})


    }
    const handleDownload = (format) => {
        format = 'csv'
        console.log('handle download', format)
        console.log('features', features)

        let selected = []
        //get all features in selected polygons
        for (const [key, searchPolygon] of Object.entries(features)){
            const source = mapRef.current.getSource('nmbgmr_groundwater_levels')
            const s = source._data.features.filter((f) => turf.booleanPointInPolygon(f.geometry, searchPolygon))
            selected.push(...s)
        }

        const df = selected.map((feature) => {
            const properties = feature.properties
            const location = feature.geometry
            return [properties.name, location.coordinates[1], location.coordinates[0]]

        })

        if (format==='csv'){
            downloadCSV('download', df,
                ['name', 'latitude', 'longitude'])
        }

    }
    const setupMap = (map) => {
        // setLoading(false)
        // return

        map.setTerrain({source: 'mapbox-dem', exaggeration: 3})

        const url ='https://st2.newmexicowaterdata.org/FROST-Server/v1.1/Locations' +
            '?$filter=startswith(Things/Datastreams/name, \'Groundwater\')'+
            '&$expand=Things/Datastreams'

        retrieveItems(url, [], 10).then(data => {
            const nmbgmrgwl_locations = make_feature_collection(data)
            // get usgs gwl locations

            const usgs_url = 'https://waterservices.usgs.gov/nwis/iv/?' +
                'format=json&' +
                'stateCd=nm&' +
                'parameterCd=72019&' +
                'siteStatus=all'
            fetch(usgs_url).then(res => res.json()).then(data => {
                const usgs_locations = data.value.timeSeries.map((location) => {
                    return {'name': location.sourceInfo.siteName,
                            'location': {'type': 'Point',
                                        'coordinates': [location.sourceInfo.geoLocation.geogLocation.longitude,
                                                        location.sourceInfo.geoLocation.geogLocation.latitude]},
                            'Things': [{'Datastreams': [{'name': 'Groundwater Level'}]}]}
                })

                setSourceData({'nmbgmr_groundwater_levels': nmbgmrgwl_locations,
                                    'usgs_groundwater_levels': make_feature_collection(usgs_locations)})

                setLoading(false)
            })
        })
    }
    const [features, setFeatures] = useState({});

    const onUpdate = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = {...currFeatures};
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
    }, []);

    const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = {...currFeatures};
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
        });
    }, []);

    return (
        <div>
            <Row>
                <Col xs={4}>
                    <Panel header='Layers' toggleable>
                        <SourceTree handleSourceSelection={handleSourceSelection}/>
                    </Panel>
                    <Panel header='Download' collapsed toggleable>
                        <DownloadControl downloader={handleDownload}/>
                    </Panel>
                </Col>
                <Col><Map
                    ref={mapRef}
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
                    // setup drawing tools
                    <DrawControl
                        position="top-left"
                        displayControlsDefault={false}
                        controls={{
                            polygon: true,
                            trash: true
                        }}
                        defaultMode="draw_polygon"
                        onCreate={onUpdate}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />

                    // add sources
                    <Source id='nmbgmr_groundwater_levels'
                            type="geojson" data={sourceData['nmbgmr_groundwater_levels']}>
                        <Layer
                            id= 'data'
                            type= 'circle'
                            paint= {{
                                'circle-radius': 4,
                                'circle-color': '#007cbf',
                                'circle-stroke-color': 'black',
                                'circle-stroke-width': 1}}
                            layout={{visibility: layerVisibility['nmbgmr_groundwater_levels']}}
                        />
                    </Source>
                    <Source id='usgs_groundwater_levels'
                            type='geojson' data={sourceData['usgs_groundwater_levels']}>
                        <Layer
                            id= 'usgs_groundwater_levels'
                            type= 'circle'
                            paint= {{
                                'circle-radius': 4,
                                'circle-color': '#87ce5b',
                                'circle-stroke-color': 'black',
                                'circle-stroke-width': 1}}
                            layout={{visibility: layerVisibility['usgs_groundwater_levels']}}
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