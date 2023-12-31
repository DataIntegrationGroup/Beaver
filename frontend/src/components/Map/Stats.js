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

import { PiGauge } from "react-icons/pi";
import { FaArrowUpFromWaterPump } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function StatsView() {
  const [stats, setStats] = useState({
    nMonitoringWells: 0,
    nStreamGauges: 0,
  });

  useEffect(() => {
    // get the global stats from the API
    fetch("/api/stats")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("stats:", data);
        setStats({
          nMonitoringWells: 0,
          nStreamGauges: 0,
        });
      });
  }, []);

  return (
    <div className="grid">
      <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Monitoring Wells
              </span>
              <div className="text-900 font-medium text-xl">
                {stats.nMonitoringWells}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-blue-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              {/*<i className="pi pi-eye text-blue-500 text-xl"></i>*/}
              <FaArrowUpFromWaterPump className="text-blue-500 text-xl" />
            </div>
          </div>
          {/*<span className="text-green-500 font-medium">24 new </span>*/}
          {/*<span className="text-500">since last visit</span>*/}
        </div>
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Stream Gauges
              </span>
              <div className="text-900 font-medium text-xl">
                {stats.nStreamGauges}
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-orange-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              {/*<i className="pi pi-map-marker text-orange-500 text-xl"></i>*/}
              <PiGauge className="text-orange-500 text-xl" />
            </div>
          </div>
          {/*<span className="text-green-500 font-medium">%52+ </span>*/}
          {/*<span className="text-500">since last week</span>*/}
        </div>
      </div>
      {/*<div className="col-12 md:col-6 lg:col-3">*/}
      {/*    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">*/}
      {/*        <div className="flex justify-content-between mb-3">*/}
      {/*            <div>*/}
      {/*                <span className="block text-500 font-medium mb-3">Customers</span>*/}
      {/*                <div className="text-900 font-medium text-xl">28441</div>*/}
      {/*            </div>*/}
      {/*            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
      {/*                <i className="pi pi-inbox text-cyan-500 text-xl"></i>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*        <span className="text-green-500 font-medium">520  </span>*/}
      {/*        <span className="text-500">newly registered</span>*/}
      {/*    </div>*/}
      {/*</div>*/}
      {/*<div className="col-12 md:col-6 lg:col-3">*/}
      {/*    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">*/}
      {/*        <div className="flex justify-content-between mb-3">*/}
      {/*            <div>*/}
      {/*                <span className="block text-500 font-medium mb-3">Comments</span>*/}
      {/*                <div className="text-900 font-medium text-xl">152 Unread</div>*/}
      {/*            </div>*/}
      {/*            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>*/}
      {/*                <i className="pi pi-comment text-purple-500 text-xl"></i>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*        <span className="text-green-500 font-medium">85 </span>*/}
      {/*        <span className="text-500">responded</span>*/}
      {/*    </div>*/}
      {/*</div>*/}
    </div>
  );
}

// ============= EOF =============================================
