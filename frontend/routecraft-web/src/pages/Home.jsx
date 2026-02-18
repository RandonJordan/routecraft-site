import React from "react";

export default function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-7">
          <h1 className="display-5 fw-bold">
            Technology, guided the right way.
          </h1>
          <p className="lead mt-3">
            Route Craft Technology Services provides modern web development,
            custom software, and reliable technology support for individuals
            and small businesses.
          </p>
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
