import request from "supertest";
import app from "../src/app";

describe("GET /ping", () => {
  test("should return pong", async () => {
    const res = await request(app).get("/ping").send();
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual("pong");
  });
});
