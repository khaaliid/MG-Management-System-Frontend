import { signOut } from "next-auth/react";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/api/auth/signout" // Triggers the Keycloak logout URL
    });
  };

  return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;