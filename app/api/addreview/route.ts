import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createReviewSchema = z.object({
  name: z.string().min(2),
  number: z.string().min(10).max(10),
  state: z.string().min(2).max(50),
  district: z.string().min(2).max(50),
  pincode: z.string().min(6).max(6),
  emoji: z.enum(["SAD", "HAPPY", "EXCITED"]),
  reviewText: z.string().min(1),
  hasVideo: z.boolean(),
  videoPath: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createReviewSchema.safeParse(body);
  if (!validation) {
    return NextResponse.json({ status: 400 });
  }

  const newReview = await prisma.review.create({
    data: {
      name: body.name,
      number: body.number,
      state: body.state,
      district: body.district,
      pincode: body.pincode,
      emoji: body.emoji,
      reviewText: body.reviewText,
      hasVideo: body.hasVideo,
      videoPath: body.videoPath,
    },
  });

  return NextResponse.json(newReview, { status: 201 });
}
