'use server';

const getMetadataFromUrl = async (url: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(
    `${baseUrl}/api/metadata?url=${encodeURIComponent(url)}`
  );

  if (!response.ok) {
    throw new Error(`메타 데이터 호출에 실패했습니다. URL: ${url}`);
  }

  const data = await response.json();

  return data?.result;
};

const getMetadataFromHostUrl = async (url: string) => {
  const hostUrl = new URL(url).origin;
  const result = await getMetadataFromUrl(hostUrl);

  return result;
};

export async function getMetadata(url: string) {
  let result = await getMetadataFromUrl(url);

  if (!result || (!result.ogTitle && !result.ogDescription)) {
    result = await getMetadataFromHostUrl(url);
  }

  if (!result) return null;

  const { ogImage = [], ogTitle = '', ogDescription = '', ogUrl = '' } = result;

  return {
    ogImage: ogImage[0]?.url || '/images/logo.png',
    ogTitle,
    ogDescription,
    ogUrl,
    requestedUrl: url,
  };
}
