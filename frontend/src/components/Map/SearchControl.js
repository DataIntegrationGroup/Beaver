import {Panel} from "primereact/panel";
import {Message} from "primereact/message";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";

export default function SearchControl({keyword, setKeyword, onSearch, onClear}){

    return (
        <div>
            <Message text={'Search by location name.'} severity={'info'}/>
            <div className="p-inputgroup flex-1">
                <InputText
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="PointID e.g WL-" />
                <Button icon="pi pi-search" className="p-button-warning"
                onClick={(e) => onSearch(keyword)}
                />
                <Button icon="pi pi-trash" className="p-button-danger"
                        onClick={(e) => onClear()}
                />
            </div>

        </div>
    )
}