import React, { useEffect, useState } from "react";

export default function Admin() {
  const [apiKey, setApiKey] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    document.title = "Admin | Route Craft";
  }, []);


  async function loadMessages() {
    setErr("");
    setLoading(true);
    setItems([]);

    try {
      const res = await fetch("http://localhost:5055/api/admin/messages", {
        headers: { "X-Admin-Key": apiKey },
      });

      if (res.status === 401) {
        setErr("Unauthorized: check your admin key.");
        return;
      }

      if (!res.ok) {
        setErr(`Error: ${res.status} ${res.statusText}`);
        return;
      }

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setErr("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="container py-5">
        <h1 className="h4 fw-bold mb-3">Admin Messages</h1>

        <div className="p-4 elevated">
          <label className="form-label small text-muted">Admin Key</label>
          <div className="d-flex gap-2">
            <input
              className="form-control"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste X-Admin-Key here"
              type="password"
            />
            <button className="btn btn-brand" onClick={loadMessages} disabled={loading || !apiKey}>
              {loading ? "Loading..." : "Load"}
            </button>
          </div>

          {err && <div className="alert alert-warning mt-3 mb-0">{err}</div>}
          {!err && !loading && items.length === 0 && (
            <div className="text-muted small mt-3">No messages loaded yet.</div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-muted small">{items.length} messages</div>
            </div>

            <div className="d-grid gap-3">
              {items.map((m) => (
                <div key={m.id} className="p-4 elevated">
                  <div className="d-flex justify-content-between flex-wrap gap-2">
                    <div>
                      <div className="fw-bold">{m.name}</div>
                      <div className="text-muted small">{m.phone}</div>
                    </div>
                    <div className="text-muted small">
                      {(() => {
                        const raw = m.createdUtc ?? m.CreatedUtc;
                        if (!raw) return "";
                        const d = new Date(raw);
                        if (isNaN(d.getTime())) return "";
                        return `${d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })} (local)`;
                        })()}
                    </div>
                  </div>
                  <div className="mt-3" style={{ whiteSpace: "pre-wrap" }}>
                    {m.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
