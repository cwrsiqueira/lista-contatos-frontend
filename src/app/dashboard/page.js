import LogoutButton from "../../components/LogoutButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientContacts from "../../components/ClientContacts";
import { cookies } from "next/headers";
import NavBar from "../../components/NavBar";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <NavBar />
      <ClientContacts />
    </div>
  );
};

export default Dashboard;
