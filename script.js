// Alternar abas
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
    const target = document.getElementById(btn.dataset.tab);
    if (target) target.classList.remove("hidden");
  });
});

// Utilidades
const toNum = v => parseFloat(v) || NaN;
const fmt = (n, d = 2) => (isFinite(n) ? Number(n).toFixed(d) : "—");
const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };

// =====================
// Líquidos
// =====================
function calcLiquidos() {
  const dose = toNum(document.getElementById("liq-dose").value);
  const conc = toNum(document.getElementById("liq-conc").value);
  const out = document.getElementById("liq-result");
  if (!(dose > 0) || !(conc > 0)) { out.textContent = "⚠️ Preencha os campos."; return; }
  const vol = dose / conc;
  out.innerHTML = `Fórmula: Volume = Dose ÷ Concentração<br><strong>Resultado:</strong> ${fmt(vol)} mL`;
  out.innerHTML += vol < 0.5 || vol > 20
    ? "<br><span class='danger'>⚠️ Valor fora da faixa comum, confira.</span>"
    : "<br><span class='safe'>✅ Valor dentro da faixa esperada.</span>";
}
function treinoLiquidos() {
  setVal("liq-dose", Math.floor(Math.random() * 500) + 50);
  setVal("liq-conc", Math.floor(Math.random() * 50) + 10);
  calcLiquidos();
}

// =====================
// Sólidos
// =====================
function calcSolidos() {
  const dose = toNum(document.getElementById("sol-dose").value);
  const strength = toNum(document.getElementById("sol-strength").value);
  const out = document.getElementById("sol-result");
  if (!(dose > 0) || !(strength > 0)) { out.textContent = "⚠️ Preencha os campos."; return; }
  const units = dose / strength;
  out.innerHTML = `Fórmula: Unidades = Dose ÷ Força<br><strong>Resultado:</strong> ${fmt(units)} unidades`;
  out.innerHTML += units > 10
    ? "<br><span class='danger'>⚠️ Número alto de unidades, confira a prescrição.</span>"
    : "<br><span class='safe'>✅ Valor dentro da faixa esperada.</span>";
}
function treinoSolidos() {
  setVal("sol-dose", Math.floor(Math.random() * 1000) + 100);
  setVal("sol-strength", [125, 250, 500][Math.floor(Math.random() * 3)]);
  calcSolidos();
}

// =====================
// Infusão
// =====================
function calcInfusao() {
  const vol = toNum(document.getElementById("inf-vol").value);
  const timeH = toNum(document.getElementById("inf-time").value);
  const drop = toNum(document.getElementById("inf-drop").value);
  const out = document.getElementById("inf-result");
  if (!(vol > 0) || !(timeH > 0) || !(drop > 0)) { out.textContent = "⚠️ Preencha os campos."; return; }
  const mlh = vol / timeH;
  const gttmin = (vol * drop) / (timeH * 60);
  out.innerHTML = `
    <strong>Fórmulas:</strong><br>
    mL/h = Volume ÷ Tempo (h)<br>
    gtt/min = (Volume × Fator) ÷ (Tempo × 60)<br>
    <strong>Resultado:</strong> ${fmt(mlh)} mL/h | ${fmt(gttmin)} gtt/min
  `;
  out.innerHTML += mlh < 10 || mlh > 250
    ? "<br><span class='danger'>⚠️ Taxa fora de faixa comum, ajuste conforme protocolo.</span>"
    : "<br><span class='safe'>✅ Taxa dentro de faixa usual.</span>";
}
function treinoInfusao() {
  setVal("inf-vol", [250, 500, 1000][Math.floor(Math.random() * 3)]);
  setVal("inf-time", [1, 2, 4, 8][Math.floor(Math.random() * 4)]);
  setVal("inf-drop", [10, 15, 20, 60][Math.floor(Math.random() * 4)]);
  calcInfusao();
}

