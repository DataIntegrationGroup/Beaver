// ===============================================================================
// Copyright 2023 Jake Ross
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ===============================================================================
import "mapbox-gl/dist/mapbox-gl.css";

import { useParams } from "react-router-dom";
import { Panel } from "primereact/panel";
import { useEffect, useRef, useState } from "react";
import { nmbgmr_getJson } from "../util";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Map, {
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
  useMap,
} from "react-map-gl";
import { settings } from "../settings";

export default function LocationDetail() {
  const { pointId } = useParams();
  const [locationInfo, setLocationInfo] = useState([
    { key: "Latitude", value: "" },
    { key: "Longitude", value: "" },
    { key: "Elevation", value: "" },
  ]);
  const [coordinates, setCoordinates] = useState({
    latitude: 35,
    longitude: -106,
    elevation: 0,
  }); // [longitude, latitude,
  // elevation
  const [wellInfo, setWellInfo] = useState([
    { key: "Well Depth", value: "" },
    { key: "Well Bore Diameter", value: "" },
  ]);

  const mapRef = useRef(null);

  // const [wellInfo, setWellInfo] = useState(null);
  useEffect(() => {
    nmbgmr_getJson(`location/${pointId}`).then((data) => {
      const info = [
        { key: "Latitude", value: data["location"]["coordinates"][1] },
        { key: "Longitude", value: data["location"]["coordinates"][0] },
        { key: "Elevation", value: data["location"]["coordinates"][2] },
      ];
      setCoordinates(data["location"]["coordinates"]);
      setLocationInfo(info);
    });

    nmbgmr_getJson(`well/${pointId}`).then((data) => {
      setWellInfo(data);
    });
  }, [pointId]);

  return (
    <div>
      <h1>Location Detail {pointId}</h1>

      <div className={"flex flex-row"}>
        <div className={"col-4"}>
          <Panel
            header={
              <div>
                <span className={"panelicon pi pi-map-marker"} />
                Map
              </div>
            }
          >
            <Map
              ref={mapRef}
              mapboxAccessToken={settings.mapbox.token}
              initialViewState={{
                longitude: coordinates.longitude,
                latitude: coordinates.latitude,
                zoom: 10,
              }}
              mapStyle={"mapbox://styles/mapbox/satellite-streets-v11"}
              style={{ width: "100%", height: "300px" }}
            >
              <Marker
                latitude={coordinates.latitude}
                longitude={coordinates.longitude}
              ></Marker>
            </Map>
          </Panel>
        </div>
        <div className={"col-4"}>
          <Panel
            header={
              <div>
                <span className={"panelicon pi pi-flag"} />
                Location Info
              </div>
            }
          >
            <DataTable value={locationInfo}>
              <Column field={"key"} header={"Name"} />
              <Column field={"value"} header={"Value"} />
            </DataTable>
          </Panel>
        </div>
        <div className={"col-4"}>
          <Panel header={"Well Info"}>
            <DataTable value={wellInfo}>
              <Column field={"key"} header={"Name"} />
              <Column field={"value"} header={"Value"} />
            </DataTable>
          </Panel>
        </div>
      </div>
      <div className={"flex flex-row"}>
        <div className={"col-6"}>
          <Panel
            header={
              <div>
                <span className={"panelicon pi pi-cog"} />
                Equipment
              </div>
            }
          ></Panel>
        </div>
        <div className={"col-6"}>
          <Panel
            header={
              <div>
                <span className={"panelicon pi pi-user"} />
                Owner
              </div>
            }
          ></Panel>
        </div>
      </div>
      <div className={"flex flex-row"}>
        <div className={"col-12"}>
          <Panel
            header={
              <div>
                <span className={"panelicon pi pi-chart-line"} />
                Hydrograph
              </div>
            }
          ></Panel>
        </div>
      </div>
      <div className={"flex flex-row"}>
        <div className={"col-12"}>
          <Panel
            header={
              <div>
                <span className={"panelicon pi pi-camera"} />
                Photos
              </div>
            }
            toggleable
          ></Panel>
        </div>
      </div>
    </div>
  );
}

// ============= EOF =============================================
