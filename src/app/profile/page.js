import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { ProfileForm } from "@/components/forms/ProfileForm";
import { ProfileImageForm } from "@/components/forms/ProfileImageForm";

export default async function AccountRoute() {
  const user = await getUserMeLoader();
  const userData = user.data;
  const userImage = userData?.image;

  return (
    <main className="flex h-max w-full flex-grow flex-col items-center">
      <ProfileImageForm data={userImage} className="" />
      <ProfileForm data={userData} className="" />
    </main>
  );
}