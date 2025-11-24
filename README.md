# Islom.uz Prayer Times Scraper

A robust TypeScript automation tool designed to scrape prayer time tables from [islom.uz](https://islom.uz). This project utilizes **Playwright** for browser automation and **Cheerio** for HTML parsing to ensure accurate data extraction.

Extracted data can be exported directly to a **CSV file** or synchronized with a **PostgreSQL** database using **Drizzle ORM**.

## 🛠 Tech Stack

- **Runtime:** Node.js v22.18 (LTS)
- **Package Manager:** Bun
- **Scraping:** Playwright & Cheerio
- **Database:** PostgreSQL / CSV
- **ORM:** Drizzle ORM
- **Language:** TypeScript

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

1.  **Node.js (v22.18+)**: Required for executing the scripts (specifically on Windows).
2.  **Bun**: Used as the package manager.
3.  **PostgreSQL Database** (Optional): Only required if you intend to use the database storage feature.

---

## 🚀 Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/zero8d/islomuz-parser
    cd islomuz-parser
    ```

2.  **Install Dependencies**
    Use Bun to install the project packages:

    ```bash
    bun install
    ```

3.  **Install Playwright Browsers**
    This script relies on Playwright browsers to load the dynamic content:
    ```bash
    npx playwright install
    ```

---

## ⚙️ Configuration

If you plan to save data to a PostgreSQL database, you must configure your environment variables.

1.  Create a `.env` file in the root directory.
2.  Add your database connection string:

```env
PG_URL=postgres://user:password@host:port/database_name
```

> **Note:** If you are only using the CSV export feature, you can skip this step.

---

## 🗄️ Database Setup

If this is your first time running the project with PostgreSQL, you need to synchronize the database schema using Drizzle Kit.

Run the following command to apply migrations:

```bash
bunx drizzle-kit migrate
```

---

## 🖥️ Usage

The project offers two modes of operation depending on your desired output format.

### 1. Parse to CSV

To scrape the data and save it as a structured `.csv` file:

```bash
npm run parse:csv
```

### 2. Parse to PostgreSQL

To scrape the data and insert it directly into your configured database:

```bash
npm run parse:pg
```

---

## ⚠️ Important Note on Runtime & OS

**For Windows Users:**
This project is explicitly configured to use **Node.js** as the runtime execution environment. While Bun is an excellent runtime, it currently faces compatibility issues launching Playwright on Windows systems. Therefore, the `npm run` commands are set up to execute the code via Node.js.

**For Linux/macOS Users:**
If you are on a non-Windows environment, you may use Bun as the runtime directly if you prefer, though the default commands provided above are tested for stability with Node.js.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/zero8d/islomuz-parser/issues) if you want to contribute.

Follow us in telegram: [@islomapi](https://t.me/islomapi)

Contact me: [@DevKokand](https://t.me/devkokand)

## 📝 License

This project is [MIT](LICENSE) licensed.
