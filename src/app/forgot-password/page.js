import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClientContacts from "../../components/ClientContacts";
import Link from "next/link";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center">
      <div className="container mt-12">
        <Link href="/contacts/add" className="btn btn-active btn-primary mb-6">
          Adicionar Contato
        </Link>
        <ClientContacts />
      </div>
    </div>
  );
};

export default Dashboard;
