import Image from "next/image"

export const ProfileAbout = (data) => {
  const {
    bio,
    image
  } = data.data[0];
  return (
    <div className="p-4 grid gap-0.5">
      <div className="flex flex-col gap-y-2">
        <p className="text-sm font-bold">Biography</p>
        <p className="text-sm whitespace-pre-line">{bio}</p>
      </div>
    </div>
  )
}