import { Panel } from "primereact/panel";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export default function SearchControl({
  keyword,
  setKeyword,
  onSearch,
  onClear,
  onSpatialSearch,
}) {
  const [spatialSearchAttribute, setSpatialSearchAttribute] =
    useState("Groundwater Level");

  const spatialSearchAttributes = [
    "Groundwater Level",
    "Groundwater Quality",
    "Streamflow",
  ];

  return (
    <div>
      <Message text={"Search by location name."} severity={"info"} />
      <div className="p-inputgroup flex-1">
        <InputText
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="PointID e.g WL-"
        />
        <Button
          icon="pi pi-search"
          className="p-button-warning"
          onClick={(e) => onSearch(keyword)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={(e) => onClear()}
        />
      </div>
      <Divider />
      <Message text={"Spatial Search"} severity={"info"} />
      <div className="p-inputgroup flex-1">
        <Dropdown
          value={spatialSearchAttribute}
          options={spatialSearchAttributes}
          onChange={(e) => setSpatialSearchAttribute(e.target.value)}
          placeholder="Select an attribute"
        />
        <Button
          icon={"pi pi-search"}
          onClick={(e) => onSpatialSearch(spatialSearchAttribute)}
          severity={"secondary"}
        />
      </div>
    </div>
  );
}
