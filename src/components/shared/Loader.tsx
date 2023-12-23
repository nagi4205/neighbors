'use client';

import React, { useEffect, useState } from 'react';

interface LoaderProps {
  size: number;
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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
        width={size}
        height={size}
        className='animate-spin'
      />
    </div>
  );
};

export default Loader;
