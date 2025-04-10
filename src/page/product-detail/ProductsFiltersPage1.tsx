"use client";
import {
  dummyAges,
  dummyBrands,
  dummyPackagesCategories,
  dummyProductCardData,
  dummyProductsForms,
  dummyUses,
  selectOptions,
} from "@/dummyData";
import { Routes } from "@/routes.config";
import ProductCard from "@/src/components/custom-cards/productCard/productCard";
import appendUrlParams from "@/src/lib/appendUrlParams";
import CustomCheckbox from "@/src/ui/checkbox/checkbox";
import CustomCheckboxGroup from "@/src/ui/checkbox/custom-checkbox-group";
import GlobalSearchBox from "@/src/ui/searchbox/global-search-box";
import CustomSelect from "@/src/ui/select/custom-select";
import { Divider } from "@nextui-org/divider";
import { SelectItem } from "@nextui-org/select";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Api from "../utils/Api";
import { header } from "../utils/Api";

const defaultImageUrl = "placeholder.png";

export default function ProductsFilterPage() {
  const [medicines, setMedicines] = useState<any[]>([]); // State to store fetched medicines
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [sortBy, setSortBy] = useState<number | null>(null); // State for sorting
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [selectedFilters, setSelectedFilters] = useState<any>({
    brand: [],
    productForm: [],
    use: [],
    age: [],
  }); // For managing filter values

  const pathname = usePathname(); // For handling routes dynamically
  const router = useRouter(); // For handling navigation

  // Function to add selected filter params
  const addParamsHandler = (value: any, filterType: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [filterType]: value };
      fetchMedicines(searchQuery, sortBy, sortOrder, newFilters); // Fetch with updated filters
      return newFilters;
    });
  };

  // Fetch medicines from API
  const fetchMedicines = async (
    productName: string = "",
    sortBy: string = "",
    sortOrder: "ASC" | "DESC" = "ASC",
    filters: any = {}
  ) => {
    setLoading(true);
    setError(null); // Reset error state before a new fetch

    try {
      // Construct the query parameters dynamically for the API
      const queryParams = new URLSearchParams();
      if (productName) queryParams.append("productName", productName);
      if (sortBy) queryParams.append("sortBy", sortBy); // Sorting option (price or rating)
      if (sortOrder) queryParams.append("sortOrder", sortOrder); // Sorting order (ASC or DESC)

      // Add filter parameters (brands, forms, uses, etc.)
      Object.keys(filters).forEach((key) => {
        queryParams.append(key, filters[key].join(",")); // Assuming filters are arrays
      });

      const res = await fetch(`${Api.Health}?${queryParams.toString()}`, {
        headers: header,
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch products. Status Code: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched Medicines:", data);
      if (data.status && Array.isArray(data.healthProduct)) {
        const mappedData: Product[] = data.healthProduct.map(
          (product: any) => ({
            id: product.id,
            title: product.productName,
            sellingPrice: product.sellingPrice,
            actualPrice: product.mrp,
            isLiked: product.favorite,
            offer: 70, // Assuming a static offer, can be dynamic if available
            imgUrl: defaultImageUrl, // Use default if no valid images
          })
        );

        setMedicines(mappedData);
      } else {
        console.error("Error in API response");
        setMedicines([]); // Set to empty array if data is not in expected format
      }
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError(err.message); // Set error message state
    } finally {
      setLoading(false);
    }
  };

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // fetchMedicines(query, sortBy, selectedFilters); // Fetch medicines with updated search query
  };

  // Handle Enter key press to trigger search
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchMedicines(searchQuery, sortBy, sortOrder, selectedFilters); // Fetch medicines based on search query
    }
  };

  // Handle sorting change (by price or rating)
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortField, order] = e.target.value.split("-"); // "price-ASC" or "rating-DESC"
    setSortBy(sortField);
    setSortOrder(order as "ASC" | "DESC");
    fetchMedicines(
      searchQuery,
      sortField,
      order as "ASC" | "DESC",
      selectedFilters
    ); // Fetch medicines based on new sort
  };

  // Fetch medicines on initial load or when search query/sort changes
  useEffect(() => {
    fetchMedicines(searchQuery, sortBy, sortOrder, selectedFilters); // Fetch medicines initially
  }, []); // Empty dependency array ensures this runs only once after initial mount

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-medium">What are you looking for?</p>
        <GlobalSearchBox
          placeholder="Search for medicine and health products"
          value={searchQuery} // Bind the search query value to the input field
          onChange={handleSearchChange} // Call handleSearchChange on input change
          onKeyDown={handleKeyPress} // Call handleKeyPress when a key is pressed
        />
      </div>
      <div className="grid pt-8 grid-cols-[225px_1fr] gap-8 items-start">
        <div className="rounded-xl max-lg:hidden flex flex-col overflow-hidden">
          <div className="bg-white  p-2">
            <p className="text-xl font-medium">Filters</p>
          </div>
          <Divider />
          {pathname.includes(Routes.labTest) ? (
            <div className="bg-white flex flex-col gap-2 py-5 px-2 ">
              <CustomCheckboxGroup
                className=""
                classNames={{ wrapper: "gap-5" }}
              >
                {dummyPackagesCategories.map((category) => (
                  <CustomCheckbox value={category.value} key={category.value}>
                    {category.label}
                  </CustomCheckbox>
                ))}
              </CustomCheckboxGroup>
            </div>
          ) : (
            <>
              <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
                <p className="text-2xl font-medium">Brands</p>
                <div className="">
                  <CustomCheckboxGroup
                    value={selectedFilters.brand}
                    onChange={(value) => addParamsHandler(value, "brand")}
                  >
                    {dummyBrands.map((brand) => (
                      <CustomCheckbox value={brand.value} key={brand.value}>
                        {brand.label}
                      </CustomCheckbox>
                    ))}
                  </CustomCheckboxGroup>
                </div>
              </div>
              <Divider />
              <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
                <p className="text-2xl font-medium">Product form</p>
                <div className="">
                  <CustomCheckboxGroup
                    value={selectedFilters.productForm}
                    onChange={(value) => addParamsHandler(value, "productForm")}
                  >
                    {dummyProductsForms.map((forms) => (
                      <CustomCheckbox value={forms.value} key={forms.value}>
                        {forms.label}
                      </CustomCheckbox>
                    ))}
                  </CustomCheckboxGroup>
                </div>
              </div>
              <Divider />
              <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
                <p className="text-2xl font-medium">Uses</p>
                <div className="">
                  <CustomCheckboxGroup
                    value={selectedFilters.use}
                    onChange={(value) => addParamsHandler(value, "use")}
                  >
                    {dummyUses.map((uses) => (
                      <CustomCheckbox value={uses.value} key={uses.value}>
                        {uses.label}
                      </CustomCheckbox>
                    ))}
                  </CustomCheckboxGroup>
                </div>
              </div>
              <Divider />
              <div className="bg-white flex flex-col gap-2 p-2 max-h-[250px] overflow-y-auto">
                <p className="text-2xl font-medium">Age</p>
                <div className="">
                  <CustomCheckboxGroup
                    value={selectedFilters.age}
                    onChange={(value) => addParamsHandler(value, "age")}
                  >
                    {dummyAges.map((ages) => (
                      <CustomCheckbox value={ages.value} key={ages.value}>
                        {ages.label}
                      </CustomCheckbox>
                    ))}
                  </CustomCheckboxGroup>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-full max-lg:col-span-2 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-shade  text-lg"> {medicines.length} results</p>
            <CustomSelect label="Sort By" onChange={handleSortChange}>
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </CustomSelect>
          </div>
          <div className="grid grid-cols-4 justify-items-center max-[1400px]:grid-cols-3 max-[1080px]:grid-cols-2 max-[450px]:grid-cols-1 gap-3 ">
            {medicines.map((data) => (
              <ProductCard key={data.id} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
