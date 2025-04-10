'use client';
 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { cn } from '@/cn.config';
import SearchSvg from '@/src/icons/searchSvg';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import { ComponentPropsWithRef } from 'react';
import ImgTab from '../imgTab/img-tab';
import { header } from '@/src/page/utils/Api';
 
interface SearchProps extends ComponentPropsWithRef<'input'> {
  wrapperClass?: string;
  onSearchSuccess?: (products: any[]) => void;
}
 
export default function SearchBox(props: SearchProps) {
  const { className, wrapperClass, onSearchSuccess, ...restProps } = props;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');
  const [productSuggestions, setProductSuggestions] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
 
  const router = useRouter(); // Initialize useRouter for navigation
  const staticUserId = '1';
  const userId = localStorage.getItem("userId");

  // Debounced search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
 
    return () => clearTimeout(timer);
  }, [query]);
 
  // Fetch recent searches from the server
  const fetchRecentSearches = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`https://quickmeds.sndktech.online/recent-searches?userId=${userId}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Authorization token
          Authorization: `Bearer ${authToken}`,
        },
      });
 
      const data = await response.json();
      if (data.status) {
        setRecentSearches(data.recentSearches || []);
      } else {
        setRecentSearches([]);
      }
    } catch (error) {
      console.error('Error fetching recent searches:', error);
    }
  };
 
  // Fetch product suggestions from API
  const fetchProductSuggestions = async (searchQuery: string) => {
    if (searchQuery.trim() === '') return;
    setLoading(true);
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`https://quickmeds.sndktech.online/product.get?productName=${searchQuery}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Authorization token
          Authorization: `Bearer ${authToken}`,
        
        },
      });
 
      const data = await response.json();
      if (data.status) {
        setProductSuggestions(data.products);
        if (onSearchSuccess) onSearchSuccess(data.products);
      } else {
        setProductSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching product suggestions:', error);
      setProductSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
 
  // Handle search click and redirect
  const handleSearchClick = async () => {
    if (!query.trim()) return;
 
    // Store the search query in recent searches
    const authToken = localStorage.getItem("authToken");

    try {
      await fetch(`https://quickmeds.sndktech.online/product.recentget?userId=${userId}&productName=${query}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph", // Authorization token
          Authorization: `Bearer ${authToken}`,

        },
      });
      fetchRecentSearches();
    } catch (error) {
      console.error('Error storing recent search:', error);
    }
 
    // Redirect to the product details page
    // router.push(`/medicines/${encodeURIComponent(query)}`);
  };
 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
 
  const handleFocus = () => {
    setShowSuggestions(true);
    fetchRecentSearches();
  };
 
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };
 
  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      fetchProductSuggestions(debouncedQuery);
    }
  }, [debouncedQuery]);
 
  const handleSuggestionClick = (productName: string) => {
    router.push(`/medicines/${encodeURIComponent(productName)}`);
  };
 
  return (
    <div className="relative w-full">
      <div
        className={cn(
          'relative rounded-xl w-full max-sm:flex-row-reverse flex items-center bg-white px-2 py-2 max-sm:pl-0 border border-transparent max-sm:focus-within:border-primary-500',
          wrapperClass
        )}
      >
        <SearchSvg className="" />
        <input
          {...restProps}
          type="search"
          value={query}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for medicine and health products"
          className={cn(
            'pl-4 max-sm:pl-2 text-[16px] outline-none border-none w-full bg-white',
            className
          )}
        />
        <PrimaryButton className="w-fit max-sm:hidden" onClick={handleSearchClick}>
          Search
        </PrimaryButton>
      </div>
 
      {showSuggestions && (
        <div className="absolute w-full bg-white border rounded-md shadow-lg mt-1 z-10 max-md:mt-0 max-w-[800px] p-2">
          {productSuggestions.length > 0 && (
            <div>
              <h1 className="text-gray-500 text-xl mt-3">Product Suggestions</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {productSuggestions.map((item, index) => (
                  <div
                    key={index}
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleSuggestionClick(item.productName)}
                  >
                    <div className="col-span-1 flex items-center">
                      <ImgTab src="/media/logoicons/medicineImg.png" />
                      <p className="text-sm">{item.productName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
 
          {recentSearches.length > 0 && (
            <div>
              <h1 className="text-gray-500 text-xl mt-3">Recent Searches</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="w-full p-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => {
                      setQuery(search);
                      setShowSuggestions(true);
                    }}
                  >
                    <div className="col-span-1 flex items-center">
                      <ImgTab src="/media/logoicons/medicineImg.png" />
                      <p className="text-sm">{search}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
 