#  Logging API

This is a simple Express.js API for logging  events to an SQLite database. The API provides an endpoint to record dispense logs, storing details such as dispenser ID, nozzle ID, liters dispensed, price, total, and amount.

## Features

- **POST /api/dispense**: Record a fuel dispense event.
- Data stored in an SQLite database (`data.db`).
- Automatically creates the required table (`dispense_logs`) if it doesn't exist.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)
- SQLite3 installed (optional, but recommended for inspecting the database)

## Installation

1. **Clone the repository** (if applicable) or copy the code into your project directory.

2. **Install dependencies:**

   ```bash
   npm install express body-parser sqlite3 sqlite
   ```

## Usage

1. **Start the server:**

   ```bash
   node index.js
   # or if your file is named differently
   npm start
   ```

2. **API Endpoint:**

   - **POST /api/dispense**

     Request body (JSON):

     ```json
     {
       "dispenser_id": "string",
       "nozzle_id": "string",
       "liters": 12.34,
       "price": 1.23,
       "total": 15.16,
       "amount": 15.16
     }
     ```

     Example using `curl`:

     ```bash
     curl -X POST http://localhost:3009/api/dispense \
       -H "Content-Type: application/json" \
       -d '{"dispenser_id":"D1","nozzle_id":"N1","liters":10,"price":1.5,"total":15,"amount":15}'
     ```

     Response:

     ```json
     { "success": true }
     ```

## Database

- SQLite database file: `data.db`
- Table: `dispense_logs`
- Columns:
  - `id`: INTEGER PRIMARY KEY AUTOINCREMENT
  - `dispenser_id`: TEXT
  - `nozzle_id`: TEXT
  - `liters`: REAL
  - `price`: REAL
  - `total`: REAL
  - `amount`: REAL
  - `timestamp`: DATETIME (records when the log was created)

## Development Notes

- The table is created automatically if it doesn't exist.
- You can inspect the database using any SQLite client:
- dblite software ( https://github.com/sqlitebrowser/sqlitebrowser/releases/download/v3.13.1/DB.Browser.for.SQLite-v3.13.1-win32.msi)

  ```bash
  sqlite3 data.db
  # Then run:
  .tables
  SELECT * FROM dispense_logs;
  ```

## License

MIT (or specify your project's license)

## Contact

For questions or issues, please open an Issue or contact the maintainer.
