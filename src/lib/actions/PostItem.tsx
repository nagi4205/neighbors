import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";

const PostItem: React.FC<Post> = ({
  id,
  hasLiked,
  image,
  title,
  content,
  created_at,
  user_id,
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
          user_id: user_id,
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
    <div className="shadow my-4 flex flex-col text-light-1">
      <p>{title}</p>
      {image ? (
        <Image
          src={image}
          className="cursor-pointer object-contain"
          width={120}
          height={120}
          alt="image Description"
        />
      ) : null}
      <p>{created_at}</p>
      <p>{content}</p>
      <button onClick={handleLike}>{liked ? "いいね" : "not いいね"}</button>
      <p>{likedNumber}</p>
    </div>
  );
};

export default PostItem;
