// ⚠️ 아래 값은 모두 보여 주기용 더미 데이터입니다. 실제 내용으로 교체하세요.

export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 아래 이미지 경로. 비워두면 이름 첫 글자로 표시 */
  image?: string;
};

export const profile: Profile = {
  name: "조인배",
  bio: "뻥구",
  image: "/profile-placeholder.svg",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com/" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
  { id: "blog", title: "Blog", url: "https://velog.io/" },
];
