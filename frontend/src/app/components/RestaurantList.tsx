'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Helper component for star rating
const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < roundedRating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.561-.955L10 0l2.95 5.955 6.561.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

interface Restaurant {
  restaurant_id: number;
  name: string;
  display_address: string;
  image_compressed_web: string;
  rating: number;
}

interface ApiResponse {
  data: Restaurant[];
  next_page?: number;
}

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/restaurants?page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: ApiResponse = await response.json();
        setRestaurants(result.data);
        // The API returns a 'next_page' field. If it's null or doesn't exist, there's no next page.
        setHasNextPage(!!result.next_page);
      } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError('An unknown error occurred');
        }
        console.error("Failed to fetch restaurants:", error);
      }
    }

    fetchRestaurants();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách nhà hàng</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {restaurants.map((restaurant) => (
          <Link href={`/restaurant/${restaurant.restaurant_id}`} key={restaurant.restaurant_id}>
            <div className="border rounded-lg p-4 shadow-lg h-full hover:shadow-xl transition-shadow">
              <img src={restaurant.image_compressed_web} alt={restaurant.name} className="w-full h-32 object-cover rounded-md mb-2" />
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <p className="text-gray-600">{restaurant.display_address}</p>
              <StarRating rating={restaurant.rating} />
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50"
        >
          Trang trước
        </button>
        <button
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}
