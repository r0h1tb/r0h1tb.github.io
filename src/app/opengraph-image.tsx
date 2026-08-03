import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

// Required by `output: export` — the card depends on no request data, so
// it is rendered once at build time and served as a static PNG.
export const dynamic = "force-static";

/**
 * Link preview card. Same tokens as the site — ink on paper, one signal
 * rule, no gradient. Uses a system serif rather than fetching the
 * webfont: ImageResponse would need the font binary at build time, and a
 * link preview is not worth that dependency.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fbfaf7",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ width: 64, height: 5, backgroundColor: "#c8102e" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#55535c",
            }}
          >
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Times New Roman, serif",
            fontSize: 96,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            color: "#16151a",
            maxWidth: 960,
          }}
        >
          {site.statement}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderTop: "1px solid #dad6cc",
            paddingTop: 28,
            fontSize: 24,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#55535c",
          }}
        >
          <div style={{ display: "flex", color: "#16151a" }}>{site.name}</div>
          <div style={{ display: "flex" }}>{site.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
