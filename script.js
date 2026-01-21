// Alternar abas estilo celular
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(btn.dataset.tab).classList.remove("hidden");
  });
});

// Utilidades
const toNum = v => {
  const n = parseFloat(v);
  return isFinite(n) ? n : NaN;
};
const fmt = (n, d = 2) => (isFinite(n) ? Number(n).toFixed(d) : "—");

// Líquidos: volume = dose / concentração
function calcLiquidos() {
  const dose = toNum(document.getElementById("liq-dose").value);
  const conc = toNum(document.getElementById("liq-conc").value);
  const out = document.getElementById("liq-result");
  if (!(dose > 0) || !(conc > 0)) return (out.textContent = "Preencha os campos com valores > 0.");
  out.textContent = `Volume: ${fmt(dose / conc)} mL`;
}

// Sólidos: unidades = dose / força
function calcSolidos() {
  const dose = toNum(document.getElementById("sol-dose").value);
  const strength = toNum(document.getElementById("sol-strength").value);
  const out = document.getElementById("sol-result");
  if (!(dose > 0) || !(strength > 0)) return (out.textContent = "Preencha os campos com valores > 0.");
  out.textContent = `Unidades: ${fmt(dose / strength)}`;
}

// Infusão: mL/h e gtt/min
function calcInfusao() {
  const vol = toNum(document.getElementById("inf-vol").value);
  const timeH = toNum(document.getElementById("inf-time").value);
  const drop = toNum(document.getElementById("inf-drop").value);
  const out = document.getElementById("inf-result");
  if (!(vol > 0) || !(timeH > 0) || !(drop > 0)) return (out.textContent = "Preencha os campos com valores > 0.");
  const mlPerHour = vol / timeH;
  const gttPerMin = (vol * drop) / (timeH * 60);
  out.textContent = `Taxa: ${fmt(mlPerHour)} mL/h | Gotejamento: ${fmt(gttPerMin)} gtt/min`;
}

// Peso: dose total = kg * mg/kg
function calcPeso() {
  const kg = toNum(document.getElementById("peso-kg").value);
  const mgkg = toNum(document.getElementById("peso-mgkg").value);
  const out = document.getElementById("peso-result");
  if (!(kg > 0) || !(mgkg > 0)) return (out.textContent = "Preencha os campos com valores > 0.");
  out.textContent = `Dose total: ${fmt(kg * mgkg)} mg`;
}

// Gotejamento: gtt/min = (volume × fator) ÷ tempo
function calcGotejamento() {
  const vol = toNum(document.getElementById("got-vol").value);
  const timeMin = toNum(document.getElementById("got-time").value);
  const drop = toNum(document.getElementById("got-drop").value);
  const out = document.getElementById("got-result");
  if (!(vol > 0) || !(timeMin > 0) || !(drop > 0)) return (out.textContent = "Preencha os campos com valores > 0.");
  out.textContent = `Gotejamento: ${fmt((vol * drop) / timeMin)} gtt/min`;
}

// Antibiótico: volume = dose / concentração do frasco
function calcAntibiotico() {
  const dose = toNum(document.getElementById("anti-dose").value);
  const frasco = toNum(document.getElementById("anti-frasco").value);
  const out = document.getElementById("anti-result");
  if (!(dose > 0) || !(frasco > 0)) return (out.textContent = "Preencha os campos com valores > 0.");
  out.textContent = `Volume necessário: ${fmt(dose / frasco)} mL`;
}

// Injetável: volume = dose / concentração
function calcInjetavel() {
  const dose = toNum(document.getElementById("inj-dose").value);
  const conc = toNum(document.getElementById("inj-conc").value);
  const out = document.getElementById("inj-result");
  if (!(dose > 0) || !(conc > 0)) return (out.textContent = "Preencha os campos com valores > 0.");
  out.textContent = `Volume necessário: ${fmt(dose / conc)} mL`;
}

// Insulina: volume = dose (UI) / concentração (UI/mL)
function calcInsulina() {
  const dose = toNum(document.getElementById("insu-dose").value);
  const conc = toNum(document.getElementById("insu-conc").value);
  const out = document.getElementById("insu-result");
  if (!(dose > 0) || !(conc > 0)) return (out.textContent = "Preencha os campos com valores > 0.");
  out.textContent = `Volume (seringa): ${fmt(dose / conc)} mL`;
}

// Glicose (%): C1·V1 = C2·V2 → V1 = (C2·V2)/C1; diluente = V2 − V1
function calcGlicose() {
  const c1 = toNum(document.getElementById("glu-c1").value); // estoque %
  const c2 = toNum(document.getElementById("glu-c2").value); // desejada %
  const v2 = toNum(document.getElementById("glu-v2").value); // volume final mL
  const out = document.getElementById("glu-result");

  if (!(c1 > 0) || !(c2 > 0) || !(v2 > 0)) {
    out.textContent = "Preencha C1, C2 e V2 com valores > 0.";
    return;
  }
  if (c2 > c1) {
    out.textContent = "A concentração desejada (C2) não pode ser maior que a de estoque (C1).";
    return;
  }
  const v1 = (c2 * v2) / c1;       // mL de solução estoque
  const diluente = v2 - v1;         // mL de diluente (SF/água)
  out.textContent = `Usar ${fmt(v1)} mL da glicose ${fmt(c1,0)}% + ${fmt(diluente)} mL de diluente para obter ${fmt(v2,0)} mL a ${fmt(c2,0)}%.`;
}

// Google search
function buscarGoogle() {
  const q = document.getElementById("google-query").value.trim();
  if (!q) return;
  window.open("https://www.google.com/search?q=" + encodeURIComponent(q), "_blank", "noopener,noreferrer");
}
