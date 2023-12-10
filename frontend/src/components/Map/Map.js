import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'

import {useCallback, useEffect, useRef, useState} from "react";
import Map, {Layer, NavigationControl, Source, useMap} from 'react-map-gl';
import {SourceTree} from "./SourceTree";
// import {Col, Row} from "react-bootstrap";
import {retrieveItems} from "../../util";
import {ProgressSpinner} from "primereact/progressspinner";
import DownloadControl from "./DownloadControl";
import DrawControl from './DrawControl';

import * as turf from '@turf/turf'
import {downloadCSV, downloadTSV} from "../download_util";
import {Panel} from "primereact/panel";
// import Container from "react-bootstrap/Container";
import HelpSidebar from "./HelpSidebar";
import SearchControl from "./SearchControl";
import FilterControl from "./FilterControl";
import Hydrograph from "./Hydrograph";
import HydrographTable from "./HydrographTable";

function make_feature_collection(locations){
    return {'type': 'FeatureCollection',
            'features': locations.map((location) => {
            return {'geometry': location['location'],
                    'properties': {'name': location['name'],
                    'Things': location['Things']}}})
    }
}
function make_usgs_feature_collection(data){
    console.log('usgs locations', data)
    const locations = data.value.timeSeries.map((location) => {
        return {'name': location.sourceInfo.siteName,
            'location': {'type': 'Point',
                'coordinates': [location.sourceInfo.geoLocation.geogLocation.longitude,
                    location.sourceInfo.geoLocation.geogLocation.latitude]},
            'Things': [{'Datastreams': [{'name': 'Groundwater Level'}]}]}
    })
    return make_feature_collection(locations)
}

function make_usgs_url(paramCode){
    return 'https://waterservices.usgs.gov/nwis/iv/?' +
        'format=json&' +
        'stateCd=nm&' +
        'parameterCd=' + paramCode + '&' +
        'siteStatus=all'
}

const sources = [{tag:'nmbgmr_groundwater_levels_pressure', color:'#6dcc9f'},
    {tag:'nmbgmr_groundwater_levels_acoustic', color:'#ccc46d'},
    {tag:'usgs_groundwater_levels', color:'#cb77c7'},
    {tag:'usgs_stream_flow', color:'#c24850'}]

