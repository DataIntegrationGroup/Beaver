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

const SOURCES = [
  {
    key: "groundwaterlevels",
    label: "Groundwater Levels",
    children: [
      {
        key: "pvacd:gw:monitoring",
        label: "PVACD Monitoring",
        color: "#c24850",
      },
      {
        key: "nmbgmr:gw:all",
        label: "NMBGMR",
        children: [
          {
            key: "nmbgmr:gw:acoustic",
            label: "Acoustic",
            color: "#ccc46d",
          },
          {
            key: "nmbgmr:gw:pressure",
            label: "Pressure",
            color: "#6dcc9f",
          },
          {
            key: "nmbgmr:gw:manual",
            label: "Manual",
            color: "#d5633a",
          },
        ],
      },
      {
        key: "collabnet",
        label: "Healy Collaborative Network",
        color: "#c24850",
      },
      {
        key: "usgs:gw:all",
        label: "USGS",
        children: [
          {
            key: "usgs:gw:instantaneous",
            label: "Groundwater Levels",
            color: "#cb77c7",
          },
        ],
      },
    ],
  },
  {
    key: "streamflow",
    label: "Stream Flow",
    children: [
      {
        key: "usgs:sw:stream_flow",
        label: "USGS",
        color: "#c24850",
      },
      {
        key: "ose:sw:stream_flow",
        label: "OSE",
        color: "#c24850",
      },
    ],
  },
  {
    key: "water quality",
    label: "Water Quality",
    children: [
      {
        key: "wqp",
        label: "WQP",
        children: [{ key: "wqp_epa", label: "EPA (STORET)" }],
      },
      {
        key: "by_agency",
        label: "By Agency",
        children: [
          {
            key: "cabq_wq",
            label: "CABQ",
            children: [
              {
                key: "cabq_by_agency:wq:Arsenic",
                label: "Arsenic",
                color: "#fafaab",
              },
              {
                key: "cabq_by_agency:wq:Barium",
                label: "Barium",
                color: "#432312",
              },
            ],
          },

          {
            key: "nmbgmr_wq",
            label: "NMBGMR",
            children: [
              { key: "nmbgmr_by_agency:wq:tds", label: "TDS" },
              { key: "nmbgmr_by_agency:wq:ph", label: "pH" },
            ],
          },
          {
            key: "usgs_wq",
            label: "USGS",
            children: [
              { key: "usgs_by_agency:wq:tds", label: "TDS", color: "#c24850" },
              { key: "usgs_by_agency:wq:ph", label: "pH", color: "#c24850" },
              {
                key: "usgs_by_agency:wq:temp",
                label: "Temperature",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:conductivity",
                label: "Conductivity",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:dissolved_oxygen",
                label: "Dissolved Oxygen",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:turbidity",
                label: "Turbidity",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:nitrate",
                label: "Nitrate",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:nitrite",
                label: "Nitrite",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:ammonium",
                label: "Ammonium",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:orthophosphate",
                label: "Orthophosphate",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:total_phosphorus",
                label: "Total Phosphorus",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:total_kjeldahl_nitrogen",
                label: "Total Kjeldahl Nitrogen",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:total_nitrogen",
                label: "Total Nitrogen",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:sulfate",
                label: "Sulfate",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:chloride",
                label: "Chloride",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:sodium",
                label: "Sodium",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:calcium",
                label: "Calcium",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:magnesium",
                label: "Magnesium",
                color: "#c24850",
              },
              {
                key: "usgs_by_agency:wq:potassium",
                label: "Potassium",
                color: "#c31340",
              },
            ],
          },
        ],
      },
      {
        key: "by_analyte",
        label: "By Analyte",
        children: [
          {
            key: "by_analyte_tds",
            label: "TDS",
            children: [
              { key: "nmbgmr_tds", label: "NMBGMR", color: "#c24850" },
              { key: "usgs_tds", label: "USGS", color: "#c24850" },
            ],
          },
          {
            key: "by_analyte_ph",
            label: "pH",
            children: [
              { key: "nmbgmr_ph", label: "NMBGMR", color: "#c24850" },
              { key: "usgs_ph", label: "USGS", color: "#c24850" },
            ],
          },
          {
            key: "by_analyte_temp",
            label: "Temperature",
            children: [
              { key: "nmbgmr_temp", label: "NMBGMR", color: "#c24850" },
              { key: "usgs_temp", label: "USGS", color: "#c24850" },
            ],
          },
        ],
      },
    ],
  },
];

export default SOURCES;
// ============= EOF =============================================
