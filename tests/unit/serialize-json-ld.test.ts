import { describe, expect, it } from "vitest";

import { serializeJsonLd } from "@/lib/serialize-json-ld";

describe("serializeJsonLd", () => {
  it("can't close the script tag it is written into", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });
});
