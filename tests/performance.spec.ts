import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

// This test collects a small sample of response times for search API and asserts average is under a threshold.
// NOTE: thresholds are environment-dependent. Tune in CI/staging.
test.describe('Search Performance', () => {
  test('measure average search API latency (sample of 5)', async ({ page }) => {
    const search = new SearchPage(page);
    await search.goto();

    const query = 'wireless headphones';
    const samples: number[] = [];

    for (let i = 0; i < 5; i++) {
      const start = Date.now();
      const responsePromise = page.waitForResponse(r => r.url().includes('/api/search') && r.request().method() === 'GET');
      await search.searchFor(query);
      const response = await responsePromise;
      const elapsed = Date.now() - start;
      samples.push(elapsed);

      // quick sanity check
      expect(response.ok()).toBeTruthy();
    }

    const avg = samples.reduce((a,b) => a+b, 0) / samples.length;
    // Threshold is conservative; adjust to match staging/production SLOs.
    const thresholdMs = 800;
    console.log('search latency samples (ms):', samples, 'avg:', avg);
    expect(avg).toBeLessThan(thresholdMs);

    // TODO: store these metrics in artifacts or push to metrics backend for historical tracking.
  });
});
