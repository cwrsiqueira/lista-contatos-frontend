import LogoutButton from "../../components/LogoutButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientContacts from "../../components/ClientContacts";
import { cookies } from "next/headers";

const Dashboard = async () => {
  const session = await getServerSession();

  console.log(session);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <div>Olá, {cookies().get("name")}</div>
      <div>Dashboard!</div>
      <LogoutButton />
      <hr className="my-6" />
      <ClientContacts />
    </div>
  );
};

export default Dashboard;
