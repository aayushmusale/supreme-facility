import { ImageResponse } from "next/og";

export const alt = "Supreme Facility Management: integrated facility management across India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Link-preview card used when a page is shared (WhatsApp, LinkedIn, Slack, X). Drawn at build time,
 * so it adds no runtime cost. Colours match the site: oxblood, warm off-white and gold.
 * Replace with a photographic design once brand assets are approved; every page inherits it.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#85182a",
          color: "#f7f5f2",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, textTransform: "uppercase", color: "#d9ad5f" }}>
          Since 1983
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>Supreme Facility</div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>Management</div>
          <div style={{ display: "flex", width: 120, height: 6, background: "#d9ad5f", marginTop: 36 }} />
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#f7f5f2", opacity: 0.9 }}>
          Integrated facility management · Supply chain · Employee transportation · Corporate food
        </div>
      </div>
    ),
    { ...size },
  );
}
