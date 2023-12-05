# ===============================================================================
# Copyright 2023 Jake Ross
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ===============================================================================

router = APIRouter(prefix=f"/api/v1", tags=["API V1"])
auth_router = APIRouter(
    prefix=f"/api/v1", tags=["API V1"], dependencies=[Depends(current_active_user)]
)
admin_router = APIRouter(
    prefix="/api/v1/admin",
    tags=["API V1 Admin"],
    dependencies=[Depends(current_active_user)],
)


@router.get("/pvacd_monitoring_locations")
async def get_pvacd_monitoring_locations():
    pass


@router.get("/pvacd_monitoring_depth_to_water")
async def get_pvacd_monitoring_depth_to_water():
    pass

# ============= EOF =============================================
