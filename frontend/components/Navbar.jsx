'use client';
import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { useClerk, UserButton } from '@clerk/nextjs';
import { CartIcon, BagIcon, HomeIcon, BoxIcon } from '@/assets/assets';

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-32 py-5 text-white">
     
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        

        {/*}
        {/* TODO: Add about us page }
        <Link href="/" className="hover:text-blue-300 transition">
          About Us
        </Link>
        {/* TODO: Add contact page }
        <Link href="/" className="hover:text-blue-300 transition">
          Contact
        </Link>*/} 

        {user && !isSeller && (
          <button
            onClick={() => router.push('/become-seller')}
            className="text-xs border border-white/30 hover:border-white px-6 py-2 rounded-full hover:bg-white/10 transition"
          >
            Zostań sprzedawcą
          </button>
        )}
      </div>

     
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push('/seller')}
            className="text-xs border border-white/30 px-4 py-1.5 rounded-full"
          >
            Seller mode
          </button>
        )}
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Home"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push('/')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push('/all-products')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push('/cart')}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push('/my-orders')}
                />
              </UserButton.MenuItems>
              {!isSeller && (
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Zostań sprzedawcą"
                    onClick={() => router.push('/become-seller')}
                  />
                </UserButton.MenuItems>
              )}
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Chat AI"
                  onClick={() => router.push('/chat')}
                />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button className="flex items-center gap-2 hover:text-blue-300 transition">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
