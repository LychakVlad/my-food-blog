import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const bucketName = process.env.MY_AWS_BUCKET_NAME as string;
const region = process.env.MY_AWS_BUCKET_REGION as string;
const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY as string;

export const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadFileToS3(file: Buffer, contentType: string) {
  const fileBuffer = file;

  const imageType = contentType.split("/");

  const params = {
    Bucket: bucketName,
    Key: `${uuidv4()}.${imageType[1]}`,
    Body: fileBuffer,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);
  return params.Key;
}

export async function deleteFileFromS3(key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
  return params.Key;
}

export async function getFileFromS3(id: string) {
  const getObjectParams = {
    Bucket: bucketName,
    Key: id,
  };

  const command = new GetObjectCommand(getObjectParams);
  const src = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return src;
}
