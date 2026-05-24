/**
 * ScotiaInvested+ — Financial Term Explainer
 * Strategy: bottom-sheet modal triggered by clicking .sg-term spans.
 * Appended inside .screen so it works within the iPhone mockup's overflow:hidden.
 */

// ─── Glossary ───────────────────────────────────────────────────────────────

const GLOSSARY = {
  etf: {
    term: "ETF",
    fullName: "Exchange-Traded Fund",
    icon: "candlestick_chart",
    color: "#bf000f",
    definition:
      "A basket of investments (stocks, bonds, etc.) that trades on a stock exchange like a single share. ETFs let you own a tiny slice of many companies at once — spreading your risk and keeping costs low.",
    example: "Buying VFV gives you exposure to 500 top U.S. companies in one click.",
  },
  mer: {
    term: "MER",
    fullName: "Management Expense Ratio",
    icon: "percent",
    color: "#bf000f",
    definition:
      "The annual fee charged by a fund, shown as a % of your investment. It's automatically deducted — you never write a cheque. Lower is always better.",
    example: "VFV's MER of 0.09% costs just $0.90/year on a $1,000 investment.",
  },
  yield: {
    term: "Dividend Yield",
    fullName: "Annual payout as % of price",
    icon: "paid",
    color: "#16a34a",
    definition:
      "The yearly cash income the fund pays you from dividends, stated as a percentage of its price. Think of it like interest on a savings account — except it comes from company profits.",
    example: "A 1.2% yield on $1,000 pays you ~$12/year in cash distributions.",
  },
  risk: {
    term: "Risk Level",
    fullName: "How much your investment may fluctuate",
    icon: "show_chart",
    color: "#d97706",
    definition:
      "How much the value of your investment may go up or down in the short term. Higher risk = bigger potential gains, but also bigger possible losses. Choose a level that matches your comfort.",
    example: "Medium risk: expect 10–20% swings year-to-year in exchange for long-term growth.",
  },
  "index fund": {
    term: "Index Fund",
    fullName: "Passive market-tracking fund",
    icon: "trending_up",
    color: "#bf000f",
    definition:
      "A fund that Simply copies a market index (like the S&P 500) instead of having a manager pick stocks. This keeps fees ultra-low and historically outperforms most actively managed funds.",
    example: "VFV and ZCN are both index funds — they follow an index, not a manager's opinion.",
  },
  "s&p 500": {
    term: "S&P 500",
    fullName: "Standard & Poor's 500",
    icon: "leaderboard",
    color: "#1d4ed8",
    definition:
      "An index tracking the 500 largest publicly traded U.S. companies — about 80% of the entire U.S. stock market. It's the most widely watched benchmark for overall market performance.",
    example: "Apple, Microsoft, and NVIDIA all sit inside the S&P 500.",
  },
  tsx: {
    term: "TSX",
    fullName: "Toronto Stock Exchange",
    icon: "account_balance",
    color: "#bf000f",
    definition:
      "Canada's primary stock exchange, home to over 1,500 publicly traded companies — including major banks, energy firms, and resource companies. TSX-based ETFs give you Canadian market exposure.",
    example: "ZCN tracks the TSX and holds hundreds of Canadian companies.",
  },
  dividend: {
    term: "Dividend",
    fullName: "Profit shared with shareholders",
    icon: "currency_exchange",
    color: "#16a34a",
    definition:
      "A cash payment companies distribute to shareholders from their profits, usually every quarter. When you hold an ETF, you automatically receive your share of all dividends paid by the companies inside it.",
    example: "If Apple pays a $0.25/share dividend, your VFV ETF gets a proportional payout.",
  },
  portfolio: {
    term: "Portfolio",
    fullName: "Your personal investment collection",
    icon: "pie_chart",
    color: "#7c3aed",
    definition:
      "Your complete set of investments — every ETF, stock, or bond you own. A well-diversified portfolio spreads money across different asset types so one bad investment doesn't sink everything.",
    example: "Your ScotiaInvested+ portfolio holds VFV (U.S.), XBAL (Balanced), and ZCN (Canada).",
  },
  bond: {
    term: "Bond",
    fullName: "Fixed-income investment",
    icon: "receipt_long",
    color: "#0891b2",
    definition:
      "A loan you give to a government or company that pays you back with fixed interest over a set period. Bonds are generally lower risk than stocks but grow more slowly — they stabilize a portfolio.",
    example: "XBAL holds bonds alongside stocks to cushion against market downturns.",
  },
  equity: {
    term: "Equity",
    fullName: "Ownership in a company (stocks)",
    icon: "bar_chart",
    color: "#bf000f",
    definition:
      "Ownership in a company. When you buy equity through an ETF, you own a tiny slice of each company inside it — and benefit directly when those companies grow in value.",
    example: "VFV is an equity ETF — it holds actual shares (equities) of 500 U.S. companies.",
  },
  "emergency fund": {
    term: "Emergency Fund",
    fullName: "3–6 months of expenses, always accessible",
    icon: "shield",
    color: "#16a34a",
    definition:
      "Cash kept accessible to cover unexpected expenses (job loss, medical bills, repairs) without touching your investments. Experts recommend 3–6 months of essential expenses before you invest.",
    example: "Your 6.8 months coverage means you're fully protected and ready to start investing.",
  },
  "cash flow": {
    term: "Cash Flow",
    fullName: "Monthly income minus expenses",
    icon: "account_balance_wallet",
    color: "#0891b2",
    definition:
      "The net money moving in and out of your accounts each month. Positive cash flow (income > expenses) is what ScotiaInvested+ uses to find a safe amount to invest without affecting your lifestyle.",
    example: "Income $2,850 − Essentials $1,940 − Flexible $510 = $400 available cash flow.",
  },
  diversification: {
    term: "Diversification",
    fullName: "Spreading risk across investments",
    icon: "hub",
    color: "#7c3aed",
    definition:
      "Spreading your money across different investments so one bad performer doesn't wreck your whole portfolio. It's the investing equivalent of \"don't put all your eggs in one basket.\"",
    example: "Holding VFV (U.S.), XBAL (balanced), and ZCN (Canada) is well diversified.",
  },
  "asset class": {
    term: "Asset Class",
    fullName: "Category of investment type",
    icon: "category",
    color: "#bf000f",
    definition:
      "A group of investments that share similar characteristics and react similarly to market conditions. The three main asset classes are equities (stocks), bonds, and cash.",
    example: "XBAL is \"multi-asset\" because it holds both stocks and bonds.",
  },
};

