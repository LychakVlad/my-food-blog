import { NextResponse } from "next/server";
import { uploadFileToS3 } from "utils/s3";

export const POST = async (req: Request, res: Response) => {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileKey = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ fileKey });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
