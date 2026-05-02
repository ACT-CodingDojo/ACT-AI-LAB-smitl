import test from "node:test";
import assert from "node:assert/strict";
import { buildResponse } from "../src/backend/schema.js";

test("buildResponse sorts and labels at_risk under 70", () => {
  const response = buildResponse([
    { name: "A", reason: "", confidencePercent: 65 },
    { name: "B", reason: "", confidencePercent: 88 },
    { name: "C", reason: "", confidencePercent: 72 }
  ]);

  assert.equal(response.topPick.name, "B");
  assert.equal(response.topPick.risk, "safe");
  assert.equal(response.alternatives[1].risk, "at_risk");
});

test("buildResponse returns advisory when top pick below 70", () => {
  const response = buildResponse([
    { name: "A", reason: "", confidencePercent: 69 },
    { name: "B", reason: "", confidencePercent: 50 },
    { name: "C", reason: "", confidencePercent: 40 }
  ]);

  assert.ok(response.globalAdvisory);
});