// ─── Bottom-Sheet Modal ────────────────────────────────────────────────────

const SHEET_CSS = `
  #sg-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0);
    z-index: 9000;
    display: none;
    align-items: flex-end;
    transition: background 0.25s ease;
  }
  #sg-overlay.sg-open {
    display: flex;
    background: rgba(0,0,0,0.38);
  }
  #sg-sheet {
    width: 100%;
    background: #fff;
    border-radius: 20px 20px 0 0;
    padding: 0;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    font-family: 'Manrope', sans-serif;
    box-shadow: 0 -4px 30px rgba(0,0,0,0.15);
  }
  #sg-overlay.sg-open #sg-sheet {
    transform: translateY(0);
  }
  .sg-sheet-handle {
    width: 36px; height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    margin: 10px auto 0;
  }
  .sg-sheet-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px 12px;
    border-bottom: 1px solid #f0f0f0;
  }
  .sg-sheet-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-family: 'Material Symbols Outlined';
    font-size: 20px;
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    color: #fff;
  }
  .sg-sheet-titles { flex: 1; }
  .sg-sheet-term {
    font-size: 16px; font-weight: 800;
    color: #1a1a1a; line-height: 1.2;
  }
  .sg-sheet-fullname {
    font-size: 11px; font-weight: 500;
    color: #888; margin-top: 1px;
  }
  .sg-sheet-close {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: #f0f0f0;
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Material Symbols Outlined';
    font-size: 16px; color: #555;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .sg-sheet-close:hover { background: #e0e0e0; }
  .sg-sheet-body { padding: 16px; }
  .sg-sheet-def {
    font-size: 13px; color: #333;
    line-height: 1.65; margin-bottom: 12px;
  }
  .sg-sheet-example {
    border-radius: 10px;
    padding: 10px 12px;
    border-left: 3px solid #bf000f;
    background: #fff5f5;
    display: flex; gap: 8px; align-items: flex-start;
  }
  .sg-eg-label {
    font-size: 9px; font-weight: 800;
    color: #bf000f; text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap; margin-top: 2px;
  }
  .sg-eg-text {
    font-size: 12px; color: #555; line-height: 1.5;
  }
  .sg-got-it {
    display: block; width: 100%;
    margin: 14px 0 4px;
    padding: 13px;
    background: #bf000f; color: #fff;
    border: none; border-radius: 12px;
    font-size: 14px; font-weight: 700;
    cursor: pointer; font-family: 'Manrope', sans-serif;
    transition: filter 0.15s;
  }
  .sg-got-it:hover { filter: brightness(1.1); }
  .sg-term {
    border-bottom: 1.5px dashed rgba(191,0,15,0.55);
    cursor: pointer;
    color: inherit;
    display: inline;
  }
  .sg-term:hover { color: #bf000f; border-color: #bf000f; }
`;

