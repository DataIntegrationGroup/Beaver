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

export async function retrieveItems(url, items = [], maxitems = null) {
  if (maxitems != null && items.length >= maxitems) {
    return items;
  }
  console.log("fetching", url);
  const newData = await fetch(url);
  const data = await newData.json();
  console.log("fetch results", data);
  if (data["@iot.nextLink"] != null) {
    return retrieveItems(
      data["@iot.nextLink"],
      items.concat(data.value),
      maxitems,
    );
  } else {
    return items.concat(data.value);
  }
}

export async function nmbgmr_getJson(url, token) {
  const headers = {
    Authorization: "Bearer " + token,
  };
  const newData = await fetch(url, { method: "GET", headers: headers });
  return await newData.json();
}
// ============= EOF =============================================
