// Alternar abas estilo celular
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
const toNum = v => {
  const n = parseFloat(v);
  return isFinite(n) ? n : NaN;
};
const fmt = (n, d = 2) => (isFinite(n) ? Number(n).toFixed(d) : "—");
const setVal = (id, v) => (document.getElementById(id).value = v);

// =====================
// Líquidos
// =====================
function calcLiquidos() {
  const dose = toNum(document.getElementById("liq-dose").value);
  const conc = toNum(document.getElementById("liq-conc").value);
  const out = document.getElementById("liq-result");

  if (!(dose > 0) || !(conc > 0)) {
    out.innerHTML = "<span class='danger'>⚠️ Preencha os campos com valores válidos.</span>";
    return;
  }

  const vol = dose / conc;
  out.innerHTML = `
    <strong>Fórmula:</strong> Volume = Dose ÷ Concentração<br>
    <strong>Resultado:</strong> ${fmt(vol)} mL
  `;

  if (vol < 0.5 || vol > 20) {
    out.innerHTML += "<br><span class='danger'>⚠️ Valor fora da faixa comum, confira novamente.</span>";
  } else {
    out.innerHTML += "<br><span class='safe'>✅ Valor dentro da faixa esperada.</span>";
  }
}

function treinoLiquidos() {
  const dose = Math.floor(Math.random() * 500) + 50; // 50–550 mg
  const conc = Math.floor(Math.random() * 50) + 10;  // 10–60 mg/mL
  setVal("liq-dose", dose);
  setVal("liq-conc", conc);
  calcLiquidos();
}

// =====================
// Sólidos
// =====================
function calcSolidos() {
  const dose = toNum(document.getElementById("sol-dose").value);
  const strength = toNum(document.getElementById("sol-strength").value);
  const out = document.getElementById("sol-result");

  if (!(dose > 0) || !(strength > 0)) {
    out.innerHTML = "<span class='danger'>⚠️ Preencha os campos com valores válidos.</span>";
    return;
  }

  const units = dose / strength;
  out.innerHTML = `
    <strong>Fórmula:</strong> Unidades = Dose ÷ Força<br>
    <strong>Resultado:</strong> ${fmt(units)}
  `;

  if (units > 10) {
    out.innerHTML += "<br><span class='danger'>⚠️ Número alto de unidades, confira a prescrição.</span>";
  } else {
    out.innerHTML += "<br><span class='safe'>✅ Valor dentro da faixa esperada.</span>";
  }
}

function treinoSolidos() {
  const dose = Math.floor(Math.random() * 1000) + 100; // 100–1100 mg
  const strengthOptions = [125, 250, 500];
  const strength = strengthOptions[Math.floor(Math.random() * strengthOptions.length)];
  setVal("sol-dose", dose);
  setVal("sol-strength", strength);
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

  if (!(vol > 0) || !(timeH > 0) || !(drop > 0)) {
    out.innerHTML = "<span class='danger'>⚠️ Preencha volume, tempo e fator com valores válidos.</span>";
    return;
  }

  const mlPerHour = vol / timeH;
  const gttPerMin = (vol * drop) / (timeH * 60);

  out.innerHTML = `
    <strong>Fórmulas:</strong><br>
    • mL/h = Volume ÷ Tempo (h)<br>
    • gtt/min = (Volume × Fator) ÷ (Tempo × 60)<br>
    <strong>Resultados:</strong> ${fmt(mlPerHour)} mL/h | ${fmt(gttPerMin)} gtt/min
  `;

  if (mlPerHour < 10 || mlPerHour > 250) {
    out.innerHTML += "<br><span class='danger'>⚠️ Taxa fora de faixa comum, ajuste conforme protocolo.</span>";
  } else {
    out.innerHTML += "<br><span class='safe'>✅ Taxa dentro de faixa usual.</span>";
  }
}

function treinoInfusao() {
  const vol = [250, 500, 1000][Math.floor(Math.random() * 3)];
  const timeH = [1, 2, 4, 8][Math.floor(Math.random() * 4)];
  const drop = [10, 15, 20, 60][Math.floor(Math.random() * 4)];
  setVal("inf-vol", vol);
  setVal("inf-time", timeH);
  setVal("inf-drop", drop);
  calcInfusao();
}

