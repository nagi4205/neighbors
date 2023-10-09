// 一度、use clientを使わずにやってみる
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

type GeolocationInfo = {
  latitude: number;
  longitude: number;
  radius: number;
};

type Post = {
  id: string;
  hasLiked: boolean;
  image: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
};

const http = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
});

// fetch()　ver
// const handleLikeEvent = async (postId: string, userId: string) => {
//   try {
//     const response = await fetch("http://localhost/api/likes", {
//       credentials: "include",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//       },
//       body: JSON.stringify({ post_id: postId, user_id: userId }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       const errorMessage = errorData.message || response.statusText;
//       throw new Error(`Network error: ${errorMessage}`);
//     }

//     const data = await response.json();
//     console.log(data);

//     if (data.status === "liked") {
//       console.log("いいねしました。");
//     } else {
//       console.log("いいねを外しました。");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

const handleLikeEvent = async (postId: string, userId: string) => {
  try {
    const response = await axios.post(
      "http://localhost/api/likes",
      {
        post_id: postId,
        user_id: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true, // axios でクッキーを含めるためにはこのオプションを指定します。
      }
    );

    console.log(response.data); // log the response data for debugging

    // Now, based on the response, you can update the UI accordingly.
    if (response.data.status === "liked") {
      // setLikeStatus(postId)
      console.log("いいねしました。");
    } else {
      // Update the UI to reflect that the post was unliked
      console.log("いいねを外しました。");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// const handleLikeEvent = () => {
//   http.post("/api/likes", { username: "takashi" }).then((res) => {
//     console.log(res);
//     if (res.status == 200) {
//       console.log(res.status);
//       console.log(res);
//     }
//   });
// };

const fetchPostsWithGeolocation = async (): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const geolocationInfo: GeolocationInfo = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radius: 4,
            };

            const params = new URLSearchParams({
              latitude: geolocationInfo.latitude.toString(),
              longitude: geolocationInfo.longitude.toString(),
              radius: geolocationInfo.radius.toString(),
            });

            const response = await fetch(
              `http://localhost/api/posts?` + params,
              {
                credentials: "include",
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                // body: JSON.stringify(geolocationInfo),
                cache: "no-store",
              }
            );

            console.log(geolocationInfo);
            console.log(JSON.stringify(geolocationInfo));

            if (!response.ok) {
              throw new Error(
                "Network response was not ok " + response.statusText
              );
            }

            const posts: Post[] = await response.json();
            resolve(posts);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]); //状態を管理するためのuseStateフック
  console.log("あああ");
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await fetchPostsWithGeolocation(); // getAllPostsを非同期で呼び出し
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
    console.log("いいいい");
  }, []);

  return (
    <>
      <div>
        {posts.map((post) => (
          <div className="shadow my-4 flex flex-col bg-green-600" key={post.id}>
            <p>{post.title}</p>
            {post.image ? (
              <>
                <Image
                  src={post.image}
                  className="cursor-pointer object-contain"
                  width={120}
                  height={120}
                  alt="image Description"
                />
              </>
            ) : null}
            <p>{post.created_at}</p>
            <p>{post.content}</p>
            {post.hasLiked ? (
              // <button onClick={() => handleLikeEvent(post.id, post.user_id)}>
              <button onClick={() => handleLikeEvent(post.id, post.user_id)}>
                いいね
              </button>
            ) : (
              <button onClick={() => handleLikeEvent(post.id, post.user_id)}>
                not いいね
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PostList;
