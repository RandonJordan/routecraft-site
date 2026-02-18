import React, { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadStatus() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5055/api/status");
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        if (!cancelled) setStatus(data);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to reach API");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-7">
          <h1 className="display-5 fw-bold">Technology, guided the right way.</h1>
          <p className="lead mt-3">
            Route Craft Technology Services provides modern web development,
            custom software, and reliable technology support for individuals
            and small businesses.
          </p>

          <div className="mt-4">
            <h5 className="mb-2">API Status</h5>

            {loading && (
              <div className="text-muted">Checking API…</div>
            )}

            {!loading && error && (
              <div className="alert alert-warning mb-0">
                <strong>Couldn’t reach the API.</strong> {error}
              </div>
            )}

            {!loading && !error && status && (
              <div className="alert alert-success mb-0">
                <div><strong>{status.message}</strong></div>
                <div className="small text-muted">UTC: {status.utc}</div>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-5 text-center">
          <div
            className="p-5 rounded-4 shadow-sm"
            style={{ background: "var(--forest)", color: "var(--offwhite)" }}
          >
            <strong>Modern Web</strong>
            <br />
            React + .NET
          </div>
        </div>
      </div>
    </div>
  );
}