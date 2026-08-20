import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api, { formatApiError } from "@/lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.post("/auth/login", { email, password });
      navigate("/admin");
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    "w-full rounded-none bg-transparent border-b border-white/20 text-white font-jetbrains font-light py-4 outline-none focus:border-white transition-colors duration-300 placeholder:text-neutral-600";

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <p className="text-xs font-jetbrains uppercase tracking-[0.2em] text-neutral-500">Restricted</p>
        <h1 className="mt-3 text-4xl font-outfit font-black uppercase tracking-tight text-white">Admin</h1>
        <form onSubmit={submit} className="mt-10 space-y-8" data-testid="admin-login-form">
          <div>
            <label htmlFor="a-email" className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500">Email</label>
            <input id="a-email" data-testid="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="a-pass" className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500">Password</label>
            <input id="a-pass" data-testid="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" />
          </div>
          {error && <p className="text-sm font-jetbrains text-red-400" data-testid="admin-login-error">{error}</p>}
          <button
            type="submit"
            data-testid="admin-login-submit"
            disabled={busy}
            className="w-full bg-white text-black font-jetbrains text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-neutral-300 transition-colors duration-300 disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <a href="/" className="link-line inline-block mt-8 text-xs font-jetbrains uppercase tracking-[0.15em] text-neutral-500">Back to site</a>
      </motion.div>
    </div>
  );
}
