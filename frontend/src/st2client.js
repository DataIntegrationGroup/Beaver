// ===============================================================================
// Copyright 2024 Jake Ross
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
import { stringify } from "wkt";

const BASE = "https://st2.newmexicowaterdata.org/FROST-Server/v1.1";
export async function st2GetLocations(agency, polygon) {
  let url;
  if (polygon) {
    url = `${BASE}/Locations?$filter=st_within(location, geography'${stringify(
      polygon,
    )}')&$expand=Things/Datastreams`;
  } else if (agency) {
    url = `${BASE}/Locations?$filter=properties/agency eq '${agency}'&$expand=Things/Datastreams`;
  }
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.value;
    });
}
// ============= EOF =============================================
