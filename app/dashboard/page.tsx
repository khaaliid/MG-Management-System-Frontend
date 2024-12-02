
import Login from "../components/login";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

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