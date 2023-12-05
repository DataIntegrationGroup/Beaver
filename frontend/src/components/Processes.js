import {Button} from "react-bootstrap";

import Processor from "./Processor/Processor";
import {useState} from "react";



function handlePVACDMonitorLocationsDepthToWater(){
    console.log('gettinadsg monitoring locations depth to water')
}

export default function Processes(props){
    async function getLocation(iotid){
        const base_url = 'https://st2.newmexicowaterdata.org/FROST-Server/v1.1'
        const url =base_url + '/Locations('+iotid+')?$expand=Things/Datastreams'
        const resp = await fetch(url)
        return await resp.json()

    }
    async function handlePVACDMonitoringLocations(){
        console.log('gettinadsg monitoring locations')

        // PVACD,NM_AQUIFER
        let location_iotids = [[9408,9106],
            [9403,9107],
            [9405,9108],
            [9406,9109],
            [9410,9110],
            [9411,9111],
            [9417,9112],
            [9404,9113],
            [9402,9114],
            [9409,9115]]

        let rows = [['location.@iot.id', 'location.name', 'latitude', 'longitude', 'well_depth_ft']]
        for (const location_iotid of location_iotids){
            console.log(location_iotid)

            // get the location from st2
            const location = await getLocation(location_iotid[0])
            const lat = location['location']['coordinates'][1]
            const lon = location['location']['coordinates'][0]

            // get the well depth from nm_aquifer
            const nm_aquifer_location = await getLocation(location_iotid[1])
            console.log('nm_aquifer_location', nm_aquifer_location)
            console.log(nm_aquifer_location['Things'][0].properties)
            const welldepth = nm_aquifer_location['Things'][0].properties['WellDepth']





            rows.push([location['@iot.id'], location['name'], lat, lon, welldepth])

        }
        return rows
    }

    return (
        <div>
            <h1>Processes</h1>
            <Processor button='PVACD Monitoring Locations'
                        onClick={handlePVACDMonitoringLocations}/>
            {/*<Processor button='PVACD Monitoring Locations DepthToWater'*/}
            {/*        onClick={handlePVACDMonitorLocationsDepthToWater}/>*/}
        </div>
    )

}