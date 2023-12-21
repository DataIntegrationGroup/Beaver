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

import { settings } from "./settings";
import axios from "axios";
import { Fief } from "@fief/fief";

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
  const response = await nmbgmr_auth_fetch(url, token);
  return response.data;
}

const api = axios.create();
async function inteceptorError(error) {
  const originalRequest = error.config;
  // console.log('interceptor error:', error.response.status === 401 && !originalRequest._retry)

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    // const credentials = JSON.parse(sessionStorage.getItem('credentials'));
    // const access_token = await loginUser(credentials);
    // const access_token = authRefreshToken();
    // const fief = new Fief(
    //   settings.fief.url,
    //   settings.fief.client_id,
    //   settings.fief.client_secret,
    // );

    // const authstate = new FiefAuthState();
    // const access_token = await fief.authRefreshToken();
    // sessionStorage.setItem('token', JSON.stringify(access_token.data));
    // const tokenInfo = storage.getTokenInfo();

    const access_token = "fake token";
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    // console.log('intercepto', access_token.data)
    originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
    return api(originalRequest);
  }
  return Promise.reject(error);
}

api.interceptors.response.use((response) => {
  return response;
}, inteceptorError);
async function nmbgmr_auth_fetch(
  url,
  token,
  method = "GET",
  responseType = "json",
) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  url = `${settings.nmbgmr_api_url}${url}`;
  return await api.get(url, { headers: headers, responseType });
}

export async function getPhoto(photoid, token) {
  console.debug("url", photoid);
  const response = await nmbgmr_auth_fetch(
    `locations/photo/${photoid}`,
    token,
    "GET",
    "blob",
  );
  return response.data;
}

export function decimalToDMS(dd) {
  const deg = dd | 0; // truncate dd to get degrees
  const frac = Math.abs(dd - deg); // get fractional part
  const min = (frac * 60) | 0; // multiply fraction by 60 and truncate
  const sec = frac * 3600 - min * 60;
  return `${deg}° ${min}' ${sec.toFixed(2)}"`;
}
// ============= EOF =============================================
