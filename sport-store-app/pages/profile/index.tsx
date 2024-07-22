import AuthenticatedNavbar from "@/components/AuthenticatedNavbar";
import ProfileUser from "@/components/profile/ProfileUser";


function Index() {
  return (
    <div>
      <AuthenticatedNavbar />
      <ProfileUser />

    </div>
  );
}

export default Index;
