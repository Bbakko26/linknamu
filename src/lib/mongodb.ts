import { MongoClient, type Collection } from "mongodb";

export type ClickDoc = { _id: string; count: number };

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

declare global {
  // 개발 모드 HMR 시 연결이 계속 늘어나지 않도록 전역에 캐시
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  return global._mongoClientPromise;
}

/** MONGODB_URI가 없으면 null을 반환 (클릭 집계 비활성) */
export async function getClicksCollection(): Promise<Collection<ClickDoc> | null> {
  const clientPromise = getClientPromise();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client.db(dbName).collection<ClickDoc>("clicks");
}

export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const col = await getClicksCollection();
    if (!col) return {};
    const docs = await col.find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (err) {
    console.error("클릭 수 조회 실패:", err);
    return {};
  }
}
