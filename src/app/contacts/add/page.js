import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AddForm from "../../../components/AddForm";

export default async function AddContact() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <AddForm />
    </main>
  );
}