// =====================
// Peso
// =====================
function calcPeso() {
  const kg = toNum(document.getElementById("peso-kg").value);
  const mgkg = toNum(document.getElementById("peso-mgkg").value);
  const out = document.getElementById("peso-result");
  if (!(kg > 0) || !(mgkg > 0)) { out.textContent = "⚠️ Preencha os campos."; return; }
  const total = kg * mgkg;
  out.innerHTML = `Fórmula: Dose total = Peso × Dose/kg<br><strong>Resultado:</strong> ${fmt(total)} mg`;
  out.innerHTML += total < 10 || total > 5000
    ? "<br><span class='danger'>⚠️ Valor fora de faixa comum, confirme protocolo.</span>"
    : "<br><span class='safe'>✅ Valor dentro de faixa usual.</span>";
}
function treinoPeso() {
  setVal("peso-kg", Math.floor(Math.random() * 60) + 40);
  setVal("peso-mgkg", Math.floor(Math.random() * 10) + 5);
  calcPeso();
}

// =====================
// Gotejamento
// =====================
function calcGotejamento() {
  const vol = toNum(document.getElementById("got-vol").value);
  const timeMin = toNum(document.getElementById("got-time").value);
  const drop = toNum(document.getElementById("got-drop").value);
  const out = document.getElementById("got-result");
  if (!(vol > 0) || !(timeMin > 0) || !(drop > 0)) { out.textContent = "⚠️ Preencha os campos."; return; }
  const gttmin = (vol * drop) / timeMin;
  out.innerHTML = `Fórmula: gtt/min = (Volume × Fator) ÷ Tempo (min)<br><strong>Resultado:</strong> ${fmt(gttmin)} gtt/min`;
  out.innerHTML += gttmin < 5 || gttmin > 200
    ? "<br><span class='danger'>⚠️ Gotejamento fora de faixa comum, ajuste conforme dispositivo.</span>"
    : "<br><span class='safe'>✅ Gotejamento dentro de faixa usual.</span>";
}
function treinoGotejamento() {
  setVal("got-vol", [250, 500, 1000][Math.floor(Math.random() * 3)]);
  setVal("got-time", [60, 120, 240][Math.floor(Math.random() * 3)]);
  setVal("got-drop", [10, 15, 20, 60][Math.floor(Math.random() * 4)]);
  calcGotejamento();
}

// =====================
// Antibiótico
// =====================
function calcAntibiotico() {
  const dose = toNum(document.getElementById("anti-dose").value);
  const frasco = toNum(document.getElementById("anti-frasco").value);
  const out = document.getElementById("anti-result");
  if (!(dose > 0) || !(frasco > 0)) { out.textContent = "⚠️ Preencha os campos."; return; }
  const vol = dose / frasco;
  out.innerHTML = `Fórmula: Volume = Dose ÷ Concentração do frasco<br><strong>Resultado:</strong> ${fmt(vol)} mL`;
  out.innerHTML += vol < 0.5 || vol > 50
    ? "<br><span class='danger'>⚠️ Volume fora de faixa comum, confirme reconstituição/diluição.</span>"
    : "<br><span class='safe'>✅ Volume dentro de faixa usual.</span>";
}
function treinoAntibiotico() {
  setVal("anti-dose", [250, 500, 1000, 2000][Math.floor(Math.random() * 4)]);
  setVal("anti-frasco", [100, 250, 500][Math.floor(Math.random() * 3)]);
  calcAntibiotico();
}

