import { Vod } from '../../types/streaming/vod';

export const getVodList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STREAMING_URL}/vod`
    );
    const result = await response.json();

    if (response.ok && 'success' in result && 'data' in result) {
      return result.data.vodList as Vod[];
    } else {
      console.error('Failed to fetch data:', result);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const getVodDetail = async (vodId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STREAMING_URL}/vod/${vodId}`
    );
    const result = await response.json();

    if (response.ok && 'success' in result && 'data' in result) {
      return result.data.vodList as Vod[];
    } else {
      console.error('Failed to fetch data:', result);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
