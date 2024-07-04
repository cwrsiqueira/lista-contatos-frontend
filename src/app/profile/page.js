import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NavBar from "../../components/NavBar";

const Profile = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <NavBar />
      <div>Perfil</div>
    </div>
  );
};

export default Profile;
