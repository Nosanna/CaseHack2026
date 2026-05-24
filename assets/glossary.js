/**
 * ScotiaInvested+ Financial Glossary Tooltip System
 * Usage: wrap any text in <span data-term="etf">ETF</span>
 * The system auto-injects a floating tooltip bubble on hover/tap.
 */

const GLOSSARY = {
  etf: {
    term: "ETF",
    fullName: "Exchange-Traded Fund",
    icon: "candlestick_chart",
    definition:
      "A basket of investments (stocks, bonds, etc.) that trades on a stock exchange like a single share. ETFs let you own a tiny slice of many companies at once, spreading your risk and keeping fees low.",
    example: "Buying VFV gives you exposure to 500 top U.S. companies in one click.",
  },
  mer: {
    term: "MER",
    fullName: "Management Expense Ratio",
    icon: "percent",
    definition:
      "The annual fee charged by a fund, shown as a percentage of your investment. It's deducted automatically — you never write a cheque. Lower is better: 0.09% means you pay just $0.90/year per $1,000 invested.",
    example: "VFV's MER of 0.09% is near the industry minimum.",
  },
  yield: {
    term: "Yield",
    fullName: "Dividend Yield",
    icon: "paid",
    definition:
      "The yearly cash income the fund pays you from dividends, stated as a percentage of its price. It's like interest on a savings account, except it comes from company profits instead of a bank.",
    example: "A 1.2% yield on a $1,000 investment pays you ~$12/year.",
  },
  "s&p 500": {
    term: "S&P 500",
    fullName: "Standard & Poor's 500",
    icon: "leaderboard",
    definition:
      "An index tracking the 500 largest publicly traded companies in the United States, representing about 80% of the U.S. stock market. It's widely used as the benchmark for overall market performance.",
    example: "Apple, Microsoft, and NVIDIA are all in the S&P 500.",
  },
  tsx: {
    term: "TSX",
    fullName: "Toronto Stock Exchange",
    icon: "store",
    definition:
      "Canada's primary stock exchange, home to over 1,500 companies including major banks, energy firms, and miners. Investing in TSX-listed ETFs gives you Canadian market exposure.",
    example: "ZCN tracks the TSX and holds hundreds of Canadian companies.",
  },
  "index fund": {
    term: "Index Fund",
    fullName: "Index Fund",
    icon: "trending_up",
    definition:
      "A fund that passively follows a market index (like the S&P 500 or TSX) instead of having a manager pick individual stocks. This keeps fees ultra-low and historically beats most actively managed funds over time.",
    example: "VFV and ZCN are both index funds — they copy an index, not a manager's opinion.",
  },
  risk: {
    term: "Risk",
    fullName: "Investment Risk Level",
    icon: "show_chart",
    definition:
      "How much the value of your investment may go up or down in the short term. Higher risk usually means bigger potential gains — but also bigger possible losses. Choose a level that won't make you lose sleep.",
    example: "Medium risk: comfortable with 10-20% swings in exchange for long-term growth.",
  },
  dividend: {
    term: "Dividend",
    fullName: "Dividend",
    icon: "currency_exchange",
    definition:
      "A cash payment companies make to shareholders from their profits, usually every quarter. When you hold an ETF, you automatically receive a share of all dividends paid by the companies inside it.",
    example: "If Apple pays a dividend, your VFV ETF receives a proportional payout.",
  },
  portfolio: {
    term: "Portfolio",
    fullName: "Investment Portfolio",
    icon: "pie_chart",
    definition:
      "Your complete collection of investments — all the ETFs, stocks, or bonds you own. A well-diversified portfolio spreads money across different asset types to reduce the impact of any single investment performing poorly.",
    example: "Your ScotiaInvested+ portfolio holds VFV, XBAL, and ZCN.",
  },
  "asset class": {
    term: "Asset Class",
    fullName: "Asset Class",
    icon: "category",
    definition:
      "A category of investment with similar characteristics and market behaviour. The main asset classes are stocks (equities), bonds (fixed income), and cash. Different classes react differently to economic events.",
    example: "XBAL is multi-asset: it holds both stocks and bonds.",
  },
  bond: {
    term: "Bond",
    fullName: "Bond (Fixed Income)",
    icon: "receipt_long",
    definition:
      "A loan you give to a government or company that pays you back with interest over a set period. Bonds are generally lower risk than stocks but also grow more slowly. They help balance a portfolio.",
    example: "XBAL includes bonds to soften the ups and downs of its stock holdings.",
  },
  equity: {
    term: "Equity",
    fullName: "Equity (Stocks & Shares)",
    icon: "bar_chart",
    definition:
      "Ownership in a company. When you buy equity (stocks or stock-based ETFs), you own a small piece of the business and benefit when it grows. Equities have the highest long-term growth potential but also the most short-term swings.",
    example: "VFV is an equity ETF — it holds shares (equities) of 500 U.S. companies.",
  },
  "emergency fund": {
    term: "Emergency Fund",
    fullName: "Emergency Fund",
    icon: "shield",
    definition:
      "Cash savings set aside to cover unexpected expenses (job loss, medical bills, car repairs) without touching your investments. Financial experts recommend keeping 3–6 months of essential expenses readily accessible.",
    example: "Your 6.8 months of coverage means you're well protected before you start investing.",
  },
  "cash flow": {
    term: "Cash Flow",
    fullName: "Monthly Cash Flow",
    icon: "account_balance",
    definition:
      "The net amount of money moving in and out of your accounts each month. Positive cash flow (income > expenses) is what Scotia uses to calculate a safe amount to invest without affecting your lifestyle.",
    example: "Income $2,850 − Essentials $1,940 − Flexible $510 = $400 available.",
  },
  "diversification": {
    term: "Diversification",
    fullName: "Diversification",
    icon: "hub",
    definition:
      "Spreading your money across different investments so that a single bad performer doesn't sink your whole portfolio. It's the investing equivalent of \"don't put all your eggs in one basket.\"",
    example: "Holding VFV (U.S.), XBAL (balanced), and ZCN (Canada) is diversified.",
  },
};

