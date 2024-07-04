import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EditForm from "../../../../components/EditForm";

export default async function EditContact({ params }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <EditForm id={params.id} />
    </main>
  );
}
