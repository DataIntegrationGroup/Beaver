import {Sidebar} from "primereact/sidebar";
import {Panel} from "primereact/panel";
import {Message} from "primereact/message";

export default function HelpSidebar({visible, setVisible}){
    return (
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
            <h2>Map Help</h2>
            {/*<h3>Viewing Data</h3>*/}
            <Panel header={'Viewing Data'}>
                <p>
                    Use the "Layers" panel to select which layers you want to see on the map.<br/>
                </p>
            </Panel>

            <Panel header={'Downloading Data'}>
                <ul>
                    <li>
                        Draw a polygon on the map to select the data you want to download.
                        <Message text={'The drawing tool offers a lot of functionality. You can edit you vertices,' +
                            ' add more vertices, move the entire polygon and more'}/>
                    </li>
                    <li>
                        Use the "Download" button to download the data in a variety of formats.
                    </li>
                </ul>

            </Panel>

        </Sidebar>
    )
}