// =====================
// Peso
// =====================
function calcPeso() {
  const kg = toNum(document.getElementById("peso-kg").value);
  const mgkg = toNum(document.getElementById("peso-mgkg").value);
  const out = document.getElementById("peso-result");

  if (!(kg > 0) || !(mgkg > 0)) {
    out.innerHTML = "<span class='danger'>⚠️ Preencha peso e dose por kg com valores válidos.</span>";
    return;
  }

  const total = kg * mgkg;
  out.innerHTML = `
    <strong>Fórmula:</strong> Dose total = Peso × Dose por kg<br>
    <strong>Resultado:</strong> ${fmt(total)} mg
  `;

  // Faixa genérica de alerta (ajuste conforme protocolo específico)
  if (total < 10 || total > 5000) {
    out.innerHTML += "<br><span class='danger'>⚠️ Valor fora de faixa comum, confirme protocolo.</span>";
  } else {
    out.innerHTML += "<br><span class='safe'>✅ Valor dentro de faixa usual.</span>";
  }
}

function treinoPeso() {
  const kg = Math.floor(Math.random() * 60) + 40;   // 40–100 kg
  const mgkg = Math.floor(Math.random() * 10) + 5;  // 5–15 mg/kg
  setVal("peso-kg", kg);
  setVal("peso-mgkg", mgkg);
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

  if (!(vol > 0) || !(timeMin > 0) || !(drop > 0)) {
    out.innerHTML = "<span class='danger'>⚠️ Preencha volume, tempo e fator com valores válidos.</span>";
    return;
  }

  const gttPerMin = (vol * drop) / timeMin;
  out.innerHTML = `
    <strong>Fórmula:</strong> gtt/min = (Volume × Fator) ÷ Tempo (min)<br>
    <strong>Resultado:</strong> ${fmt(gttPerMin)} gtt/min
  `;

  if (gttPerMin < 5 || gttPerMin > 200) {
    out.innerHTML += "<br><span class='danger'>⚠️ Gotejamento fora de faixa comum, ajuste conforme dispositivo.</span>";
  } else {
    out.innerHTML += "<br><span class='safe'>✅ Gotejamento dentro de faixa usual.</span>";
  }
}

function treinoGotejamento() {
  const vol = [250, 500, 1000][Math.floor(Math.random() * 3)];
  const timeMin = [60, 120, 240][Math.floor(Math.random() * 3)];
  const drop = [10, 15, 20, 60][Math.floor(Math.random() * 4)];
  setVal("got-vol", vol);
  setVal("got-time", timeMin);
  setVal("got-drop", drop);
  calcGotejamento();
}

// =====================
// Antibiótico
// =====================
function calcAntibiotico() {
  const dose = toNum(document.getElementById("anti-dose").value);
  const frasco = toNum(document.getElementById("anti-frasco").value);
  const out = document.getElementById("anti-result");

  if (!(dose > 0) || !(frasco > 0)) {
    out.innerHTML = "<span class='danger'>⚠️ Preencha dose e concentração do frasco com valores válidos.</span>";
    return;
  }

  const vol = dose / frasco;
  out.innerHTML = `
    <strong>Fórmula:</strong> Volume = Dose ÷ Concentração do frasco<br>
    <strong>Resultado:</strong> ${fmt(vol)} mL
  `;

  if (vol < 0.5 || vol > 50) {
    out.innerHTML += "<br><span class='danger'>⚠️ Volume fora de faixa comum, confirme reconstituição/diluição.</span>";
  } else {
    out.innerHTML += "<br><span class='safe'>✅ Volume dentro de faixa usual.</span>";
  }
}

function treinoAntibiotico() {
  const dose = [250, 500, 1000, 2000][Math.floor(Math.random() * 4)];
  const frasco = [100, 250, 500][Math.floor(Math.random() * 3)]; // mg/mL
  setVal("anti-dose", dose);
  setVal("anti-frasco", frasco);
  calcAntibiotico();
}

