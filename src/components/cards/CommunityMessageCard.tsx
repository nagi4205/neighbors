'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// not created
// import { formatDateString } from "@/lib/utils";
// import DeleteThread from "../forms/DeleteThread";

const CommunityMessageCard = ({
  id,
  author,
  content,
  // currentUserId,
  created_at,
  isAuthor,
}: CommunityMessage) => {
  const alignmentClass = isAuthor ? 'justify-end' : 'justify-start';
  const alignmentChildClass = isAuthor ? 'flex-row-reverse' : 'flex-row';
  const alignmentChildChildClass = isAuthor ? 'justify-end' : 'justify-start';
  return (
    <div className={`border flex ${alignmentClass} w-full py-4 `}>
      <div className={`flex ${alignmentChildClass}`}>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        </Avatar>
        <div>
          <div className={`flex ${alignmentChildChildClass}`}>
            {author.name}
          </div>
          <div className='bg-blue-500'>{content}</div>
          <div>{created_at}</div>
        </div>
      </div>
    </div>
  );
};

export default CommunityMessageCard;
