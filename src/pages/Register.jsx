import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info", // 'success' | 'error' | 'info'
  });
  const toastTimerRef = useRef(null);
  const navTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    };
  }, []);

  const showToast = (message, type = "info", duration = 3500) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);

    setToast({ visible: true, message, type });

    toastTimerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
      toastTimerRef.current = null;
    }, duration);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      setError("Password should be at least 6 characters.");
      showToast("Password should be at least 6 characters.", "error");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      showToast("Passwords do not match.", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://mern-auth-backend-seven-theta.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        }
      );
      

      const data = await res.json().catch(() => ({}));
      const serverMsg =
        data?.message || (res.ok ? "Registration completed." : "Registration failed.");

      if (res.ok) {
        showToast(serverMsg, "success");

        setForm({ name: "", username: "", email: "", password: "", confirm: "" });

        navTimerRef.current = setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        showToast(serverMsg, "error");
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
      showToast("Network or server error", "error");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="toast-wrap" aria-live="polite" aria-atomic="true">
        <div
          className={`toast ${toast.type} ${toast.visible ? "show" : ""}`}
          role={toast.type === "error" ? "alert" : "status"}
          style={{ display: toast.visible ? "flex" : "none" }}
        >
          <div className="dot" aria-hidden />
          <div style={{ fontWeight: 600 }}>{toast.message}</div>
        </div>
      </div>

      <div className="reg-wrap">
        <div className="card">
          <div className="left">
            <h1>Join our community</h1>
            <p>
              Create your account to get access to exclusive content, tools and
              member-only features. Fast, secure and completely free to start.
            </p>

            <div style={{ marginTop: 18 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="social-btn"
                  style={{ width: 120 }}
                  onClick={() => showToast("Google signup not implemented", "info")}
                >
                  Google
                </button>
                <button
                  type="button"
                  className="social-btn"
                  style={{ width: 120 }}
                  onClick={() => showToast("GitHub signup not implemented", "info")}
                >
                  GitHub
                </button>
              </div>
            </div>
          </div>

          <div className="right">
            <h2 style={{ margin: 0 }}>Create account</h2>
            <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 13 }}>
              Start with your details
            </p>

            <form onSubmit={handleRegister} className="form" noValidate>
              <div>
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="e.g. john_doe"
                  required
                />
              </div>

              <div className="full">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  type="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <input
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <span
                    role="button"
                    tabIndex={0}
                    className="eye"
                    onClick={() => setShowPassword((s) => !s)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setShowPassword((s) => !s);
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "hide" : "show"}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="confirm">Confirm Password</label>
                <div className="input-wrap">
                  <input
                    id="confirm"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    type={showConfirm ? "text" : "password"}
                    required
                  />
                  <span
                    role="button"
                    tabIndex={0}
                    className="eye"
                    onClick={() => setShowConfirm((s) => !s)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setShowConfirm((s) => !s);
                    }}
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirm ? "hide" : "show"}
                  </span>
                </div>
              </div>

              <div className="full">
                {error && <div className="error">{error}</div>}
                <button className="btn" type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Create account"}
                </button>
              </div>

              <div className="full muted">
                Already have an account? <a href="/login">Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
