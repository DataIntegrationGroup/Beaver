import { Dropdown } from 'primereact/dropdown';
import {useState} from "react";
import { Button } from 'primereact/button';
import {Message} from "primereact/message";

export default function DownloadControl({downloader}){
    const [selectedFormat, setSelectedFormat] = useState('CSV')
    const handleDownload = () => {
        console.log('Doing downloading', selectedFormat)
        downloader(selectedFormat)
    }

    return (
        <div>
            <div style={{'paddingBottom': '10px'}}>
                <Message severity={'info'} text={'Draw a polygon on the map to select the data you want to download'}/>
            </div>

            <Dropdown placeholder={'Select a download format'}
                      options={['CSV', 'TSV', 'GeoJSON', 'JSON', 'XML']}
                      value={selectedFormat} onChange={(e) => setSelectedFormat(e.value)}
            />
            <Button label={'Download'}
            onClick={handleDownload}/>
        </div>
    )
}