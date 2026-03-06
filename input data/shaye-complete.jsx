import { useState, useEffect, useRef } from "react";

// ====== PALETTE ======
const P = {
  bg: "#FCF8F8", card: "#FFFFFF", text: "#28181E", sub: "#B8909A",
  accent: "#944058", accent2: "#F8E0E6", border: "rgba(0,0,0,0.04)",
  gradient: "linear-gradient(135deg, #E8C0CC 0%, #D8A8B8 100%)",
  green: "#2E7D32", red: "#C62828", light: "#FDF2F4",
};
const br = "24px";

// ====== DATA ======
const allMeals = [
  { id: 1, name: "Kip Teriyaki Bowl", cal: 520, prot: 52, carb: 48, fat: 14, price: 8.49, emoji: "🍗", tag: "Afvallen", desc: "Malse kipfilet in huisgemaakte teriyaki saus, op een bedje van jasmijnrijst met gestoomde broccoli, edamame en sesamzaad. Licht, vol smaak en perfect voor je cut.", ingredients: "Kipfilet (halal), jasmijnrijst, broccoli, edamame, sojasaus, honing, gember, knoflook, sesamolie, sesamzaad", allergens: "Soja, sesam" },
  { id: 2, name: "Beef Rendang", cal: 680, prot: 48, carb: 62, fat: 22, price: 9.49, emoji: "🥩", tag: "Spiermassa", desc: "Slow-cooked rundvlees in een rijke kokos-rendang saus met langkorrelige rijst, atjar en gebakken uitjes. Een Indonesische klassieker, halal bereid.", ingredients: "Rundvlees (halal), kokosmelk, rode peper, laos, citroengras, kurkuma, langkorrelige rijst, atjar, gebakken uitjes", allergens: "Geen" },
  { id: 3, name: "Zalm & Quinoa", cal: 490, prot: 44, carb: 38, fat: 18, price: 10.49, emoji: "🐟", tag: "Afvallen", desc: "Gebakken zalmfilet met citroen-dille dressing op een bed van quinoa, geroosterde zoete aardappel en baby spinazie. Omega-3 rijk en vol smaak.", ingredients: "Zalmfilet, quinoa, zoete aardappel, baby spinazie, citroen, dille, olijfolie, pijnboompitten", allergens: "Vis" },
  { id: 4, name: "Kip Shawarma XXL", cal: 780, prot: 67, carb: 72, fat: 20, price: 9.99, emoji: "🥙", tag: "Aankomen", desc: "Dubbele portie gemarineerde shawarma kip met fluffy rijst, hummus, Turkse salade en knoflooksaus. Onze bestseller voor wie serieus wil bouwen.", ingredients: "Kipfilet (halal), shawarma kruiden, basmatirijst, kikkererwten, tahini, tomaat, komkommer, knoflook, yoghurt", allergens: "Sesam, zuivel" },
  { id: 5, name: "Veggie Buddha Bowl", cal: 420, prot: 28, carb: 52, fat: 12, price: 8.99, emoji: "🥗", tag: "Droogtrainen", desc: "Kleurrijke bowl met geroosterde kikkererwten, quinoa, avocado, rode kool, wortel en tahini dressing. Plant-powered en vol vezels.", ingredients: "Kikkererwten, quinoa, avocado, rode kool, wortel, komkommer, tahini, citroen, koriander", allergens: "Sesam" },
  { id: 6, name: "Pulled Chicken Wrap", cal: 560, prot: 45, carb: 50, fat: 16, price: 8.79, emoji: "🌯", tag: "Droogtrainen", desc: "Langzaam gegaarde pulled chicken met BBQ glaze in een volkoren tortilla met coleslaw en jalapeño. Comfort food met clean macro's.", ingredients: "Kipfilet (halal), volkoren tortilla, BBQ saus, witte kool, wortel, mayonaise, jalapeño", allergens: "Gluten, ei" },
];

const reviews = [
  { name: "Yasmine B.", loc: "Antwerpen", text: "Eindelijk meal prep die echt lekker smaakt. En 100% halal!", stars: 5, w: "12 wkn" },
  { name: "Mehdi A.", loc: "Brussel", text: "Perfecte macro's voor mijn cut. Kip shawarma is ongelooflijk.", stars: 5, w: "8 wkn" },
  { name: "Sophie V.", loc: "Gent", text: "Mijn man en ik bestellen elke week. Scheelt ons zoveel tijd!", stars: 5, w: "20 wkn" },
  { name: "Karim D.", loc: "Mechelen", text: "Betere smaak dan de concurrentie, en de macro's kloppen altijd.", stars: 5, w: "6 wkn" },
];

