import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterForm from "../../components/RegisterForm";

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main>
      <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
        <RegisterForm />
      </div>
    </main>
  );
}
