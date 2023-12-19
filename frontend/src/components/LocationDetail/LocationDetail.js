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
import "./LocationDetail.css";

import { useParams } from "react-router-dom";
import { Panel } from "primereact/panel";
import { useEffect, useRef, useState } from "react";
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
import { useFiefAuth } from "@fief/fief/react";
import { Carousel } from "primereact/carousel";

import { nmbgmr_getJson } from "../../util";
import { settings } from "../../settings";

export default function LocationDetail() {
  const { pointId } = useParams();
  const fiefAuth = useFiefAuth();

  const [locationInfo, setLocationInfo] = useState([
    { key: "Latitude", value: "" },
    { key: "Longitude", value: "" },
    { key: "Elevation", value: "" },
  ]);
  const [coordinates, setCoordinates] = useState({
    latitude: 35,
    longitude: -106,
    elevation: 0,
  });
  const [wellInfo, setWellInfo] = useState([
    { key: "Well Depth", value: "" },
    { key: "Well Bore Diameter", value: "" },
  ]);
  const [equipment, setEquipment] = useState([
    { type: "", model: "", serial: "", install_date: "", removal_date: "" },
  ]);
  const [ownerInfo, setOwnerInfo] = useState([
    { key: "FirstName", value: "" },
    { key: "LastName", value: "" },
    { key: "OwnerKey", value: "" },
    { key: "Email", value: "" },
    { key: "CellPhone", value: "" },
    { key: "Phone", value: "" },
    { key: "MailingAddress", value: "" },
    { key: "MailCity", value: "" },
    { key: "MailState", value: "" },
    { key: "MailZipCode", value: "" },
    { key: "PhysicalAddress", value: "" },
    { key: "PhysicalCity", value: "" },
    { key: "PhysicalState", value: "" },
    { key: "PhysicalZipCode", value: "" },
    { key: "SecondLastName", value: "" },
    { key: "SecondFirstName", value: "" },
    { key: "SecondCtctEmail", value: "" },
    { key: "SecondCtctPhone", value: "" },
  ]);
  const [photos, setPhotos] = useState([
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/11/American_Beaver%2C_tree_cutting.jpg",
      caption: "American Beaver, tree cutting",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/6b/American_Beaver.jpg",
      caption: "Beaver",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Castor_canadensis1.jpg",
      caption: "Castor canadensis",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Castor_fiber_eating_in_Eskilstuna%2C_Sweden.jpg",
      caption: "Castor fiber eating in Eskilstuna, Sweden",
    },
  ]);

  const mapRef = useRef(null);

  const auth_api_getJson = (url) => {
    return nmbgmr_getJson(url, fiefAuth.token);
  };

  useEffect(() => {
    auth_api_getJson(`location/${pointId}`).then((data) => {
      const info = [
        { key: "Latitude", value: data["location"]["coordinates"][1] },
        { key: "Longitude", value: data["location"]["coordinates"][0] },
        { key: "Elevation", value: data["location"]["coordinates"][2] },
      ];
      setCoordinates(data["location"]["coordinates"]);
      setLocationInfo(info);
    });

    auth_api_getJson(`well/${pointId}`).then((data) => {
      setWellInfo(data);
    });

    auth_api_getJson(`equipment/${pointId}`).then((data) => {
      setEquipment(data);
    });

    auth_api_getJson(`owner/${pointId}`).then((data) => {
      setOwnerInfo(data);
    });

    auth_api_getJson(`photos/${pointId}`).then((data) => {
      setPhotos(data);
    });
  }, [pointId]);

  const photoTemplate = (photo) => {
    return (
      <div className={"item"}>
        <div className={"item-content"}>
          <div className={"mb-3"}>
            <img
              src={photo.url}
              alt={photo.caption}
              className={"image"}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={"text-center"}>
        <h1>Location Detail {pointId}</h1>
      </div>

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
            collapsed
            toggleable
          >
            <DataTable value={equipment}>
              <Column field={"type"} header={"Type"} />
              <Column field={"model"} header={"Model"} />
              <Column field={"serial"} header={"Serial No."} />
              <Column field={"install_date"} header={"Install Date"} />
              <Column field={"removal_date"} header={"Removal Date"} />
            </DataTable>
          </Panel>
        </div>
        <div className={"col-6"}>
          <Panel
            header={
              <div>
                <span className={"panelicon pi pi-user"} />
                Owner
              </div>
            }
            collapsed
            toggleable
          >
            <DataTable value={ownerInfo}>
              <Column field={"key"} header={"Name"} />
              <Column field={"value"} header={"Type"} />
            </DataTable>
          </Panel>
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
            collapsed
            toggleable
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
          >
            <div className={"photo_carousel"}>
              <Carousel
                circular
                value={photos}
                numVisible={3}
                numScroll={3}
                verticalViewPortHeight="360px"
                itemTemplate={photoTemplate}
              />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

// ============= EOF =============================================
