import {useEffect, useRef, useState} from "react";
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


export default function MapComponent(){
    function initMap(){
        // if (mapboxtoken === null){
        //     fetch('/api/mapboxtoken')
        //         .then(response => response.json())
        //         .then(data => {
        //             setMapboxtoken(data.mapboxtoken);
        //             map.current = new mapboxgl.Map({
        //                 container: mapContainer.current,
        //                 style: 'mapbox://styles/mapbox/streets-v11',
        //                 center: [-74.5, 40],
        //                 zoom: 9
        //             });
        //         });
        // }

    }

    useEffect(() => {
        initMap();

    }, [])

    return (
        <div>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    longitude: -106.4,
                    latitude: 34.5,
                    zoom: 6
                }}
                style={{width: '100%', height: '650px', margin: 10}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            />
        </div>
    );
}