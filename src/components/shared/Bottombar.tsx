'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLists } from '@/constants';

function Bottombar() {
  const pathname = usePathname();

  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {sidebarLists.map((list) => {
          const isActive =
            (pathname.includes(list.route) && list.route.length > 1) ||
            pathname === list.route;

          return (
            <Link
              href={list.route}
              key={list.label}
              className={`bottombar_link ${isActive && 'bg-primary-500'}`}
            >
              {/* <Image
                src={list.imgURL}
                alt={list.label}
                width={16}
                height={16}
                className='object-contain'
              /> */}
              {list.iconComponent}

              <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                {list.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
