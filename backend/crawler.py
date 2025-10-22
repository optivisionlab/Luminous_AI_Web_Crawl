import httpx
import json
import asyncio

async def crawl_befood_restaurants(page=1, limit=12):
    """
    Fetches restaurant data from the befood API with pagination asynchronously.
    """
    url = 'https://gw.be.com.vn/api/v1/be-marketplace/web/collection/items/restaurants'
    
    headers = {
        'accept': '*/*',
        'accept-language': 'vi,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6',
        'app_version': '11310',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjowLCJhdWQiOiJndWVzdCIsImV4cCI6MTc2MTIwNDY3NCwiaWF0IjoxNzYxMTE4Mjc0LCJpc3MiOiJiZS1kZWxpdmVyeS1nYXRld2F5In0.0nNWhjOX5vtoQYAQxWG8qTNAnbumGPwigQRyzTXuYYk',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'origin': 'https://food.be.com.vn',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://food.be.com.vn/',
        'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
    }

    data = {
        "collection_id": "228",
        "page": page,
        "filters": [],
        "limit": limit,
        "locale": "vi",
        "app_version": "11310",
        "version": "1.1.310",
        "device_type": 3,
        "operator_token": "0b28e008bc323838f5ec84f718ef11e6",
        "customer_package_name": "xyz.be.food",
        "device_token": "2204ee63bef2f351470a66ffe1bb020e",
        "ad_id": "",
        "screen_width": 360,
        "screen_height": 640,
        "client_info": {
            "locale": "vi",
            "app_version": "11310",
            "version": "1.1.310",
            "device_type": 3,
            "operator_token": "0b28e008bc323838f5ec84f718ef11e6",
            "customer_package_name": "xyz.be.food",
            "device_token": "2204ee63bef2f351470a66ffe1bb020e",
            "ad_id": "",
            "screen_width": 360,
            "screen_height": 640
        },
        "latitude": 10.77253621500006,
        "longitude": 106.69798153800008
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, data=json.dumps(data))
            response.raise_for_status()  # Raise an exception for bad status codes
            return response.json()
    except httpx.RequestError as e:
        print(f"An error occurred: {e}")
        return None

async def crawl_restaurant_detail(restaurant_id: int):
    """
    Fetches detail data for a specific restaurant from the befood API asynchronously.
    """
    url = 'https://gw.be.com.vn/api/v1/be-marketplace/web/restaurant/detail'
    
    headers = {
        'accept': '*/*',
        'accept-language': 'vi,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6',
        'app_version': '11310',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjowLCJhdWQiOiJndWVzdCIsImV4cCI6MTc2MTIwNTc1NiwiaWF0IjoxNzYxMTE5MzU2LCJpc3MiOiJiZS1kZWxpdmVyeS1nYXRld2F5In0.OtCGLQ3znW5A0VwzzcgE5OPq4IcSsvWb5bDNsV6rEDY',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'origin': 'https://food.be.com.vn',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://food.be.com.vn/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
    }

    data = {
        "restaurant_id": restaurant_id,
        "locale": "vi",
        "app_version": "11310",
        "version": "1.1.310",
        "device_type": 3,
        "operator_token": "0b28e008bc323838f5ec84f718ef11e6",
        "customer_package_name": "xyz.be.food",
        "device_token": "2204ee63bef2f351470a66ffe1bb020e",
        "ad_id": "",
        "screen_width": 360,
        "screen_height": 640,
        "client_info": {
            "locale": "vi",
            "app_version": "11310",
            "version": "1.1.310",
            "device_type": 3,
            "operator_token": "0b28e008bc323838f5ec84f718ef11e6",
            "customer_package_name": "xyz.be.food",
            "device_token": "2204ee63bef2f351470a66ffe1bb020e",
            "ad_id": "",
            "screen_width": 360,
            "screen_height": 640
        },
        "latitude": 10.77253621500006,
        "longitude": 106.69798153800008
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, data=json.dumps(data))
            response.raise_for_status()
            return response.json()
    except httpx.RequestError as e:
        print(f"An error occurred: {e}")
        return None

async def main():
    # Test restaurant list crawl
    # restaurant_data = await crawl_befood_restaurants(page=1, limit=12)
    # if restaurant_data:
    #     print(json.dumps(restaurant_data, indent=2, ensure_ascii=False))

    # Test restaurant detail crawl
    detail_data = await crawl_restaurant_detail(3080)
    if detail_data:
        print(json.dumps(detail_data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    asyncio.run(main())
