import assert from "node:assert/strict";
import test from "node:test";
import { buildEmailDraft, isAcceptedResponse, validateInquiry, type Inquiry } from "../src/lib/contact";

const valid: Inquiry = { name: "Avery", email: "avery@example.org", phone: "", service: "Heating", message: "My furnace is making a rattling noise.", website: "" };
test("inquiry validation rejects missing information and honeypot input", () => {
  assert.equal(validateInquiry(valid), null);
  assert.ok(validateInquiry({ ...valid, email: "invalid" }));
  assert.ok(validateInquiry({ ...valid, name: "" }));
  assert.ok(validateInquiry({ ...valid, message: "short" }));
  assert.ok(validateInquiry({ ...valid, website: "bot" }));
  assert.ok(validateInquiry({ ...valid, message: "a".repeat(4001) }));
});
test("phone is optional but must look like a phone number when given", () => {
  assert.equal(validateInquiry({ ...valid, phone: "(914) 555-0123" }), null);
  assert.equal(validateInquiry({ ...valid, phone: "+1 914.555.0123" }), null);
  assert.ok(validateInquiry({ ...valid, phone: "call me maybe" }));
  assert.ok(validateInquiry({ ...valid, phone: "12" }));
});
test("email draft safely encodes message characters without inventing delivery", () => {
  const draft = buildEmailDraft("info@innovativeairsolutions.com", { ...valid, phone: "(914) 555-0123", message: "Hello & welcome? Here is #our problem." });
  const url = new URL(draft);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "info@innovativeairsolutions.com");
  assert.equal(url.searchParams.get("subject"), "Service request: Heating");
  assert.match(url.searchParams.get("body")!, /Hello & welcome\? Here is #our problem\./);
  assert.match(url.searchParams.get("body")!, /Phone: \(914\) 555-0123/);
  assert.throws(() => buildEmailDraft("info@innovativeairsolutions.com", { ...valid, email: "bad" }));
});
test("only an explicit affirmative endpoint response counts as accepted", () => {
  assert.equal(isAcceptedResponse({ ok: true }), true);
  for (const value of [null, "ok", {}, { success: true }, { ok: false }, { ok: "true" }, { ok: 1 }]) assert.equal(isAcceptedResponse(value), false);
});