// =====================
// Injetável
// =====================
function calcInjetavel() {
  const dose = toNum(document.getElementById("inj-dose").value);
  const conc = toNum(document.getElementById("inj-conc").value);
  const out = document.getElementById("inj-result");
  if (!(dose > 0) || !(conc > 0)) { out.textContent = "⚠️ Preencha os campos."; return; }
  const vol = dose / conc;
  out.innerHTML = `Fórmula: Volume = Dose ÷ Concentração<br><strong>Resultado:</strong> ${fmt(vol)} mL`;
  out.innerHTML += vol < 0.1 || vol > 10
    ? "<br><span class='danger'>⚠️ Volume fora de faixa comum, confira seringa e via.</span>"
    : "<br><span class='safe'>✅ Volume dentro de faixa usual.</span>";
}
function treinoInjetavel() {
  setVal("inj-dose", Math.floor(Math.random() * 90) + 10);
  setVal("inj-conc", [10, 25, 50, 100][Math.floor(Math.random() * 4)]);
  calcInjetavel();
}

// =====================
// Insulina
// =====================
function calcInsulina() {
  const dose = toNum(document.getElementById("insu-dose").value);
  const conc = toNum(document.getElementById("insu-conc").value);
  const out = document.getElementById("insu-result");
  if (!(dose > 0) || !(conc > 0)) { out.textContent = "⚠️ Preencha os campos."; return; }
  const vol = dose / conc; // UI / (UI/mL) = mL
  out.innerHTML = `Fórmula: Volume = Dose (UI) ÷ Concentração (UI/mL)<br><strong>Resultado:</strong> ${fmt(vol,3)} mL`;
  out.innerHTML += conc !== 100
    ? "<br><span class='danger'>⚠️ Atenção: verifique compatibilidade da seringa (ex.: U-100).</span>"
    : "<br><span class='safe'>✅ Concentração U-100 usual.</span>";
}
function treinoInsulina() {
  setVal("insu-dose", [4, 6, 8, 10, 12, 16, 20][Math.floor(Math.random() * 7)]);
  setVal("insu-conc", [100, 200][Math.floor(Math.random() * 2)]);
  calcInsulina();
}

// =====================
// Glicose (%)
// =====================
function calcGlicose() {
  const c1 = toNum(document.getElementById("glu-c1").value); // estoque %
  const c2 = toNum(document.getElementById("glu-c2").value); // desejada %
  const v2 = toNum(document.getElementById("glu-v2").value); // volume final mL
  const out = document.getElementById("glu-result");

  if (!(c1 > 0) || !(c2 > 0) || !(v2 > 0)) { out.textContent = "⚠️ Preencha C1, C2 e V2 com valores válidos."; return; }
  if (c2 > c1) { out.textContent = "⚠️ C2 não pode ser maior que C1 (estoque)."; return; }

  // C1·V1 = C2·V2 → V1 = (C2·V2)/C1
  const v1 = (c2 * v2) / c1;       // mL da solução estoque
  const diluente = v2 - v1;        // mL de diluente (SF/água)

  out.innerHTML = `
    <strong>Fórmula:</strong> C1·V1 = C2·V2 → V1 = (C2·V2)/C1<br>
    <strong>Resultado:</strong> Usar ${fmt(v1)} mL da glicose ${fmt(c1,0)}% + ${fmt(diluente)} mL de diluente para obter ${fmt(v2,0)} mL a ${fmt(c2,0)}%.
  `;
  out.innerHTML += (v1 < 1 || diluente < 1)
    ? "<br><span class='danger'>⚠️ Volumes muito baixos, ajuste para precisão.</span>"
    : "<br><span class='safe'>✅ Valores plausíveis para preparo.</span>";
}
function treinoGlicose() {
  setVal("glu-c1", [50, 25][Math.floor(Math.random() * 2)]);
  setVal("glu-c2", [5, 10, 15][Math.floor(Math.random() * 3)]);
  setVal("glu-v2", [250, 500, 1000][Math.floor(Math.random() * 3)]);
  calcGlicose();
}

// =====================
// Google
// =====================
function buscarGoogle() {
  const q = document.getElementById("google-query").value.trim();
  if (!q) { alert("Digite um termo para buscar."); return; }
  window.open("https://www.google.com/search?q=" + encodeURIComponent(q), "_blank", "noopener,noreferrer");
}
