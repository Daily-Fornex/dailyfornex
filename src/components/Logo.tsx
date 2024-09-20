'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Logo = () => {
  const { theme } = useTheme();

  return (
    <Link href="/" className="flex items-center">
      <Image
        src={theme === 'dark' ? '/logo-light.webp' : '/logo.webp'}
        alt="Daily Fornex Logo"
        width={150}
        height={50}
        className="w-auto h-8 md:h-10" // Adjust size as needed
        priority
      />
    </Link>
  );
};

export default Logo;