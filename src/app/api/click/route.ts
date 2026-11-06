import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getClickCounts, getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const validIds = new Set(links.map((l) => l.id));

export async function GET() {
  return NextResponse.json(await getClickCounts());
}

export async function POST(req: Request) {
  let id: unknown;
  try {
    ({ id } = await req.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크" }, { status: 400 });
  }

  try {
    const col = await getClicksCollection();
    if (!col) return NextResponse.json({ ok: false, reason: "db-disabled" });
    await col.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("클릭 기록 실패:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