/* ─────────────────────────── Tooltip DOM ─────────────────────────── */

const TOOLTIP_CSS = `
  #sg-tooltip {
    position: fixed;
    z-index: 9999;
    max-width: 280px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
    border: 1px solid rgba(191,0,15,0.12);
    padding: 0;
    pointer-events: auto;
    opacity: 0;
    transform: translateY(6px) scale(0.97);
    transition: opacity 0.22s cubic-bezier(.4,0,.2,1),
                transform 0.22s cubic-bezier(.4,0,.2,1);
    font-family: 'Manrope', sans-serif;
    overflow: hidden;
  }
  #sg-tooltip.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  .sg-tip-header {
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #bf000f 0%, #ec111a 100%);
    padding: 12px 14px 10px;
  }
  .sg-tip-icon {
    width: 28px;
    height: 28px;
    background: rgba(255,255,255,0.18);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
    color: #fff;
  }
  .sg-tip-title {
    font-size: 11px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    line-height: 1.2;
  }
  .sg-tip-fullname {
    font-size: 10px;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    line-height: 1.2;
    margin-top: 1px;
  }
  .sg-tip-body {
    padding: 12px 14px 10px;
  }
  .sg-tip-def {
    font-size: 11.5px;
    color: #3a3a3a;
    line-height: 1.55;
    margin-bottom: 8px;
  }
  .sg-tip-example {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    background: #fff5f5;
    border-radius: 8px;
    padding: 7px 9px;
    border-left: 3px solid #ec111a;
  }
  .sg-tip-example-label {
    font-size: 9px;
    font-weight: 800;
    color: #bf000f;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    margin-top: 1px;
  }
  .sg-tip-example-text {
    font-size: 10.5px;
    color: #5f5e5e;
    line-height: 1.45;
  }
  .sg-term {
    border-bottom: 1.5px dashed rgba(191,0,15,0.45);
    cursor: help;
    color: inherit;
    transition: color 0.15s, border-color 0.15s;
  }
  .sg-term:hover, .sg-term.active {
    color: #bf000f;
    border-color: #bf000f;
  }
`;

function injectStyles() {
  if (document.getElementById("sg-glossary-styles")) return;
  const style = document.createElement("style");
  style.id = "sg-glossary-styles";
  style.textContent = TOOLTIP_CSS;
  document.head.appendChild(style);
}

function buildTooltip() {
  if (document.getElementById("sg-tooltip")) return;
  const el = document.createElement("div");
  el.id = "sg-tooltip";
  el.setAttribute("role", "tooltip");
  el.innerHTML = `
    <div class="sg-tip-header">
      <div class="sg-tip-icon material-symbols-outlined" id="sg-tip-icon">info</div>
      <div>
        <div class="sg-tip-title" id="sg-tip-title"></div>
        <div class="sg-tip-fullname" id="sg-tip-fullname"></div>
      </div>
    </div>
    <div class="sg-tip-body">
      <div class="sg-tip-def" id="sg-tip-def"></div>
      <div class="sg-tip-example">
        <span class="sg-tip-example-label">e.g.</span>
        <span class="sg-tip-example-text" id="sg-tip-example"></span>
      </div>
    </div>
  `;
  document.body.appendChild(el);
}

let activeTarget = null;
let hideTimer = null;

