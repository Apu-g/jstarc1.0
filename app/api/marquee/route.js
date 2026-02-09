import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const fp = path.join(process.cwd(), "data", "marquee.json");
  if (!fs.existsSync(fp)) {
    return NextResponse.json({ updatedAt: 0, files: [] });
  }
  const data = JSON.parse(fs.readFileSync(fp, "utf8"));
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
