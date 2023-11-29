'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// not created
// import { formatDateString } from "@/lib/utils";
// import DeleteThread from "../forms/DeleteThread";

const CommunityCard = ({
  id,
  name,
  description,
  owner,
  // currentUserId,
  created_at,
  locationData,
}: Community) => {
  const router = useRouter();
  const handlesubmit = () => {
    console.log('on handlesubmit');
    router.push(`/community/${id}`);
  };

  return (
    <article className='flex w-full flex-col rounded-xl border'>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            {/* <Link href={`/profile/${author.id}`} className="relative h-11 w-11"> */}
            <Link href='/' className='relative h-11 w-11'>
              <Image
                // src={author.image}
                src='/20230630_channels4_profile.jpg'
                alt='user_community_image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            {/* <Link href={`/profile/${author.id}`} className="w-fit"> */}
            <Link href='/' className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {owner.name}
              </h4>
            </Link>

            <p className='mt-2 text-small-regular text-light-2'>{name}</p>
            <div className='flex justify-between pr-4'>
              <div className='flex flex-col'>
                <p className='mt-2 text-small-regular text-light-2'>
                  {created_at}
                </p>
                <p className='mt-2 text-small-regular text-light-2'>
                  {locationData.geolocationData.latitude}
                </p>
                <p className='mt-2 text-small-regular text-light-2'>
                  {locationData.geolocationData.longitude}
                </p>
              </div>
              <button onClick={handlesubmit} className='border'>
                <ArrowRight />
              </button>
            </div>

            {/* <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}> */}
            <div className='mt-5 flex flex-col gap-3'>
              <div className='flex gap-3.5'>
                <Image
                  src='/assets/heart-gray.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Link href={`/community/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/assets/share.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </div>

              {/* {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )} */}
            </div>
          </div>
        </div>

        {/* <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        /> */}
      </div>
      {/* 
      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )} */}

      {/* isComment && communityの部分カットしています。 */}
    </article>
  );
};

export default CommunityCard;
