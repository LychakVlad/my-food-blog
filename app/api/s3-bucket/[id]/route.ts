import { NextResponse } from "next/server";
import { deleteFileFromS3 } from "utils/s3";

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
