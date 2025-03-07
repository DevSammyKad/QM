'use client';

import { useState, useEffect } from 'react';
import {
  dummyBrands,
  dummyProductsForms,
  dummyUses,
  dummyAges,
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for search query and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProductForms, setSelectedProductForms] = useState([]);
  const [selectedUses, setSelectedUses] = useState([]);
  const [selectedAge, setSelectedAge] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');

  // Fetch products with applied filters
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      // Add filters to query parameters
      if (searchQuery) params.append('productName', searchQuery);
      if (selectedBrands.length)
        params.append('brand', selectedBrands.join(','));
      if (selectedProductForms.length)
        params.append('productForm', selectedProductForms.join(','));
      if (selectedUses.length) params.append('uses', selectedUses.join(','));
      if (selectedAge.length) params.append('age', selectedAge.join(','));
      if (selectedSort) params.append('price', selectedSort);

      const res = await fetch(
        `https://quickmeds.sndktech.online/product.mostPopular?${params.toString()}`,
        {
          headers: {
            'x-authorization': 'RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph',
          },
        }
      );

      if (!res.ok)
        throw new Error(`Failed to fetch data, Status Code: ${res.status}`);

      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    searchQuery,
    selectedBrands,
    selectedProductForms,
    selectedUses,
    selectedAge,
    selectedSort,
  ]);

  const handleCheckboxChange = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-medium">What are you looking for?</p>
        <GlobalSearchBox
          placeholder="Search for medicine and health products"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid pt-8 grid-cols-[225px_1fr] gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="rounded-xl max-lg:hidden flex flex-col overflow-hidden bg-white p-2">
          <p className="text-xl font-medium">Filters</p>
          <Divider />

          {/* Brands Filter */}
          <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
            <p className="text-2xl font-medium">Brands</p>
            <CustomCheckboxGroup>
              {dummyBrands.map((brand) => (
                <CustomCheckbox
                  key={brand.value}
                  value={brand.value}
                  checked={selectedBrands.includes(brand.value)}
                  onChange={() =>
                    handleCheckboxChange(setSelectedBrands, brand.value)
                  }
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
                  checked={selectedProductForms.includes(form.value)}
                  onChange={() =>
                    handleCheckboxChange(setSelectedProductForms, form.value)
                  }
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
                  checked={selectedUses.includes(use.value)}
                  onChange={() =>
                    handleCheckboxChange(setSelectedUses, use.value)
                  }
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
                  checked={selectedAge.includes(age.value)}
                  onChange={() =>
                    handleCheckboxChange(setSelectedAge, age.value)
                  }
                >
                  {age.label}
                </CustomCheckbox>
              ))}
            </CustomCheckboxGroup>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-lg:col-span-2 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-shade text-lg">{products.length} results</p>
            <CustomSelect
              label="Sort By"
              onValueChange={(val) => setSelectedSort(val)}
            >
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </CustomSelect>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="grid grid-cols-4 max-[1400px]:grid-cols-3 max-[1080px]:grid-cols-2 max-[450px]:grid-cols-1 gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
