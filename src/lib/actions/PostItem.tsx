import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";
import Link from "next/link";
import { ScrollArea } from "@radix-ui/themes";

const PostItem: React.FC<Post> = ({
  id,
  hasLiked,
  image,
  title,
  content,
  created_at,
  user,
  likedCount,
}) => {
  const [liked, setLiked] = useState(hasLiked);
  const [likedNumber, setLikedNumber] = useState(likedCount);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        "http://localhost/api/likes",
        {
          post_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          withCredentials: true,
        }
      );

      if (response.data.status === "liked") {
        setLiked(true);
        setLikedNumber(likedNumber + 1);
      } else if (response.data.status === "unliked") {
        setLiked(false);
        setLikedNumber(likedNumber - 1);
      } else {
        throw new Error("Unexpected status Value: ${response.data.status}");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              <Link href="/" className="relative h-11 w-11">
                <Image
                  src={
                    user
                      ? user.profile_image
                      : "/20230630_channels4_profile.jpg"
                  }
                  // src="/20230630_channels4_profile.jpg"
                  alt="user_community_image"
                  fill
                  className="cursor-pointer rounded-full"
                />
              </Link>
              <div className="thread-card_bar" />
            </div>

            <div className="flex w-full flex-col">
              {/* <Link href={`/profile/${author.id}`} className="w-fit">
                  <h4 className="cursor-pointer text-base-semibold text-light-1">
                    {author.name}
                  </h4>
                </Link> */}

              {/* あとで消す消してもいい */}
              <Link href="/" className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {/* ↓どうするか考える */}
                  {user ? user.name : "No Name"}
                </h4>
              </Link>

              <div className="thread-card_bar" />
              {/* ↓imageはどうするか考える */}
              {image ? (
                <Image
                  src={image}
                  className="cursor-pointer object-contain"
                  width={120}
                  height={120}
                  alt="image Description"
                />
              ) : null}
              <p className="mt-2 text-small-regular text-light-2">{content}</p>

              <div className="mb-10 mt-5 flex flex-col gap-3">
                <div className="flex gap-3.5">
                  <Image
                    src="/assets/heart-gray.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  {/* <Link href={`/thread/${id}`}> */}
                  <Link href="">
                    <Image
                      src="/assets/reply.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </Link>
                  <Image
                    src="/assets/repost.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  <Image
                    src="/assets/share.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </div>

                <div className="">
                  <button onClick={handleLike} className="mx-8">
                    {liked ? (
                      "いいねしました"
                    ) : (
                      <Image
                        src="/assets/heart-gray.svg"
                        alt="heart"
                        width={24}
                        height={24}
                        className="cursor-pointer object-contain"
                      />
                    )}
                  </button>
                  <p>いいね数：{likedNumber}</p>
                  <p>{created_at}</p>
                </div>
                {/* {isComment && comments.length > 0 && (
                    <Link href={`/thread/${id}`}>
                      <p className="mt-1 text-subtle-medium text-gray-1">
                        {comments.length} repl
                        {comments.length > 1 ? "ies" : "y"}
                      </p>
                    </Link>
                  )} */}
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="shadow my-4 flex flex-col text-light-1">
        {/* <p>{title}</p> */}
        {/* {image ? (
          <Image
            src={image}
            className="cursor-pointer object-contain"
            width={120}
            height={120}
            alt="image Description"
          />
        ) : null} */}
        {/* <p>{created_at}</p> */}
        {/* <p>{content}</p> */}
        {/* <button onClick={handleLike}>{liked ? "いいね" : "not いいね"}</button>
        <p>{likedNumber}</p> */}
      </div>
    </>
  );
};

export default PostItem;
