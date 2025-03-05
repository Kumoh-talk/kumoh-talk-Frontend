import ogs from 'open-graph-scraper';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: '유효한 URL을 제공해주세요.' },
      { status: 400 }
    );
  }

  try {
    const options = {
      url,
      onlyGetOpenGraphInfo: true,
      headers: {
        'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
      },
    };

    const data = await ogs(options);

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: '메타 데이터 추출 중 오류가 발생했습니다.',
        result: error.message,
      },
      { status: 500 }
    );
  }
}
