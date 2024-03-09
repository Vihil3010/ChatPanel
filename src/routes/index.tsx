import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

// layouts
import NonAuthLayout from "../layouts/NonAuth/index";
import { AuthProtected, AccessRoute } from "./AuthProtected";

import { publicRoutes, privateRoutes, UserRoutes } from "./allRoutes";
import { useProfile } from "../hooks/index";
import _ from "lodash";
import { useSelector } from "react-redux";

const Index = (props: any) => {
  const { userProfile, loading } = useProfile();
  const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
  const availableAuthRoutesPath = privateRoutes.map((r) => r.path);
  const availableAuthUserRouesPath = UserRoutes.map((r) => r.path);
  const [UserProfileValue, setUserProfileValue] = useState<boolean>(false);
  const state: any = useSelector((state) => state);

  useEffect(() => {
    console.log("hello ====>>>> 123", userProfile, state.Login);
    if (!_.isNull(userProfile)) {
      const val = !_.isEmpty(userProfile)
        ? userProfile?.user?.role == "agent"
          ? true
          : false
        : false;
      setUserProfileValue(val);
    } else {
      const val =
        !_.isEmpty(state.Login.user) &&
        !_.isEmpty(state.Login.user.user) &&
        state.Login.user.user.role == "agent"
          ? true
          : false;
      setUserProfileValue(val);
      console.log("value ====>>", state.Login, UserProfileValue);
    }
  }, [state.Login, loading]);

  console.log("UserProfile====>>> 123", state, UserProfileValue);
  return (
    <Switch>
      <Route path={availablePublicRoutesPaths}>
        <NonAuthLayout>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <Route
                path={route.path}
                component={route.component}
                key={idx}
                exact={true}
              />
            ))}
          </Switch>
        </NonAuthLayout>
      </Route>

      <Route
        path={
          UserProfileValue
            ? availableAuthUserRouesPath
            : availableAuthRoutesPath
        }>
        <AuthProtected>
          <Switch>
            {UserProfileValue
              ? UserRoutes.map((route, idx) => (
                  <AccessRoute
                    path={route.path}
                    component={route.component}
                    key={idx}
                    exact={true}
                  />
                ))
              : privateRoutes.map((route, idx) => (
                  <AccessRoute
                    path={route.path}
                    component={route.component}
                    key={idx}
                    exact={true}
                  />
                ))}
          </Switch>
        </AuthProtected>
      </Route>
    </Switch>
  );
};

export default Index;
