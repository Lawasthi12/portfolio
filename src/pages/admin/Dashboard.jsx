import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Trash2, Pencil, LogOut, Plus, Upload, FileText, Image as ImageIcon } from "lucide-react";
import api, { formatApiError } from "@/lib/api";

const inputCls =
  "w-full rounded-none bg-navy border border-white/15 text-white font-jetbrains font-light text-sm px-4 py-3 outline-none focus:border-white transition-colors duration-300 placeholder:text-neutral-600";

const COLLECTION_FIELDS = {
  projects: [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "year", label: "Year" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "role", label: "My Role" },
    { key: "outcome", label: "Outcome", type: "textarea" },
    { key: "tech", label: "Technologies (comma separated)", type: "tags" },
    { key: "image", label: "Image URL" },
    { key: "link", label: "Link (GitHub / DOI / demo)" },
  ],
  publications: [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "venue", label: "Journal / Conference" },
    { key: "year", label: "Year" },
    { key: "doi", label: "DOI (without https://doi.org/)" },
    { key: "area", label: "Research Area" },
    { key: "abstract", label: "Abstract (optional)", type: "textarea" },
  ],
  experience: [
    { key: "role", label: "Position" },
    { key: "org", label: "Organization" },
    { key: "location", label: "Location" },
    { key: "period", label: "Duration (e.g. Jul 2025 — Sep 2025)" },
    { key: "points", label: "Responsibilities (one per line)", type: "lines" },
  ],
  education: [
    { key: "degree", label: "Degree" },
    { key: "institution", label: "Institution" },
    { key: "location", label: "Location" },
    { key: "period", label: "Years" },
    { key: "note", label: "Note (thesis, focus…)", type: "textarea" },
  ],
  posts: [
    { key: "title", label: "Title" },
    { key: "slug", label: "URL slug (e.g. my-first-post)" },
    { key: "date", label: "Date (YYYY-MM-DD)" },
    { key: "excerpt", label: "Excerpt", type: "textarea" },
    { key: "content", label: "Article body (blank line between paragraphs)", type: "textarea" },
    { key: "tags", label: "Tags (comma separated)", type: "tags" },
  ],
  services: [
    { key: "title", label: "Service name" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "items", label: "What is included (one per line)", type: "lines" },
  ],
  trainings: [
    { key: "title", label: "Program name" },
    { key: "audience", label: "Target audience" },
    { key: "format", label: "Format (workshop / course…)" },
    { key: "description", label: "Description", type: "textarea" },
  ],
  certifications: [
    { key: "title", label: "Certification name" },
    { key: "issuer", label: "Issuing organization" },
    { key: "date", label: "Date (e.g. Jan 2026)" },
    { key: "credential_id", label: "Credential ID (optional)" },
    { key: "link", label: "Credential URL (optional)" },
  ],
  notices: [
    { key: "title", label: "Notice title" },
    { key: "date", label: "Date" },
    { key: "body", label: "Notice text", type: "textarea" },
    { key: "link", label: "Link (optional)" },
  ],
  achievements: [
    { key: "title", label: "Achievement title" },
    { key: "organization", label: "Organization" },
    { key: "date", label: "Date" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "link", label: "URL (optional)" },
  ],
};

const FEATURABLE = new Set(["projects", "posts", "publications", "achievements", "services", "trainings"]);

const emptyForm = (fields) => Object.fromEntries(fields.map((f) => [f.key, f.type === "tags" || f.type === "lines" ? "" : ""]));

const StatusBadge = ({ status }) => {
  const s = status || "published";
  const cls = s === "published" ? "text-emerald-400 border-emerald-400/30" : s === "draft" ? "text-amber-400 border-amber-400/30" : "text-neutral-500 border-white/15";
  return <span className={`text-[10px] font-jetbrains uppercase tracking-wider border rounded-full px-2 py-0.5 ${cls}`} data-testid="status-badge">{s}</span>;
};

