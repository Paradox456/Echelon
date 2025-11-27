// src/tests/auth.test.ts

import request from "supertest";
import app from "../src/app";

describe("🔐 Echelon Auth API", () => {
  const userData = {
    email: "testuser@example.com",
    password: "Test1234!",
  };

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toMatch(/success/i);
  });

  it("should not register with existing email", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(userData);

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it("should login with valid credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(userData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should reject invalid login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ ...userData, password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
  });

  it("should access protected route with valid token", async () => {
    // First, login to get token
    const loginRes = await request(app)
      .post("/auth/login")
      .send(userData);

    const token = loginRes.body.token;

    const protectedRes = await request(app)
      .get("/api/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(protectedRes.statusCode).toBe(200);
    expect(protectedRes.body).toHaveProperty("message");
  });

  it("should reject protected route without token", async () => {
    const res = await request(app).get("/api/protected");
    expect(res.statusCode).toBe(401);
  });
});
