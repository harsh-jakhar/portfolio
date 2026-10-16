import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Default Open Graph image (1200x630) for the whole site.
 * Generated at build time with next/og. Shown when the site is shared on
 * LinkedIn, X, Slack, WhatsApp, etc.
 */
export const alt = `${site.name} · ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#09090b",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#9a9aa6" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#4f7dff" }} />
          harsh.jakhar
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 34, color: "#4f7dff" }}>{site.title}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9a9aa6" }}>
          <span>{site.location}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
