# 🛍️ Price Basket Project

An interactive shopping basket web application built with:

- **Spring Boot** (Java) for the backend API
- **Next.js** (TypeScript) for the frontend UI
- **Tailwind CSS** for styling

## 📦 Features

- View available products and current offers
- Add / remove products to/from your basket
- View real-time basket summary (subtotal, discounts, total)
- Offers are dynamically calculated (e.g. 10% off Apples, "Buy 2 Soups get a half price Bread")
- Responsive, morden UI

## 🚀 Getting Started

### 🔧 Prerequisites

- Java 17
- Maven
- Node.js (v20)

### 🖥️ Backend (Spring Boot)

```bash
cd backend
mvn clean install -DskipTests
./mvnw spring-boot:run
```

API available at `http://localhost:8080`

### 🌐 Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

## 🔀 Available API Endpoints

| **Method** | **Endpoint**      | **Description**                        |
| ---------- | ----------------- | -------------------------------------- |
| GET        | `/store/products` | Get list of available items            |
| GET        | `/store/offers`   | Get current discount offers            |
| PUT        | `/basket/update`  | Update item quantity (`name`, `count`) |
| PUT        | `/basket/reset`   | Reset basket                           |
| GET        | `/basket/items`   | Get current basket items               |
| GET        | `/basket/price`   | Get calculated price & discounts       |

App available at `http://localhost:3000`

## 🧠 Available API Endpoints

- Apples → 10% discount
- Buy 2 Soups → get 1 Bread at half price
  All discounts are calculated dynamically on the backend.

## 💡 Future Improvements

- Checkout flow (address, payment, confirmation)
- Persist basket via localStorage or backend session
- User authentication
- Admin panel for managing products & offers
- Unit & integration tests
