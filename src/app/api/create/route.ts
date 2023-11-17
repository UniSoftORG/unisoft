import { createJsonFile } from "@/utils/createFile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { data } = await request.json();
  await createJsonFile("test.json", { ...JSON.parse(data) });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
