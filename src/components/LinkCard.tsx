"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  initialCount?: number;
};

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    // 페이지 이동 중에도 요청이 유실되지 않도록 sendBeacon 우선 사용
    const body = JSON.stringify({ id: link.id });
    const sent =
      typeof navigator !== "undefined" &&
      navigator.sendBeacon?.("/api/click", new Blob([body], { type: "application/json" }));
    if (!sent) {
      fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
    if (count !== undefined) setCount(count + 1);
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <span>{link.title}</span>
      {count !== undefined && (
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {count.toLocaleString()}회
        </span>
      )}
    </a>
  );
}
