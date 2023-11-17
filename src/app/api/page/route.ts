import { Slider } from "@/predefined/components/Sliders/Slider";
import { generateComponentForRendering } from "@/renderer/helpers/generateComponentForRendering";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await generateComponentForRendering(Slider);

  return NextResponse.json({
    html: Slider,
  });
}
