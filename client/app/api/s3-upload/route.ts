import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const bucketName = process.env.MY_AWS_BUCKET_NAME as string;
const region = process.env.MY_AWS_BUCKET_REGION as string;
const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY as string;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;
  console.log(fileName);

  const params = {
    Bucket: bucketName,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpeg",
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);
  return fileName;
}

export const POST = async (req: Request, res: Response) => {
  try {
    const formData = await req.formData();

    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
