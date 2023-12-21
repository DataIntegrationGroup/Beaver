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

import { useFiefAuth, useFiefIsAuthenticated } from "@fief/fief/react";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Callback: React.FunctionComponent = () => {
  const fiefAuth = useFiefAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fiefAuth
      .authCallback(
        `${window.location.protocol}//${window.location.host}/callback`,
      )
      .then(() => {
        navigate("/");
      });
  }, [fiefAuth, navigate]);

  return <p>Callback!</p>;
};

export const RequireAuth: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const fiefAuth = useFiefAuth();
  const isAuthenticated = useFiefIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      fiefAuth.redirectToLogin(
        `${window.location.protocol}//${window.location.host}/callback`,
      );
    }
  }, [fiefAuth, isAuthenticated]);

  return <>{isAuthenticated && children}</>;
};
// ============= EOF =============================================
