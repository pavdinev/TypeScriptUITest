# Performance Tests – UI Category & Filter Measurement

This repository contains **Playwright-based performance tests** for measuring category and filter load times on the website. The tests are designed to run **one category at a time**, focusing on the **first product load performance**.

---

## 🧩 Overview

The test performs the following steps:

1. Navigate to the **Home page**.
2. Click a specific **category button** (e.g., Best Sellers).
3. Apply preset filters:  
   - **Sort by:** Price (low → high)  
   - **Product Type:** All Products  
   - **Protein:** Chicken
4. Wait for the **first product** to appear.
5. Log all **timings in seconds**.
6. End with a **summary of total elapsed time** and a final `Performance test completed` message.

⚠️ Only **one category is measured per test** to reduce timeout issues and improve reliability.

---

## ⏱ Timings Reported

The test logs the following timings in **seconds** (with millisecond precision):

- Home page navigation  
- Category button click  
- Filters application  
- First product load  
- Total elapsed time  

Example format: `3.093 s`

---

## 💻 Installation & Setup

Run the following commands to set up and execute the tests:

```bash
# Clone the repository
git clone <repository-url>
cd <repository-folder>

# Install Node.js dependencies
npm install

# Install Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install

# Verify installation (optional)
npx playwright test --version

# -----------------------------
# Run page/category tests individually
# Example:
npx playwright test tests/filters-adult-meals.spec.ts
npx playwright test tests/filters-best-sellers.spec.ts

# -----------------------------
# Run the standalone performance test (measures one category per run)
npx playwright test tests/performance.spec.ts