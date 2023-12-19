import {useParams} from "react-router-dom";
import {Panel} from "primereact/panel";

export default function LocationDetail(){
    const {pointId} = useParams()
    return (
        <div>
            <h1>Location Detail {pointId}</h1>

            <div className={'flex flex-row'}>
                <div className={'col-6'}>
                    <Panel header={<div><span className={"panelicon pi pi-flag"}/>Locaction Info</div>}>
                    </Panel>
                </div>
                <div className={'col-6'}>
                    <Panel header={'Well Info'}>
                    </Panel>
                </div>
            </div>
            <div className={'flex flex-row'}>
                <div className={'col-6'}>
                    <Panel header={<div><span className={"panelicon pi pi-cog"}/>Equipment</div>}>
                    </Panel>
                </div>
                <div className={'col-6'}>
                    <Panel header={<div><span className={"panelicon pi pi-user"}/>Owner</div>}>
                    </Panel>
                </div>
            </div>
            <div className={'flex flex-row'}>
                <div className={'col-12'}>
                    <Panel header={<div><span className={"panelicon pi pi-chart-line"}/>Hydrograph</div>}>
                    </Panel>
                </div>
            </div>
            <div className={'flex flex-row'}>
                <div className={'col-12'}>
                    <Panel header={<div><span className={"panelicon pi pi-camera"} />Photos</div>
                        } toggleable>
                    </Panel>
                </div>
            </div>
        </div>
    )
}