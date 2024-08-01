import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { google } from "googleapis";

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

  try {
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

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:I1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.name,
            body.number,
            body.state,
            body.district,
            body.pincode,
            body.emoji,
            body.reviewText,
            body.hasVideo,
            body.videoPath,
          ],
        ],
      },
    });

    console.log(response);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
