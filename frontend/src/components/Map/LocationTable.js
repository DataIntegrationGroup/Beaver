import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { decimalToDMS } from "../../util";

export default function LocationTable({ sourceData }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // const rs = sourceData.map((item) => {
    //
    // })
    let rs = [];

    for (const [key, s] of Object.entries(sourceData)) {
      console.log(key, s);
      if (s === null || s === undefined) {
        continue;
      }
      const rr = s.features.map((f) => {
        const lat = decimalToDMS(f.geometry.coordinates[1]);
        const lng = decimalToDMS(f.geometry.coordinates[0]);
        return {
          name: f.properties.name,
          latitude: lat,
          longitude: lng,
          datasource: key,
        };
      });
      rs.push(...rr);
    }
    setRows(rs);
  }, [sourceData]);

  return (
    <Panel
      header={
        <div>
          <span className={"panelicon pi pi-map-marker"} />
          Locations
        </div>
      }
      collapsed
      toggleable
    >
      <DataTable
        className={"compact-table"}
        size={"small"}
        value={rows}
        stripedRows
        paginator
        rows={10}
      >
        <Column field={"name"} header={"Name"}></Column>
        <Column field={"datasource"} header={"Source"}></Column>
        <Column field={"latitude"} header={"Latitude"}></Column>
        <Column field={"longitude"} header={"Longitude"}></Column>
      </DataTable>
    </Panel>
  );
}
