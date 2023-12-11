import {Dropdown} from "primereact/dropdown";
import streets from '../../img/basemap/Streets.png'
import outdoors from '../../img/basemap/Outdoors.png'
import dark from '../../img/basemap/Dark.png'
import light from '../../img/basemap/Light.png'
import satellite from '../../img/basemap/Satellite.png'
import satellite_streets from '../../img/basemap/SatelliteStreets.png'
import navigation_day from '../../img/basemap/NavigationDay.png'
import navigation_night from '../../img/basemap/NavigationNight.png'

const styles = [
    {name: 'Streets', url:'mapbox://styles/mapbox/streets-v11',
    image: streets},
    {name: 'Dark', url:'mapbox://styles/mapbox/dark-v10',
    image: dark},
    {name: 'Light', url:'mapbox://styles/mapbox/light-v10',
    image: light},
    {name: 'Satellite', url:'mapbox://styles/mapbox/satellite-v9',
    image: satellite},
    {name: 'Satellite Streets', url:'mapbox://styles/mapbox/satellite-streets-v11',
    image: satellite_streets},
    {name: 'Outdoors', url:'mapbox://styles/mapbox/outdoors-v11',
    image: outdoors},
    {name: 'Navigation Day', url:'mapbox://styles/mapbox/navigation-day-v1',
    image: navigation_day},
    {name: 'Navigation Night', url:'mapbox://styles/mapbox/navigation-night-v1',
    image: navigation_night},
]


const basemapTemplate = (option, props) => {
    if (option) {
        return (
            <div className="basemap-item basemap-item-value">
                <img alt={option.label} src={option?.image} />
                <div>{option.label}</div>
            </div>
        );
    }

    return (
        <span>
            {props.placeholder}
        </span>
    );
}

const basemapOptionTemplate = (option) => {
    return (
        <div className="country-item">
            <img alt={option.label} src={option?.image}
                 // className={`flag flag-${option.code.toLowerCase()}`}
            />
            <div>{option.label}</div>
        </div>
    );
}
export default function BaseMapControl({style, setStyle}){
    return (
        <div>
            <Dropdown
            value={style}
            valueTemplate={basemapTemplate}
            itemTemplate={basemapOptionTemplate}
            options={styles.map((item)=>{return {label: item.name,
                value: item.url,
                image: item.image}})}
            onChange={(e) => setStyle(e.value)}
            />

        </div>

    )
}