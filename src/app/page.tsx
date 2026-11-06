import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";
import { getClickCounts } from "@/lib/mongodb";

// 클릭 수를 매 요청마다 최신으로 보여주기 위해 동적 렌더링
export const dynamic = "force-dynamic";

/**
 * 메인 페이지 (wireframe.png 기준)
 * ┌──────────────┐
 * │   ( 사진 )    │  원형 프로필 사진
 * │    이름       │
 * │  한 줄 소개    │
 * │ [ GitHub   ] │  링크 카드 (세로 배치)
 * │ [ LinkedIn ] │
 * │ [ Blog     ] │
 * └──────────────┘
 */
export default async function Home() {
  const counts = process.env.MONGODB_URI ? await getClickCounts() : null;

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-10 pt-16">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      {/* 상단: 프로필 */}
      <ProfileHeader profile={profile} />

      {/* 하단: 링크 카드 목록 */}
      <ul className="mt-10 flex flex-col gap-6">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} initialCount={counts ? (counts[link.id] ?? 0) : undefined} />
          </li>
        ))}
      </ul>
    </main>
  );
}
