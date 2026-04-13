import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  const searchQuery = encodeURIComponent(`${query} proper form technique`);

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=3&key=${apiKey}`
  );

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return NextResponse.json({ videos: [] });
  }

  const videos = data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));

  return NextResponse.json({ videos });
}
