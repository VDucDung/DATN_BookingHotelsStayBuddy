import dynamic from "next/dynamic";
const ProfileEdit = dynamic(() =>import("@/components/profileEdit"), { ssr: false });

const Profile = () => {
  return (
      <ProfileEdit/>
  );
};

export default Profile;
