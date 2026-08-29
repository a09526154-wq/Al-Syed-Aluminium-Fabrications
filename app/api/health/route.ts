import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Al Syed Aluminium and Glass Fabrications API",
    timestamp: new Date().toISOString(),
  });
}