// =====================
// Injetável
// =====================
function calcInjetavel() {
  const dose = toNum(document.getElementById("inj-dose").value);
  const conc = toNum(document.getElementById("inj-conc").value);
  const out = document.getElementById("inj-result");

  if (!(dose > 0) || !(conc > 0)) {
    out.innerHTML = "<span class='danger'>⚠️ Preencha dose e concentração com valores válidos.</span>";
    return;
  }

  const vol = dose / conc;
  out.innerHTML = `
    <strong>Fórmula:</strong> Volume = Dose ÷ Concentração<br>
    <strong>Resultado:</strong> ${fmt(vol)} mL
  `;

  if (vol < 0.1 || vol > 10) {
    out.innerHTML += "<br><span class='danger'>⚠️ Volume fora de faixa comum, confira seringa e via.</span>";
  } else {
    out.innerHTML += "<br><span class='safe'>✅ Volume dentro de faixa usual.</span>";
  }
}

function treinoInjetavel() {
  const dose = Math.floor(Math.random() * 90) + 10; // 10–100 mg
  const conc = [10, 25, 50, 100][Math.floor(Math.random() * 4)]; // mg/mL
  setVal("inj-dose", dose);
  setVal("inj-conc", conc);
  calcInjetavel();
}

// =====================
// Insulina
// =====================
function calcInsulina() {
  const dose = toNum(document.getElementById("insu-dose").value);
  const conc = toNum(document.getElementById("insu-conc").value);
  const out = document.getElementById("insu-result");

  if (!(dose > 0) || !(conc > 0)) {
    out.innerHTML = "<span class='danger'>⚠️ Preencha dose e concentração com valores válidos.</span>";
    return;
  }

  const vol = dose / conc; // UI / (UI/mL) = mL
  out.innerHTML = `
    <strong>Fórmula:</strong> Volume = Dose (UI) ÷ Concentração (UI/mL)<br>
    <strong>Resultado:</strong> ${fmt(vol, 3)} mL
  `;

  // Observação: seringas de insulina U-100 → 100 UI/mL
  if (conc !== 100) {
    out.innerHTML += "<br><span class='danger'>⚠️ Atenção: verifique se a seringa é compatível com a concentração (ex.: U-100).</span>";
  } else {
    out.innerHTML += "<br><span class='safe'>✅ Concentração U-100 usual.</span>";
  }
}

function treinoInsulina() {
  const dose = [4, 6, 8, 10, 12, 16, 20][Math.floor(Math.random() * 7)];
  const conc = [100, 200][Math.floor(Math.random() * 2)]; // UI/mL
  setVal("insu-dose", dose);
  setVal("insu-conc", conc);
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

  if (!(c1 > 0) || !(c2 > 0) || !(v2 > 0)) {
    out.innerHTML = "<span class='danger'>⚠️ Preencha C1, C2 e V2 com valores válidos.</span>";
    return;
  }
  if (c2 > c1) {
    out.innerHTML = "<span class='danger'>⚠️ C2 não pode ser maior que C1 (estoque).</span>";
    return;
  }

  // C1·V1 = C2·V2 → V1 = (C2·V2)/C1
  const v1 = (c2 * v2) / c1;       // mL de solução estoque
  const diluente = v2 - v1;         // mL de diluente (SF/água)
  out.innerHTML = `
    <strong>Fórmula:</strong> C1·V1 = C2·V2 → V1 = (C2·V2)/C1<br>
    <strong>Resultado:</strong> Usar ${fmt(v1)} mL da glicose ${fmt(c1,0)}% + ${fmt(diluente)} mL de diluente para obter ${fmt(v2,0)} mL a ${fmt(c2,0)}%.
  `;

  if (v1 < 1 || diluente < 1) {
    out.innerHTML += "<br><span class='danger'>⚠️ Volumes muito baixos, ajuste para precisão.</span>";
  } else {
    out.innerHTML += "<br><span class='safe'>✅ Valores plausíveis para preparo.</span>";
  }
}

function treinoGlicose() {
  const c1 = [50, 25][Math.floor(Math.random() * 2)]; // estoque 50% ou 25%
  const c2 = [5, 10, 15][Math.floor(Math.random() * 3)];
  const v2 = [250, 500, 1000][Math.floor(Math.random() * 3)];
  setVal("glu-c1", c1);
  setVal("glu-c2", c2);
  setVal("glu-v2", v2);
  calcGlicose();
}

// =====================
// Google
// =====================
function buscarGoogle() {
  const q = document.getElementById("google-query").value.trim();
  if (!q) return;
  window.open("https://www.google.com/search?q=" + encodeURIComponent(q), "_blank", "noopener,noreferrer");
}
