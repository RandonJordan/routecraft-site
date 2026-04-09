import React, { useEffect } from "react";
import * as bootstrap from "bootstrap";


export default function Software() {
    useEffect(() => {
        document.title = "Custom Software | Route Craft Technology Services";
        }, []);



  return (
    <div className="page">
      <div className="container py-5">
        <h1 className="display-6 fw-bold mb-2">Custom Software</h1>
        <p className="text-muted mb-4">
          If your business needs something beyond a website, I build custom code and
          software that saves time, reduces manual work, and keeps operations organized.
        </p>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="p-4 elevated h-100">
              <h2 className="h5 fw-bold section-title">What I build</h2>
              <ul className="mb-0">
                <li>Internal tools (dashboards, admin portals, job trackers)</li>
                <li>Automation (reduce repetitive work, eliminate copy/paste)</li>
                <li>Integrations (connect systems and unify workflows)</li>
                <li>Customer-facing apps (simple, fast, and maintainable)</li>
                <li>Modern websites with real functionality (not just brochure pages)</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="p-4 contact-panel h-100">
              <div className="fw-bold mb-2">How projects start</div>
              <div className="text-muted small mb-3">
                Quick call first — then a clear plan.
              </div>
              <ol className="mb-0">
                <li>30-60 min scope call (free)</li>
                <li>Simple requirements + rough estimate</li>
                <li>Milestone-based plan and delivery</li>
              </ol>
            </div>
          </div>

          <div className="col-12">
            <div className="p-4 elevated">
              <h2 className="h5 fw-bold section-title">Examples</h2>
              <div className="row g-3">
                <div className="col-md-4">
                    <div className="p-3 panel h-100">
                    <div className="fw-bold">Customer intake + tracking</div>
                    <div className="text-muted small mt-1">
                        A simple internal app that captures requests, routes them to the right person,
                        and tracks status so nothing gets lost.
                    </div>
                    <div className="small mt-2" style={{ color: "var(--forest)" }}>
                        Outcome: fewer missed follow-ups
                    </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="p-3 panel h-100">
                    <div className="fw-bold">Automation + reporting</div>
                    <div className="text-muted small mt-1">
                        Reduce manual work by automating repetitive tasks and generating clean reports
                        your team can rely on.
                    </div>
                    <div className="small mt-2" style={{ color: "var(--forest)" }}>
                        Outcome: hours saved weekly
                    </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="p-3 panel h-100">
                    <div className="fw-bold">Operations dashboard</div>
                    <div className="text-muted small mt-1">
                        A single place to see what’s happening: jobs, notes, assignments, and next steps —
                        designed for speed and clarity.
                    </div>
                    <div className="small mt-2" style={{ color: "var(--forest)" }}>
                        Outcome: better visibility
                    </div>
                    </div>
                </div>
                </div>

              <div className="small text-muted mt-3">
                Want to see more? Use the Contact button and choose Text or Call — tell me what you’re trying to build.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
            <div className="p-4 elevated">
                <h2 className="h5 fw-bold section-title">How projects are priced</h2>
                <p className="text-muted mb-3">
                I keep software work simple: a short scope call, a clear plan, and milestone-based delivery.
                You’ll know what you’re getting and what it costs before we build.
                </p>

                <div className="pricing-timeline mt-4">
  <div className="timeline-step">
    <div className="step-dot" />
    <div>
      <div className="fw-bold">Scope call (free)</div>
      <div className="text-muted small">
        30-60 minutes to understand your workflow, goals, and what “success” looks like.
      </div>
    </div>
  </div>

  <div className="timeline-step">
    <div className="step-dot" />
    <div>
      <div className="fw-bold">Plan + estimate</div>
      <div className="text-muted small">
        I’ll outline the simplest approach and give you a clear milestone plan and cost range.
      </div>
    </div>
  </div>

  <div className="timeline-step">
    <div className="step-dot" />
    <div>
      <div className="fw-bold">Build by milestone</div>
      <div className="text-muted small">
        You approve each milestone. We ship in small steps so you can see progress early.
      </div>
    </div>
  </div>

  <div className="timeline-step">
    <div className="step-dot" />
    <div>
      <div className="fw-bold">Support (optional)</div>
      <div className="text-muted small">
        Ongoing support if you want it — or a handoff with documentation so you’re not stuck.
      </div>
    </div>
  </div>
</div>
            </div>
        </div>

        <div className="mt-4 d-flex gap-2 flex-wrap">
            <button
                type="button"
                className="btn btn-brand"
                onClick={() => {
                const el = document.getElementById("contactModal");
                if (!el) return;
                bootstrap.Modal.getOrCreateInstance(el).show();
                }}
            >
                Contact
            </button>

            <a className="btn btn-outline-secondary" href="/">
                Back to Home
            </a>
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
                    <div className="text-muted mb-3">Choose how you’d like to reach me:</div>

                    <div className="d-grid gap-2">
                    <a className="btn btn-brand" href="tel:+13039071041">
                        Call (303) 907-1041
                    </a>

                    <a className="btn btn-outline-secondary" href="sms:+13039071041">
                        Text (303) 907-1041
                    </a>
                    </div>

                    <div className="small text-muted mt-3">
                    Tip: If you text, include what you’re trying to build and any tools you use today.
                    </div>
                </div>
                </div>
            </div>
            </div>
    </div>
  );
}