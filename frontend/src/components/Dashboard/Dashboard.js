import MapComponent from "../Map/Map";

export default function Dashboard(props){
    return (
        <MapComponent helpVisible={props.helpVisible}
                    setHelpVisible={props.setHelpVisible}/>
    )
}