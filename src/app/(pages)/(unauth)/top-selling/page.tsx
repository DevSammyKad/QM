'use client';
import { useEffect, useState } from 'react';
import {
  dummyAges,
  dummyBrands,
  dummyProductCardData,
  dummyProductsForms,
  dummyUses,
  selectOptions,
} from '@/dummyData';
import ProductCard from '@/src/components/custom-cards/productCard/productCard';
import CustomCheckbox from '@/src/ui/checkbox/checkbox';
import CustomCheckboxGroup from '@/src/ui/checkbox/custom-checkbox-group';
import GlobalSearchBox from '@/src/ui/searchbox/global-search-box';
import CustomSelect from '@/src/ui/select/custom-select';
import { Divider } from '@nextui-org/divider';
import { SelectItem } from '@nextui-org/select';

export default function Page() {
  const [topSellingData, setTopSellingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for search query and filters
  const [searchParams, setSearchParams] = useState({
    productName: '',
    brand: [],
    productForm: [],
    uses: [],
    age: [],
    price: '',
  });

  const [filteredData, setFilteredData] = useState([]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({ ...prev, productName: e.target.value }));
  };

  // Handle filter changes (supports multiple selections)
  const handleFilterChange = (field: string, value: string) => {
    setSearchParams((prev) => {
      const currentValues = prev[field] as string[];

      // Toggle selection: Add if not present, remove if already selected
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return { ...prev, [field]: updatedValues };
    });
  };

  // Fetching data with applied filters
  useEffect(() => {
    const fetchTopSellingData = async () => {
      setLoading(true);

      const queryParams = new URLSearchParams({
        productName: searchParams.productName || '',
        brand: searchParams.brand.join(','),
        productForm: searchParams.productForm.join(','),
        uses: searchParams.uses.join(','),
        age: searchParams.age.join(','),
        price: searchParams.price || '',
      }).toString();

      try {
        const res = await fetch(
          `https://quickmeds.sndktech.online/product.getTopSelling?${queryParams}`,
          {
            headers: {
              'x-authorization':
                'RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph',
            },
          }
        );

        if (!res.ok) {
          console.error('Error Status:', res.status);
          throw new Error(`Failed to fetch data. Status Code: ${res.status}`);
        }

        const data = await res.json();
        console.log('Fetched Top Selling Data:', data);

        if (data && Array.isArray(data.products)) {
          const mappedData = data.products.map((product: any) => ({
            id: product.id,
            title: product.productName,
            sellingPrice: product.sellingPrice,
            actualPrice: product.mrp,
            isLiked: product.favorite,
            offer: product.discount,
          }));
          setTopSellingData(mappedData);
        } else {
          setTopSellingData([]);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingData();
  }, [searchParams]); // Refetch data when searchParams change

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-medium">What are you looking for?</p>
        <GlobalSearchBox
          placeholder="Search for medicine and health products"
          onChange={handleSearchChange}
        />
      </div>

      <div className="grid pt-8 grid-cols-[225px_1fr] gap-8 items-start">
        {/* Sidebar for Filters */}
        <div className="rounded-xl max-lg:hidden flex flex-col overflow-hidden">
          <div className="bg-white p-2">
            <p className="text-xl font-medium">Filters</p>
          </div>
          <Divider />

          {/* Brand Filter */}
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Brands</p>
            <CustomCheckboxGroup>
              {dummyBrands.map((brand) => (
                <CustomCheckbox
                  key={brand.value}
                  value={brand.value}
                  checked={searchParams.brand.includes(brand.value)}
                  onChange={() => handleFilterChange('brand', brand.value)}
                >
                  {brand.label}
                </CustomCheckbox>
              ))}
            </CustomCheckboxGroup>
          </div>
          <Divider />

          {/* Product Form Filter */}
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Product Form</p>
            <CustomCheckboxGroup>
              {dummyProductsForms.map((form) => (
                <CustomCheckbox
                  key={form.value}
                  value={form.value}
                  checked={searchParams.productForm.includes(form.value)}
                  onChange={() => handleFilterChange('productForm', form.value)}
                >
                  {form.label}
                </CustomCheckbox>
              ))}
            </CustomCheckboxGroup>
          </div>
          <Divider />

          {/* Uses Filter */}
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Uses</p>
            <CustomCheckboxGroup>
              {dummyUses.map((use) => (
                <CustomCheckbox
                  key={use.value}
                  value={use.value}
                  checked={searchParams.uses.includes(use.value)}
                  onChange={() => handleFilterChange('uses', use.value)}
                >
                  {use.label}
                </CustomCheckbox>
              ))}
            </CustomCheckboxGroup>
          </div>
          <Divider />

          {/* Age Filter */}
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Age</p>
            <CustomCheckboxGroup>
              {dummyAges.map((age) => (
                <CustomCheckbox
                  key={age.value}
                  value={age.value}
                  checked={searchParams.age.includes(age.value)}
                  onChange={() => handleFilterChange('age', age.value)}
                >
                  {age.label}
                </CustomCheckbox>
              ))}
            </CustomCheckboxGroup>
          </div>
        </div>

        {/* Product List */}
        <div className="w-full max-lg:col-span-2 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-shade text-lg">
              {topSellingData.length} results
            </p>
            <CustomSelect label="Sort By">
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </CustomSelect>
          </div>
          <div className="grid grid-cols-4 justify-items-center max-[1400px]:grid-cols-3 max-[1080px]:grid-cols-2 max-[450px]:grid-cols-1 gap-3">
            {loading ? (
              <p>Loading...</p>
            ) : (
              topSellingData.map((data) => (
                <ProductCard key={data.id} data={data} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
