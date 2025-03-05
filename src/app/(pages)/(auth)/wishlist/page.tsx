'use client';
import { dummyProductCardData } from '@/dummyData';
import ProductCard from '@/src/components/custom-cards/productCard/productCard';
import GlobalSearchBox from '@/src/ui/searchbox/global-search-box';
import { useState, useEffect } from 'react';
import Api from '../../utils/Api';
import { header } from '../../utils/Api';
const defaultImageUrl = 'placeholder.png';

export default function page() {
  const dummyWishlistData = dummyProductCardData;

  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State to store search query

  const fetchWishlistData = async (productName: string = '') => {
    // if (!query) return; // Skip if the search query is empty

    setLoading(true);
    setError(null); // Reset error state on new search

    try {
      const queryParams = new URLSearchParams();
      if (productName) queryParams.append('productName', productName);

      const res = await fetch(`${Api.Wishlist}?${queryParams.toString()}`, {
        headers: header,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Failed to fetch data, Status Code: ${res.status}. Error: ${errorText}`
        );
      }

      const data = await res.json();
      console.log('Fetched Data:', data);

      if (data.status && Array.isArray(data.wishlist)) {
        const mappedData = data.wishlist.map((wishlist: any) => ({
          id: wishlist.id,
          title: wishlist.productName,
          sellingPrice: wishlist.sellingPrice,
          actualPrice: wishlist.mrp,
          isLiked: true,
          offer: 70, // Static offer for now
          imgUrl: defaultImageUrl,
        }));

        setProducts(mappedData);
      } else {
        console.error('Error in API response');
        setProducts([]); // Set to empty array if data is not in expected format
      }
    } catch (err: any) {
      console.error('Fetch Error:', err);
      setError(err.message); // Set error message state
    } finally {
      setLoading(false);
    }
  };

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // fetchWishlistData(query); // Fetch wishlist data based on the updated search query
  };

  // Handle Enter key press to trigger search
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchWishlistData(searchQuery); // Fetch products when Enter is pressed
    }
  };

  // Initial fetch when component mounts (fetch all products initially)
  useEffect(() => {
    fetchWishlistData(searchQuery); // Fetch all products initially
  }, []); // Empty dependency array means this runs only once after the component mounts

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
        <p className="text-2xl font-medium">Search your Wishlist products</p>
        <GlobalSearchBox
          placeholder="Search"
          value={searchQuery} // Bind the search query value to the input field
          onChange={handleSearchChange} // Call handleSearchChange on input change
          onKeyDown={handleKeyPress} // Call handleKeyPress when a key is pressed
        />
      </div>
      <div className="grid max-md:px-2 grid-cols-5 gap-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1  pt-10">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <ProductCard data={product} key={product.id} />
          ))
        )}
      </div>
    </div>
  );
}
