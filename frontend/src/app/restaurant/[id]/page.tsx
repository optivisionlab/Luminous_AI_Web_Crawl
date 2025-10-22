'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Dish {
  restaurant_item_id: number;
  item_name: string;
  item_details: string;
  display_price: string;
  item_image: string;
}

interface RestaurantDetail {
  restaurant_info: {
    name: string;
    display_address: string;
    image: string;
  };
  categories: {
    category_name: string;
    items: Dish[];
  }[];
}

interface ApiResponse {
  data: RestaurantDetail;
}

export default function RestaurantDetailPage() {
  const params = useParams();
  const { id } = params;
  const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      async function fetchRestaurantDetail() {
        try {
          const response = await fetch(`http://127.0.0.1:5001/api/restaurants/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result: ApiResponse = await response.json();
          setRestaurant(result.data);
        } catch (error) {
          if (error instanceof Error) {
              setError(error.message);
          } else {
              setError('An unknown error occurred');
          }
          console.error("Failed to fetch restaurant detail:", error);
        }
      }
      fetchRestaurantDetail();
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  if (!restaurant) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-8">
        <img src={restaurant.restaurant_info.image} alt={restaurant.restaurant_info.name} className="w-full h-64 object-cover rounded-lg shadow-md" />
        <h1 className="text-4xl font-bold mt-4">{restaurant.restaurant_info.name}</h1>
        <p className="text-lg text-gray-600">{restaurant.restaurant_info.display_address}</p>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-4">Menu</h2>
        {restaurant.categories.map((category, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{category.category_name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((dish) => (
                <div key={dish.restaurant_item_id} className="border rounded-lg p-4 flex items-center shadow">
                  {dish.item_image && <img src={dish.item_image} alt={dish.item_name} className="w-24 h-24 object-cover rounded-md mr-4" />}
                  <div className="flex-grow">
                    <h4 className="text-xl font-semibold">{dish.item_name}</h4>
                    <p className="text-gray-500">{dish.item_details}</p>
                    <p className="text-lg font-bold mt-2">{dish.display_price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
