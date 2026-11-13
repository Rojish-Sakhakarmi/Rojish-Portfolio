import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Rojish Sakhakarmi — Strategy, Systems & Markets";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

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
          backgroundColor: "#050505",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          border: "1px solid #222226",
        }}
      >
        {/* Top Row: Handle & Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "9999px",
                backgroundColor: "#ffffff",
              }}
            />
            <span>Rojish0</span>
          </div>

          <div
            style={{
              fontSize: 18,
              color: "#a1a1aa",
              border: "1px solid #222226",
              backgroundColor: "#0e0e11",
              padding: "8px 20px",
              borderRadius: "9999px",
            }}
          >
            rojish-sakhakarmi.com.np
          </div>
        </div>

        {/* Center: Main Identity & Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            Rojish Sakhakarmi
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#e4e4e7",
              lineHeight: 1.35,
              fontWeight: 400,
            }}
          >
            Connecting ideas to opportunity across brand strategy, systems, and financial markets.
          </div>
        </div>

        {/* Bottom Row: Domain Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #222226",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
            {["Brand Strategy", "Business Growth", "IT Systems", "Financial Markets"].map(
              (pillar) => (
                <div
                  key={pillar}
                  style={{
                    fontSize: 18,
                    color: "#e4e4e7",
                    backgroundColor: "#0e0e11",
                    border: "1px solid #333338",
                    padding: "10px 20px",
                    borderRadius: "12px",
                  }}
                >
                  {pillar}
                </div>
              )
            )}
          </div>

          <div style={{ fontSize: 18, color: "#a1a1aa" }}>Bhaktapur, Nepal</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}