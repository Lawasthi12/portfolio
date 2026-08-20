import { Link } from "react-router-dom";
import { Download, ArrowUpRight } from "lucide-react";
import { PageHero, Reveal, Tag } from "@/components/site/Reveal";
import { usePageSeo } from "@/lib/useContent";

const OBJECTIVES = [
  "Formulate a robust PU learning framework that integrates bounded loss functions (ramp loss and truncated logistic loss) into the non-negative PU risk estimation paradigm, limiting the influence of mislabeled positive examples.",
  "Provide theoretical foundations: formal robustness guarantees under label noise — risk consistency, bounded impact of corrupted labels, and convergence properties.",
  "Develop an efficient algorithmic implementation with optimization details, hyperparameter guidelines, and a reproducible training procedure for synthetic and real-world datasets.",
  "Validate empirically across multiple datasets and noise regimes, benchmarking against uPU and nnPU on accuracy, ROC-AUC, PR-AUC, and training stability.",
  "Explore practical implications and extensions: deep learning integration, non-uniform noise models, and semi-supervised settings.",
];

const FINDINGS = [
  ["Consistent outperformance", "Bounded-loss methods beat uPU and nnPU baselines across all noise levels, datasets, and metrics."],
  ["Resilience at high noise", "At 60% label noise, Ramp-Loss reached 69.1% accuracy vs 56.3% (nnPU) and 52.1% (uPU) on synthetic data."],
  ["Slower degradation", "Accuracy degradation from clean to 60% noise: 19.5% for Ramp-Loss vs 31.8% (uPU) — a 38.7% reduction in degradation rate."],
  ["Training stability", "70–80% lower loss variance in high-noise conditions; 74% lower variance and 60% lower gradient norm than nnPU."],
  ["Faster convergence", "Ramp-Loss converged in ~38 epochs vs 82 for uPU — roughly half the training epochs."],
];

const TOOLS = ["Python", "PyTorch", "CUDA 11.8", "NumPy", "SciPy", "scikit-learn", "Matplotlib", "Seaborn", "Weights & Biases"];
const KEYWORDS = ["Positive-Unlabeled Learning", "Label Noise Robustness", "Bounded Loss Functions", "Weak Supervision", "Risk Estimation"];

export default function Thesis() {
  usePageSeo("thesis", "Master's Thesis — Lalit Awasthi", "Noise-Robust Positive-Unlabeled Learning Through Bounded Loss Functions — Master's thesis by Lalit Awasthi, NUIST, 2026. Abstract, methodology, findings, and PDF download.");

  return (
    <div>
      <PageHero
        overline="Master's Thesis"
        title="Noise-Robust Positive-Unlabeled Learning Through Bounded Loss Functions"
        lede="Theory, algorithms, and deep extensions — how machines can keep learning reliably when the labels they train on are partly wrong."
      />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <Reveal>
          <div className="bg-surface border border-line p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8" data-testid="thesis-meta">
            <dl className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                ["Author", "Awasthi Lalit"],
                ["University", "Nanjing University of Information Science & Technology (NUIST)"],
                ["Degree", "Master's Degree — Artificial Intelligence"],
                ["Supervisor", "Professor Tang Long"],
                ["Date", "May 2026"],
                ["Area", "Machine Learning · Weakly Supervised Learning"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-mono uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="mt-1 text-sm text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="md:col-span-4 flex flex-col gap-3 md:items-end">
              <a
                href="/documents/master-thesis.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="thesis-download"
                className="inline-flex items-center gap-2 bg-forest text-paper rounded-full px-6 py-3 text-sm font-medium hover:bg-forest/90 transition-colors duration-300"
              >
                <Download size={15} /> Download Thesis (PDF)
              </a>
              <a
                href="/documents/research-paper-pu-learning.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="thesis-paper-download"
                className="inline-flex items-center gap-2 border border-line text-ink rounded-full px-6 py-3 text-sm font-medium hover:bg-surface2 transition-colors duration-300"
              >
                Related Journal Paper (PDF)
              </a>
              <a
                href="https://doi.org/10.64539/sjer.v1i3.2025.314"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="thesis-doi"
                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-forest link-line"
              >
                DOI: 10.64539/sjer.v1i3.2025.314 <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-14">
          <Reveal>
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Research Problem</h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">
                Positive-Unlabeled (PU) learning trains classifiers when only some positive examples are labeled — common in medical diagnosis, fraud detection, and fault monitoring. Its practical use is undermined by label noise: mislabeled instances inside the trusted positive set break the core assumptions of classical PU methods, and traditional approaches (uPU, nnPU) rely on unbounded loss functions that let a single corrupted label distort the whole model.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Objectives</h2>
              <ol className="mt-5 space-y-4">
                {OBJECTIVES.map((o, i) => (
                  <li key={i} className="flex gap-4 text-sm sm:text-base leading-relaxed text-muted">
                    <span className="font-mono text-forest shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Methodology</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                The framework integrates bounded loss functions — ramp loss and truncated logistic loss — into the non-negative PU risk estimation paradigm, so any single mislabeled example can only contribute a capped amount to the training objective. The algorithm trains with minibatch stochastic gradient descent: positive and unlabeled batches are separated, risk components are computed with bounded losses, non-negative rectification is applied, and gradients are aggregated. Theoretical analysis derives formal robustness guarantees, proving the impact of label noise is bounded linearly by the noise rate and the loss function's upper bound.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Ramp Loss", "Truncated Logistic Loss", "nnPU Risk Estimation", "Minibatch SGD", "Adam Optimizer"].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Key Findings</h2>
              <div className="mt-5 space-y-0">
                {FINDINGS.map(([k, v], i) => (
                  <div key={k} className="border-t border-line py-5 grid grid-cols-1 md:grid-cols-12 gap-2">
                    <p className="md:col-span-4 font-serif text-lg text-ink">{k}</p>
                    <p className="md:col-span-8 text-sm leading-relaxed text-muted">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-surface border border-line p-7">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Keywords</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {KEYWORDS.map((k) => (
                  <Tag key={k}>{k}</Tag>
                ))}
              </div>
            </div>
            <div className="bg-surface border border-line p-7">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Tools & Software</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {TOOLS.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
            <div className="bg-surface border border-line p-7">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-forest font-medium">Validation Data</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">Synthetic datasets, UCI Heart Disease dataset, and a PU variant of MNIST — across 0–60% label noise.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-sm text-muted max-w-xl">Related publications and ongoing research are collected on the Research page.</p>
          <Link to="/research" data-testid="thesis-research-link" className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.12em] text-forest link-line self-start">
            View Research & Publications →
          </Link>
        </div>
      </section>
    </div>
  );
}
