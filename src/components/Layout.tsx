'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { Home, GamepadIcon, History } from 'lucide-react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { toast } from 'react-hot-toast'; 
import Image from 'next/image';

const NAV_ITEMS = [
  {
    path: '/',
    label: 'Home',
    icon: Home,
  },
  {
    path: '/game',
    label: 'Game',
    icon: GamepadIcon,
  },
  {
    path: '/history',
    label: 'History',
    icon: History,
  },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const router = useRouter(); 

  const handleLinkClick = (path: string) => {
    if (!isConnected && path !== '/') {
      toast.error('Please connect your wallet to access this feature.'); 
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-800'>
      {/* Header */}
      <header className='fixed top-0 left-0 right-0 h-14 bg-gray-900 shadow-lg z-50'>
        <div className='flex items-center justify-between h-full px-4'>
          <Link href='/' className='flex items-center'>
            <Image
              src='/rps-img.webp'
              alt='Rock Paper scissor'
              width={40}
              height={40}
              className='ml-2'
            />
          </Link>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 mt-14 mb-16 overflow-y-auto bg-gray-800'>
        <div className='container mx-auto px-4 py-6 max-w-lg'>{children}</div>
      </main>

      {/* Footer Navigation */}
      <footer className='fixed bottom-0 left-0 right-0 h-16 bg-gray-900 border-t border-gray-800'>
        <nav className='h-full'>
          <ul className='flex items-center justify-around h-full'>
            {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
              const isActive =
                pathname === path ||
                (path === '/game' && router.asPath.startsWith('/game')); 
              return (
                <li key={path} className='flex-1'>
                  <Link
                    href={isConnected || path === '/' ? path : '#'} 
                    onClick={() => handleLinkClick(path)} 
                    className={`flex flex-col items-center justify-center h-full transition-colors duration-200 ${
                      isActive
                        ? 'text-blue-500'
                        : 'text-gray-400 hover:text-blue-500'
                    } ${
                      !isConnected && path !== '/'
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                    }`}
                  >
                    <Icon size={24} className='mb-1' />
                    <span className='text-xs'>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Layout;