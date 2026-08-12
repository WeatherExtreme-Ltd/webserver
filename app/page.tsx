import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Home</h1>

      <p>This device can open the dashboard once authenticated.</p>

      <Link
        href="/dashboard"
        style={{
          padding: "0.75rem 1.25rem",
          background: "#0070f3",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Open Dashboard
      </Link>
    </div>
  );
}
