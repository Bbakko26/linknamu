import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {profile.image ? (
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={176}
          height={176}
          priority
          unoptimized={profile.image.endsWith(".svg")}
          className="h-44 w-44 rounded-full object-cover ring-4 ring-white shadow-md dark:ring-neutral-800"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-44 w-44 items-center justify-center rounded-full bg-emerald-500 text-4xl font-bold text-white shadow-md ring-4 ring-white dark:ring-neutral-800"
        >
          {profile.name.charAt(0)}
        </div>
      )}
      <h1 className="mt-4 text-xl font-bold">{profile.name}</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{profile.bio}</p>
    </header>
  );
}
