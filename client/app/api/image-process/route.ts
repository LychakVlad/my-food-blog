import { NextRequest, NextResponse } from 'next/server';
import { getPlaiceholder } from 'plaiceholder';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const imageUrl = req.nextUrl.searchParams.get('imageUrl');

    const resImage = await fetch(imageUrl as string);

    if (!resImage.ok) {
      throw new Error(
        `Failed to fetch image: ${resImage.status} ${resImage.statusText}`
      );
    }

    const buffer = await resImage.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return new NextResponse(JSON.stringify({ base64 }), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to fetch all recipes', { status: 500 });
  }
}
