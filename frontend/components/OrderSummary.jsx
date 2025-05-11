import { useAppContext } from '@/context/AppContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const OrderSummary = () => {
  const {
    router,
    getCartCount,
    getCartAmount,
    getToken,
    user,
    cartItems,
    setCartItems,
  } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/user/get-address', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error('Please select an address');
      }
      let cartItemsArray = Object.keys(cartItems).map((key) => {
        return {
          product: key,
          quantity: cartItems[key],
        };
      });
      cartItemsArray = cartItemsArray.filter((item) => item.quantity > 0);

      if (cartItemsArray.length === 0) {
        return toast.error('Cart is empty');
      }

      const token = await getToken();
      const { data } = await axios.post(
        '/api/order/create',
        {
          address: selectedAddress._id,
          items: cartItemsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        router.push('/order-placed');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="w-full md:w-96 bg-gray-900/40 p-6 rounded-xl border border-blue-500/20 backdrop-blur-sm">
      <h2 className="text-xl md:text-2xl font-medium text-white">
        Order Summary
      </h2>
      <hr className="border-gray-700 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-300 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm rounded-lg overflow-hidden">
            <button
              className="rounded-lg w-full text-left px-4 pr-2 py-3 bg-gray-800 text-gray-300 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : 'Select delivery address'}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? 'rotate-0' : '-rotate-90'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#9CA3AF"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="w-full bg-gray-800 border border-gray-700 shadow-xl mt-1 z-10 py-1.5 rounded-lg divide-y divide-gray-700">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-300 "
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{' '}
                    {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push('/add-address')}
                  className="px-4 py-2 hover:bg-blue-900/30 cursor-pointer text-center text-blue-400"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-300 block mb-2">
            Promo Code
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-3 text-gray-300 bg-gray-800 border border-gray-700 rounded-lg"
            />
            <button className="bg-blue-600 text-white px-5 py-3 hover:bg-blue-700 transition rounded-lg whitespace-nowrap">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-700 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-300">Items ({getCartCount()})</p>
            <p className="text-white">{getCartAmount()} SOL</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-300">Shipping Fee</p>
            <p className="font-medium text-green-400">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-300">Network Fee (2%)</p>
            <p className="font-medium text-white">
              {Math.floor(getCartAmount() * 0.02 * 100) / 100} SOL
            </p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t border-gray-700 pt-3">
            <p className="text-white">Total</p>
            <p className="text-blue-400">
              {(
                getCartAmount() +
                Math.floor(getCartAmount() * 0.02 * 100) / 100
              ).toFixed(2)}{' '}
              SOL
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-blue-600 text-white py-3 mt-5 hover:bg-blue-700 rounded-lg transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
