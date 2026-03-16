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
    <div className="page">
    <div className="hero">
      <div className="container-fluid px-3 px-md-5">
        <div className="hero-card p-4 p-md-5">
          <div className="container-narrow">
            <h1 className="display-5 fw-bold">Technology, guided the right way.</h1>
            <p className="lead mt-3">
              Route Craft Technology Services provides modern web development,
              custom software, and reliable technology support for individuals
              and small businesses. My principles are built on a simple idea: keep technology reliable,
              clear, and stress-free. No confusing tech talk — just honest help and clean solutions.
            </p>
            
            <p className="text-muted mb-0">
              If it can be fixed safely and professionally, I’ll handle it. If it needs specialized repair,
              I’ll explain your options honestly.
            </p>
            <section id="about" className="mt-5">
              <div className="p-4 p-md-5 elevated">
                <div className="row align-items-start g-4">
                  <div className="col-md-7">
                    <h2 className="h5 fw-bold mb-2">Local help. Built the right way.</h2>

                    <p className="mb-2 text-muted">
                      Route Craft Technology Services helps homes and small businesses get technology working
                      the way it should — reliably, securely, and without confusion. You’ll get straight answers,
                      clear communication, and work that’s done carefully.
                    </p>

                    <p className="mb-2 text-muted">
                      I can help with everyday issues like Wi-Fi, devices, email, printers, and setup — and I also
                      build custom code and software for businesses that need something specific: internal tools,
                      automation, integrations, and systems that save time.
                    </p>

                    <p className="mb-0 text-muted">
                      If a job requires specialized board-level repair, I won’t gamble with your equipment.
                      I’ll explain the safest options and the most practical next step.
                    </p>
                  </div>

                  <div className="col-md-5">
                    <ul className="mb-0">
                      <li><strong>Fast call/text communication</strong> and clear expectations</li>
                      <li><strong>Safe, professional work</strong> — no risky repairs that could damage devices</li>
                      <li><strong>Software built right</strong> — clean, secure, maintainable</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>





            <section id="services" className="mt-5">
              <h2 className="h4 fw-bold mb-3">Services</h2>

              <div className="row g-4">
                {/* Featured: Custom Code / Business Software */}
                <div className="col-lg-7">
                  <div
                    className="p-4 p-md-5 elevated h-100"
                    style={{ background: "white" }}
                  >
                    <span className="badge badge-featured mb-3">Featured</span>
                    <h3 className="h4 fw-bold mb-2">Custom Code & Business Software</h3>
                    <p className="text-muted mb-3">
                      Need something beyond a website? I build internal tools, automation, integrations,
                      and proprietary software that saves time and reduces manual work.
                    </p>
                    <ul className="mb-0">
                      <li>Automation & workflow improvements</li>
                      <li>Custom tools tailored to your business</li>
                      <li>Integrations between systems</li>
                      <li>Secure, maintainable code</li>
                    </ul>
                  </div>
                </div>

                {/* Right column: stacked support services */}
                <div className="col-lg-5">
                  <div className="d-grid gap-4 h-100">
                    <div className="p-4 rounded-4 elevated">
                      <h3 className="h5 fw-bold mb-2">Computer & Device Help</h3>
                      <ul className="mb-0">
                        <li>Slow computer cleanups & tune-ups</li>
                        <li>Virus & malware removal</li>
                        <li>Windows & Mac troubleshooting</li>
                        <li>Printers, email & software help</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-4 elevated">
                      <h3 className="h5 fw-bold mb-2">Home Technology</h3>
                      <ul className="mb-0">
                        <li>Wi-Fi & internet issues</li>
                        <li>Smart TV & streaming setup</li>
                        <li>New device setup</li>
                        <li>Backup & data protection help</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="process" className="mt-5">
              <h2 className="h4 fw-bold mb-3">How it works</h2>

              <div className="row g-4">
                <div className="col-md-4">
                  <div className="p-4 elevated h-100">
                    <div className="text-muted small fw-bold mb-2">Step 1</div>
                    <h3 className="h6 fw-bold">Call or text</h3>
                    <p className="mb-0 text-muted">
                      Tell me what’s going on. I’ll ask a few quick questions and give you a clear next step.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-4 elevated h-100">
                    <div className="text-muted small fw-bold mb-2">Step 2</div>
                    <h3 className="h6 fw-bold">Simple plan</h3>
                    <p className="mb-0 text-muted">
                      I’ll explain what I recommend, what it will cost, and what results to expect — no surprises.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-4 elevated h-100">
                    <div className="text-muted small fw-bold mb-2">Step 3</div>
                    <h3 className="h6 fw-bold">Fix + verify</h3>
                    <p className="mb-0 text-muted">
                      I fix the issue, test it, and show you what changed so it stays working.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mt-5">
              <div
                className="p-4 p-md-5 rounded-4 shadow-sm"
                style={{ background: "var(--forest)", color: "var(--offwhite)" }}
              >
                <div className="row align-items-center g-4">
                  <div className="col-md-8">
                    <h2 className="h4 fw-bold mb-2">Need help today?</h2>
                    <p className="mb-0" style={{ opacity: 0.9 }}>
                      Call or text and I’ll help you figure out the next step. Free initial conversation.
                    </p>
                    <div className="mt-2 small" style={{ opacity: 0.85 }}>
                      Serving local homes and small businesses • Honest guidance • No pressure
                    </div>
                  </div>

                  <div className="col-md-4 text-md-end">
                    <a
                      className="btn btn-light fw-bold px-4 py-2"
                      href="tel:3039071041"
                    >
                      Call/Text (303) 907-1041
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <hr className="my-5" />

            
            <section id="contact" className="mt-4">
              <div className="row">
                <div className="col-md-5">
                  <div className="p-4 elevated">
                    <h2 className="h5 fw-bold mb-3">Contact</h2>

                    <div className="mb-2">
                      <div className="text-muted small">Call or text</div>
                      <div className="fw-semibold">(303) 907-1041</div>
                    </div>

                    <div className="mb-3">
                      <div className="text-muted small">Email</div>
                      <div className="fw-semibold">hello@yourdomain.com</div>
                    </div>

                    <div className="small text-muted">
                      Response time: usually same day.
                    </div>
                  </div>
                </div>
              </div>
            </section>

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
         
        </div>
      </div>
    </div>
    </div>
  );
}