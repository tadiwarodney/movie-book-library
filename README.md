# Movie / Book Library

**By Tadiwanashe Muchuchuti**

A simple web app to keep track of movies and books. You can add items, search or filter them, and browse your list page by page.

## Features

- Add a movie or book with title, genre, rating, and type.
- Search by title or filter by genre, rating, or type.
- Browse results with **Next** and **Previous** buttons.
- Data is stored in MySQL, so it persists after refreshing the page.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Database:** MySQL

## Setup

### 1. Install Prerequisites

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)

### 2. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 3. Install Dependencies

```bash
npm install express mysql2 body-parser
```

### 4. Create the Database

```sql
CREATE DATABASE library;

USE library;

CREATE TABLE library_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  rating INT,
  item_type VARCHAR(50)
);
```

### 5. Configure the Database

Open `server.js` and update the MySQL connection with your username and password.

### 6. Start the Application

```bash
node server.js
```

### 7. Open the App

Visit:http://localhost:3000

```text
http://localhost:3000
```
