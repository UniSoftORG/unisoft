import { Slider } from "@/predefined/components/Sliders/Slider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    html: Slider,
  });
}
