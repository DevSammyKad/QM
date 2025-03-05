'use client';

import { useState } from 'react';
import { cn } from '@/cn.config';
import SearchSvg from '@/src/icons/searchSvg';
import { PrimaryButton } from '@/src/ui/buttons/buttons';
import { ComponentPropsWithRef } from 'react';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import ImgTab from '../imgTab/img-tab';

interface SearchProps extends ComponentPropsWithRef<'input'> {
  wrapperClass?: string;
}

export default function SearchBox(props: SearchProps) {
  const { className, wrapperClass, ...restProps } = props;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');

  // Sample search suggestions

  const recentSearch = ['Paracetamol', 'Ibuprofen', 'Aspirin'];
  const suggestions = [
    'Paracetamol',
    'Ibuprofen',
    'Aspirin',
    'Cough Syrup',
    'Vitamin D',
  ];

  // Filter suggestions based on user input
  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

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
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search for medicine and health products"
          className={cn(
            'pl-4 max-sm:pl-2 text-[16px] outline-none border-none w-full bg-white',
            className
          )}
        />
        <PrimaryButton className="w-fit max-sm:hidden">Search</PrimaryButton>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute w-full bg-white border rounded-md shadow-lg mt-1 z-10 max-md:mt-0 max-w-[800px] p-2">
          {recentSearch.map((search) => (
            <div
              className="flex justify-between items-center p-2 gap-5 hover:bg-gray-100 cursor-pointer"
              key={search}
            >
              <div className="flex items-center space-x-2">
                <RotateCcw className="text-gray-500 text-sm" />
                <p className="text-sm">{search}</p>
              </div>
              <ArrowUpRight className="text-gray-500 text-sm" />
            </div>
          ))}

          <h1 className="text-gray-500 tex-xl mt-3"> Related searches</h1>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {filteredSuggestions.map((item, index) => (
              <div
                key={index}
                className="w-full  p-2 hover:bg-gray-100 cursor-pointer "
                onMouseDown={() => {
                  setQuery(item);
                  setShowSuggestions(false);
                }}
              >
                <div className="col-span-1 flex items-center">
                  <ImgTab src="/media/logoicons/medicineImg.png " />
                  <p className="text-sm">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
