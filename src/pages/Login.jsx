import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      const serverMsg = data?.message || (res.ok ? "Success" : "Login failed");

      if (res.ok && data?.token) {
        // save token
        localStorage.setItem("token", data.token);

        // show success toast
        showToast(serverMsg || "Signed in successfully", "success");

        // redirect after short delay (1.2s)
        navTimerRef.current = setTimeout(() => {
          navigate("/");
        }, 1200);
      } else {
        showToast(serverMsg || "Invalid credentials", "error");
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
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
          <div className="toast-message">{toast.message}</div>
        </div>
      </div>

      <div className="login-wrap">
        <div className="login-card">
          <div className="left">
            <div className="left-overlay">
              <h1>Welcome Back</h1>
              <p>Sign in to continue your journey. We're happy to see you again!</p>
            </div>
          </div>

          <div className="right">
            <h2>Sign In</h2>

            <form onSubmit={handleLogin} className="form" noValidate>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleChange}
                required
                className="input"
              />

              <div className="input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="input"
                />

                <button
                  type="button"
                  className="eye"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {error && <div className="error">{error}</div>}

              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <button
                type="button"
                className="other-btn"
                onClick={() => showToast("Google login not implemented", "info")}
              >
                Sign in with Google
              </button>

              <p className="small-text">
                Don't have an account? <a href="/register">Sign Up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
