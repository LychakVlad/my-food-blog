import {
  S3Client,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = process.env.MY_AWS_BUCKET_NAME as string;
const region = process.env.MY_AWS_BUCKET_REGION as string;
const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY as string;

interface CustomApiResponse<T = any> extends NextApiResponse<T> {
  params?: {
    id: string;
  };
}

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

export const GET = async (req: NextApiRequest, res: CustomApiResponse) => {
  const { id } = res.params || {};

  try {
    if (!id) {
      return res.status(400).json({ error: "Key is required" });
    }

    const getObjectParams = {
      Bucket: bucketName,
      Key: id,
    };

    const command = new GetObjectCommand(getObjectParams);
    const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return NextResponse.json({ src });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
