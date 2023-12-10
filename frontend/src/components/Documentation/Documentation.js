import {Message} from "primereact/message";
import {Divider} from "primereact/divider";

export default function Documentation(){
    return (
        <div>
            <Message text={'More Documentation coming soon'} severity={'info'}/>
            <Divider/>
            <ul>
                <li><a href={'https://newmexicowaterdata.org'}>New Mexico Water Data homepage</a></li>
                <li><a href={'https://catalog.newmexicowaterdata.org'}>New Mexico Water Data catalog</a></li>
                <li><a href={'https://developer.newmexicowaterdata.org'}>New Mexico Water Data developer docs</a></li>
                <li>
                    <a href={'https://waterdata.usgs.gov/nwis'}>USGS National Water Information System</a>
                    <ul>
                        <li><a href={'https://dashboard.waterdata.usgs.gov/app/nwd/en/?region=lower48&aoi=default'}>National Water Dashboard</a></li>
                        <li><a href={'https://waterdata.usgs.gov/nm/nwis/rt'}>New Mexico Current Conditions</a></li>
                        <li><a href={'https://waterdata.usgs.gov/nm/nwis/uv'}>New Mexico Daily Values</a></li>
                        <li><a href={'https://waterdata.usgs.gov/nm/nwis/gw'}>New Mexico Groundwater Levels</a></li>
                        <li><a href={'https://waterdata.usgs.gov/nm/nwis/measurement'}>New Mexico Streamflow</a></li>
                    </ul>
                </li>
            </ul>

        </div>
    )
}