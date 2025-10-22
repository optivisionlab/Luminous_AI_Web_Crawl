# Luminous AI Web Crawl - Befood Restaurants

Dự án này là một ứng dụng web full-stack được phát triển bởi Luminous AI, dùng để hiển thị danh sách các nhà hàng được crawl từ API của Befood.

## Tính năng chính

- **Crawl dữ liệu:** Tự động lấy dữ liệu nhà hàng từ API của Befood.
- **Hiển thị danh sách:** Hiển thị danh sách các nhà hàng với hình ảnh, tên, địa chỉ và rating.
- **Phân trang:** Người dùng có thể điều hướng qua các trang để xem thêm nhà hàng.
- **Trang chi tiết:** Click vào một nhà hàng để xem thông tin chi tiết và menu các món ăn.
- **Giao diện hiện đại:** Giao diện người dùng được xây dựng bằng Next.js và Tailwind CSS, có header và footer hoàn chỉnh.

## Công nghệ sử dụng

### Backend
- **Python 3**
- **FastAPI:** Framework hiệu suất cao để xây dựng API.
- **Uvicorn:** ASGI server để chạy ứng dụng FastAPI.
- **Requests:** Thư viện để gửi yêu cầu HTTP đến API của Befood.

### Frontend
- **Next.js:** React framework để xây dựng giao diện người dùng.
- **React:** Thư viện JavaScript để xây dựng UI.
- **TypeScript:** Ngôn ngữ lập trình giúp tăng cường tính an toàn cho mã nguồn.
- **Tailwind CSS:** CSS framework để tạo kiểu cho giao diện một cách nhanh chóng.

## Hướng dẫn cài đặt và chạy dự án

### Yêu cầu
- Node.js (v18 trở lên)
- Python 3

### 1. Cài đặt Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt các thư viện Python cần thiết
pip install fastapi "uvicorn[standard]" requests

# Khởi động server backend
uvicorn app:app --host 0.0.0.0 --port 5001 --reload
```
Server backend sẽ chạy tại `http://localhost:5001`.

### 2. Cài đặt Frontend

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt các dependencies
npm install

# Khởi động server phát triển
npm run dev
```
Server frontend sẽ chạy tại `http://localhost:3000` (hoặc một cổng khác nếu cổng 3000 đã được sử dụng).

---

*Dự án được phát triển bởi Luminous AI.*
