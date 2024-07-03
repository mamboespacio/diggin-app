import Image from "next/image"

export const MusicGrid = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-0.5">
      <div className="bg-white aspect-[1/1] relative overflow-hidden">
        <Image
          fill
          src="https://placehold.co/600x400/jpg"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  )
}