// ====== CART CONTEXT ======
function useCart() {
  const [items, setItems] = useState([]);
  const add = (meal, qty = 1) => {
    setItems(prev => {
      const exists = prev.find(i => i.meal.id === meal.id);
      if (exists) return prev.map(i => i.meal.id === meal.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { meal, qty }];
    });
  };
  const remove = (id) => setItems(prev => prev.filter(i => i.meal.id !== id));
  const update = (id, qty) => {
    if (qty <= 0) return remove(id);
    setItems(prev => prev.map(i => i.meal.id === id ? { ...i, qty } : i));
  };
  const total = items.reduce((s, i) => s + i.meal.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const clear = () => setItems([]);
  return { items, add, remove, update, total, count, clear };
}

// ====== SHARED COMPONENTS ======

function NavBar({ page, setPage, cartCount, openDrawer }) {
  return (
    <>
      <div style={{ background: P.accent, padding: "9px", textAlign: "center", fontSize: "12px", color: "#FFF", fontWeight: 500 }}>
        🎉 <strong>15% korting</strong> op je eerste bestelling met code <strong>SHAYE15</strong> · Gratis levering vanaf €35
      </div>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 36px", borderBottom: `1px solid ${P.border}`, background: P.bg, position: "sticky", top: 0, zIndex: 100 }}>
        <div onClick={() => setPage("home")} style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", fontWeight: 700, color: P.text, cursor: "pointer" }}>Shaye</div>
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {[["Zo werkt het","home"],["Onze keuken","home"],["Reviews","home"]].map(([t,p],i) => (
            <span key={i} onClick={() => setPage(p)} style={{ fontSize: "14px", color: P.sub, cursor: "pointer" }}>{t}</span>
          ))}
          <div onClick={openDrawer} style={{ position: "relative", cursor: "pointer", fontSize: "20px" }}>
            🛒
            {cartCount > 0 && (
              <div style={{ position: "absolute", top: "-8px", right: "-10px", width: "18px", height: "18px", borderRadius: "50%", background: P.accent, color: "#FFF", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</div>
            )}
          </div>
          <div onClick={() => setPage("home")} style={{ padding: "10px 24px", background: P.accent, color: "#FFF", borderRadius: br, fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Bestellen</div>
        </div>
      </nav>
    </>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ padding: "36px", borderTop: `1px solid ${P.border}`, background: P.bg }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "32px", marginBottom: "24px" }}>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>Shaye</div>
          <div style={{ fontSize: "13px", color: P.sub, lineHeight: 1.7 }}>Verse, halal sportmaaltijden uit Boortmeerbeek. Bereid met liefde, geleverd met zorg.</div>
        </div>
        {[{ t: "Menu", items: ["Afvallen","Spiermassa","Droogtrainen"] },{ t: "Info", items: ["Zo werkt het","Over ons","FAQ"] },{ t: "Volg ons", items: ["Instagram","TikTok","Facebook"] }].map((col, i) => (
          <div key={i}><div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>{col.t}</div>
          {col.items.map(t => <div key={t} style={{ fontSize: "13px", color: P.sub, marginBottom: "7px", cursor: "pointer" }}>{t}</div>)}</div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${P.border}`, paddingTop: "16px", display: "flex", justifyContent: "space-between", fontSize: "11px", color: P.sub }}>
        <span>© 2026 Shaye — Boortmeerbeek, Vlaanderen</span>
        <span>100% Halal · Dagvers · Gekoeld · Geen abonnement</span>
      </div>
    </footer>
  );
}

function MacroPills({ m, size }) {
  const s = size === "large";
  return (
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
      {[`${m.cal} kcal`,`${m.prot}g eiwit`,`${m.carb}g carbs`,`${m.fat}g vet`].map((mac, j) => (
        <div key={j} style={{ padding: s ? "4px 12px" : "2px 8px", background: P.accent2, borderRadius: "6px", fontSize: s ? "12px" : "10px", color: P.accent, fontWeight: 600 }}>{mac}</div>
      ))}
    </div>
  );
}

function QtyControl({ qty, onChange, size }) {
  const s = size === "large" ? 36 : 28;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0", border: `1.5px solid ${P.border}`, borderRadius: "8px", overflow: "hidden" }}>
      <div onClick={() => onChange(qty - 1)} style={{ width: s, height: s, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "16px", color: P.sub, background: P.bg }}>−</div>
      <div style={{ width: s, height: s, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700 }}>{qty}</div>
      <div onClick={() => onChange(qty + 1)} style={{ width: s, height: s, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "16px", color: P.accent, background: P.bg }}>+</div>
    </div>
  );
}

// ====== CART DRAWER ======
function CartDrawer({ open, close, cart, setPage }) {
  return (
    <>
      {/* Backdrop */}
      {open && <div onClick={close} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 200, transition: "opacity 0.3s" }} />}
      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "400px",
        background: P.bg, zIndex: 201, transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s ease", display: "flex", flexDirection: "column",
        boxShadow: open ? "-8px 0 40px rgba(0,0,0,0.1)" : "none",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${P.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", fontWeight: 700 }}>Winkelmandje <span style={{ fontSize: "14px", color: P.sub, fontFamily: "'Jost'" }}>({cart.count})</span></div>
          <div onClick={close} style={{ width: "32px", height: "32px", borderRadius: "50%", background: P.accent2, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "16px", color: P.accent }}>✕</div>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
          {cart.items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Je mandje is leeg</div>
              <div style={{ fontSize: "14px", color: P.sub }}>Ontdek onze verse maaltijden en voeg ze toe!</div>
            </div>
          ) : cart.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "14px", padding: "14px 0", borderBottom: `1px solid ${P.border}` }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "10px", background: P.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 }}>{item.meal.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>{item.meal.name}</div>
                <div style={{ fontSize: "11px", color: P.sub, marginBottom: "8px" }}>{item.meal.cal} kcal · {item.meal.prot}g eiwit</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <QtyControl qty={item.qty} onChange={(q) => cart.update(item.meal.id, q)} />
                  <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: P.accent, fontSize: "15px" }}>€{(item.meal.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: `1px solid ${P.border}`, background: P.card }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "14px", color: P.sub }}>Subtotaal</span>
              <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "16px" }}>€{cart.total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", color: P.sub }}>Verzending</span>
              <span style={{ fontSize: "12px", color: cart.total >= 35 ? P.green : P.sub }}>{cart.total >= 35 ? "Gratis ✓" : "€5,95"}</span>
            </div>
            {cart.total < 35 && <div style={{ fontSize: "12px", color: P.accent, background: P.accent2, borderRadius: "8px", padding: "8px 12px", marginBottom: "12px", textAlign: "center" }}>Nog €{(35 - cart.total).toFixed(2)} voor gratis verzending!</div>}
            <div onClick={() => { close(); setPage("checkout"); }} style={{ padding: "14px", background: P.accent, color: "#FFF", borderRadius: br, textAlign: "center", fontWeight: 700, fontSize: "15px", cursor: "pointer", marginBottom: "8px" }}>Afrekenen →</div>
            <div onClick={() => { close(); setPage("cart"); }} style={{ padding: "12px", border: `1.5px solid ${P.accent}40`, color: P.accent, borderRadius: br, textAlign: "center", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Bekijk winkelmandje</div>
          </div>
        )}
      </div>
    </>
  );
}

// ====== HOMEPAGE ======
function HomePage({ cart, setPage, openDrawer }) {
  const [filter, setFilter] = useState(0);
  const [added, setAdded] = useState(null);
  const tabs = ["Alles","Afvallen","Spiermassa","Droogtrainen","Aankomen"];
  const filtered = filter === 0 ? allMeals : allMeals.filter(m => m.tag === tabs[filter]);

  const handleAdd = (meal) => {
    cart.add(meal);
    setAdded(meal.id);
    setTimeout(() => setAdded(null), 1200);
  };

  return (
    <div style={{ background: P.bg }}>
      {/* HERO */}
      <div style={{ padding: "50px 36px", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "40px", alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", gap: "8px", padding: "6px 16px", background: P.accent2, borderRadius: "24px", fontSize: "12px", color: P.accent, fontWeight: 600, marginBottom: "20px" }}>☪ 100% Halal · Dagvers uit Vlaanderen</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "44px", lineHeight: 1.1, margin: "0 0 16px" }}>500+ klanten<br/>vertrouwen op <span style={{ color: P.accent }}>Shaye.</span></h1>
          <p style={{ fontSize: "15px", lineHeight: 1.75, color: P.sub, margin: "0 0 28px" }}>Verse sportmaaltijden, elke dag bereid in onze keuken. Gekoeld aan je deur, klaar in 3 minuten.</p>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <div style={{ padding: "14px 30px", background: P.accent, color: "#FFF", borderRadius: br, fontSize: "15px", fontWeight: 600, cursor: "pointer" }}>Bekijk het menu ↓</div>
            <div style={{ padding: "14px 30px", border: `1.5px solid ${P.accent}40`, color: P.accent, borderRadius: br, fontSize: "15px", fontWeight: 500, cursor: "pointer" }}>Hoe werkt het?</div>
          </div>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <div style={{ display: "flex" }}>{[0,1,2,3].map(i => <div key={i} style={{ width: "28px", height: "28px", borderRadius: "50%", background: P.gradient, border: `2px solid ${P.bg}`, marginLeft: i > 0 ? "-8px" : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>{["👩","👨","👩","👨"][i]}</div>)}</div>
            <div style={{ fontSize: "13px", color: P.sub }}><strong style={{ color: P.text }}>500+</strong> klanten · <span style={{ color: "#F5A623" }}>★★★★★</span> 4.8/5</div>
          </div>
        </div>
        {/* Video placeholder */}
        <div style={{ background: P.gradient, borderRadius: "20px", overflow: "hidden", aspectRatio: "9/14", maxHeight: "480px", position: "relative", border: `1px solid ${P.border}`, boxShadow: "0 8px 40px rgba(148,64,88,0.10)" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(40,24,30,0.15)" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", cursor: "pointer", marginBottom: "14px" }}>
              <div style={{ width: 0, height: 0, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: "20px solid " + P.accent, marginLeft: "4px" }} />
            </div>
            <div style={{ color: "#FFF", fontSize: "14px", fontWeight: 600, textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>Bekijk onze keuken</div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", background: "linear-gradient(transparent, rgba(40,24,30,0.6))" }}>
            <div style={{ display: "flex", gap: "8px" }}>{["100% Halal","Dagvers","Boortmeerbeek"].map((t,i) => <div key={i} style={{ padding: "4px 12px", background: "rgba(255,255,255,0.2)", borderRadius: "12px", fontSize: "11px", color: "#FFF", fontWeight: 600 }}>{t}</div>)}</div>
          </div>
          <div style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(255,255,255,0.92)", borderRadius: "8px", padding: "6px 12px", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: "#F5A623", fontSize: "12px" }}>★</span><span style={{ fontSize: "12px", fontWeight: 700, color: P.text }}>4.8/5</span>
          </div>
          <div style={{ position: "absolute", top: "25%", left: "20%", fontSize: "48px", opacity: 0.6 }}>🍗</div>
          <div style={{ position: "absolute", top: "40%", right: "15%", fontSize: "40px", opacity: 0.5 }}>🥙</div>
          <div style={{ position: "absolute", top: "55%", left: "30%", fontSize: "36px", opacity: 0.4 }}>🥗</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", margin: "0 36px 36px", border: `1px solid ${P.border}`, borderRadius: "14px", overflow: "hidden", background: P.card }}>
        {[{ val: "500+", label: "Klanten" },{ val: "4.8/5", label: "Google Reviews" },{ val: "15.000+", label: "Maaltijden geleverd" },{ val: "<3 min", label: "Klaar om te eten" }].map((s, i) => (
          <div key={i} style={{ padding: "20px", textAlign: "center", borderRight: i < 3 ? `1px solid ${P.border}` : "none" }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "24px", color: P.accent }}>{s.val}</div>
            <div style={{ fontSize: "12px", color: P.sub, marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters + Menu */}
      <div style={{ padding: "0 36px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", fontWeight: 700, margin: 0 }}>Populair deze week</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          {tabs.map((t, i) => <div key={i} onClick={() => setFilter(i)} style={{ padding: "9px 20px", background: i === filter ? P.accent : "transparent", color: i === filter ? "#FFF" : P.sub, border: `1.5px solid ${i === filter ? P.accent : P.border}`, borderRadius: br, fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>{t}</div>)}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", padding: "8px 36px 48px" }}>
        {filtered.map((m) => (
          <div key={m.id} style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: "14px", overflow: "hidden" }}>
            <div onClick={() => setPage({ type: "product", id: m.id })} style={{ height: "130px", background: P.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", position: "relative", cursor: "pointer" }}>
              {m.emoji}
              <div style={{ position: "absolute", top: 8, left: 8, padding: "3px 10px", background: "rgba(255,255,255,0.92)", borderRadius: "6px", fontSize: "10px", fontWeight: 700, color: P.accent, textTransform: "uppercase" }}>{m.tag}</div>
            </div>
            <div style={{ padding: "16px" }}>
              <div onClick={() => setPage({ type: "product", id: m.id })} style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "15px", marginBottom: "8px", cursor: "pointer" }}>{m.name}</div>
              <MacroPills m={m} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: P.accent, fontSize: "17px" }}>€{m.price.toFixed(2)}</span>
                <span onClick={() => handleAdd(m)} style={{ padding: "8px 18px", background: added === m.id ? P.green : P.accent, color: "#FFF", borderRadius: br, fontSize: "11px", fontWeight: 600, cursor: "pointer", transition: "background 0.3s" }}>
                  {added === m.id ? "✓ Toegevoegd" : "+ Toevoegen"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={{ padding: "0 36px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2.5px", color: P.accent, textTransform: "uppercase", fontWeight: 600, marginBottom: "8px" }}>Zo werkt het</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 700, margin: 0 }}>In 3 stappen aan tafel</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[{ n: "1", icon: "📱", t: "Kies & bestel", d: "Filter op doel, selecteer je favorieten. Geen abonnement nodig." },{ n: "2", icon: "👨‍🍳", t: "Wij koken vers", d: "Dezelfde ochtend bereid met 100% halal ingrediënten." },{ n: "3", icon: "📦", t: "Vanavond in huis", d: "Gekoeld geleverd in Vlaanderen & Nederland." }].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "14px", background: P.card, border: `1px solid ${P.border}`, borderRadius: "14px", padding: "22px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: P.accent, color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
              <div><div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{s.t}</div><div style={{ fontSize: "12px", color: P.sub, lineHeight: 1.55 }}>{s.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ padding: "0 36px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2.5px", color: P.accent, textTransform: "uppercase", fontWeight: 600, marginBottom: "8px" }}>Reviews</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 700, margin: 0 }}>Wat klanten zeggen</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {reviews.map((r,i) => (
            <div key={i} style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: "14px", padding: "22px" }}>
              <div style={{ color: "#F5A623", fontSize: "14px", marginBottom: "10px" }}>★★★★★</div>
              <div style={{ fontSize: "14px", lineHeight: 1.7, fontStyle: "italic", marginBottom: "12px" }}>"{r.text}"</div>
              <div style={{ fontSize: "13px", fontWeight: 700 }}>{r.name}</div>
              <div style={{ fontSize: "11px", color: P.sub }}>{r.loc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ margin: "0 36px 36px", padding: "38px", background: `linear-gradient(135deg, ${P.accent} 0%, ${P.accent}DD 100%)`, borderRadius: "16px", textAlign: "center", color: "#FFF" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 700, margin: "0 0 10px" }}>Klaar om te proeven?</h2>
        <p style={{ fontSize: "15px", opacity: 0.9, margin: "0 0 22px" }}>Code <strong>SHAYE15</strong> = 15% korting op je eerste bestelling.</p>
        <div style={{ display: "inline-block", padding: "14px 38px", background: "#FFF", color: P.accent, borderRadius: br, fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>Bekijk het menu →</div>
      </div>
    </div>
  );
}

// ====== PRODUCT PAGE ======
function ProductPage({ mealId, cart, setPage }) {
  const meal = allMeals.find(m => m.id === mealId);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  if (!meal) return null;

  const handleAdd = () => {
    cart.add(meal, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const related = allMeals.filter(m => m.id !== meal.id).slice(0, 3);

  return (
    <div style={{ background: P.bg }}>
      {/* Breadcrumb */}
      <div style={{ padding: "16px 36px", fontSize: "13px", color: P.sub }}>
        <span onClick={() => setPage("home")} style={{ cursor: "pointer", color: P.accent }}>Home</span> / <span onClick={() => setPage("home")} style={{ cursor: "pointer", color: P.accent }}>Menu</span> / <span>{meal.name}</span>
      </div>

      {/* Product detail */}
      <div style={{ padding: "0 36px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
        {/* Image */}
        <div style={{ background: P.gradient, borderRadius: "20px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "120px", position: "relative" }}>
          {meal.emoji}
          <div style={{ position: "absolute", top: 16, left: 16, padding: "5px 14px", background: "rgba(255,255,255,0.92)", borderRadius: "8px", fontSize: "12px", fontWeight: 700, color: P.accent, textTransform: "uppercase" }}>{meal.tag}</div>
        </div>

        {/* Info */}
        <div style={{ paddingTop: "10px" }}>
          <div style={{ display: "inline-flex", gap: "6px", padding: "4px 12px", background: P.accent2, borderRadius: "6px", fontSize: "11px", color: P.accent, fontWeight: 600, marginBottom: "14px" }}>☪ 100% Halal</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "34px", fontWeight: 700, margin: "0 0 8px" }}>{meal.name}</h1>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 700, color: P.accent, marginBottom: "16px" }}>€{meal.price.toFixed(2)}</div>
          <p style={{ fontSize: "15px", lineHeight: 1.75, color: P.sub, margin: "0 0 20px" }}>{meal.desc}</p>

          {/* Macros */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "24px" }}>
            {[{ l: "Calorieën", v: `${meal.cal}`, u: "kcal" },{ l: "Eiwit", v: `${meal.prot}`, u: "g" },{ l: "Koolhydraten", v: `${meal.carb}`, u: "g" },{ l: "Vet", v: `${meal.fat}`, u: "g" }].map((n,i) => (
              <div key={i} style={{ background: P.accent2, borderRadius: "12px", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: P.sub, marginBottom: "4px" }}>{n.l}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "22px", color: P.accent }}>{n.v}<span style={{ fontSize: "12px", fontWeight: 400 }}>{n.u}</span></div>
              </div>
            ))}
          </div>

          {/* Qty + Add */}
          <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "24px" }}>
            <QtyControl qty={qty} onChange={(q) => setQty(Math.max(1, q))} size="large" />
            <div onClick={handleAdd} style={{ flex: 1, padding: "14px", background: added ? P.green : P.accent, color: "#FFF", borderRadius: br, textAlign: "center", fontWeight: 700, fontSize: "15px", cursor: "pointer", transition: "background 0.3s" }}>
              {added ? "✓ Toegevoegd aan mandje!" : `Toevoegen — €${(meal.price * qty).toFixed(2)}`}
            </div>
          </div>

          {/* Details accordion */}
          {[{ t: "Ingrediënten", c: meal.ingredients },{ t: "Allergenen", c: meal.allergens },{ t: "Bewaring", c: "Bewaar in de koelkast (max 2-3 dagen) of vries direct in na ontvangst (houdbaar tot 3 maanden). Opwarmen: 3 minuten in de magnetron op 700W." }].map((s, i) => (
            <div key={i} style={{ borderTop: `1px solid ${P.border}`, padding: "14px 0" }}>
              <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>{s.t}</div>
              <div style={{ fontSize: "13px", color: P.sub, lineHeight: 1.6 }}>{s.c}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Related */}
      <div style={{ padding: "0 36px 48px" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 700, marginBottom: "16px" }}>Misschien ook lekker</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {related.map(m => (
            <div key={m.id} onClick={() => { setPage({ type: "product", id: m.id }); window.scrollTo(0,0); }} style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: "14px", overflow: "hidden", cursor: "pointer" }}>
              <div style={{ height: "100px", background: P.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>{m.emoji}</div>
              <div style={{ padding: "14px" }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>{m.name}</div>
                <div style={{ fontSize: "11px", color: P.sub, marginBottom: "8px" }}>{m.cal} kcal · {m.prot}g eiwit</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: P.accent }}>€{m.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ====== CART PAGE ======
function CartPage({ cart, setPage }) {
  const shipping = cart.total >= 35 ? 0 : 5.95;
  const grandTotal = cart.total + shipping;

  return (
    <div style={{ background: P.bg }}>
      <div style={{ padding: "16px 36px", fontSize: "13px", color: P.sub }}>
        <span onClick={() => setPage("home")} style={{ cursor: "pointer", color: P.accent }}>Home</span> / <span>Winkelmandje</span>
      </div>

      <div style={{ padding: "0 36px 48px" }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "30px", fontWeight: 700, marginBottom: "24px" }}>Winkelmandje <span style={{ fontSize: "18px", color: P.sub, fontFamily: "'Jost'" }}>({cart.count} items)</span></h1>

        {cart.items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>🛒</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>Je mandje is leeg</div>
            <div style={{ fontSize: "15px", color: P.sub, marginBottom: "24px" }}>Ontdek onze verse maaltijden!</div>
            <div onClick={() => setPage("home")} style={{ display: "inline-block", padding: "14px 36px", background: P.accent, color: "#FFF", borderRadius: br, fontWeight: 700, cursor: "pointer" }}>Bekijk het menu →</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.5fr", gap: "32px", alignItems: "start" }}>
            {/* Items list */}
            <div>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: "16px", padding: "0 0 12px", borderBottom: `1px solid ${P.border}`, fontSize: "11px", fontWeight: 700, color: P.sub, textTransform: "uppercase", letterSpacing: "1px" }}>
                <span>Product</span><span>Prijs</span><span>Aantal</span><span>Totaal</span><span></span>
              </div>
              {cart.items.map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: "16px", padding: "18px 0", borderBottom: `1px solid ${P.border}`, alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "12px", background: P.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", flexShrink: 0 }}>{item.meal.emoji}</div>
                    <div>
                      <div onClick={() => setPage({ type: "product", id: item.meal.id })} style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "15px", cursor: "pointer", marginBottom: "4px" }}>{item.meal.name}</div>
                      <div style={{ fontSize: "11px", color: P.sub }}>{item.meal.cal} kcal · {item.meal.prot}g eiwit</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "14px", color: P.sub }}>€{item.meal.price.toFixed(2)}</div>
                  <QtyControl qty={item.qty} onChange={(q) => cart.update(item.meal.id, q)} />
                  <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "15px" }}>€{(item.meal.price * item.qty).toFixed(2)}</div>
                  <div onClick={() => cart.remove(item.meal.id)} style={{ width: "28px", height: "28px", borderRadius: "50%", background: P.accent2, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "12px", color: P.accent }}>✕</div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: "16px", padding: "24px", position: "sticky", top: "100px" }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>Overzicht</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
                <span style={{ color: P.sub }}>Subtotaal</span><span style={{ fontWeight: 600 }}>€{cart.total.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
                <span style={{ color: P.sub }}>Verzending</span><span style={{ fontWeight: 600, color: shipping === 0 ? P.green : P.text }}>{shipping === 0 ? "Gratis ✓" : `€${shipping.toFixed(2)}`}</span>
              </div>
              {cart.total < 35 && <div style={{ fontSize: "12px", color: P.accent, background: P.accent2, borderRadius: "8px", padding: "8px 12px", marginBottom: "12px", textAlign: "center" }}>Nog €{(35 - cart.total).toFixed(2)} voor gratis verzending</div>}
              <div style={{ borderTop: `1px solid ${P.border}`, paddingTop: "12px", marginTop: "8px", display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontWeight: 700, fontSize: "16px" }}>Totaal</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "22px", color: P.accent }}>€{grandTotal.toFixed(2)}</span>
              </div>
              <div style={{ fontSize: "12px", color: P.sub, background: P.accent2, borderRadius: "8px", padding: "10px 14px", marginBottom: "16px" }}>
                🏷️ Kortingscode? Voer in bij checkout.
              </div>
              <div onClick={() => setPage("checkout")} style={{ padding: "14px", background: P.accent, color: "#FFF", borderRadius: br, textAlign: "center", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>Naar afrekenen →</div>
              <div onClick={() => setPage("home")} style={{ padding: "12px", textAlign: "center", color: P.accent, fontSize: "13px", cursor: "pointer", marginTop: "8px" }}>← Verder winkelen</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ====== CHECKOUT PAGE ======
function CheckoutPage({ cart, setPage }) {
  const [discount, setDiscount] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState(0);
  const [deliveryDay, setDeliveryDay] = useState(0);
  const shipping = cart.total >= 35 ? 0 : 5.95;
  const discountAmount = discountApplied ? cart.total * 0.15 : 0;
  const grandTotal = cart.total - discountAmount + shipping;
  const [step, setStep] = useState(1);

  const applyDiscount = () => {
    if (discount.toUpperCase() === "SHAYE15") setDiscountApplied(true);
  };

  // Generate delivery days dynamically
  const today = new Date();
  const dayNames = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
  const monthNames = ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"];
  const deliveryDays = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      deliveryDays.push({ day: dayNames[d.getDay()], date: `${d.getDate()} ${monthNames[d.getMonth()]}`, full: d });
    }
    if (deliveryDays.length >= 4) break;
  }

  if (cart.items.length === 0) {
    return (<div style={{ background: P.bg, padding: "80px 36px", textAlign: "center" }}>
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>🛒</div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", fontWeight: 700, marginBottom: "24px" }}>Je mandje is leeg</div>
      <div onClick={() => setPage("home")} style={{ display: "inline-block", padding: "14px 36px", background: P.accent, color: "#FFF", borderRadius: br, fontWeight: 700, cursor: "pointer" }}>Bekijk het menu →</div>
    </div>);
  }

  const inputStyle = { width: "100%", padding: "12px 16px", border: `1.5px solid ${P.border}`, borderRadius: "10px", fontSize: "14px", fontFamily: "'Jost'", outline: "none", background: P.card, boxSizing: "border-box" };

  const RadioOption = ({ selected, onClick, children }) => (
    <div onClick={onClick} style={{ display: "flex", gap: "14px", alignItems: "center", padding: "14px", border: `1.5px solid ${selected ? P.accent : P.border}`, borderRadius: "12px", marginBottom: "8px", cursor: "pointer", background: selected ? P.accent + "06" : "transparent", transition: "all 0.15s" }}>
      <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${selected ? P.accent : P.sub}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {selected && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: P.accent }} />}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ background: P.bg }}>
      {/* Breadcrumb */}
      <div style={{ padding: "16px 36px", fontSize: "13px", color: P.sub }}>
        <span onClick={() => setPage("home")} style={{ cursor: "pointer", color: P.accent }}>Home</span> / <span onClick={() => setPage("cart")} style={{ cursor: "pointer", color: P.accent }}>Winkelmandje</span> / <span>Afrekenen</span>
      </div>

      <div style={{ padding: "0 36px 48px", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px", alignItems: "start" }}>
        {/* LEFT: Form */}
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", fontWeight: 700, marginBottom: "28px" }}>Afrekenen</h1>

          {/* Progress — 2 steps now */}
          <div style={{ display: "flex", gap: "0", marginBottom: "32px" }}>
            {["Bezorging","Gegevens & Betaling"].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: step > i + 1 ? P.accent : step === i + 1 ? P.accent : P.accent2, color: step > i + 1 ? "#FFF" : step === i + 1 ? "#FFF" : P.sub, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", fontSize: "13px", fontWeight: 700 }}>{step > i + 1 ? "✓" : i + 1}</div>
                <div style={{ fontSize: "12px", color: step === i + 1 ? P.accent : P.sub, fontWeight: step === i + 1 ? 700 : 400 }}>{s}</div>
                {i === 0 && <div style={{ position: "absolute", top: "16px", left: "60%", right: "-40%", height: "2px", background: step > 1 ? P.accent : P.accent2 }} />}
              </div>
            ))}
          </div>

          {/* ====== STEP 1: Bezorgadres + Levermoment ====== */}
          {step >= 1 && (
            <div style={{ background: P.card, border: `1px solid ${step === 1 ? P.accent + "30" : P.border}`, borderRadius: "16px", padding: "24px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: step === 1 ? "20px" : "0" }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: 700 }}>1. Bezorging</div>
                {step > 1 && <span onClick={() => setStep(1)} style={{ fontSize: "13px", color: P.accent, cursor: "pointer" }}>Wijzigen</span>}
              </div>

              {step === 1 && (<>
                {/* Address */}
                <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "12px", color: P.accent, letterSpacing: "0.5px" }}>Bezorgadres</div>
                <div style={{ marginBottom: "12px" }}><label style={{ fontSize: "12px", color: P.sub, display: "block", marginBottom: "6px" }}>Straat + huisnummer *</label><input style={inputStyle} placeholder="Kerkstraat 42" /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px", marginBottom: "12px" }}>
                  <div><label style={{ fontSize: "12px", color: P.sub, display: "block", marginBottom: "6px" }}>Postcode *</label><input style={inputStyle} placeholder="3190" /></div>
                  <div><label style={{ fontSize: "12px", color: P.sub, display: "block", marginBottom: "6px" }}>Gemeente *</label><input style={inputStyle} placeholder="Boortmeerbeek" /></div>
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ fontSize: "12px", color: P.sub, display: "block", marginBottom: "6px" }}>Land *</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }}><option>België</option><option>Nederland</option></select>
                </div>

                {/* Delivery method */}
                <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "12px", color: P.accent, letterSpacing: "0.5px" }}>Bezorgmethode</div>
                <RadioOption selected={deliveryMethod === 0} onClick={() => setDeliveryMethod(0)}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>Same-day delivery</div>
                    <div style={{ fontSize: "12px", color: P.sub }}>Besteld vóór 10:00 = vanavond 17:00–22:00</div>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: shipping === 0 ? P.green : P.text }}>{shipping === 0 ? "Gratis" : "€5,95"}</div>
                </RadioOption>
                <RadioOption selected={deliveryMethod === 1} onClick={() => setDeliveryMethod(1)}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>Kies een leverdag</div>
                    <div style={{ fontSize: "12px", color: P.sub }}>Selecteer hieronder je gewenste leverdag</div>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: shipping === 0 ? P.green : P.text }}>{shipping === 0 ? "Gratis" : "€5,95"}</div>
                </RadioOption>

                {/* Day picker — shown when "Kies een leverdag" is selected */}
                {deliveryMethod === 1 && (
                  <div style={{ marginTop: "12px", marginBottom: "8px" }}>
                    <div style={{ fontSize: "12px", color: P.sub, marginBottom: "10px" }}>Beschikbare leverdagen:</div>
                    <div style={{ display: "grid", gridTemplateColumns: `repeat(${deliveryDays.length}, 1fr)`, gap: "8px" }}>
                      {deliveryDays.map((d, i) => (
                        <div key={i} onClick={() => setDeliveryDay(i)} style={{
                          padding: "14px 8px", textAlign: "center", borderRadius: "12px", cursor: "pointer",
                          border: `1.5px solid ${deliveryDay === i ? P.accent : P.border}`,
                          background: deliveryDay === i ? P.accent + "08" : "transparent",
                          transition: "all 0.15s",
                        }}>
                          <div style={{ fontSize: "12px", color: deliveryDay === i ? P.accent : P.sub, fontWeight: 600 }}>{d.day}</div>
                          <div style={{ fontSize: "16px", fontWeight: 700, margin: "4px 0", color: deliveryDay === i ? P.accent : P.text }}>{d.date.split(" ")[0]}</div>
                          <div style={{ fontSize: "10px", color: P.sub }}>{d.date.split(" ")[1]}</div>
                          <div style={{ fontSize: "10px", color: P.sub, marginTop: "6px" }}>17:00–22:00</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: "16px", marginBottom: "0" }}><label style={{ fontSize: "12px", color: P.sub, display: "block", marginBottom: "6px" }}>Bezorginstructies (optioneel)</label><input style={inputStyle} placeholder="Bv. deurbel werkt niet, bel aan bij buren" /></div>

                <div onClick={() => setStep(2)} style={{ padding: "14px", background: P.accent, color: "#FFF", borderRadius: br, textAlign: "center", fontWeight: 700, cursor: "pointer", marginTop: "20px" }}>
                  Verder naar gegevens & betaling →
                </div>
              </>)}

              {/* Collapsed summary when on step 2 */}
              {step > 1 && (
                <div style={{ marginTop: "12px", fontSize: "13px", color: P.sub, lineHeight: 1.6 }}>
                  <div>📍 Kerkstraat 42, 3190 Boortmeerbeek, België</div>
                  <div>🚚 {deliveryMethod === 0 ? "Same-day delivery (vanavond 17:00–22:00)" : `${deliveryDays[deliveryDay]?.day} ${deliveryDays[deliveryDay]?.date} (17:00–22:00)`}</div>
                </div>
              )}
            </div>
          )}

          {/* ====== STEP 2: Gegevens + Betaling (combined) ====== */}
          {step === 2 && (
            <>
              {/* Personal details */}
              <div style={{ background: P.card, border: `1px solid ${P.accent}30`, borderRadius: "16px", padding: "24px", marginBottom: "16px" }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>2. Jouw gegevens</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div><label style={{ fontSize: "12px", color: P.sub, display: "block", marginBottom: "6px" }}>Voornaam *</label><input style={inputStyle} placeholder="Chaymae" /></div>
                  <div><label style={{ fontSize: "12px", color: P.sub, display: "block", marginBottom: "6px" }}>Achternaam *</label><input style={inputStyle} placeholder="Jansen" /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div><label style={{ fontSize: "12px", color: P.sub, display: "block", marginBottom: "6px" }}>E-mailadres *</label><input style={inputStyle} placeholder="chaymae@email.com" type="email" /></div>
                  <div><label style={{ fontSize: "12px", color: P.sub, display: "block", marginBottom: "6px" }}>Telefoonnummer *</label><input style={inputStyle} placeholder="+32 4XX XX XX XX" type="tel" /></div>
                </div>
              </div>

              {/* Payment */}
              <div style={{ background: P.card, border: `1px solid ${P.accent}30`, borderRadius: "16px", padding: "24px" }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>Betaling</div>

                <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "10px" }}>Betaalmethode</div>
                {[{ t: "Bancontact", icon: "💳", sel: true },{ t: "iDEAL", icon: "🏦", sel: false },{ t: "Creditcard (Visa / Mastercard)", icon: "💳", sel: false },{ t: "Klarna — Betaal later", icon: "🟠", sel: false }].map((m, i) => (
                  <RadioOption key={i} selected={m.sel} onClick={() => {}}>
                    <span style={{ fontSize: "16px" }}>{m.icon}</span>
                    <span style={{ fontSize: "14px", fontWeight: 600 }}>{m.t}</span>
                  </RadioOption>
                ))}

                {/* Terms */}
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", margin: "20px 0 20px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "4px", border: `2px solid ${P.accent}`, flexShrink: 0, marginTop: "2px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: P.accent }} />
                  </div>
                  <div style={{ fontSize: "13px", color: P.sub, lineHeight: 1.5 }}>Ik ga akkoord met de <span style={{ color: P.accent, cursor: "pointer" }}>Algemene voorwaarden</span> en het <span style={{ color: P.accent, cursor: "pointer" }}>Privacybeleid</span>.</div>
                </div>

                <div onClick={() => { cart.clear(); setPage("confirmation"); }} style={{ padding: "16px", background: P.accent, color: "#FFF", borderRadius: br, textAlign: "center", fontWeight: 700, fontSize: "16px", cursor: "pointer" }}>
                  Bestelling plaatsen — €{grandTotal.toFixed(2)}
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "16px" }}>
                  {["🔒 Veilig betalen","📦 Gekoeld geleverd","↩️ Niet goed? Geld terug"].map((t,i) => (
                    <span key={i} style={{ fontSize: "11px", color: P.sub }}>{t}</span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT: Order summary */}
        <div style={{ position: "sticky", top: "100px" }}>
          <div style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: "16px", padding: "24px" }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>Jouw bestelling</div>

            {cart.items.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: `1px solid ${P.border}`, alignItems: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: P.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0, position: "relative" }}>
                  {item.meal.emoji}
                  <div style={{ position: "absolute", top: "-4px", right: "-4px", width: "18px", height: "18px", borderRadius: "50%", background: P.accent, color: "#FFF", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.qty}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 700 }}>{item.meal.name}</div>
                  <div style={{ fontSize: "11px", color: P.sub }}>{item.meal.cal} kcal</div>
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700 }}>€{(item.meal.price * item.qty).toFixed(2)}</div>
              </div>
            ))}

            {/* Discount code */}
            <div style={{ marginTop: "16px", marginBottom: "12px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <input value={discount} onChange={(e) => setDiscount(e.target.value)} style={{ flex: 1, padding: "10px 14px", border: `1.5px solid ${P.border}`, borderRadius: "10px", fontSize: "13px", fontFamily: "'Jost'", outline: "none" }} placeholder="Kortingscode" />
                <div onClick={applyDiscount} style={{ padding: "10px 18px", background: P.accent, color: "#FFF", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Toepassen</div>
              </div>
              {discountApplied && <div style={{ fontSize: "12px", color: P.green, marginTop: "6px" }}>✓ Code SHAYE15 toegepast — 15% korting!</div>}
            </div>

            {/* Totals */}
            <div style={{ borderTop: `1px solid ${P.border}`, paddingTop: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                <span style={{ color: P.sub }}>Subtotaal</span><span>€{cart.total.toFixed(2)}</span>
              </div>
              {discountApplied && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                <span style={{ color: P.green }}>Korting (15%)</span><span style={{ color: P.green }}>-€{discountAmount.toFixed(2)}</span>
              </div>}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "13px" }}>
                <span style={{ color: P.sub }}>Verzending</span><span style={{ color: shipping === 0 ? P.green : P.text }}>{shipping === 0 ? "Gratis ✓" : `€${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${P.border}`, paddingTop: "12px" }}>
                <span style={{ fontWeight: 700, fontSize: "16px" }}>Totaal</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "24px", color: P.accent }}>€{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== CONFIRMATION ======
function ConfirmationPage({ setPage }) {
  return (
    <div style={{ background: P.bg, padding: "80px 36px", textAlign: "center" }}>
      <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "36px", fontWeight: 700, margin: "0 0 12px" }}>Bedankt voor je bestelling!</h1>
      <p style={{ fontSize: "16px", color: P.sub, maxWidth: "480px", margin: "0 auto 12px", lineHeight: 1.7 }}>We zijn al aan het koken! Je ontvangt een bevestigingsmail met track & trace gegevens.</p>
      <p style={{ fontSize: "14px", color: P.sub, marginBottom: "32px" }}>Besteld vóór 10:00? Dan bezorgen we vanavond tussen 17:00 en 22:00.</p>
      <div onClick={() => setPage("home")} style={{ display: "inline-block", padding: "14px 36px", background: P.accent, color: "#FFF", borderRadius: br, fontWeight: 700, cursor: "pointer" }}>Terug naar de homepage</div>
    </div>
  );
}

// ====== MAIN APP ======
export default function ShayeApp() {
  const [page, setPage] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Jost:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  let content;
  if (page === "home") content = <HomePage cart={cart} setPage={setPage} openDrawer={openDrawer} />;
  else if (page === "cart") content = <CartPage cart={cart} setPage={setPage} />;
  else if (page === "checkout") content = <CheckoutPage cart={cart} setPage={setPage} />;
  else if (page === "confirmation") content = <ConfirmationPage setPage={setPage} />;
  else if (page?.type === "product") content = <ProductPage mealId={page.id} cart={cart} setPage={setPage} />;
  else content = <HomePage cart={cart} setPage={setPage} openDrawer={openDrawer} />;

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", color: P.text, background: P.bg, minHeight: "100vh" }}>
      <NavBar page={page} setPage={setPage} cartCount={cart.count} openDrawer={openDrawer} />
      {content}
      <Footer setPage={setPage} />
      <CartDrawer open={drawerOpen} close={closeDrawer} cart={cart} setPage={setPage} />
    </div>
  );
}
