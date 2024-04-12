import {
  S3Client,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Readable } from "stream";

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

async function deleteFileFromS3(key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
  return params.Key;
}

async function getFileFromS3(key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  await s3.send(command);
  return params.Key;
}

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

export const GET = async (
  req: NextApiRequest,
  { params }: { params: { id: string } },
  res: NextApiResponse,
) => {
  const imageKey = params.id as string;

  try {
    if (!imageKey) {
      return res.status(400).json({ error: "Key is required" });
    }

    const getObjectParams = {
      Bucket: bucketName,
      Key: imageKey,
    };

    const command = new GetObjectCommand(getObjectParams);

    const { Body } = await s3.send(command);

    if (!Body) {
      return res.status(404).json({ error: "Object not found" });
    }

    res.setHeader("Content-Disposition", `attachment; filename=${imageKey}`);

    (Body as Readable).pipe(res);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error });
  }
};
