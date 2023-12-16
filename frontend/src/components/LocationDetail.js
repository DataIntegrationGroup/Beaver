import {useParams} from "react-router-dom";
import {Panel} from "primereact/panel";

export default function LocationDetail(){
    const {pointId} = useParams()
    return (
        <div>
            <h1>Location Detail {pointId}</h1>
            <Panel header={'Location Info'}>
            </Panel>

            <Panel header={'Well Info'}>
            </Panel>

            <Panel header={'Hydrograph'}>
            </Panel>
        </div>
    )
}