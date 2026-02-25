// ===============================
// Data you will update frequently
// ===============================

const SKILLS = [
  "React", "Node.js", "Express", "MySQL", "Laravel", "PHP",
  "JavaScript", "HTML", "CSS",
  "JWT Auth", "Role-based access", "REST APIs",
  "Performance Optimization", "Database Query Optimization",
  "Nginx", "PM2", "SSL", "Git/GitHub",
  "Puppeteer (PDF)", "Nodemailer", "Rate Limiting"
];

const EXPERIENCE = [
    {
    role: "Web Development Intern",
    company: "iPOTS (Health Care Services)",
    location: "Toronto, Canada",
    dates: "Jun 2024 - Sep 2024",
    bullets: [
      "Built features in a web portal for disability support services with accessibility-focused design.",
      "Worked with cross-functional teams (product, development, security) in a remote environment.",
      "Used SQL to manage and query backend data; supported performance testing and uptime requirements.",
      "Maintained version control with GitHub for consistent deployments."
    ]
  },
  {
    role: "Senior Web Developer",
    company: "Airtel",
    location: "India",
    dates: "Aug 2022 - Aug 2023",
    bullets: [
      "Developed and optimized high-traffic web applications supporting telecom service platforms.",
      "Collaborated with cross-functional teams to design and deploy new features and improve existing systems.",
      "Improved application performance and reliability using code optimization and efficient database queries.",
      "Conducted code reviews and provided technical mentorship to junior developers.",
      "Produced technical documentation covering system architecture, APIs, and security procedures.",
      "Developed automated test scripts to improve release quality."
    ]
  },
  {
    role: "Web Development Specialist",
    company: "State Bank of India",
    location: "India",
    dates: "Jul 2021 - Aug 2022",
    bullets: [
      "Developed client-facing web applications for desktop and mobile browsers.",
      "Ensured performance and scalability of banking platforms for high traffic and seamless UX.",
      "Used libraries/frameworks to speed development and improve code quality.",
      "Collaborated with UX/UI designers to optimize web applications.",
      "Developed and maintained plugins for platform services.",
      "Diagnosed issues quickly as level 1 technical support and maintained documentation."
    ]
  }

];

const PROJECTS = [
  {
    title: "GarageFlow — Multi-Tenant Garage Management SaaS",
    description:
      "Production-ready SaaS for automotive service businesses: invoicing, customers, vehicles, analytics, authentication, PDF generation, and deployment.",
    tags: ["SaaS", "Multi-tenant", "React", "Node.js", "MySQL", "PDF", "Auth"],
    category: "SaaS",
    links: [
      { label: "Live", url: "https://garageflow.online" },
      // add GitHub link if public:
      // { label: "GitHub", url: "https://github.com/..." }
    ],
    highlights: [
      "Shop-based data isolation using JWT auth",
      "Invoice engine with status + tax + PDF generation",
      "Production deployment (Nginx, PM2, SSL, backups)"
    ]
  },
  {
    title: "Eagle Eye Auto Website (Laravel)",
    description:
      "Business website + partial CMS for a mechanic shop with secure admin features and MySQL relational structures.",
    tags: ["Laravel", "PHP", "MySQL", "AWS", "Auth"],
    category: "Laravel",
    links: [
      { label: "Github", url: "https://github.com/Lovepreet-G/Capstone-Eagle-Eye-Auto" }
    ],
    highlights: [
      "Role-based access for admin",
      "Optimized queries + MVC structure",
      "Deployed with scalable hosting"
    ]
  },
  {
    title: "Morning Perk Cafe",
    description:
      "Full-stack cafe site with MongoDB persistence and Spoonacular API integration, deployed for production.",
    tags: ["Node.js", "Express", "MongoDB", "API", "Deployment"],
    category: "Full-Stack",
    links: [
      { label: "Live", url: "https://morning-perk-cafe.onrender.com/" }
    ],
    highlights: [
      "Real-time data via Spoonacular API",
      "REST routes + dynamic rendering",
      "Production config + env variables"
    ]
  },
  {
    title: "Expense Calculator",
    description:
      "PHP-based web app for expense tracking with validation and responsive UI.",
    tags: ["PHP", "HTML", "CSS"],
    category: "PHP",
    links: [
      { label: "Live", url: "http://lovepreet-g.infinityfreeapp.com/HTTP5225/assignment2" }
    ],
    highlights: [
      "Input validation + clean UI",
      "Responsive layout",
      "Clear user flow"
    ]
  }
];

// ===================================
// UI rendering (no edits usually needed)
// ===================================

const $ = (sel) => document.querySelector(sel);

