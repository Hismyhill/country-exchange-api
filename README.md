# 🌍 Country Currency & Exchange API

A RESTful API built with **Node.js (ESM)**, **Express**, **Sequelize**, and **MySQL**.  
It fetches country data and currency exchange rates from external APIs, computes an estimated GDP, stores everything in a database, and provides full CRUD + status endpoints.  
It also generates a PNG summary image with the latest refresh statistics.

---

## 🚀 Features

- Fetch country + currency data from [REST Countries](https://restcountries.com/)
- Fetch exchange rates from [Open Exchange Rate API](https://open.er-api.com/)
- Compute `estimated_gdp = population × random(1000–2000) ÷ exchange_rate`
- Store/update data in MySQL
- Filter, sort, and view country data
- Generate cached summary image (`cache/summary.png`)
- Return consistent JSON errors for all endpoints

---

## 🧠 API Endpoints

### **POST /countries/refresh**

Fetches country + exchange data, updates DB, and generates summary image.

**Response:**

````json
{
  "message": "Countries refreshed successfully",
  "total_updated": 250,
  "last_refreshed_at": "2025-10-27T10:30:00Z"
}

### **GET /countries**
Get all countries with optional filters & sorting.

Query params:
region=Africa
currency=NGN
sort=gdp_desc or sort=gdp_asc

Example:

```bash
GET /countries?region=Africa&sort=gdp_desc

### **GET /countries/:name**

Get a single country by name (case-sensitive).

### **DELETE /countries/:name**
Delete a specific country record.

### **GET /countries/image**
Serve cached summary image.

If no image found:

```json
{ "error": "Summary image not found" }

### **GET /status**
Shows total countries and last refresh timestamp.

Response:

```json
{
  "total_countries": 250,
  "last_refreshed_at": "2025-10-27T10:30:00Z"
}

##  🧩 Validation Rules
Field	        Required	Description
name	        ✅	       Country name
population	    ✅	       Total population
currency_code	✅	       3-letter currency code
capital, region,
 flag_url	    ❌	       Optional
exchange_rate	✅          (if available)	Matched to currency
estimated_gdp	✅	        Computed field

##  🗃️ Database Schema (Sequelize Model)
Field	            Type	        Notes
id	                INTEGER (auto)	Primary key
name	            STRING	        Required
capital	            STRING	        Optional
region	            STRING	        Optional
population	        BIGINT	        Required
currency_code	    STRING	        Required
exchange_rate	    FLOAT	        Nullable
estimated_gdp	    FLOAT	        Computed
flag_url	        STRING	        Optional
last_refreshed_at	DATETIME	    Timestamp

##  ⚙️ Setup Instructions
###1️⃣ Clone the Repo
```bash
git clone https://github.com/Hismyhill/country-exchange-api.git
cd country-exchange-api

### 2️⃣ Install Dependencies
```bash
npm install


### 3️⃣ Setup .env
Create a .env file in the root:

```ini
Copy code
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=country_exchange_db

### 4️⃣ Create Database
In MySQL:

```sql
CREATE DATABASE country_exchange_db;

### 5️⃣ Run Server
```bash
npm run start

or

```bash
node index.js

### 6️⃣ Test Endpoints
Example using curl:

```bash
curl -X POST http://localhost:3000/countries/refresh
curl http://localhost:3000/countries
curl http://localhost:3000/status


##  🧠 Error Responses
Code	    Response
400	        { "error": "Validation failed" }
404	        { "error": "Country not found" }
503	        { "error": "External data source unavailable" }
500	        { "error": "Internal server error" }

### 🖼️ Example Summary Image
Automatically generated after /countries/refresh:

```bash
cache/summary.png

Displays:
Total countries
Top 5 countries by GDP
Timestamp of last refresh

##  🧰 Tech Stack
Node.js (ESM)
Express
Sequelize
MySQL

##  🧑‍💻 Author
Ismaeel Owolabi
````
