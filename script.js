// Alternar abas
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(btn.dataset.tab).classList.remove("hidden");
  });
});

// Utilidades
const toNum = v => parseFloat(v) || NaN;
const fmt = (n, d = 2) => isFinite(n) ? Number(n).toFixed(d) : "—";

// Líquidos
function calcLiquidos() {
  const dose = toNum(document.getElementById("liq-dose").value);
  const conc = toNum(document.getElementById("liq-conc").value);
  const out = document.getElementById("liq-result");
  if (!(dose > 0) || !(conc > 0)) return out.textContent = "⚠️ Preencha os campos.";
  const vol = dose / conc;
  out.innerHTML = `Fórmula: Dose ÷ Concentração<br>Resultado: ${fmt(vol)} mL`;
}

// Sólidos
function calcSolidos() {
  const dose = toNum(document.getElementById("sol-dose").value);
  const strength = toNum(document.getElementById("sol-strength").value);
  const out = document.getElementById("sol-result");
  if (!(dose > 0) || !(strength > 0)) return out.textContent = "⚠️ Preencha os campos.";
  const units = dose / strength;
  out.innerHTML = `Fórmula: Dose ÷ Força<br>Resultado: ${fmt(units)} comprimidos/cápsulas`;
}

// Infusão
function calcInfusao() {
  const vol = toNum(document.getElementById("inf-vol").value);
  const timeH = toNum(document.getElementById("inf-time").value);
  const drop = toNum(document.getElementById("inf-drop").value);
  const out = document.getElementById("inf-result");
  if (!(vol > 0) || !(timeH > 0) || !(drop > 0)) return out.textContent = "⚠️ Preencha os campos.";
  const mlh = vol / timeH;
  const gttmin = (vol * drop) / (timeH * 60);
  out.innerHTML = `Fórmulas:<br>mL/h = Volume ÷ Tempo<br>gtt/min = (Volume × Fator) ÷ (Tempo × 60)<br>Resultado: ${fmt(mlh)} mL/h | ${fmt(gttmin)} gtt/min`;
}

// Peso
function calcPeso() {
  const kg = toNum(document.getElementById("peso-kg").value);
  const mgkg = toNum(document.getElementById("peso-mgkg").value);
  const out = document.getElementById("peso-result");
  if (!(kg > 0) || !(mgkg > 0)) return out.textContent = "⚠️ Preencha os campos.";
  const total = kg * mgkg;
  out.innerHTML = `Fórmula: Peso × Dose/kg<br>Resultado: ${fmt(total)} mg`;
}

// Gotejamento
function calcGotejamento() {
  const vol = toNum(document.getElementById("got-vol").value);
  const timeMin = toNum(document.getElementById("got-time").value);
  const drop = toNum(document.getElementById("got-drop").value);
  const out = document.getElementById("got-result");
  if (!(vol > 0) || !(timeMin > 0) || !(drop > 0)) return out.textContent = "⚠️ Preencha os campos.";
  const gttmin = (vol * drop) / timeMin;
  out.innerHTML = `Fórmula: (Volume × Fator) ÷ Tempo<br>Resultado: ${fmt(gttmin)} gtt/min`;
}

// Antibiótico
function calcAntibiotico() {
  const dose = toNum(document.getElementById("anti-dose").value);
  const frasco = toNum(document.getElementById("anti-frasco").value);
  const out = document.getElementById("anti-result");
  if (!(dose > 0) || !(frasco > 0)) return out.textContent = "⚠️ Preencha os campos.";
  const vol = dose / frasco;
  out.innerHTML = `Fórmula: Dose ÷ Concentração<br>Resultado: ${fmt(vol)} mL`;
}

// Injetável
function calcInjetavel() {
  const dose = toNum(document.getElementById("inj-dose").value);
  const conc = toNum(document.getElementById("inj-conc").value);
  const out = document.getElementById("inj-result");
  if (!(dose > 0) || !(conc > 0)) return out.textContent = "⚠️ Preencha os campos.";
  const vol = dose / conc;
  out.innerHTML = `Fórmula: Dose ÷ Concentração<br>Resultado: ${fmt(vol)} mL`;
}

// Insulina
function calcInsulina() {
  const dose = toNum(document.getElementById("insu-dose").value);
  const conc = toNum(document.getElementById("insu-conc").value);
  const out = document.getElementById("insu-result");
  if (!(dose > 0) || !(conc > 0)) return out.textContent = "⚠️ Preencha os campos.";
  const vol = dose / conc;
  out.innerHTML = `Fórmula: Dose ÷ Concentração<br>Resultado: ${fmt(vol,3)} mL (seringa)`;
}

// Glicose
function calcGlicose() {
  const c1 = toNum(document.getElementById("glu-c1").value);
  const c2 = toNum(document.getElementById("glu-c2").value);
  const v2 = toNum(document.getElementById("glu-v2").value);
  const out = document.getElementById("glu-result");
  if (!(c1 > 0) || !(c2 > 0) || !(v2 > 0)) return out.textContent = "⚠️ Preencha os campos.";
  if (c2 > c1) return out.textContent = "⚠️ C2 não pode ser maior que C1.";
  const v1 = (c2 * v2) / c1;
  const diluente = v2 - v1;
  out.innerHTML = `Fórmula: C1·V1 = C2·V2<br>Resultado: ${fmt(v1)} mL da glicose ${c1}% + ${fmt(diluente)} mL diluente`;
}

// Google
function buscarGoogle() {
  const q = document.getElementById("google-query").value.trim();
  if (!q) return;
  window.open("https://www.google.com/search?q=" + encodeURIComponent(q), "_blank");
}
