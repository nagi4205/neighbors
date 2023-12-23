'use client';

import { useEffect, useState } from 'react';

type themeProps = 'light' | 'dark';

const Loader = () => {
  const [theme, setTheme] = useState<themeProps>('light');

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setTheme(isDarkMode ? 'dark' : 'light');
  }, []);

  return (
    <div className='flex justify-center items-center w-full'>
      <img
        src={
          theme === 'dark'
            ? '/assets/loader-dark-theme.svg'
            : '/assets/loader-light-theme.svg'
        }
        alt='loader'
        width={24}
        height={24}
        className='animate-spin'
      />
    </div>
  );
};

export default Loader;
