from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from backend.crawler import crawl_befood_restaurants, crawl_restaurant_detail
import uvicorn

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/api/restaurants")
def get_restaurants(page: int = Query(1, ge=1)):
    """
    API endpoint to get restaurant data with pagination.
    """
    limit = 12  # Each page will have 12 items
    data = crawl_befood_restaurants(page=page, limit=limit)
    if data:
        return data
    else:
        return {"error": "Failed to fetch data"}

@app.get("/api/restaurants/{restaurant_id}")
def get_restaurant_detail(restaurant_id: int):
    """
    API endpoint to get detail data for a specific restaurant.
    """
    data = crawl_restaurant_detail(restaurant_id)
    if data:
        return data
    else:
        return {"error": "Failed to fetch restaurant detail"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001)
