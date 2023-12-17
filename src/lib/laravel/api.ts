import axios from 'axios';

// type GeolocationData = {
//   latitude: number;
//   longitude: number;
// };

// 変数名を変える必要があるんです`
export async function searchPostsByGeolocation(
  geolocationData: GeolocationData
): Promise<Post[]> {
  // when not defined geolocationData, return empty array
  if (!geolocationData) {
    return [];
  }

  // const getXSRFTokenFromCookie = () => {
  //   const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  //   return match ? match[1] : null;
  // };
  // const xsrfToken = getXSRFTokenFromCookie();
  console.log(`lib/laravel/api.ts::geolocationData: ${geolocationData}`);
  try {
    const params = new URLSearchParams({
      latitude: geolocationData.latitude.toString(),
      longitude: geolocationData.longitude.toString(),
      radius: '4',
    });

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // if (xsrfToken) {
    //   headers['X-XSRF-TOKEN'] = xsrfToken;
    //   console.log('xsrfTokenがありました。:', xsrfToken);
    // }

    const response = await fetch(`http://localhost/api/posts?${params}`, {
      method: 'GET',
      credentials: 'include',
      headers: headers,
    });

    const data = response.json();
    console.log(data);
    console.log(geolocationData);
    console.log(JSON.stringify(geolocationData));

    const posts: Post[] = await data;
    return posts;
  } catch (error) {
    console.error('An error occurred while fetching posts:', error);
    throw error;
  }
}

export async function createPost(post: NewPost) {
  console.log('Sending Post Data:', post);
  try {
    const response = await fetch('http://localhost/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include', // fetch では withCredentials の代わりに credentials: 'include' を使用します
      body: JSON.stringify({
        content: post.content,
        latitude: post.locationData?.geolocationData.latitude,
        longitude: post.locationData?.geolocationData.longitude,
        location_name: post.locationData?.locationName?.locationName,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
      //エラー表示
    }

    const createdPost = await response.json();
    console.log(createdPost);
    // toast('投稿しました。');
  } catch (error) {
    console.log('投稿に失敗しました。');
    console.error('Error:', error);
  }
}

export async function createCommunity(community: NewCommunity) {
  console.log('Sending Post Data:', community);
  try {
    const response = await fetch('http://localhost/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include', // fetch では withCredentials の代わりに credentials: 'include' を使用します
      body: JSON.stringify({
        name: community.name,
        description: community.description,
        latitude: community.geolocationData.latitude,
        longitude: community.geolocationData.longitude,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
      //エラー表示
    }

    const createdCommunity = await response.json();
    console.log(createdCommunity);
    // toast('投稿しました。');
  } catch (error) {
    console.log('投稿に失敗しました。');
    console.error('Error:', error);
  }
}