function ItemManager({ collection }) {
  const fields = COLLECTION_FIELDS[collection];
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ ...emptyForm(fields), status: "published", featured: false });
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const load = useCallback(() => {
    api.get(`/admin/${collection}`).then((r) => setItems(r.data)).catch((e) => toast.error(formatApiError(e)));
  }, [collection]);

  useEffect(() => { load(); }, [load]);

  const startEdit = (item) => {
    const f = {};
    fields.forEach(({ key, type }) => {
      const v = item[key];
      f[key] = type === "tags" || type === "lines" ? (v || []).join(type === "tags" ? ", " : "\n") : v || "";
    });
    setForm({ ...f, status: item.status || "published", featured: !!item.featured });
    setEditing(item.id);
  };

  const save = async (e) => {
    e.preventDefault();
    const payload = { status: form.status, featured: form.featured };
    fields.forEach(({ key, type }) => {
      const v = form[key];
      if (type === "tags") payload[key] = v.split(",").map((s) => s.trim()).filter(Boolean);
      else if (type === "lines") payload[key] = v.split("\n").map((s) => s.trim()).filter(Boolean);
      else payload[key] = v;
    });
    try {
      if (editing) await api.put(`/admin/${collection}/${editing}`, payload);
      else await api.post(`/admin/${collection}`, payload);
      toast.success(editing ? "Updated" : "Added");
      setForm({ ...emptyForm(fields), status: "published", featured: false });
      setEditing(null);
      load();
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this entry permanently? (Tip: set status to Archived to hide it instead.)")) return;
    try {
      await api.delete(`/admin/${collection}/${id}`);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const visible = items.filter((it) => {
    if (statusFilter !== "all" && (it.status || "published") !== statusFilter) return false;
    if (query && !JSON.stringify(it).toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <div className="flex gap-3 mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            data-testid={`search-${collection}`}
            className={`${inputCls} flex-1`}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} data-testid={`filter-status-${collection}`} className={`${inputCls} w-36`}>
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="space-y-3" data-testid={`admin-${collection}-list`}>
          {visible.length === 0 && <p className="text-sm font-jetbrains text-neutral-500">No entries found.</p>}
          {visible.map((item) => (
            <div key={item.id} className="border border-line bg-panel p-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <p className="font-outfit text-white text-sm truncate">{item.title || item.role || item.degree}</p>
                  <StatusBadge status={item.status} />
                  {item.featured && <span className="text-[10px] font-jetbrains uppercase tracking-wider text-amber-400">★ featured</span>}
                </div>
                <p className="mt-1 text-xs font-jetbrains text-neutral-500 truncate">{item.org || item.venue || item.institution || item.category} {item.period || item.year ? `· ${item.period || item.year}` : ""}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button data-testid={`edit-${item.id}`} onClick={() => startEdit(item)} className="p-2 border border-white/15 text-neutral-300 hover:bg-white hover:text-black transition-colors duration-300" aria-label="Edit">
                  <Pencil size={14} />
                </button>
                <button data-testid={`delete-${item.id}`} onClick={() => remove(item.id)} className="p-2 border border-white/15 text-neutral-300 hover:bg-red-500 hover:border-red-500 transition-colors duration-300" aria-label="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={save} className="space-y-5 border border-line bg-panel p-6 self-start" data-testid={`admin-${collection}-form`}>
        <p className="text-xs font-jetbrains uppercase tracking-[0.2em] text-neutral-500">
          {editing ? "Edit entry" : "New entry"}
        </p>
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500">{f.label}</label>
            {f.type === "textarea" || f.type === "lines" ? (
              <textarea rows={f.type === "lines" ? 5 : 3} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={`${inputCls} mt-2 resize-y`} data-testid={`field-${f.key}`} />
            ) : (
              <input value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={`${inputCls} mt-2`} data-testid={`field-${f.key}`} />
            )}
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <label className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} data-testid="field-status" className={`${inputCls} mt-2 w-40`}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          {FEATURABLE.has(collection) && (
            <label className="flex items-center gap-2 mt-5 text-xs font-jetbrains uppercase tracking-wider text-neutral-400 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} data-testid="field-featured" className="accent-amber-400 w-4 h-4" />
              Featured
            </label>
          )}
        </div>
        <div className="flex gap-3">
          <button type="submit" data-testid={`save-${collection}`} className="inline-flex items-center gap-2 bg-white text-black font-jetbrains text-xs uppercase tracking-[0.15em] px-6 py-3 hover:bg-neutral-300 transition-colors duration-300">
            <Plus size={14} /> {editing ? "Save changes" : "Add"}
          </button>
          {editing && (
            <button type="button" data-testid={`cancel-${collection}`} onClick={() => { setEditing(null); setForm({ ...emptyForm(fields), status: "published", featured: false }); }} className="border border-white/20 text-white font-jetbrains text-xs uppercase tracking-[0.15em] px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Messages() {
  const [messages, setMessages] = useState([]);
  const load = useCallback(() => {
    api.get("/admin/messages").then((r) => setMessages(r.data)).catch((e) => toast.error(formatApiError(e)));
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    await api.delete(`/admin/messages/${id}`);
    load();
  };

  return (
    <div className="space-y-3" data-testid="admin-messages-list">
      {messages.length === 0 && <p className="text-sm font-jetbrains text-neutral-500">No messages yet.</p>}
      {messages.map((m) => (
        <div key={m.id} className="border border-line bg-panel p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-outfit text-white">{m.subject}</p>
              <p className="mt-1 text-xs font-jetbrains text-neutral-500">
                {m.name} · <a href={`mailto:${m.email}`} className="link-line text-neutral-300">{m.email}</a> · {new Date(m.created_at).toLocaleDateString()}
              </p>
            </div>
            <button data-testid={`delete-message-${m.id}`} onClick={() => remove(m.id)} className="p-2 border border-white/15 text-neutral-300 hover:bg-red-500 hover:border-red-500 transition-colors duration-300" aria-label="Delete message">
              <Trash2 size={14} />
            </button>
          </div>
          <p className="mt-4 text-sm font-jetbrains font-light text-neutral-400 whitespace-pre-wrap">{m.message}</p>
        </div>
      ))}
    </div>
  );
}

function DashboardHome({ go }) {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    api.get("/admin/stats").then((r) => setStats(r.data)).catch((e) => toast.error(formatApiError(e)));
  }, []);
  if (!stats) return <p className="text-sm font-jetbrains text-neutral-500">Loading…</p>;
  const CARDS = [
    ["projects", "Projects"], ["publications", "Publications"], ["posts", "Blog Posts"],
    ["experience", "Experience"], ["trainings", "Trainings"], ["certifications", "Certifications"],
    ["achievements", "Achievements"],
  ["notices", "Notices"], ["messages", "Messages"],
  ];
  return (
    <div data-testid="admin-dashboard-home">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CARDS.map(([key, label]) => (
          <button key={key} data-testid={`stat-${key}`} onClick={() => go(key === "messages" ? "messages" : key)} className="border border-line bg-panel p-6 text-left hover:bg-panel/70 transition-colors duration-300">
            <p className="text-3xl font-outfit font-bold text-white">{stats.counts[key] ?? 0}</p>
            <p className="mt-1 text-xs font-jetbrains uppercase tracking-wider text-neutral-500">{label}</p>
            {(stats.drafts?.[key] ?? 0) > 0 && <p className="mt-1 text-[10px] font-jetbrains text-amber-400">{stats.drafts[key]} draft</p>}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="border border-line bg-panel p-6">
          <p className="text-xs font-jetbrains uppercase tracking-[0.2em] text-neutral-500 mb-4">Recent messages</p>
          {stats.recent_messages.length === 0 && <p className="text-sm font-jetbrains text-neutral-500">None yet.</p>}
          {stats.recent_messages.map((m) => (
            <div key={m.id} className="border-t border-line py-3 first:border-0">
              <p className="text-sm text-white truncate">{m.subject}</p>
              <p className="text-xs font-jetbrains text-neutral-500">{m.name} · {new Date(m.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <div className="border border-line bg-panel p-6">
          <p className="text-xs font-jetbrains uppercase tracking-[0.2em] text-neutral-500 mb-4">Recent activity</p>
          {stats.recent_activity.length === 0 && <p className="text-sm font-jetbrains text-neutral-500">No activity yet — it will appear as you edit content.</p>}
          {stats.recent_activity.map((a) => (
            <div key={a.id} className="border-t border-line py-3 first:border-0">
              <p className="text-sm text-white">{a.action} <span className="text-neutral-400">{a.collection}</span>{a.title ? ` — ${a.title}` : ""}</p>
              <p className="text-xs font-jetbrains text-neutral-500">{new Date(a.at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MediaLibrary() {
  const [files, setFiles] = useState([]);
  const load = useCallback(() => {
    api.get("/admin/files").then((r) => setFiles(r.data)).catch((e) => toast.error(formatApiError(e)));
  }, []);
  useEffect(() => { load(); }, [load]);

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
      await api.post("/admin/upload", fd);
      toast.success("Uploaded");
      load();
    } catch (err) {
      toast.error(formatApiError(err));
    }
    e.target.value = "";
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this file? If it is used as a thesis/publication/CV attachment, that link will break.")) return;
    await api.delete(`/admin/files/${id}`);
    toast.success("Deleted");
    load();
  };

  const base = process.env.REACT_APP_BACKEND_URL;
  return (
    <div>
      <label className="inline-flex items-center gap-2 bg-white text-black font-jetbrains text-xs uppercase tracking-[0.15em] px-6 py-3 cursor-pointer hover:bg-neutral-300 transition-colors duration-300" data-testid="media-upload">
        <Upload size={14} /> Upload file
        <input type="file" className="hidden" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={upload} />
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6" data-testid="media-grid">
        {files.length === 0 && <p className="text-sm font-jetbrains text-neutral-500 col-span-4">No files uploaded yet.</p>}
        {files.map((f) => (
          <div key={f.id} className="border border-line bg-panel p-4">
            {f.content_type.startsWith("image/") ? (
              <img src={`${base}/api/files/${f.id}`} alt={f.name} className="w-full aspect-square object-cover border border-white/10" />
            ) : (
              <a href={`${base}/api/files/${f.id}`} target="_blank" rel="noopener noreferrer" className="w-full aspect-square border border-white/10 flex flex-col items-center justify-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <FileText size={28} />
                <span className="text-[10px] font-jetbrains uppercase">PDF</span>
              </a>
            )}
            <p className="mt-3 text-xs font-jetbrains text-neutral-300 truncate">{f.name}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] font-jetbrains text-neutral-500">{f.size_kb} KB</span>
              <button data-testid={`delete-file-${f.id}`} onClick={() => remove(f.id)} className="p-1.5 border border-white/15 text-neutral-400 hover:bg-red-500 hover:border-red-500 transition-colors" aria-label="Delete file">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CVManager() {
  const [cv, setCv] = useState(null);
  const load = useCallback(() => {
    api.get("/content").then((r) => setCv(r.data.site?.cv_name || null)).catch(() => {});
  }, []);
  useEffect(() => { load(); }, [load]);

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
      await api.post("/admin/cv", fd);
      toast.success("CV updated — the whole site now serves the new file");
      load();
    } catch (err) {
      toast.error(formatApiError(err));
    }
    e.target.value = "";
  };

  return (
    <div className="max-w-xl border border-line bg-panel p-8" data-testid="cv-manager">
      <p className="text-xs font-jetbrains uppercase tracking-[0.2em] text-neutral-500">Active CV</p>
      <p className="mt-3 font-outfit text-white">{cv || "Lalit-Awasthi-CV.pdf (built-in default)"}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <label className="inline-flex items-center gap-2 bg-white text-black font-jetbrains text-xs uppercase tracking-[0.15em] px-6 py-3 cursor-pointer hover:bg-neutral-300 transition-colors duration-300" data-testid="cv-upload">
          <Upload size={14} /> Upload new CV (PDF)
          <input type="file" className="hidden" accept="application/pdf" onChange={upload} />
        </label>
        <a href={`${process.env.REACT_APP_BACKEND_URL}/api/cv`} target="_blank" rel="noopener noreferrer" data-testid="cv-view" className="border border-white/20 text-white font-jetbrains text-xs uppercase tracking-[0.15em] px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300">
          View current CV
        </a>
      </div>
      <p className="mt-5 text-xs font-jetbrains text-neutral-500">Uploading here instantly replaces the CV everywhere on the public site — no redeploy needed.</p>
    </div>
  );
}

function SEOEditor() {
  const [seo, setSeo] = useState(null);
  useEffect(() => {
    api.get("/content").then((r) => setSeo(r.data.seo || {})).catch((e) => toast.error(formatApiError(e)));
  }, []);
  if (!seo) return <p className="text-sm font-jetbrains text-neutral-500">Loading…</p>;
  const save = async (e) => {
    e.preventDefault();
    try {
      await api.put("/admin/seo", seo);
      toast.success("SEO settings saved");
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };
  const F = [
    ["site_title", "Site title (browser tab / Google)"],
    ["site_description", "Meta description"],
    ["og_title", "Social share title (Open Graph)"],
    ["og_description", "Social share description"],
    ["keywords", "Keywords (comma separated)"],
  ];
  return (
    <form onSubmit={save} className="max-w-2xl space-y-5" data-testid="seo-form">
      {F.map(([key, label]) => (
        <div key={key}>
          <label className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500">{label}</label>
          {key.includes("description") ? (
            <textarea rows={3} value={seo[key] || ""} onChange={(e) => setSeo({ ...seo, [key]: e.target.value })} className={`${inputCls} mt-2 resize-y`} data-testid={`seo-${key}`} />
          ) : (
            <input value={seo[key] || ""} onChange={(e) => setSeo({ ...seo, [key]: e.target.value })} className={`${inputCls} mt-2`} data-testid={`seo-${key}`} />
          )}
        </div>
      ))}
      <div className="border-t border-white/10 pt-5">
        <p className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500 mb-4">Per-page overrides (optional)</p>
        {["home", "about", "expertise", "projects", "experience", "research", "training", "services", "blog", "cv", "contact"].map((pg) => (
          <div key={pg} className="border border-white/10 p-4 mb-3 space-y-3">
            <p className="text-xs font-jetbrains text-neutral-300">/{pg === "home" ? "" : pg}</p>
            <input placeholder="Page title" value={seo.pages?.[pg]?.title || ""} onChange={(e) => setSeo({ ...seo, pages: { ...(seo.pages || {}), [pg]: { ...(seo.pages?.[pg] || {}), title: e.target.value } } })} className={inputCls} data-testid={`seo-page-${pg}-title`} />
            <input placeholder="Page description" value={seo.pages?.[pg]?.description || ""} onChange={(e) => setSeo({ ...seo, pages: { ...(seo.pages || {}), [pg]: { ...(seo.pages?.[pg] || {}), description: e.target.value } } })} className={inputCls} />
          </div>
        ))}
      </div>
      <button type="submit" data-testid="save-seo" className="bg-white text-black font-jetbrains text-xs uppercase tracking-[0.15em] px-6 py-3 hover:bg-neutral-300 transition-colors duration-300">Save SEO</button>
    </form>
  );
}

function ProfileEditor() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/content").then((r) => {
      setProfile(r.data.profile);
    }).catch((e) => toast.error(formatApiError(e)));
  }, []);

  if (!profile) return <p className="text-sm font-jetbrains text-neutral-500">Loading…</p>;

  const save = async (e) => {
    e.preventDefault();
    try {
      await api.put("/admin/profile", profile);
      toast.success("Profile saved");
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const F = [
    ["name", "Name"], ["headline", "Headline"], ["positioning", "Positioning statement"],
    ["email", "Email"], ["phone", "Phone"], ["location", "Location"], ["linkedin", "LinkedIn URL"], ["github", "GitHub URL"],
    ["blog_url", "External blog URL (your public Blogspot address)"],
    ["thesis_title", "Thesis title"], ["thesis_note", "Thesis description"],
    ["about_lead", "About — lead paragraph"], ["about_body", "About — second paragraph"],
  ];

  const uploadThesis = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
      const r = await api.post("/admin/upload", fd);
      setProfile({ ...profile, thesis_file_id: r.data.id, thesis_file_name: r.data.name });
      toast.success("PDF uploaded — now click Save Profile");
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const skills = profile.skills || [];
  const setSkills = (s) => setProfile({ ...profile, skills: s });

  return (
    <form onSubmit={save} className="max-w-2xl space-y-5" data-testid="admin-profile-form">
      {F.map(([key, label]) => (
        <div key={key}>
          <label className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500">{label}</label>
          {key.startsWith("about") || key === "positioning" ? (
            <textarea rows={3} value={profile[key] || ""} onChange={(e) => setProfile({ ...profile, [key]: e.target.value })} className={`${inputCls} mt-2 resize-y`} data-testid={`profile-${key}`} />
          ) : (
            <input value={profile[key] || ""} onChange={(e) => setProfile({ ...profile, [key]: e.target.value })} className={`${inputCls} mt-2`} data-testid={`profile-${key}`} />
          )}
        </div>
      ))}
      <div>
        <label className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500">Research interests (comma separated)</label>
        <input
          value={(profile.research_interests || []).join(", ")}
          onChange={(e) => setProfile({ ...profile, research_interests: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          className={`${inputCls} mt-2`} data-testid="profile-interests"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500">Skills (categories + items)</label>
          <button type="button" data-testid="add-skill-category" onClick={() => setSkills([...skills, { category: "New Category", items: [] }])} className="text-[10px] font-jetbrains uppercase tracking-wider text-neutral-300 border border-white/15 px-3 py-1.5 hover:bg-white hover:text-black transition-colors">
            + Category
          </button>
        </div>
        <div className="mt-3 space-y-4">
          {skills.map((cat, i) => (
            <div key={i} className="border border-white/10 p-4 space-y-3">
              <div className="flex gap-3 items-center">
                <input value={cat.category} onChange={(e) => { const s = [...skills]; s[i] = { ...cat, category: e.target.value }; setSkills(s); }} className={`${inputCls} flex-1`} data-testid={`skill-cat-${i}`} />
                <button type="button" onClick={() => setSkills(skills.filter((_, j) => j !== i))} className="p-2 border border-white/15 text-neutral-400 hover:bg-red-500 hover:border-red-500 transition-colors" aria-label="Remove category">
                  <Trash2 size={13} />
                </button>
              </div>
              <textarea rows={3} value={(cat.items || []).join("\n")} onChange={(e) => { const s = [...skills]; s[i] = { ...cat, items: e.target.value.split("\n").map((x) => x.trim()).filter(Boolean) }; setSkills(s); }} placeholder="One skill per line" className={`${inputCls} resize-y`} data-testid={`skill-items-${i}`} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500">Thesis PDF (max 12 MB)</label>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <input type="file" accept="application/pdf" onChange={uploadThesis} data-testid="thesis-upload" className="text-sm font-jetbrains text-neutral-400" />
          {profile.thesis_file_name && (
            <span className="text-xs font-jetbrains text-neutral-400" data-testid="thesis-current">Current: {profile.thesis_file_name}</span>
          )}
        </div>
      </div>
      <button type="submit" data-testid="save-profile" className="bg-white text-black font-jetbrains text-xs uppercase tracking-[0.15em] px-6 py-3 hover:bg-neutral-300 transition-colors duration-300">
        Save Profile
      </button>
      <p className="text-xs font-jetbrains text-neutral-600">Your CV is managed in the CV tab — upload a new PDF there and the whole site updates instantly.</p>
    </form>
  );
}

function AboutEditor() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    api.get("/content").then((r) => setProfile(r.data.profile)).catch((e) => toast.error(formatApiError(e)));
  }, []);
  if (!profile) return <p className="text-sm font-jetbrains text-neutral-500">Loading…</p>;

  const save = async (e) => {
    e.preventDefault();
    try {
      await api.put("/admin/profile", {
        about_sections: profile.about_sections || [],
        about_principles: profile.about_principles || [],
        about_facts: profile.about_facts || [],
      });
      toast.success("About page saved");
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const Repeater = ({ label, field, fields, blank }) => {
    const items = profile[field] || [];
    const setItems = (v) => setProfile({ ...profile, [field]: v });
    return (
      <div className="border border-line bg-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-jetbrains uppercase tracking-[0.2em] text-neutral-500">{label}</p>
          <button type="button" onClick={() => setItems([...items, { ...blank }])} className="text-[10px] font-jetbrains uppercase tracking-wider text-neutral-300 border border-white/15 px-3 py-1.5 hover:bg-white hover:text-black transition-colors" data-testid={`add-${field}`}>+ Add</button>
        </div>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="border border-white/10 p-4 space-y-3">
              {fields.map(([key, lbl, area]) => (
                <div key={key}>
                  <label className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-neutral-500">{lbl}</label>
                  {area ? (
                    <textarea rows={4} value={item[key] || ""} onChange={(e) => { const a = [...items]; a[i] = { ...item, [key]: e.target.value }; setItems(a); }} className={`${inputCls} mt-1 resize-y`} />
                  ) : (
                    <input value={item[key] || ""} onChange={(e) => { const a = [...items]; a[i] = { ...item, [key]: e.target.value }; setItems(a); }} className={`${inputCls} mt-1`} />
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setItems(items.filter((_, j) => j !== i))} className="text-[10px] font-jetbrains uppercase tracking-wider text-red-400 border border-red-400/30 px-3 py-1.5 hover:bg-red-500 hover:text-white transition-colors">Remove</button>
            </div>
          ))}
          {items.length === 0 && <p className="text-sm font-jetbrains text-neutral-500">Empty — the built-in default content is shown on the site until you add your own.</p>}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={save} className="space-y-6" data-testid="admin-about-form">
      <Repeater label="Story sections (heading + text)" field="about_sections" fields={[["heading", "Heading"], ["body", "Text (blank line between paragraphs)", true]]} blank={{ heading: "", body: "" }} />
      <Repeater label="Principles (Learn / Build / Teach / Research)" field="about_principles" fields={[["verb", "Title"], ["text", "Text", true]]} blank={{ verb: "", text: "" }} />
      <Repeater label="'At a glance' facts" field="about_facts" fields={[["label", "Label"], ["value", "Value"]]} blank={{ label: "", value: "" }} />
      <button type="submit" data-testid="save-about" className="bg-white text-black font-jetbrains text-xs uppercase tracking-[0.15em] px-6 py-3 hover:bg-neutral-300 transition-colors duration-300">Save About Page</button>
    </form>
  );
}

const TABS = [
  ["dashboard", "Dashboard"],
  ["messages", "Messages"],
  ["projects", "Projects"],
  ["publications", "Publications"],
  ["experience", "Experience"],
  ["education", "Education"],
  ["certifications", "Certifications"],
  ["achievements", "Achievements"],
  ["posts", "Blog Posts"],
  ["services", "Services"],
  ["trainings", "Trainings"],
  ["media", "Media"],
  ["cv", "CV"],
  ["seo", "SEO"],
  ["about", "About Page"],
  ["profile", "Profile & Links"],
];

const MANAGED = ["projects", "publications", "experience", "education", "certifications", "achievements", "notices", "posts", "services", "trainings"];

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/me").then((r) => setUser(r.data)).catch(() => navigate("/admin/login"));
  }, [navigate]);

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/admin/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <p className="font-jetbrains text-sm text-neutral-500 animate-pulse">Verifying session…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="border-b border-line">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <p className="font-outfit font-bold uppercase tracking-tight text-sm">Studio — {user.name}</p>
          <div className="flex items-center gap-6">
            <a href="/" data-testid="admin-view-site" className="link-line text-xs font-jetbrains uppercase tracking-[0.15em] text-neutral-400">View site</a>
            <button data-testid="admin-logout" onClick={logout} className="inline-flex items-center gap-2 text-xs font-jetbrains uppercase tracking-[0.15em] text-neutral-400 hover:text-white transition-colors duration-300">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        <nav className="flex flex-wrap gap-2 mb-10" aria-label="Admin sections">
          {TABS.map(([key, label]) => (
            <button
              key={key}
              data-testid={`tab-${key}`}
              onClick={() => setTab(key)}
              className={`font-jetbrains text-xs uppercase tracking-[0.15em] px-4 py-2 border transition-colors duration-300 ${tab === key ? "bg-white text-black border-white" : "border-white/15 text-neutral-400 hover:text-white"}`}
            >
              {label}
            </button>
          ))}
        </nav>
        {tab === "dashboard" && <DashboardHome go={setTab} />}
        {tab === "messages" && <Messages />}
        {tab === "profile" && <ProfileEditor />}
        {tab === "media" && <MediaLibrary />}
        {tab === "cv" && <CVManager />}
        {tab === "seo" && <SEOEditor />}
        {tab === "about" && <AboutEditor />}
        {MANAGED.includes(tab) && <ItemManager key={tab} collection={tab} />}
      </div>
    </div>
  );
}
