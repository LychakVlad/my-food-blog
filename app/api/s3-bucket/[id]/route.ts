import { NextRequest, NextResponse } from "next/server";
import { deleteFileFromS3, getFileFromS3, s3 } from "utils/s3";
import { CustomApiResponse } from "types/env.interface";

export const DELETE = async (req: Request, { params }: any) => {
  const fileId = params.id;
  try {
    if (!fileId) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }
    const fileKey = await deleteFileFromS3(fileId);
    return NextResponse.json({ fileKey });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export const GET = async (req: NextRequest, res: CustomApiResponse) => {
  const { id } = res.params || {};

  try {
    if (!id) {
      return res.status(400).json({ error: "Key is required" });
    }

    const src = await getFileFromS3(id);

    return NextResponse.json({ src });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
