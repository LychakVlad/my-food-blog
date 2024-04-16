import { NextRequest, NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // const imageUrl = req.nextUrl.searchParams.getAll("") as any;
    // console.log(imageUrl);

    // const src = imageUrl;

    // // const resImage = await fetch(imageUrl);

    // const buffer = await fetch(src).then(async (res) =>
    //   Buffer.from(await res.arrayBuffer()),
    // );

    // console.log(buffer);
    // // if (!resImage.ok) {
    // //   throw new Error(
    // //     `Failed to fetch image: ${resImage.status} ${resImage.statusText}`,
    // //   );
    // // }

    // // const buffer = await resImage.arrayBuffer();
    // const { base64 } = await getPlaiceholder(buffer);

    // console.log(base64);

    return new NextResponse(JSON.stringify({}), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ error: "An unknown error occurred" }),
        { status: 500 },
      );
    }
  }
}
