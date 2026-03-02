import { test, expect } from "@playwright/test";

test.describe("API route auth enforcement", () => {
  test("POST /api/stripe/checkout without session does not return 200", async ({
    request,
  }) => {
    const response = await request.post("/api/stripe/checkout");
    expect(response.status()).not.toBe(200);
  });

  test("POST /api/stripe/portal without session does not return 200", async ({
    request,
  }) => {
    const response = await request.post("/api/stripe/portal");
    expect(response.status()).not.toBe(200);
  });

  test("POST /api/ai-advisor without session does not return 200", async ({
    request,
  }) => {
    const response = await request.post("/api/ai-advisor");
    expect(response.status()).not.toBe(200);
  });

  test("GET /api/subscription without session does not return 200", async ({
    request,
  }) => {
    const response = await request.get("/api/subscription");
    expect(response.status()).not.toBe(200);
  });
});