const defaultSourceData = Object.fromEntries(sources.map((s) => [s.tag, null]))
const defaultLayerVisibility = Object.fromEntries(sources.map((s) => [s.tag, 'none']))
export default function MapComponent(props){
    // const [sourceData, setSourceData] = useState({'nmbgmr_groundwater_levels_pressure': null,
    //                     'nmbgmr_groundwater_levels_acoustic': null,
    //                     'usgs_groundwater_levels': null,
    //                     'usgs_stream_flow': null,
    //                     'selected_county': null
    // })

    const [sourceData, setSourceData] = useState({...defaultSourceData,
        selected_county: null})
    const [osourceData, setOSourceData] = useState(defaultSourceData)
    const [layerVisibility, setLayerVisibility] = useState({...defaultLayerVisibility,
        selected_county: 'none'})
    const [loading, setLoading] = useState(false)
    const [county, setCounty] = useState(null)
    const [features, setFeatures] = useState({});
    const [selected, setSelected] = useState(null)
    const [hydroCollapsed, setHydroCollapsed] = useState(true)
    const [data, setData] = useState(null)
    const mapRef = useRef();

    // useEffect(() => {
    //     // const url ='https://st2.newmexicowaterdata.org/FROST-Server/v1.1/Locations' +
    //     //     '?$filter=startswith(Things/Datastreams/name, \'Groundwater\')'+
    //     //     '&$expand=Things/Datastreams'
    //     // // fetch(url).then(res => res.json()).then(data => {
    //     // //     setData(make_feature_collection(data.value))
    //     // // })
    //     // retrieveItems(url, [], 2000).then(data => {
    //     //     setNMBGMRGWL(make_feature_collection(data))
    //     //     setLoading(false)
    //     // })
    // }, [])

    const handleSourceSelection = (e) => {
        for (const s of sources){
            // set visiblity of layer
            setLayerVisibility((prev)=>{ return {...prev,
                [s.tag]: e[s.tag]?.checked===true? 'visible': 'none'}})

            // skip if layer is not visible
            if (e[s.tag]===undefined || e[s.tag].checked===false){
                continue
            }

            // lazy load source data
            if (sourceData[s.tag]===null){
                switch (s.tag) {
                    case 'nmbgmr_groundwater_levels_pressure':
                        const url ='https://st2.newmexicowaterdata.org/FROST-Server/v1.1/Locations' +
                            '?$filter=Things/Datastreams/name eq \'Groundwater Levels(Pressure)\''+
                            '&$expand=Things/Datastreams'
                        setLoading(true)
                        retrieveItems(url, [], 1000).then(data => {
                            setSourceData((prev)=>{ return {...prev,
                                'nmbgmr_groundwater_levels_pressure': make_feature_collection(data) }})
                            setOSourceData((prev)=>{ return {...prev,
                                'nmbgmr_groundwater_levels_pressure': make_feature_collection(data) }})
                            setLoading(false)
                        })
                        break;
                    case 'nmbgmr_groundwater_levels_acoustic':
                        const url2 ='https://st2.newmexicowaterdata.org/FROST-Server/v1.1/Locations' +
                            '?$filter=Things/Datastreams/name eq \'Groundwater Levels(Acoustic)\''+
                            '&$expand=Things/Datastreams'
                        setLoading(true)
                        retrieveItems(url2, [], 1000).then(data => {
                            setSourceData((prev)=>{ return {...prev,
                                'nmbgmr_groundwater_levels_acoustic': make_feature_collection(data) }})
                            setOSourceData((prev)=>{ return {...prev,
                                'nmbgmr_groundwater_levels_acoustic': make_feature_collection(data) }})
                            setLoading(false)
                        })
                        break;
                    case 'usgs_groundwater_levels':
                        setLoading(true)
                        fetch(make_usgs_url('72019')).then(res => res.json()).then(usgs_gwl_locations => {
                            setSourceData((prev)=>{ return {...prev,
                                'usgs_groundwater_levels': make_usgs_feature_collection(usgs_gwl_locations) }})
                            setOSourceData((prev)=>{ return {...prev,
                                'usgs_groundwater_levels': make_usgs_feature_collection(usgs_gwl_locations) }})
                            setLoading(false)

                        })
                        break;
                    case 'usgs_stream_flow':
                        setLoading(true)
                        fetch(make_usgs_url('00065')).then(res => res.json()).then(usgs_stream_locations => {
                            setSourceData((prev)=>{ return {...prev,
                                'usgs_stream_flow': make_usgs_feature_collection(usgs_stream_locations) }})
                            setOSourceData((prev)=>{ return {...prev,
                                'usgs_stream_flow': make_usgs_feature_collection(usgs_stream_locations) }})

                            setLoading(false)

                        })
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const setupMap = (map) => {
        // setLoading(false)
        // return
        // map.setProjection(
        //     {name: "globe"}
        // )
        // map.setFog({
        //         "range": [0.8, 8],
        //         "color": "#dc9f9f",
        //         "horizon-blend": 0.5,
        //         "high-color": "#245bde",
        //         "space-color": "#000000",
        //         "star-intensity": 0.15
        //     })
        // map.setTerrain({source: 'mapbox-dem', exaggeration: 3})

        // const url ='https://st2.newmexicowaterdata.org/FROST-Server/v1.1/Locations' +
        //     '?$filter=startswith(Things/Datastreams/name, \'Groundwater\')'+
        //     '&$expand=Things/Datastreams'

        // retrieveItems(url, [], 10).then(nmbgmr_gwl_locations => {
        //     // get usgs gwl locations
        //     fetch(make_usgs_url('72019')).then(res => res.json()).then(usgs_gwl_locations => {
        //         // get usgs stream locations
        //         fetch(make_usgs_url('00065')).then(res => res.json()).then(usgs_stream_locations => {
        //             setSourceData({'nmbgmr_groundwater_levels': make_feature_collection(nmbgmr_gwl_locations),
        //                 'usgs_groundwater_levels': make_usgs_feature_collection(usgs_gwl_locations),
        //                 'usgs_stream_flow': make_usgs_feature_collection(usgs_stream_locations)})
        //
        //             setLoading(false)
        //         })
        //
        //     })
        // })
    }

    const onDownload = (format) => {
        console.log('selected', format)
        console.log('handle download', format)
        console.log('features', features)

        let selected = []
        //get all features in selected polygons
        for (const [key, searchPolygon] of Object.entries(features)){
            for (let s of sources){
                // let source = mapRef.current.getSource(s.tag)
                console.log('source', s.tag, sourceData[s.tag], sourceData)
                if (sourceData[s.tag]===null){
                    console.log('no data for source', s.tag)
                    continue
                }
                let f = sourceData[s.tag].features.filter((f) => turf.booleanPointInPolygon(f.geometry, searchPolygon))
                let ff = f.map((feature) => {return {...feature,
                    'data_source': s.tag,
                    'well_depth': 0}})
                selected.push(...ff)
            }
        }

        const df = selected.map((feature) => {
            const properties = feature.properties
            const location = feature.geometry
            return [feature.data_source,
                properties.name,
                location.coordinates[1],
                location.coordinates[0],
                feature.well_depth]

        })

        switch (format.toLowerCase()) {
            case 'csv':
                downloadCSV('download', df,
                    ['data_source', 'name', 'latitude', 'longitude', 'well_depth'])
                break;
            case 'tsv':
                downloadTSV('download', df,
                    ['data_source', 'name', 'latitude', 'longitude', 'well_depth'])
                break
            case 'json':
                break;
            default:
                break;
        }
    }

    const onCountySelect = (e, enabled) => {
        console.debug('on county select', e, enabled)
        if (e===null){
            return
        }


        // display selected county
        setCounty(e)
        const c = {'type': 'FeatureCollection',
                                            'features': e}
        setSourceData((prev)=>{ return {...prev,
            'selected_county': c }})


        if (enabled===false){
            setSourceData((prev)=>{ return {...prev,
                ...osourceData}})
            return
        }

        let all_features = {}
        // for each visible source layer, filter by county
        for (let s of sources){
            if (osourceData[s.tag]===null){
                console.debug('no data for source', s.tag)
                continue
            }
            if (layerVisibility[s.tag]!=='visible'){
                console.debug('layer not visible', s.tag)
                continue
            }
            let ff;
            for (const ci of e){
                ff = osourceData[s.tag].features.filter((f) => turf.booleanPointInPolygon(f.geometry, ci.geometry))
                console.log(s.tag, ci, 'ff', ff)
                if (ff.length>0){
                    if (all_features[s.tag]===undefined){
                        all_features[s.tag] = {'type': 'FeatureCollection', 'features': ff}
                    }else{
                        all_features[s.tag].features.push(...ff)
                    }
                }
            }
        }
        setSourceData((prev)=>{
            return {...prev, ...all_features}})
    }

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

    const onMouseClick = (e) => {
        console.log('map click', e)
        const selected_point = getCurrentPoint(e)
        if (selected_point===undefined){
            return
        }
        console.log('selected point', selected_point)
        setSelected(selected_point)
        setHydroCollapsed(false)
    }
    const onMouseMove = (e) => {
        mapRef.current.getCanvas().style.cursor = 'crosshair';
        const selected_point = getCurrentPoint(e)
        if (selected_point===undefined){
            return
        }
        mapRef.current.getCanvas().style.cursor = 'pointer';
    }
    const getCurrentPoint = (e)=>{
        const sourcenames = sources.map((s) => s.tag)
        const features = mapRef.current.queryRenderedFeatures(e.point);
        const selected_point = features.find((f) => sourcenames.includes(f.layer.id))
        if (selected_point===undefined){
            return
        }
        return selected_point
    }

    return (<div>
            <HelpSidebar visible={props.helpVisible} setVisible={props.setHelpVisible}/>
            <div className={'grid'}>
                <div className={'col-4'} style={{padding: '20px'}}>
                    <Panel header= {<div> <span className={'panelicon pi pi-clone'}/>Layer</div>}
                               toggleable>
                        <SourceTree handleSourceSelection={handleSourceSelection}/>
                    </Panel>
                    <Panel header={<div><span className={'panelicon pi pi-search'}/>Search</div>} collapsed toggleable>
                        <SearchControl/>
                    </Panel>
                    <Panel header={<div><span className={'panelicon pi pi-filter'}/>Filter</div>} collapsed toggleable>
                        <FilterControl county={county} setCounty={onCountySelect}/>
                    </Panel>
                    <Panel header={<div><span className={'panelicon pi pi-chart-line'}/>Hydgrograph</div>}
                           onToggle={(e) => {setHydroCollapsed(e.value)}}
                            // collapsed
                            collapsed={hydroCollapsed}
                           toggleable>
                        <Hydrograph  selected={selected} data={data} setData={setData}/>
                    </Panel>
                    <Panel header={<div><span className={'panelicon pi pi-table'}/>Table</div>} collapsed toggleable>
                        <HydrographTable selected={selected} data={data}/>
                    </Panel>
                    <Panel header={<div><span className={'panelicon pi pi-download'}/>Download</div>} collapsed toggleable>
                        <DownloadControl downloader={onDownload}/>
                    </Panel>
                </div>
                <div className={'col'} style={{padding: '20px'}}>
                <Map
                    ref={mapRef}
                    mapboxAccessToken={"pk.eyJ1IjoiamFrZXJvc3N3ZGkiLCJhIjoiY2s3M3ZneGl4MGhkMDNrcjlocmNuNWg4bCJ9.4r1DRDQ_ja0fV2nnmlVT0A"}
                    initialViewState={{
                        longitude: -106.4,
                        latitude: 34.5,
                        zoom: 6
                    }}
                    // onClick={(e) => (
                    //     console.log('map click', e)
                    // )}
                    fog={{
                        "range": [0.8, 8],
                        // "color": "#f3dddd",
                        "horizon-blend": 0.05,
                        "high-color": "#245bde",
                        "space-color": "#000000",
                        "star-intensity": 0.95
                    }}
                    terrain={{source: 'mapbox-dem', exaggeration: 3}}
                    projection={'globe'}
                    style={{width: '100%', height: '650px'}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    onMouseMove={onMouseMove}
                    onClick={onMouseClick}
                >

                    {/*onMouseMove={onMouseMove}*/}
                    {/*onClick={(e) => (*/}
                    {/*        console.log('map click', e)*/}
                    {/*        // setSelected(e.features[0])*/}
                    {/*        )*/}
                    {/*    }*/}
                    {
                        sources.map((s)=> (
                        <Source id={s.tag} key={s.tag} type="geojson" data={sourceData[s.tag]}>
                            <Layer
                                id= {s.tag}
                                type= 'circle'
                                paint= {{
                                    'circle-radius': 4,
                                    'circle-color': s.color,
                                    'circle-stroke-color': 'black',
                                    'circle-stroke-width': 1}}
                                layout={{visibility: layerVisibility[s.tag]}}
                            />
                        </Source>
                        ))
                    }

                    <Source
                        id={'selected_county'}
                        type='geojson' data={sourceData['selected_county']}>
                        <Layer
                            type={'fill'}
                            paint={{'fill-color': '#9ab7d5',
                                'fill-outline-color':'#000000',
                                'fill-opacity': 0.25}}>

                        </Layer>
                    </Source>
                    <Source id={'mapbox-dem'}
                        type="raster-dem"
                        url="mapbox://mapbox.mapbox-terrain-dem-v1"
                        tileSize={512}
                        maxzoom={14}>
                    </Source>

                    // setup drawing tools
                    <DrawControl
                        position="top-left"
                        displayControlsDefault={false}
                        controls={{
                            polygon: true,
                            trash: true,
                            combine_features: true,
                            uncombine_features: true,
                        }}
                        // defaultMode="draw_polygon"
                        onCreate={onUpdate}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                        // setup navigation controls
                        <NavigationControl/>
                        {loading && <ProgressSpinner style={{position: 'fixed', top: '30%', left: '50%'}}/>}
                </Map>
            </div>
        </div>
    </div>
    )
    // return (
    //     <Container>
    //         <HelpSidebar visible={props.helpVisible} setVisible={props.setHelpVisible}/>
    //         <Row>
    //             <Col xs={4}>
    //                 <Panel header='Layers' toggleable>
    //                     <SourceTree handleSourceSelection={handleSourceSelection}/>
    //                 </Panel>
    //                 <Panel header='Download' collapsed toggleable>
    //                     <DownloadControl downloader={handleDownload}/>
    //                 </Panel>
    //             </Col>
    //             <Col><Map
    //                 ref={mapRef}
    //                 onLoad={(e)=>{
    //                     console.log('map loaded')
    //                     setupMap(e.target)
    //                 }}
    //                 mapboxAccessToken={"pk.eyJ1IjoiamFrZXJvc3N3ZGkiLCJhIjoiY2s3M3ZneGl4MGhkMDNrcjlocmNuNWg4bCJ9.4r1DRDQ_ja0fV2nnmlVT0A"}
    //                 initialViewState={{
    //                     longitude: -106.4,
    //                     latitude: 34.5,
    //                     zoom: 6
    //                 }}
    //                 style={{width: '100%', height: '650px'}}
    //                 mapStyle="mapbox://styles/mapbox/streets-v9">
    //
    //                 {
    //                     sources.map((s)=> (
    //                     <Source id={s.tag} key={s.tag} type="geojson" data={sourceData[s.tag]}>
    //                         <Layer
    //                             id= {s.tag}
    //                             type= 'circle'
    //                             paint= {{
    //                                 'circle-radius': 4,
    //                                 'circle-color': s.color,
    //                                 'circle-stroke-color': 'black',
    //                                 'circle-stroke-width': 1}}
    //                             layout={{visibility: layerVisibility[s.tag]}}
    //                         />
    //                     </Source>
    //                     ))
    //                 }
    //
    //                 <Source id={'mapbox-dem'}
    //                     type="raster-dem"
    //                     url="mapbox://mapbox.mapbox-terrain-dem-v1"
    //                     tileSize={512}
    //                     maxzoom={14}>
    //                 </Source>
    //
    //                 // setup drawing tools
    //                 <DrawControl
    //                     position="top-left"
    //                     displayControlsDefault={false}
    //                     controls={{
    //                         polygon: true,
    //                         trash: true,
    //                         combine_features: true,
    //                         uncombine_features: true,
    //                     }}
    //                     defaultMode="draw_polygon"
    //                     onCreate={onUpdate}
    //                     onUpdate={onUpdate}
    //                     onDelete={onDelete}
    //                 />
    //                 // setup navigation controls
    //
    //                 <NavigationControl/>
    //                 {loading && <ProgressSpinner />}
    //             </Map></Col>
    //         </Row>
    //     </Container>
    // );
}