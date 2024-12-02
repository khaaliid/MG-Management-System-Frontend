
import Login from "../components/login";
import { useProtectedPage } from "../hooks/useProtectedPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "../components/logout";

async function Dashboard() {

  const session = await getServerSession(authOptions);
  if (session) {
    return <div>
     Dashboard
    </div>
  }
  return (
    <div>
      <Login />
    </div>
  )
  }

  export default Dashboard;