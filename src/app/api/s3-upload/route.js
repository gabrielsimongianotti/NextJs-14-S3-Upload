import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
	region: process.env.AWS_S3_REGION,
	credentials: {
		accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
	}
});


async function uploadFileToS3(file, fileName, folder) {

	const fileBuffer = file;


	const params = {
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: `bigSticker/${folder}/${fileName}`,
		Body: fileBuffer,
		ContentType: "image/jpg"
	}

	const command = new PutObjectCommand(params);

	const s3Image = await s3Client.send(command);

	return fileName;
}

export async function POST(request) {
	try {
		const url = new URL(request.url);
		const category = url.searchParams.get("category");
		console.log("Category:", category);
		const formData = await request.formData();
		const file = formData.get("file");

		if (!file) {
			return NextResponse.json({ error: "File is required." }, { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const fileName = await uploadFileToS3(buffer, file.name, category);

		return NextResponse.json({ success: true, fileName });
	} catch (error) {
		return NextResponse.json({ error });
	}
}