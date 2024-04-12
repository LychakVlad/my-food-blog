import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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

async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = file;

  const params = {
    Bucket: bucketName,
    Key: `${uuidv4()}`,
    Body: fileBuffer,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);
  return params.Key;
}

async function deleteFileFromS3(key: string) {
  const params = {
    Bucket: bucketName,
    Key: `${uuidv4()}`,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
  return params.Key;
}

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