function showTooltip(target, entry) {
  clearTimeout(hideTimer);
  activeTarget = target;

  const tip = document.getElementById("sg-tooltip");
  document.getElementById("sg-tip-icon").textContent = entry.icon || "info";
  document.getElementById("sg-tip-title").textContent = entry.term;
  document.getElementById("sg-tip-fullname").textContent = entry.fullName || "";
  document.getElementById("sg-tip-def").textContent = entry.definition;
  document.getElementById("sg-tip-example").textContent = entry.example || "";

  // Position the tooltip — anchored to target, clamped to viewport
  tip.style.opacity = "0";
  tip.style.display = "block";
  tip.classList.remove("visible");

  const rect = target.getBoundingClientRect();
  const tipW = 280;
  const tipH = tip.offsetHeight || 180;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const margin = 8;

  // Try below first, then above
  let top = rect.bottom + margin;
  if (top + tipH > vh - margin) top = rect.top - tipH - margin;
  if (top < margin) top = margin;

  let left = rect.left + rect.width / 2 - tipW / 2;
  left = Math.max(margin, Math.min(left, vw - tipW - margin));

  tip.style.top = `${top}px`;
  tip.style.left = `${left}px`;
  tip.style.width = `${tipW}px`;

  requestAnimationFrame(() => {
    tip.classList.add("visible");
  });

  target.classList.add("active");
}

function hideTooltip(immediate) {
  const tip = document.getElementById("sg-tooltip");
  if (!tip) return;
  const delay = immediate ? 0 : 200;
  hideTimer = setTimeout(() => {
    tip.classList.remove("visible");
    if (activeTarget) activeTarget.classList.remove("active");
    activeTarget = null;
    setTimeout(() => {
      if (!tip.classList.contains("visible")) tip.style.display = "none";
    }, 250);
  }, delay);
}

/* ─────────────────────────── Auto-wrap terms ─────────────────────────── */

/**
 * Walk text nodes and wrap glossary matches with <span data-term="...">
 * We look for whole-word matches (case-insensitive).
 */
function wrapTermsInNode(root) {
  // Sort keys longest-first so "asset class" matches before "asset"
  const keys = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  const escapedKeys = keys.map((k) =>
    k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`\\b(${escapedKeys.join("|")})\\b`, "gi");

  // Gather all text nodes under root, skipping scripts/styles/existing spans
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toUpperCase();
      if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(tag))
        return NodeFilter.FILTER_REJECT;
      if (parent.dataset && parent.dataset.term !== undefined)
        return NodeFilter.FILTER_REJECT;
      if (parent.classList.contains("sg-term"))
        return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes = [];
  let n;
  while ((n = walker.nextNode())) textNodes.push(n);

  textNodes.forEach((textNode) => {
    const text = textNode.nodeValue;
    if (!pattern.test(text)) return;
    pattern.lastIndex = 0;

    const frag = document.createDocumentFragment();
    let last = 0;
    let m;
    while ((m = pattern.exec(text)) !== null) {
      if (m.index > last) {
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      }
      const key = m[0].toLowerCase();
      const entry = GLOSSARY[key];
      if (entry) {
        const span = document.createElement("span");
        span.className = "sg-term";
        span.dataset.term = key;
        span.textContent = m[0];
        span.setAttribute("tabindex", "0");
        span.setAttribute("aria-label", `${m[0]}: ${entry.definition}`);
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(m[0]));
      }
      last = m.index + m[0].length;
    }
    if (last < text.length) {
      frag.appendChild(document.createTextNode(text.slice(last)));
    }
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

/* ─────────────────────────── Event binding ─────────────────────────── */

function bindEvents() {
  const tip = document.getElementById("sg-tooltip");

  document.addEventListener("mouseover", (e) => {
    const term = e.target.closest(".sg-term");
    if (!term) return;
    const key = term.dataset.term;
    const entry = GLOSSARY[key];
    if (entry) showTooltip(term, entry);
  });

  document.addEventListener("mouseout", (e) => {
    const term = e.target.closest(".sg-term");
    if (!term) return;
    hideTooltip(false);
  });

  // Keep tooltip alive when mouse moves over it
  tip.addEventListener("mouseenter", () => clearTimeout(hideTimer));
  tip.addEventListener("mouseleave", () => hideTooltip(false));

  // Tap/click support for mobile
  document.addEventListener("click", (e) => {
    const term = e.target.closest(".sg-term");
    if (term) {
      e.stopPropagation();
      const key = term.dataset.term;
      const entry = GLOSSARY[key];
      if (entry) {
        if (activeTarget === term) {
          hideTooltip(true);
        } else {
          showTooltip(term, entry);
        }
      }
      return;
    }
    // Click outside closes
    if (!tip.contains(e.target)) hideTooltip(true);
  });

  // Keyboard accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideTooltip(true);
    if (e.key === "Enter" || e.key === " ") {
      const term = e.target.closest(".sg-term");
      if (term) {
        e.preventDefault();
        const key = term.dataset.term;
        const entry = GLOSSARY[key];
        if (entry) showTooltip(term, entry);
      }
    }
  });
}

/* ─────────────────────────── Init ─────────────────────────── */

function initGlossary() {
  injectStyles();
  buildTooltip();
  wrapTermsInNode(document.body);
  bindEvents();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlossary);
} else {
  initGlossary();
}
