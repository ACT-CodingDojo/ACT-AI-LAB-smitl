import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

process.env.NODE_ENV = "test";
process.env.MOCK_RECOMMENDER = "true";

const { app } = await import("../src/backend/server.js");

test("rejects missing image", async () => {
  const response = await request(app).post("/api/recommend").field("contextText", "pesce");
  assert.equal(response.status, 400);
});

test("returns top3 response contract with risk labels", async () => {
  const response = await request(app)
    .post("/api/recommend")
    .field("contextText", "pesce")
    .attach("image", Buffer.from("fake-image"), "dish.jpg");

  assert.equal(response.status, 200);
  assert.equal(response.body.alternatives.length, 2);
  assert.equal(typeof response.body.topPick.confidencePercent, "number");
  assert.ok(["safe", "at_risk"].includes(response.body.topPick.risk));
  assert.equal(response.body.alternatives[1].risk, "at_risk");
});

test("returns Italian-only wines in mock mode", async () => {
  const response = await request(app)
    .post("/api/recommend")
    .field("contextText", "carne")
    .attach("image", Buffer.from("fake-image"), "dish.jpg");

  assert.equal(response.status, 200);

  const names = [response.body.topPick.name, ...response.body.alternatives.map((x) => x.name)];
  for (const name of names) {
    assert.match(name, /DOC|DOCG|IGT|Sicilia/i);
  }
});
