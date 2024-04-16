import { NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";
import { uploadFileToS3 } from "utils/s3";

export const POST = async (req: Request, res: Response) => {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { base64 } = await getPlaiceholder(buffer);
    const fileKey = await uploadFileToS3(buffer, file.type);

    return NextResponse.json({ fileKey, base64 });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
