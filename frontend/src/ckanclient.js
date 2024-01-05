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
"https://catalog.newmexicowaterdata.org/api/3/action/datastore_search?resource_id=cb402046-86d0-4c5b-a3ea-1d255674be3f&limit=5";

const BASE = "https://catalog.newmexicowaterdata.org";
export function ckanGetJson(resource) {
  let api = "api/3/action/datastore_search";
  let url = `${BASE}/${api}?resource_id=${resource}&limit=5`;
  return doFetch(url);
}

function doFetch(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data["success"] === true) {
        return data["result"]["records"];
      }
    });
}

export function ckanGetJsonSQL(resource, where) {
  let api = "api/3/action/datastore_search_sql";
  let url = `${BASE}/${api}?sql=SELECT * from "${resource}" WHERE ${where}`;
  return doFetch(url);
}

// ============= EOF =============================================
