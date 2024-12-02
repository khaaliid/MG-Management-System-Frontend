import React from 'react';
import { useKeycloak } from '../provider/KeycloakProvider';
import { signIn } from "next-auth/react";

const WithAuth = WrappedComponent => {
  return props => {
    const { initialized, authenticated } = useKeycloak();

    if (!initialized) {
        signIn("keycloak");
    }

    if (!authenticated) {
      return <div>Not authenticated</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithAuth;