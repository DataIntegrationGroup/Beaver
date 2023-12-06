import { Dropdown } from 'primereact/dropdown';
import {useState} from "react";
import { Button } from 'primereact/button';

export default function DownloadControl({downloader}){
    const [selectedFormat, setSelectedFormat] = useState(null)
    const handleDownload = () => {
        console.log('Doing downloading', selectedFormat)
        downloader(selectedFormat)
    }

    return (
        <div className={'card'}>
            <Dropdown placeholder={'Select a download format'}
                      options={['geojson', 'json', 'csv', 'xml']}
                      value={selectedFormat} onChange={(e) => setSelectedFormat(e.value)}
            />
            <Button label={'Download'}
            onClick={handleDownload}/>
        </div>
    )
}