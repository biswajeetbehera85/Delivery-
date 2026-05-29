import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap');`;

// ── Palette ──────────────────────────────────────────────────────
const T = {
  bg:      "#080D14",
  panel:   "#0D1520",
  card:    "#111C2A",
  border:  "#1A2D42",
  fe:      "#00C9A7",   // frontend teal
  be:      "#FF6B35",   // backend orange
  db:      "#A78BFA",   // db purple
  info:    "#38BDF8",   // info blue
  warn:    "#FBBF24",   // yellow
  txt:     "#C8D8E8",
  muted:   "#4A6A85",
  white:   "#F0F8FF",
};

const gfe = `linear-gradient(135deg, ${T.fe}22, ${T.fe}08)`;
const gbe = `linear-gradient(135deg, ${T.be}22, ${T.be}08)`;

// ── Small primitives ─────────────────────────────────────────────
const Tag = ({ c = T.fe, children }) => (
  <span style={{ background: c + "22", color: c, border: `1px solid ${c}44`,
    borderRadius: 4, padding: "2px 8px", fontSize: 10, fontFamily: "'DM Mono', monospace",
    fontWeight: 500, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const Dot = ({ c }) => (
  <span style={{ display: "inline-block", width: 7, height: 7,
    borderRadius: "50%", background: c, flexShrink: 0, marginTop: 2 }} />
);

const Arrow = ({ dir = "down", c = T.muted }) => {
  const map = { down: "↓", right: "→", left: "←", up: "↑", both: "⇄" };
  return <span style={{ color: c, fontSize: 14, lineHeight: 1 }}>{map[dir]}</span>;
};

// ── Section header ────────────────────────────────────────────────
const SHead = ({ icon, title, sub, accent, side }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
    <div style={{ width: 42, height: 42, borderRadius: 10, background: accent + "22",
      border: `1px solid ${accent}44`, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
      {icon}
    </div>
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22,
          letterSpacing: "0.06em", color: T.white }}>{title}</span>
        <Tag c={accent}>{side}</Tag>
      </div>
      <div style={{ color: T.muted, fontSize: 11, fontFamily: "'Outfit', sans-serif", marginTop: 1 }}>{sub}</div>
    </div>
  </div>
);

// ── Layer block ───────────────────────────────────────────────────
const Layer = ({ label, items, accent, icon, expand = false }) => {
  const [open, setOpen] = useState(expand);
  return (
    <div style={{ border: `1px solid ${accent}33`, borderRadius: 10, overflow: "hidden",
      marginBottom: 8, background: T.card, transition: "all 0.2s" }}>
      <div onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
          cursor: "pointer", background: accent + "12", userSelect: "none" }}>
        <span style={{ fontSize: 15 }}>{icon}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12,
          color: accent, fontWeight: 500, flex: 1, letterSpacing: "0.04em" }}>{label}</span>
        <span style={{ color: T.muted, fontSize: 12, transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.2s" }}>▾</span>
      </div>
      {open && (
        <div style={{ padding: "10px 14px 12px", display: "flex", flexWrap: "wrap", gap: 7 }}>
          {items.map((item, i) => (
            <div key={i} style={{ background: T.panel, border: `1px solid ${T.border}`,
              borderRadius: 7, padding: "6px 12px", fontSize: 11,
              fontFamily: "'Outfit', sans-serif", color: T.txt, display: "flex",
              alignItems: "center", gap: 7 }}>
              <Dot c={accent} />
              <span>{item.name}</span>
              {item.tag && <Tag c={item.tc || T.info}>{item.tag}</Tag>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Flow arrow connector ──────────────────────────────────────────
const FlowArrow = ({ label, c = T.muted }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
    margin: "4px 0", gap: 2 }}>
    <div style={{ width: 1, height: 16, background: c + "66" }} />
    <span style={{ fontSize: 10, color: c, fontFamily: "'DM Mono', monospace",
      background: T.bg, padding: "1px 6px", borderRadius: 3, border: `1px solid ${c}33` }}>
      {label}
    </span>
    <div style={{ width: 1, height: 16, background: c + "66" }} />
    <span style={{ color: c, fontSize: 12 }}>▼</span>
  </div>
);

// ── Mini flow step ────────────────────────────────────────────────
const Step = ({ icon, label, c, sub }) => (
  <div style={{ background: c + "15", border: `1px solid ${c}44`, borderRadius: 8,
    padding: "8px 12px", textAlign: "center", minWidth: 90, flex: 1 }}>
    <div style={{ fontSize: 18, marginBottom: 3 }}>{icon}</div>
    <div style={{ color: c, fontSize: 11, fontWeight: 600,
      fontFamily: "'DM Mono', monospace" }}>{label}</div>
    {sub && <div style={{ color: T.muted, fontSize: 9, marginTop: 2,
      fontFamily: "'Outfit', sans-serif" }}>{sub}</div>}
  </div>
);

// ── API endpoint row ──────────────────────────────────────────────
const Endpoint = ({ method, path, desc }) => {
  const mc = { GET: T.info, POST: T.fe, PATCH: T.warn, DELETE: "#F87171" };
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "5px 0",
      borderBottom: `1px solid ${T.border}` }}>
      <span style={{ background: (mc[method] || T.muted) + "20", color: mc[method] || T.muted,
        border: `1px solid ${mc[method] || T.muted}55`, borderRadius: 3,
        padding: "1px 6px", fontSize: 9, fontFamily: "'DM Mono', monospace",
        minWidth: 44, textAlign: "center", fontWeight: 600 }}>{method}</span>
      <span style={{ color: T.fe, fontFamily: "'DM Mono', monospace",
        fontSize: 10, flex: 1 }}>{path}</span>
      <span style={{ color: T.muted, fontSize: 10,
        fontFamily: "'Outfit', sans-serif" }}>{desc}</span>
    </div>
  );
};

// ── Socket event row ──────────────────────────────────────────────
const SocketEv = ({ event, dir, desc }) => (
  <div style={{ display: "flex", gap: 8, alignItems: "flex-start",
    padding: "5px 0", borderBottom: `1px solid ${T.border}` }}>
    <span style={{ color: T.warn, fontFamily: "'DM Mono', monospace",
      fontSize: 10, minWidth: 28 }}>
      {dir === "emit" ? "📤" : "📥"}
    </span>
    <span style={{ color: T.warn, fontFamily: "'DM Mono', monospace",
      fontSize: 10, flex: 1 }}>{event}</span>
    <span style={{ color: T.muted, fontSize: 10,
      fontFamily: "'Outfit', sans-serif" }}>{desc}</span>
  </div>
);

// ── Card container ────────────────────────────────────────────────
const Panel = ({ children, style = {} }) => (
  <div style={{ background: T.panel, border: `1px solid ${T.border}`,
    borderRadius: 12, padding: 18, marginBottom: 14, ...style }}>
    {children}
  </div>
);

const PLabel = ({ c, children }) => (
  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10,
    color: c, letterSpacing: "0.1em", marginBottom: 10,
    textTransform: "uppercase", opacity: 0.9 }}>{children}</div>
);

// ════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("both");

  const tabs = [
    { id: "both",     label: "Full Architecture" },
    { id: "frontend", label: "Frontend Only" },
    { id: "backend",  label: "Backend Only" },
    { id: "flow",     label: "Data Flow" },
  ];

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
      <style>{FONTS}</style>

      {/* ── Header ── */}
      <div style={{ padding: "28px 32px 20px", borderBottom: `1px solid ${T.border}`,
        background: T.panel, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 30,
              letterSpacing: "0.1em", color: T.white, lineHeight: 1 }}>
              RAVIDELIVER
            </div>
            <div style={{ color: T.muted, fontSize: 11, fontFamily: "'DM Mono', monospace",
              marginTop: 2 }}>system architecture · frontend + backend</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: tab === t.id
                  ? (t.id === "frontend" ? T.fe : t.id === "backend" ? T.be : T.info) + "22"
                  : "transparent",
                border: `1px solid ${tab === t.id
                  ? (t.id === "frontend" ? T.fe : t.id === "backend" ? T.be : T.info)
                  : T.border}`,
                color: tab === t.id
                  ? (t.id === "frontend" ? T.fe : t.id === "backend" ? T.be : T.info)
                  : T.muted,
                borderRadius: 7, padding: "6px 14px", fontSize: 12,
                fontFamily: "'Outfit', sans-serif", fontWeight: 600, cursor: "pointer"
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "24px 32px", maxWidth: 1280, margin: "0 auto" }}>

        {/* ════ BOTH / FULL ARCHITECTURE ════ */}
        {(tab === "both") && (
          <div>
            {/* Top overview strip */}
            <Panel style={{ marginBottom: 20 }}>
              <PLabel c={T.info}>SYSTEM OVERVIEW</PLabel>
              <div style={{ display: "flex", gap: 8, alignItems: "center",
                flexWrap: "wrap" }}>
                {[
                  { icon: "📱", label: "React Native App", sub: "Customer + Agent", c: T.fe },
                  { icon: "🌐", label: "React Web", sub: "Farmer + Admin", c: T.fe },
                ].map((n, i) => <Step key={i} {...n} />)}
                <Arrow dir="right" c={T.info} />
                <Step icon="🔒" label="API Gateway" sub="JWT + Rate Limit" c={T.info} />
                <Arrow dir="right" c={T.info} />
                {[
                  { icon: "📦", label: "order-service", sub: ":3002", c: T.be },
                  { icon: "🚴", label: "delivery-service", sub: ":3003", c: T.be },
                  { icon: "🔔", label: "notification-svc", sub: ":3004", c: T.be },
                ].map((n, i) => <Step key={i} {...n} />)}
                <Arrow dir="right" c={T.db} />
                {[
                  { icon: "🗄️", label: "PostgreSQL", sub: "Primary DB", c: T.db },
                  { icon: "⚡", label: "Redis", sub: "Cache + Queue", c: T.db },
                ].map((n, i) => <Step key={i} {...n} />)}
              </div>
            </Panel>

            {/* Two columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

              {/* LEFT: Frontend */}
              <div>
                <SHead icon="📱" title="Frontend Architecture"
                  sub="React Native Mobile + React Web Portals"
                  accent={T.fe} side="CLIENT SIDE" />

                {/* App types */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {[
                    { title: "Mobile App", sub: "React Native + Expo", icon: "📱", c: T.fe,
                      users: ["Customer", "Delivery Agent"] },
                    { title: "Web Portals", sub: "React.js v18", icon: "🌐", c: T.info,
                      users: ["Farmer Portal", "Admin Dashboard"] },
                  ].map(a => (
                    <div key={a.title} style={{ background: a.c + "0F",
                      border: `1px solid ${a.c}33`, borderRadius: 10, padding: 12 }}>
                      <div style={{ fontSize: 22, marginBottom: 6 }}>{a.icon}</div>
                      <div style={{ color: a.c, fontFamily: "'DM Mono', monospace",
                        fontSize: 11, fontWeight: 600 }}>{a.title}</div>
                      <div style={{ color: T.muted, fontSize: 10, marginBottom: 8 }}>{a.sub}</div>
                      {a.users.map(u => (
                        <div key={u} style={{ color: T.txt, fontSize: 10, display: "flex",
                          gap: 5, alignItems: "center", marginBottom: 3 }}>
                          <Dot c={a.c} />{u}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Layers */}
                {[
                  {
                    label: "SCREENS / VIEWS", icon: "🖼️", accent: T.fe, expand: true,
                    items: [
                      { name: "HomeScreen", tag: "Customer" },
                      { name: "CartScreen", tag: "Customer" },
                      { name: "TrackingScreen", tag: "Customer" },
                      { name: "FarmerDashboard", tag: "Farmer", tc: "#4ADE80" },
                      { name: "OrderQueueScreen", tag: "Farmer", tc: "#4ADE80" },
                      { name: "AgentMapScreen", tag: "Agent", tc: T.be },
                      { name: "AdminDashboard", tag: "Admin", tc: T.db },
                    ]
                  },
                  {
                    label: "STATE MANAGEMENT (Redux Toolkit)", icon: "🧠", accent: T.info,
                    items: [
                      { name: "authSlice", tag: "user, token, role" },
                      { name: "cartSlice", tag: "items[], total" },
                      { name: "orderSlice", tag: "orders[], status" },
                      { name: "trackingSlice", tag: "lat, lng, ETA" },
                      { name: "RTK Query", tag: "API caching", tc: T.fe },
                    ]
                  },
                  {
                    label: "NAVIGATION (React Navigation v6)", icon: "🗺️", accent: T.warn,
                    items: [
                      { name: "AuthStack" },
                      { name: "CustomerTabNav" },
                      { name: "FarmerDrawerNav" },
                      { name: "AgentStackNav" },
                      { name: "AdminWebRouter" },
                    ]
                  },
                  {
                    label: "SERVICES / API LAYER", icon: "🔌", accent: T.fe,
                    items: [
                      { name: "api.js", tag: "Axios + interceptors" },
                      { name: "socket.js", tag: "Socket.io client" },
                      { name: "location.js", tag: "GPS + Geofence" },
                      { name: "push.js", tag: "FCM handler" },
                      { name: "storage.js", tag: "AsyncStorage" },
                    ]
                  },
                  {
                    label: "SHARED COMPONENTS", icon: "🧩", accent: T.muted,
                    items: [
                      { name: "Button" }, { name: "Card" }, { name: "MapView" },
                      { name: "OrderCard" }, { name: "Badge" }, { name: "Loader" },
                      { name: "ProductTile" }, { name: "RatingStars" },
                    ]
                  },
                ].map(l => <Layer key={l.label} {...l} />)}
              </div>

              {/* RIGHT: Backend */}
              <div>
                <SHead icon="🖥️" title="Backend Architecture"
                  sub="Node.js Microservices + WebSocket + Queue"
                  accent={T.be} side="SERVER SIDE" />

                {/* Services grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {[
                    { port: ":3001", name: "auth-service",         icon: "🔑", c: T.info },
                    { port: ":3002", name: "order-service",        icon: "📦", c: T.be },
                    { port: ":3003", name: "delivery-service",     icon: "🚴", c: "#4ADE80" },
                    { port: ":3004", name: "notification-service", icon: "🔔", c: T.warn },
                  ].map(svc => (
                    <div key={svc.port} style={{ background: svc.c + "0F",
                      border: `1px solid ${svc.c}33`, borderRadius: 10, padding: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 18 }}>{svc.icon}</span>
                        <Tag c={svc.c}>{svc.port}</Tag>
                      </div>
                      <div style={{ color: svc.c, fontFamily: "'DM Mono', monospace",
                        fontSize: 10, fontWeight: 600 }}>{svc.name}</div>
                    </div>
                  ))}
                </div>

                {[
                  {
                    label: "API GATEWAY MIDDLEWARE", icon: "🔒", accent: T.info, expand: true,
                    items: [
                      { name: "authGuard.js", tag: "JWT verify" },
                      { name: "roleCheck.js", tag: "RBAC" },
                      { name: "rateLimiter.js", tag: "100 req/min" },
                      { name: "cors.js", tag: "origins" },
                      { name: "errorHandler.js", tag: "global" },
                    ]
                  },
                  {
                    label: "CONTROLLERS & ROUTES", icon: "📡", accent: T.be,
                    items: [
                      { name: "auth.routes.js" }, { name: "order.routes.js" },
                      { name: "delivery.routes.js" }, { name: "product.routes.js" },
                      { name: "admin.routes.js" }, { name: "payment.routes.js" },
                    ]
                  },
                  {
                    label: "BUSINESS LOGIC SERVICES", icon: "🧠", accent: T.be,
                    items: [
                      { name: "OrderRouter.js", tag: "City + farmer match", tc: T.be },
                      { name: "FarmerMatcher.js", tag: "Availability check", tc: "#4ADE80" },
                      { name: "ZoneManager.js", tag: "City zones", tc: T.info },
                      { name: "PricingEngine.js", tag: "Dynamic price" },
                      { name: "GeoService.js", tag: "Google Maps API", tc: T.warn },
                    ]
                  },
                  {
                    label: "REAL-TIME (Socket.io)", icon: "⚡", accent: T.warn,
                    items: [
                      { name: "orderEvents.js", tag: "order:new, status" },
                      { name: "trackingEvents.js", tag: "agent:location" },
                      { name: "notifyEvents.js", tag: "push trigger" },
                      { name: "roomManager.js", tag: "city rooms" },
                    ]
                  },
                  {
                    label: "QUEUE WORKERS (Bull + Redis)", icon: "⚙️", accent: T.db,
                    items: [
                      { name: "orderQueue.js", tag: "order routing jobs" },
                      { name: "assignWorker.js", tag: "agent assignment" },
                      { name: "notifyWorker.js", tag: "push / SMS / email" },
                      { name: "retryWorker.js", tag: "failed jobs" },
                    ]
                  },
                  {
                    label: "DATA ACCESS (Prisma ORM)", icon: "🗄️", accent: T.db,
                    items: [
                      { name: "userRepo.js" }, { name: "orderRepo.js" },
                      { name: "productRepo.js" }, { name: "deliveryRepo.js" },
                      { name: "paymentRepo.js" }, { name: "ratingRepo.js" },
                    ]
                  },
                ].map(l => <Layer key={l.label} {...l} />)}
              </div>
            </div>
          </div>
        )}

        {/* ════ FRONTEND ONLY ════ */}
        {tab === "frontend" && (
          <div>
            <SHead icon="📱" title="Frontend Architecture — Deep Dive"
              sub="React Native Mobile App + React.js Web Portals"
              accent={T.fe} side="CLIENT SIDE" />

            {/* Folder structure */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Panel>
                <PLabel c={T.fe}>📱 MOBILE APP FOLDER STRUCTURE</PLabel>
                {[
                  { indent: 0, text: "src/",            c: T.info },
                  { indent: 1, text: "screens/",        c: T.fe },
                  { indent: 2, text: "customer/",       c: T.txt },
                  { indent: 3, text: "HomeScreen.jsx",  c: T.muted },
                  { indent: 3, text: "CartScreen.jsx",  c: T.muted },
                  { indent: 3, text: "TrackingScreen.jsx", c: T.muted },
                  { indent: 2, text: "farmer/",         c: T.txt },
                  { indent: 3, text: "Dashboard.jsx",   c: T.muted },
                  { indent: 3, text: "OrderQueue.jsx",  c: T.muted },
                  { indent: 2, text: "agent/",          c: T.txt },
                  { indent: 3, text: "AgentMap.jsx",    c: T.muted },
                  { indent: 3, text: "DeliveryTask.jsx",c: T.muted },
                  { indent: 2, text: "auth/",           c: T.txt },
                  { indent: 3, text: "Login.jsx",       c: T.muted },
                  { indent: 3, text: "OTPScreen.jsx",   c: T.muted },
                  { indent: 1, text: "components/",     c: T.fe },
                  { indent: 2, text: "common/  →  Button, Card, Badge", c: T.muted },
                  { indent: 2, text: "map/     →  DeliveryMap, Pin",   c: T.muted },
                  { indent: 1, text: "store/",          c: T.fe },
                  { indent: 2, text: "authSlice.js",    c: T.muted },
                  { indent: 2, text: "cartSlice.js",    c: T.muted },
                  { indent: 2, text: "orderSlice.js",   c: T.muted },
                  { indent: 2, text: "trackingSlice.js",c: T.muted },
                  { indent: 1, text: "services/",       c: T.fe },
                  { indent: 2, text: "api.js  socket.js  geo.js", c: T.muted },
                  { indent: 1, text: "hooks/",          c: T.fe },
                  { indent: 2, text: "useOrders  useTracking  useAuth", c: T.muted },
                  { indent: 1, text: "navigation/",     c: T.fe },
                  { indent: 2, text: "AppNavigator.js", c: T.muted },
                ].map((l, i) => (
                  <div key={i} style={{ paddingLeft: l.indent * 14,
                    fontFamily: "'DM Mono', monospace", fontSize: 10.5,
                    color: l.c, lineHeight: 1.9 }}>{l.text}</div>
                ))}
              </Panel>

              <div>
                {/* Role screens */}
                <Panel>
                  <PLabel c={T.fe}>SCREENS BY ROLE</PLabel>
                  {[
                    { role: "Customer", c: T.info, screens: ["🏠 Home / Browse", "🔍 Search Products", "🛒 Cart & Checkout", "💳 Payment", "📦 Order Status", "📍 Live Tracking", "⭐ Rate & Review"] },
                    { role: "Farmer", c: "#4ADE80", screens: ["📊 Dashboard", "📋 Incoming Orders", "✅ Accept / Reject", "📦 Prepare Order", "📷 Product Upload", "📈 Sales Analytics"] },
                    { role: "Delivery Agent", c: T.be, screens: ["🗺️ Active Map", "📥 New Assignment", "✅ Pickup Confirm", "🚴 En Route View", "🏁 Delivery Done", "📜 History"] },
                    { role: "Admin", c: T.db, screens: ["🌆 City Overview", "👥 User Manage", "📊 Revenue Charts", "⚠️ Complaints", "🔧 Settings"] },
                  ].map(r => (
                    <div key={r.role} style={{ marginBottom: 10 }}>
                      <div style={{ color: r.c, fontFamily: "'DM Mono', monospace",
                        fontSize: 10, marginBottom: 5 }}>▸ {r.role}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {r.screens.map(sc => (
                          <span key={sc} style={{ background: r.c + "15",
                            border: `1px solid ${r.c}33`, color: T.txt,
                            borderRadius: 5, padding: "3px 8px", fontSize: 10,
                            fontFamily: "'Outfit', sans-serif" }}>{sc}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </Panel>

                {/* Redux slices */}
                <Panel>
                  <PLabel c={T.info}>REDUX STATE SLICES</PLabel>
                  {[
                    { slice: "authSlice",     fields: "user, token, role, isLoggedIn",    c: T.info },
                    { slice: "cartSlice",     fields: "items[], total, cityId",            c: T.fe },
                    { slice: "orderSlice",    fields: "current, history[], status",        c: T.be },
                    { slice: "trackingSlice", fields: "agentLat, agentLng, eta, orderId",  c: T.warn },
                  ].map(s => (
                    <div key={s.slice} style={{ display: "flex", gap: 10,
                      alignItems: "center", marginBottom: 6, padding: "5px 8px",
                      background: s.c + "0C", borderRadius: 6,
                      border: `1px solid ${s.c}22` }}>
                      <span style={{ color: s.c, fontFamily: "'DM Mono', monospace",
                        fontSize: 10, fontWeight: 600, minWidth: 110 }}>{s.slice}</span>
                      <span style={{ color: T.muted, fontFamily: "'DM Mono', monospace",
                        fontSize: 9 }}>{s.fields}</span>
                    </div>
                  ))}
                </Panel>
              </div>
            </div>

            {/* Component + tech detail */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              <Panel>
                <PLabel c={T.fe}>CORE DEPENDENCIES</PLabel>
                {[
                  { lib: "React Native", ver: "Expo SDK 51", c: T.fe },
                  { lib: "Redux Toolkit", ver: "RTK Query", c: T.info },
                  { lib: "React Navigation", ver: "v6 Stack/Tab", c: T.warn },
                  { lib: "Socket.io-client", ver: "v4", c: T.be },
                  { lib: "Axios", ver: "HTTP client", c: T.fe },
                  { lib: "React Query", ver: "Web portals", c: T.db },
                  { lib: "Google Maps SDK", ver: "Tracking map", c: "#4ADE80" },
                  { lib: "Firebase", ver: "Push notif.", c: T.warn },
                ].map(d => (
                  <div key={d.lib} style={{ display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "4px 0",
                    borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ color: T.txt, fontSize: 11 }}>{d.lib}</span>
                    <Tag c={d.c}>{d.ver}</Tag>
                  </div>
                ))}
              </Panel>

              <Panel>
                <PLabel c={T.info}>NAVIGATION STRUCTURE</PLabel>
                {[
                  { name: "RootNavigator", type: "Switch", sub: "Auth vs App", c: T.info },
                  { name: "AuthStack", type: "Stack", sub: "Login, OTP, Register", c: T.muted },
                  { name: "CustomerTabNav", type: "Bottom Tab", sub: "Home, Cart, Orders, Profile", c: T.fe },
                  { name: "FarmerDrawerNav", type: "Drawer", sub: "Dashboard, Queue, Inventory", c: "#4ADE80" },
                  { name: "AgentStackNav", type: "Stack", sub: "Map, Task, History", c: T.be },
                  { name: "AdminWebRouter", type: "React Router", sub: "Dashboard, Users, Cities", c: T.db },
                ].map(n => (
                  <div key={n.name} style={{ marginBottom: 8, padding: "6px 8px",
                    background: n.c + "0C", borderRadius: 6, border: `1px solid ${n.c}22` }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: n.c, fontFamily: "'DM Mono', monospace",
                        fontSize: 10 }}>{n.name}</span>
                      <Tag c={n.c}>{n.type}</Tag>
                    </div>
                    <div style={{ color: T.muted, fontSize: 10, marginTop: 2 }}>{n.sub}</div>
                  </div>
                ))}
              </Panel>

              <Panel>
                <PLabel c={T.warn}>REAL-TIME (CLIENT SIDE)</PLabel>
                <div style={{ color: T.muted, fontSize: 10, marginBottom: 10,
                  fontFamily: "'DM Mono', monospace" }}>Socket.io events consumed</div>
                {[
                  { ev: "order:confirmed",      desc: "Show toast to customer" },
                  { ev: "order:status_update",  desc: "Update order progress bar" },
                  { ev: "agent:location",       desc: "Move pin on tracking map" },
                  { ev: "delivery:eta_update",  desc: "Refresh ETA countdown" },
                  { ev: "order:new",            desc: "Alert farmer (vibrate)" },
                  { ev: "agent:assigned",       desc: "Notify agent of new task" },
                ].map(e => (
                  <div key={e.ev} style={{ padding: "4px 0",
                    borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ color: T.warn, fontFamily: "'DM Mono', monospace",
                      fontSize: 9 }}>{e.ev}</span>
                    <div style={{ color: T.muted, fontSize: 9 }}>{e.desc}</div>
                  </div>
                ))}
              </Panel>
            </div>
          </div>
        )}

        {/* ════ BACKEND ONLY ════ */}
        {tab === "backend" && (
          <div>
            <SHead icon="🖥️" title="Backend Architecture — Deep Dive"
              sub="Node.js + Express · Microservices · Socket.io · Bull Queue"
              accent={T.be} side="SERVER SIDE" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Panel>
                <PLabel c={T.be}>📁 SERVER FOLDER STRUCTURE</PLabel>
                {[
                  { indent: 0, text: "server/",              c: T.info },
                  { indent: 1, text: "src/",                 c: T.be },
                  { indent: 2, text: "routes/",              c: T.txt },
                  { indent: 3, text: "auth.routes.js",       c: T.muted },
                  { indent: 3, text: "order.routes.js",      c: T.muted },
                  { indent: 3, text: "delivery.routes.js",   c: T.muted },
                  { indent: 3, text: "product.routes.js",    c: T.muted },
                  { indent: 3, text: "admin.routes.js",      c: T.muted },
                  { indent: 2, text: "controllers/",         c: T.txt },
                  { indent: 3, text: "order.controller.js",  c: T.muted },
                  { indent: 3, text: "delivery.controller.js", c: T.muted },
                  { indent: 2, text: "services/",            c: T.txt },
                  { indent: 3, text: "OrderRouter.js",       c: T.be },
                  { indent: 3, text: "FarmerMatcher.js",     c: T.be },
                  { indent: 3, text: "GeoService.js",        c: T.be },
                  { indent: 3, text: "PricingEngine.js",     c: T.be },
                  { indent: 2, text: "middleware/",          c: T.txt },
                  { indent: 3, text: "authGuard.js",         c: T.muted },
                  { indent: 3, text: "roleCheck.js",         c: T.muted },
                  { indent: 3, text: "rateLimiter.js",       c: T.muted },
                  { indent: 2, text: "sockets/",             c: T.txt },
                  { indent: 3, text: "orderEvents.js",       c: T.warn },
                  { indent: 3, text: "trackingEvents.js",    c: T.warn },
                  { indent: 2, text: "queues/",              c: T.txt },
                  { indent: 3, text: "orderQueue.js",        c: T.db },
                  { indent: 3, text: "assignWorker.js",      c: T.db },
                  { indent: 3, text: "notifyWorker.js",      c: T.db },
                  { indent: 2, text: "models/",              c: T.txt },
                  { indent: 3, text: "schema.prisma",        c: T.muted },
                  { indent: 2, text: "utils/",               c: T.txt },
                  { indent: 3, text: "geocoding.js  jwt.js  helpers.js", c: T.muted },
                  { indent: 1, text: "app.js   →  Express init",  c: T.txt },
                  { indent: 1, text: "server.js →  HTTP + Socket", c: T.txt },
                ].map((l, i) => (
                  <div key={i} style={{ paddingLeft: l.indent * 14,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10.5, color: l.c, lineHeight: 1.9 }}>{l.text}</div>
                ))}
              </Panel>

              <div>
                {/* REST API Endpoints */}
                <Panel>
                  <PLabel c={T.be}>REST API ENDPOINTS</PLabel>
                  {[
                    { method: "POST",  path: "/api/auth/register",       desc: "Create user account" },
                    { method: "POST",  path: "/api/auth/login",          desc: "JWT + refresh token" },
                    { method: "POST",  path: "/api/orders",              desc: "Create + route order" },
                    { method: "GET",   path: "/api/orders/:id",          desc: "Order details" },
                    { method: "PATCH", path: "/api/orders/:id/status",   desc: "Update order status" },
                    { method: "GET",   path: "/api/tracking/:orderId",   desc: "Live agent location" },
                    { method: "POST",  path: "/api/delivery/assign",     desc: "Assign nearest agent" },
                    { method: "PATCH", path: "/api/delivery/location",   desc: "Agent GPS broadcast" },
                    { method: "GET",   path: "/api/products?city=X",     desc: "Products by city" },
                    { method: "POST",  path: "/api/payments/initiate",   desc: "Start payment" },
                    { method: "GET",   path: "/api/admin/dashboard",     desc: "Analytics overview" },
                    { method: "GET",   path: "/api/admin/cities",        desc: "All city zones" },
                  ].map((ep, i) => <Endpoint key={i} {...ep} />)}
                </Panel>

                {/* Socket events */}
                <Panel style={{ marginTop: 14 }}>
                  <PLabel c={T.warn}>WEBSOCKET EVENTS (Socket.io)</PLabel>
                  {[
                    { event: "order:new",           dir: "emit",   desc: "Server → Farmer room" },
                    { event: "order:status_update", dir: "emit",   desc: "Server → Customer" },
                    { event: "agent:location_update",dir: "recv",  desc: "Agent → Server (GPS)" },
                    { event: "tracking:broadcast",  dir: "emit",   desc: "Server → Customer" },
                    { event: "delivery:assigned",   dir: "emit",   desc: "Server → Agent" },
                    { event: "payment:confirmed",   dir: "emit",   desc: "Server → All parties" },
                  ].map((ev, i) => <SocketEv key={i} {...ev} />)}
                </Panel>
              </div>
            </div>

            {/* Bottom row: middleware, queue, services */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              <Panel>
                <PLabel c={T.info}>MIDDLEWARE STACK</PLabel>
                {[
                  { name: "cors()",            desc: "Allow client origins",      c: T.info },
                  { name: "helmet()",          desc: "Security headers",          c: T.info },
                  { name: "express.json()",    desc: "Body parser",               c: T.muted },
                  { name: "rateLimit()",       desc: "100 req/min per IP",        c: T.warn },
                  { name: "authGuard()",       desc: "JWT verification",          c: T.be },
                  { name: "roleCheck(roles)",  desc: "RBAC enforcement",          c: T.be },
                  { name: "errorHandler()",    desc: "Global error catcher",      c: "#F87171" },
                  { name: "morgan()",          desc: "HTTP request logging",      c: T.muted },
                ].map(m => (
                  <div key={m.name} style={{ display: "flex", gap: 8, alignItems: "flex-start",
                    padding: "5px 0", borderBottom: `1px solid ${T.border}` }}>
                    <Dot c={m.c} />
                    <div>
                      <span style={{ color: m.c, fontFamily: "'DM Mono', monospace",
                        fontSize: 10 }}>{m.name}</span>
                      <div style={{ color: T.muted, fontSize: 9 }}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </Panel>

              <Panel>
                <PLabel c={T.db}>QUEUE WORKERS (Bull + Redis)</PLabel>
                {[
                  { name: "orderQueue",   job: "routeOrder", desc: "Match order to city farmer", c: T.be },
                  { name: "assignQueue",  job: "assignAgent", desc: "Find nearest active agent", c: "#4ADE80" },
                  { name: "notifyQueue",  job: "sendPush",    desc: "FCM push notifications",     c: T.warn },
                  { name: "smsQueue",     job: "sendSMS",     desc: "Fallback SMS via Twilio",    c: T.warn },
                  { name: "emailQueue",   job: "sendEmail",   desc: "Order receipts & updates",  c: T.info },
                  { name: "retryQueue",   job: "retryFailed", desc: "3 retries with backoff",    c: "#F87171" },
                ].map(q => (
                  <div key={q.name} style={{ marginBottom: 8, padding: "6px 8px",
                    background: q.c + "0C", borderRadius: 6, border: `1px solid ${q.c}22` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                      <span style={{ color: q.c, fontFamily: "'DM Mono', monospace",
                        fontSize: 10 }}>{q.name}</span>
                      <Tag c={q.c}>{q.job}</Tag>
                    </div>
                    <div style={{ color: T.muted, fontSize: 9 }}>{q.desc}</div>
                  </div>
                ))}
              </Panel>

              <Panel>
                <PLabel c={T.be}>BUSINESS LOGIC SERVICES</PLabel>
                {[
                  { name: "OrderRouter",    desc: "Receives new order → queries city → finds available farmer with stock → assigns", c: T.be },
                  { name: "FarmerMatcher",  desc: "Checks farmer availability, stock qty, and city zone match in real time", c: "#4ADE80" },
                  { name: "ZoneManager",    desc: "Manages city delivery zones, geofencing, and zone-to-agent mapping", c: T.info },
                  { name: "GeoService",     desc: "Geocodes addresses via Google Maps, calculates distance and ETA", c: T.warn },
                  { name: "PricingEngine",  desc: "Dynamic pricing based on demand, distance, and product category", c: T.db },
                ].map(sv => (
                  <div key={sv.name} style={{ marginBottom: 9, padding: "7px 8px",
                    background: sv.c + "0C", borderRadius: 6, border: `1px solid ${sv.c}22` }}>
                    <div style={{ color: sv.c, fontFamily: "'DM Mono', monospace",
                      fontSize: 11, fontWeight: 600, marginBottom: 4 }}>{sv.name}.js</div>
                    <div style={{ color: T.muted, fontSize: 10, lineHeight: 1.5 }}>{sv.desc}</div>
                  </div>
                ))}
              </Panel>
            </div>
          </div>
        )}

        {/* ════ DATA FLOW ════ */}
        {tab === "flow" && (
          <div>
            <SHead icon="🔀" title="End-to-End Data Flow"
              sub="How data moves from customer tap to farmer to delivery to doorstep"
              accent={T.info} side="REQUEST LIFECYCLE" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

              {/* Left: Order placement flow */}
              <Panel>
                <PLabel c={T.fe}>ORDER PLACEMENT FLOW</PLabel>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                  {[
                    { icon: "👤", label: "Customer taps Checkout", c: T.fe, side: "React Native" },
                    null,
                    { icon: "🛒", label: "cartSlice → POST /api/orders", c: T.info, side: "Redux + Axios" },
                    null,
                    { icon: "🔒", label: "API Gateway validates JWT", c: T.warn, side: "authGuard.js" },
                    null,
                    { icon: "📦", label: "order.controller creates Order", c: T.be, side: "order-service" },
                    null,
                    { icon: "⚙️", label: "orderQueue.add(routeOrder)", c: T.db, side: "Bull Queue" },
                    null,
                    { icon: "🧠", label: "OrderRouter finds city farmer", c: T.be, side: "Business Logic" },
                    null,
                    { icon: "🌾", label: "Farmer notified via Socket.io", c: "#4ADE80", side: "orderEvents.js" },
                    null,
                    { icon: "📱", label: "Farmer app shows new order alert", c: T.fe, side: "React Native" },
                  ].map((step, i) => {
                    if (step === null) return (
                      <div key={i} style={{ width: 1, height: 22, background: T.border }} />
                    );
                    return (
                      <div key={i} style={{ background: step.c + "12",
                        border: `1px solid ${step.c}44`, borderRadius: 8,
                        padding: "8px 16px", width: "100%",
                        display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 18 }}>{step.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: T.white, fontSize: 11, fontWeight: 600,
                            fontFamily: "'Outfit', sans-serif" }}>{step.label}</div>
                          <div style={{ color: step.c, fontFamily: "'DM Mono', monospace",
                            fontSize: 9, marginTop: 1 }}>{step.side}</div>
                        </div>
                        <Arrow dir="down" c={step.c} />
                      </div>
                    );
                  })}
                </div>
              </Panel>

              {/* Right: Delivery flow + auth flow */}
              <div>
                <Panel>
                  <PLabel c={T.be}>DELIVERY ASSIGNMENT FLOW</PLabel>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                    {[
                      { icon: "✅", label: "Farmer accepts order", c: "#4ADE80", side: "PATCH /orders/:id/status" },
                      null,
                      { icon: "🔍", label: "assignQueue → find nearest agent", c: T.db, side: "assignWorker.js" },
                      null,
                      { icon: "📍", label: "GeoService computes distance", c: T.warn, side: "Google Maps API" },
                      null,
                      { icon: "🚴", label: "Agent assigned + notified", c: T.be, side: "delivery:assigned event" },
                      null,
                      { icon: "📡", label: "Agent broadcasts GPS every 5s", c: T.info, side: "agent:location_update" },
                      null,
                      { icon: "🗺️", label: "trackingSlice updates map pin", c: T.fe, side: "Redux + Socket.io" },
                      null,
                      { icon: "🏁", label: "Delivery confirmed + rating", c: T.fe, side: "PATCH /delivery/complete" },
                    ].map((step, i) => {
                      if (step === null) return (
                        <div key={i} style={{ width: 1, height: 18, background: T.border }} />
                      );
                      return (
                        <div key={i} style={{ background: step.c + "12",
                          border: `1px solid ${step.c}44`, borderRadius: 8,
                          padding: "7px 14px", width: "100%",
                          display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 16 }}>{step.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ color: T.white, fontSize: 10.5,
                              fontFamily: "'Outfit', sans-serif" }}>{step.label}</div>
                            <div style={{ color: step.c, fontFamily: "'DM Mono', monospace",
                              fontSize: 9, marginTop: 1 }}>{step.side}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Panel>

                <Panel style={{ marginTop: 14 }}>
                  <PLabel c={T.info}>AUTH FLOW (JWT)</PLabel>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                    {[
                      { icon: "📱", label: "POST /auth/login", c: T.fe },
                      { icon: "🔐", label: "bcrypt verify", c: T.warn },
                      { icon: "🎫", label: "JWT issued", c: T.info },
                      { icon: "💾", label: "Stored in Redux", c: T.fe },
                      { icon: "📡", label: "Bearer header", c: T.be },
                      { icon: "✅", label: "authGuard pass", c: "#4ADE80" },
                    ].map((s, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ background: s.c + "15", border: `1px solid ${s.c}44`,
                          borderRadius: 7, padding: "6px 10px", textAlign: "center" }}>
                          <div style={{ fontSize: 16 }}>{s.icon}</div>
                          <div style={{ color: s.c, fontSize: 9,
                            fontFamily: "'DM Mono', monospace", marginTop: 3 }}>{s.label}</div>
                        </div>
                        {i < 5 && <span style={{ color: T.muted, fontSize: 12 }}>›</span>}
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            </div>

            {/* Inter-service communication */}
            <Panel style={{ marginTop: 14 }}>
              <PLabel c={T.db}>INTER-SERVICE COMMUNICATION MAP</PLabel>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {[
                  { from: "order-service",        to: "delivery-service",      via: "Redis Pub/Sub",     c: T.be },
                  { from: "delivery-service",     to: "notification-service",  via: "REST HTTP",          c: "#4ADE80" },
                  { from: "order-service",        to: "notification-service",  via: "Redis Pub/Sub",     c: T.be },
                  { from: "auth-service",         to: "all services",          via: "JWT Middleware",     c: T.info },
                  { from: "order-service",        to: "Socket.io rooms",       via: "emit(order:new)",   c: T.warn },
                  { from: "delivery-service",     to: "Socket.io rooms",       via: "emit(tracking)",    c: T.warn },
                  { from: "Bull Queue workers",   to: "order-service",         via: "Job completion CB", c: T.db },
                  { from: "GeoService",           to: "Google Maps API",       via: "HTTP / Geocode",    c: T.muted },
                ].map((c, i) => (
                  <div key={i} style={{ background: c.c + "0C", border: `1px solid ${c.c}22`,
                    borderRadius: 8, padding: 10 }}>
                    <div style={{ color: c.c, fontFamily: "'DM Mono', monospace",
                      fontSize: 9, marginBottom: 4 }}>{c.from}</div>
                    <div style={{ color: T.muted, fontSize: 12, margin: "3px 0" }}>↓</div>
                    <div style={{ color: T.txt, fontFamily: "'DM Mono', monospace",
                      fontSize: 9, marginBottom: 4 }}>{c.to}</div>
                    <Tag c={c.c}>{c.via}</Tag>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}
      </div>
    </div>
  );
}