function renderSkills() {
  const wrap = $("#skillsChips");
  wrap.innerHTML = "";
  SKILLS.forEach((s) => {
    const el = document.createElement("span");
    el.className = "chip";
    el.textContent = s;
    wrap.appendChild(el);
  });
}

function renderExperience() {
  const wrap = $("#experienceTimeline");
  wrap.innerHTML = "";

  EXPERIENCE.forEach((x) => {
    const card = document.createElement("article");
    card.className = "timeline-item";

    card.innerHTML = `
      <div class="timeline-top">
        <p class="timeline-role">${escapeHtml(x.role)} — ${escapeHtml(x.company)}</p>
        <p class="timeline-meta">${escapeHtml(x.location)} • ${escapeHtml(x.dates)}</p>
      </div>
      <ul class="timeline-bullets">
        ${x.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
      </ul>
    `;

    wrap.appendChild(card);
  });
}

function getAllCategories() {
  const set = new Set(PROJECTS.map((p) => p.category || "Other"));
  return ["all", ...Array.from(set)];
}

function renderProjectFilter() {
  const sel = $("#projectFilter");
  const cats = getAllCategories();

  sel.innerHTML = cats
    .map((c) => `<option value="${escapeAttr(c)}">${c === "all" ? "All" : escapeHtml(c)}</option>`)
    .join("");
}

function projectMatches(project, q, category) {
  const text = (
    project.title + " " +
    project.description + " " +
    (project.tags || []).join(" ") + " " +
    (project.highlights || []).join(" ") + " " +
    (project.category || "")
  ).toLowerCase();

  const okQuery = !q || text.includes(q.toLowerCase());
  const okCat = category === "all" || (project.category || "Other") === category;
  return okQuery && okCat;
}

function renderProjects() {
  const grid = $("#projectsGrid");
  const q = $("#projectSearch").value.trim();
  const category = $("#projectFilter").value;

  const filtered = PROJECTS.filter((p) => projectMatches(p, q, category));

  grid.innerHTML = "";

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="project-card" style="grid-column: 1 / -1;">
        <div class="project-top">
          <h3 class="project-title">No projects found</h3>
          <p class="project-desc">Try a different search or filter.</p>
        </div>
      </div>
    `;
    return;
  }

  filtered.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const tags = (p.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const actions = (p.links || []).slice(0, 3).map((l) => {
      if (!l?.url) return "";
      const label = l.label || "Link";
      return `<a class="btn btn-outline" href="${escapeAttr(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
    }).join("");

    const highlights = (p.highlights || []).slice(0, 3);

    card.innerHTML = `
      <div class="project-top">
        <h3 class="project-title">${escapeHtml(p.title)}</h3>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-tags">${tags}</div>
        ${highlights.length ? `<ul class="timeline-bullets" style="margin-top: 12px;">
          ${highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
        </ul>` : ""}
      </div>
      <div class="project-actions">
        ${actions || `<span class="tag">Add links in main.js</span>`}
      </div>
    `;

    grid.appendChild(card);
  });
}

function setupNav() {
  const toggle = $(".nav-toggle");
  const linksWrap = $("#navLinks");
  const navLinks = document.querySelectorAll(".nav-link");

  toggle.addEventListener("click", () => {
    const isOpen = linksWrap.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((a) => {
    a.addEventListener("click", () => {
      linksWrap.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Active section highlighting
  const sections = ["about", "skills", "experience", "projects", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const byId = new Map(Array.from(navLinks).map((a) => [a.getAttribute("href")?.replace("#", ""), a]));

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((x) => x.classList.remove("active"));
        const link = byId.get(e.target.id);
        if (link) link.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
  );

  sections.forEach((s) => obs.observe(s));
}

function setupProgressBar() {
  const bar = document.querySelector(".scroll-progress");
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
  });
}

function setupCopyButtons() {
  const hint = document.getElementById("copyHint");

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add("copied");
        const old = btn.textContent;
        btn.textContent = "Copied ✓";

        if (hint) hint.textContent = "Copied to clipboard.";

        setTimeout(() => {
          btn.textContent = old;
          btn.classList.remove("copied");
          if (hint) hint.textContent = "Tip: use “Copy” to paste quickly in applications.";
        }, 1200);
      } catch (e) {
        // fallback: select via prompt
        window.prompt("Copy this:", text);
      }
    });
  });
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(str) {
  return escapeHtml(str).replaceAll("`", "&#096;");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();

  renderSkills();
  renderExperience();
  renderProjectFilter();
  renderProjects();

  $("#projectSearch").addEventListener("input", renderProjects);
  $("#projectFilter").addEventListener("change", renderProjects);

  setupNav();
  setupProgressBar();
  setupCopyButtons();
});