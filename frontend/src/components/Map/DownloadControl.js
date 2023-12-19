import { Dropdown } from 'primereact/dropdown';
import {useState} from "react";
import { Button } from 'primereact/button';
import {Message} from "primereact/message";
import {Checkbox} from "primereact/checkbox";

export default function DownloadControl({downloader}){
    const [downloadConfig, setDownloadConfig] = useState({
        selectedFormat: 'CSV',
        latest_only: false,

    })

    const handleDownload = () => {
        console.log('Doing downloading', downloadConfig.selectedFormat)
        downloader(downloadConfig.selectedFormat)
    }

    return (
        <div>
            <div style={{'paddingBottom': '10px'}}>
                <Message severity={'info'} text={'Draw a polygon on the map to select the data you want to download'}/>
            </div>
            <div className="flex">
                <Checkbox inputId="latest_only" name="latest_only"
                          onChange={(e)=>{
                                setDownloadConfig({...downloadConfig, latest_only: e.checked})
                          }} checked={downloadConfig.latest_only} />
                <label htmlFor="latest_only" className="ml-2">Latest Measurement Only</label>
            </div>
            <Dropdown placeholder={'Select a download format'}
                      options={['CSV', 'TSV', 'GeoJSON', 'JSON', 'XML']}
                      value={downloadConfig.selectedFormat} onChange={(e) =>
                    // setSelectedFormat(e.value)
                setDownloadConfig({...downloadConfig, selectedFormat: e.value})
            }
            />
            <Button label={'Download'}
            onClick={handleDownload}/>
        </div>
    )
}