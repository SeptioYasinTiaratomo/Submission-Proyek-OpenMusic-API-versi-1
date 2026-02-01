# Submission-Proyek-OpenMusic-API-versi-1

This is a backend project for the **OpenMusic API** submission at Dicoding Indonesia (Belajar Fundamental Aplikasi Back-End). The application is built using **Node.js**, **Hapi framework**, and **PostgreSQL**.

## Features

- **Albums Management**: Create, Read, Update, and Delete (CRUD) albums.
- **Songs Management**: Create, Read, Update, and Delete (CRUD) songs.
- **Album Detail with Songs**: View album details inclusive of the songs contained within it.
- **Search**: Search songs by title and performer.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Hapi (@hapi/hapi)
- **Database**: PostgreSQL
- **Driver**: node-postgres (pg)
- **Migration Tool**: node-pg-migrate
- **Linter**: ESLint (AirBnB Style Guide)

## Prerequisites

Before running this project, ensure you have the following installed:
1. **Node.js** (v14 or higher)
2. **PostgreSQL**
3. **Postman** (for API Testing)

## Installation & Configuration

Follow these steps to get the project up and running:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd openmusic-api-v1

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Environment Variables

Create a `.env` file in the root directory. You can use the example below:

```env
# Server Configuration
HOST=localhost
PORT=5000

# PostgreSQL Configuration
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=your_password
PGDATABASE=openmusic
PGPORT=5432

```

> **Note:** Change `PGPASSWORD` to your local PostgreSQL password.

### 4. Database Setup

Ensure your PostgreSQL server is running. Then, create the database and run migrations:

**Create Database:**
You can use `pgAdmin` or terminal:

```bash
# If using terminal
createdb openmusic

```

**Run Migrations:**
This will create `albums` and `songs` tables.

```bash
npm run migrate up

```

### 5. Running the Server

**Development Mode (with Nodemon):**

```bash
npm run dev

```

**Production Mode:**

```bash
npm run start

```

The server will start at: `http://localhost:5000`

## API Testing (Postman)

You can test the API endpoints using the provided Postman Collection and Environment (usually provided by Dicoding).

**Main Endpoints:**

* `POST /albums` - Add album
* `GET /albums/{id}` - Get album detail
* `POST /songs` - Add song
* `GET /songs` - Get all songs
* `PUT /albums/{id}` - Update album
* `DELETE /albums/{id}` - Delete album

## Project Structure

```
.
├── migrations/             # Database migration files
├── src/
│   ├── albums/             # Fitur Albums
│   │   ├── handler.js
│   │   ├── routes.js
│   │   ├── service.js
│   │   └── validator.js
│   ├── songs/              # Fitur Songs
│   │   ├── handler.js
│   │   ├── routes.js
│   │   ├── service.js
│   │   └── validator.js
│   ├── validators/         # Joi Schemas
│   │   ├── albums/
│   │   │   └── schema.js
│   │   └── songs/
│   │       └── schema.js
│   ├── exceptions/         # Custom Errors
│   │   ├── ClientError.js
│   │   ├── InvariantError.js
│   │   └── NotFoundError.js
│   └── utils/              # Utilities
│       └── nanoidGenerator.js
├── server.js               # Entry point server
├── .env                    # Environment variables
├── package.json            # Dependencies
└── README.md               # Dokumentasi proyek
```

---

**Created by:** Septio Yasin Tiaratomo