function getScreen() {
  return document.querySelector(".iphone-x .screen") || document.body;
}

function injectStyles() {
  if (document.getElementById("sg-css")) return;
  const s = document.createElement("style");
  s.id = "sg-css";
  s.textContent = SHEET_CSS;
  document.head.appendChild(s);
}

function buildSheet() {
  if (document.getElementById("sg-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "sg-overlay";
  overlay.innerHTML = `
    <div id="sg-sheet">
      <div class="sg-sheet-handle"></div>
      <div class="sg-sheet-header">
        <div class="sg-sheet-icon" id="sg-s-icon"></div>
        <div class="sg-sheet-titles">
          <div class="sg-sheet-term" id="sg-s-term"></div>
          <div class="sg-sheet-fullname" id="sg-s-fullname"></div>
        </div>
        <button class="sg-sheet-close" id="sg-close">close</button>
      </div>
      <div class="sg-sheet-body">
        <div class="sg-sheet-def" id="sg-s-def"></div>
        <div class="sg-sheet-example">
          <span class="sg-eg-label">e.g.</span>
          <span class="sg-eg-text" id="sg-s-eg"></span>
        </div>
        <button class="sg-got-it" id="sg-got-it">Got it!</button>
      </div>
    </div>
  `;

  getScreen().appendChild(overlay);

  // Close handlers
  document.getElementById("sg-close").onclick = closeSheet;
  document.getElementById("sg-got-it").onclick = closeSheet;
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeSheet();
  });
}

function openSheet(entry) {
  const overlay = document.getElementById("sg-overlay");
  if (!overlay) return;

  const iconEl = document.getElementById("sg-s-icon");
  iconEl.textContent = entry.icon || "info";
  iconEl.style.background = entry.color || "#bf000f";

  document.getElementById("sg-s-term").textContent = entry.term;
  document.getElementById("sg-s-fullname").textContent = entry.fullName || "";
  document.getElementById("sg-s-def").textContent = entry.definition;
  document.getElementById("sg-s-eg").textContent = entry.example || "";

  // Show overlay first (needed for flex to be applied), then animate
  overlay.style.display = "flex";
  // Force reflow so transition fires
  void overlay.offsetHeight;
  overlay.classList.add("sg-open");
}

function closeSheet() {
  const overlay = document.getElementById("sg-overlay");
  if (!overlay) return;
  overlay.classList.remove("sg-open");
  setTimeout(() => {
    overlay.style.display = "none";
  }, 300);
}

// ─── Auto-wrap text nodes ─────────────────────────────────────────────────

function wrapTerms(root) {
  const keys = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  const escaped = keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      const tag = p.tagName.toUpperCase();
      if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(tag))
        return NodeFilter.FILTER_REJECT;
      // Don't re-wrap already-wrapped or inside the sheet
      if (p.closest(".sg-term, #sg-overlay"))
        return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  nodes.forEach((textNode) => {
    const text = textNode.nodeValue;
    re.lastIndex = 0;
    if (!re.test(text)) return;
    re.lastIndex = 0;

    const frag = document.createDocumentFragment();
    let last = 0;
    let m;

    while ((m = re.exec(text)) !== null) {
      if (m.index > last)
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));

      const key = m[0].toLowerCase();
      const entry = GLOSSARY[key];
      if (entry) {
        const span = document.createElement("span");
        span.className = "sg-term";
        span.dataset.sgKey = key;
        span.textContent = m[0];
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(m[0]));
      }
      last = m.index + m[0].length;
    }

    if (last < text.length)
      frag.appendChild(document.createTextNode(text.slice(last)));

    textNode.parentNode.replaceChild(frag, textNode);
  });
}

// ─── Event binding ────────────────────────────────────────────────────────

function bindEvents() {
  // Single delegated click on document
  document.addEventListener("click", (e) => {
    const term = e.target.closest(".sg-term");
    if (!term) return;
    e.stopPropagation();
    e.preventDefault();
    const key = term.dataset.sgKey;
    const entry = GLOSSARY[key];
    if (entry) openSheet(entry);
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────

function initGlossary() {
  injectStyles();
  buildSheet();
  wrapTerms(document.body);
  bindEvents();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlossary);
} else {
  initGlossary();
}
