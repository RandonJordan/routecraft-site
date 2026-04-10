import React, { useEffect, useState } from "react";
import { sanitizeName, formatPhone } from "../utils/input";
import * as bootstrap from "bootstrap";

export default function Home() {
  // Contact form state
  const [phoneValue, setPhoneValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);

  // API Status
  const [apiOk, setApiOk] = useState(null);
  useEffect(() => {
      document.title = "Route Craft Technology Services";
    }, []);
  useEffect(() => {
    let cancelled = false;

    async function ping() {
      try {
        const res = await fetch(`${API}/api/status`);
        if (!res.ok) throw new Error("status failed");
        const data = await res.json();
        if (!cancelled) setApiOk(!!data?.ok);
      } catch {
        if (!cancelled) setApiOk(false);
      }
    }

    

    ping();
    return () => {
      cancelled = true;
    };
  }, []);

  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5055";


  async function handleSubmit(e) {
    e.preventDefault();

    // reset banners each submit
    setSendSuccess(false);
    setSendError("");

    

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const message = form.message.value.trim();
    const phone = phoneValue.trim();

    // Required checks
    if (!name || !phone || !message) {
      setSendError("Please fill out name, phone, and message.");
      return;
    }

    // Phone must be 10 digits
    const phoneDigits = phoneValue.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      setSendError("Please enter a valid 10-digit phone number.");
      return;
    }

    // length guard
    if (message.length > 2000) {
      setSendError("Message is too long (max 2000 characters).");
      return;
    }

    try {
      setIsSending(true);

      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        setSendError(data?.error || "Something went wrong sending your message.");
        return;
      }

      setSendSuccess(true);
      form.reset();
      setPhoneValue("");
    } catch {
      setSendError("Could not reach the server. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="page">
      <div className="hero">
        <div className="container-fluid px-3 px-md-5">
          <div className="hero-card p-4 p-md-5">
            <div className="container-narrow">
              <div id="home"></div>

              {/* HERO */}
  
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
            


              {/* Optional API status line */}
              {apiOk === false && (
                <div className="alert alert-warning mt-4">
                  Backend API is not reachable right now (dev only). Make sure it’s running on port 5055.
                </div>
              )}

              {/* ABOUT (expanded, but not framework-specific) */}
              
              <section id="about" className="mt-5">
                <h2 className="h4 fw-bold mb-3 section-title">About</h2>
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
                       I provide hardware diagnostics and repairs, including limited board-level work when appropriate. For complex micro-soldering or high-risk repairs, 
                       I’ll be upfront about what I can do safely and recommend a trusted specialist when needed — so your device gets the best outcome, not a risky guess.
                      </p>
                    </div>

                    <div className="col-md-5">
                      <ul className="mb-0">
                        <li>
                          <strong>Fast call/text communication</strong> and clear expectations
                        </li>
                        <li>
                          <strong>Safe, professional work</strong> — no risky repairs that could damage devices
                        </li>
                        <li>
                          <strong>Custom software & automation</strong> — built clean, secure, maintainable
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* SERVICES (feature + stacked layout) */}
              <section id="services" className="mt-5">
                <h2 className="h4 fw-bold mb-3 section-title">Services</h2>

                <div className="row g-4">
                  {/* Featured */}
                  <div className="col-lg-7">
                    <div className="p-4 p-md-5 elevated h-100">
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

                  {/* Stacked */}
                  <div className="col-lg-5">
                    <div className="d-grid gap-4 h-100">
                      <div className="p-4 elevated">
                        <h3 className="h5 fw-bold mb-2">Computer & Device Help</h3>
                        <ul className="mb-0">
                          <li>Slow computer cleanups & tune-ups</li>
                          <li>Virus & malware removal</li>
                          <li>Windows & Mac troubleshooting</li>
                          <li>Printers, email & software help</li>
                        </ul>
                      </div>

                      <div className="p-4 elevated">
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

              {/* HOW IT WORKS */}
              <section id="process" className="mt-5">
                <h2 className="h4 fw-bold mb-3 section-title">How it works</h2>

                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="p-4 elevated h-100">
                      <div className="text-muted small fw-bold mb-2">Step 1</div>
                      <h3 className="h6 fw-bold">Call, text, or send a message</h3>
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

              <section id="pricing" className="mt-5">
                <h2 className="h4 fw-bold section-title">Pricing</h2>

                <div className="row g-4">
                  <div className="col-lg-7">
                    <div className="p-4 elevated h-100">
                      <h3 className="h5 fw-bold mb-2">Simple, upfront pricing</h3>

                      <div
                        className="d-inline-block px-3 py-2 rounded-4 mb-3"
                        style={{
                          background: "rgba(200,164,106,0.18)",
                          border: "1px solid rgba(200,164,106,0.35)",
                        }}
                      >
                        <span className="fw-bold">$95/hr</span>{" "}
                        <span className="text-muted">• 1-hour minimum</span>
                      </div>

                      <p className="text-muted mb-3">
                        Most issues can be handled quickly once we understand what’s going on.
                        I’ll give you a clear plan and estimate before any work begins.
                      </p>

                      <ul className="mb-0">
                        <li>
                          <strong>Free</strong> initial call/text to understand the issue
                        </li>
                        <li>
                          <strong>Local help:</strong> $95/hr (1-hour minimum)
                        </li>
                        <li>
                          <strong>Software projects:</strong> scoped first, then priced by milestone
                        </li>
                        <li>
                          <strong>No surprises:</strong> you approve before I proceed
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="p-4 contact-panel h-100">
                      <div className="fw-bold mb-2">Common ranges</div>
                      <div className="small text-muted mb-3">
                        Exact pricing depends on the issue — these are typical starting points.
                      </div>

                      <div className="d-flex justify-content-between">
                        <div className="fw-semibold">Tune-up / cleanup</div>
                        <div className="fw-semibold">1–2 hrs</div>
                      </div>
                      <div className="text-muted small mb-3">Most slow-computer issues</div>

                      <div className="d-flex justify-content-between">
                        <div className="fw-semibold">Wi-Fi troubleshooting</div>
                        <div className="fw-semibold">~1 hr</div>
                      </div>
                      <div className="text-muted small mb-3">Common home network issues</div>

                      <div className="d-flex justify-content-between">
                        <div className="fw-semibold">Website / software consult</div>
                        <div className="fw-semibold">Free</div>
                      </div>
                      <div className="text-muted small mb-0">
                        Quick call to scope the project
                      </div>
                    </div>
                  </div>
                </div>

                <div className="small text-muted mt-3">
                  Tip: Texting a photo of an error message or describing the device/model helps me estimate faster.
                </div>
              </section>



              {/* CONTACT HERO (green band + embedded form) */}
              <section id="contact" className="mt-5">
                <div
                  className="p-4 p-md-5 rounded-4 shadow-sm"
                  style={{ background: "var(--forest)", color: "var(--offwhite)" }}
                >
                  <div className="row g-4 align-items-start">
                    <div className="col-md-7">
                      <h2 className="h3 fw-bold mb-2">Need help today?</h2>
                      <p className="mb-3" style={{ opacity: 0.9 }}>
                        Call or text and I’ll help you figure out the next step. Prefer email-style contact?
                        Send a quick message using the form.
                      </p>

                      <div className="d-flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="btn btn-light fw-bold px-4 py-2"
                          onClick={() => {
                            const el = document.getElementById("contactModal");
                            if (!el) return;
                            bootstrap.Modal.getOrCreateInstance(el).show();
                          }}
                        >
                          Call/Text
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-light px-4 py-2"
                          onClick={() => {
                            const el = document.getElementById("detailsModal");
                            if (!el) return;
                            bootstrap.Modal.getOrCreateInstance(el).show();
                          }}
                        >
                          Contact Info
                        </button>
                      </div>

                      <div className="mt-3 small" style={{ opacity: 0.85 }}>
                        Friendly local support • Clear expectations • Custom software projects welcome
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div
                        className="contact-panel"
                      >
                        <div className="fw-bold mb-2">Quick message</div>

                        {sendSuccess && (
                          <div className="alert alert-success mb-3">
                            Message sent! I’ll get back to you soon.
                          </div>
                        )}

                        {sendError && (
                          <div className="alert alert-warning mb-3">
                            {sendError}
                          </div>
                        )}

                        <form className="mt-2" onSubmit={handleSubmit}>
                          <div className="mb-2">
                            <input
                              name="name"
                              className="form-control"
                              placeholder="Name"
                              onInput={(e) => {
                                e.target.value = sanitizeName(e.target.value);
                              }}
                            />
                          </div>

                          <div className="mb-2">
                            <input
                              name="phone"
                              className="form-control"
                              placeholder="Phone"
                              inputMode="tel"
                              value={phoneValue}
                              onChange={(e) => setPhoneValue(formatPhone(e.target.value))}
                            />
                          </div>

                          <div className="mb-3">
                            <textarea
                              name="message"
                              className="form-control"
                              rows="3"
                              placeholder="How can I help?"
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn btn-brand fw-bold w-100"
                            disabled={isSending}
                          >
                            {isSending ? "Sending..." : "Send"}
                          </button>
                        </form>

                        
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              

              <div
                className="modal fade"
                id="detailsModal"
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title fw-bold">Details</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>

                    <div className="modal-body">
                      <div className="modal-body">
                        <div className="row g-4">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <div className="text-uppercase small text-muted fw-bold section-title">Service area</div>
                              <div className="fw-semibold">Wrightwood + nearby mountain communities</div>
                              <div className="text-muted small">
                                Text your location and I’ll confirm quickly.
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="text-uppercase small text-muted fw-bold section-title">Availability</div>
                              <div className="fw-semibold">Same-day response when possible</div>
                              <div className="text-muted small">
                                For software projects, we’ll start with a short scope call.
                              </div>
                            </div>

                            <div>
                              <div className="text-uppercase small text-muted fw-bold section-title">On-site / remote</div>
                              <div className="text-muted small">
                                Many issues can be resolved remotely. If needed, we’ll coordinate a drop-off or on-site visit.
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="text-uppercase small text-muted fw-bold mb-2 section-title">What to expect</div>

                            <ul className="list-unstyled mb-0">
                              <li className="d-flex gap-2 mb-2">
                                <span style={{ color: "var(--tan)" }}>✔</span>
                                <span>Clear plan + realistic expectations</span>
                              </li>
                              <li className="d-flex gap-2 mb-2">
                                <span style={{ color: "var(--tan)" }}>✔</span>
                                <span>No risky repairs — I’ll recommend a specialist when needed</span>
                              </li>
                              <li className="d-flex gap-2 mb-2">
                                <span style={{ color: "var(--tan)" }}>✔</span>
                                <span>Fixes are tested and explained so you feel confident</span>
                              </li>
                              <li className="d-flex gap-2">
                                <span style={{ color: "var(--tan)" }}>✔</span>
                                <span>Custom code & automation projects welcome</span>
                              </li>
                            </ul>

                            <div className="mt-3 p-3 rounded-4" style={{ background: "rgba(200,164,106,0.14)" }}>
                              <div className="fw-bold">Tip</div>
                              <div className="text-muted small">
                                When you text, include a quick description and any error message you see — it speeds things up.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <a className="btn btn-brand" href="tel:3039071041">
                        Call/Text (303) 907-1041
                      </a>
                      <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="contactModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title fw-bold">Contact</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>

                    <div className="modal-body">
                      <div className="text-muted mb-3">
                        Choose how you’d like to reach me:
                      </div>

                      <div className="d-grid gap-2">
                        <a className="btn btn-brand" href="tel:+13039071041">
                          Call (303) 907-1041
                        </a>

                        <a className="btn btn-outline-secondary" href="sms:+13039071041">
                          Text (303) 907-1041
                        </a>
                      </div>

                      <div className="small text-muted mt-3">
                        Tip: If you text, include what device you have and what’s happening.
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="py-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
