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
const toNum = v => {
  const n = parseFloat(v);
  return isFinite(n) ? n : NaN;
};
const fmt = (n, d = 2) => (isFinite(n) ? Number(n).toFixed(d) : "—");

// Líquidos: volume = dose / concentração
document.getElementById("liq-calc").addEventListener("click", () => {
  const dose = toNum(document.getElementById("liq-dose").value);
  const conc = toNum(document.getElementById("liq-conc").value);
  const out = document.getElementById("liq-result");

  if (!(dose > 0) || !(conc > 0)) {
    out.textContent = "Verifique os valores: dose e concentração devem ser maiores que zero.";
    return;
  }
  const vol = dose / conc;
  out.textContent = `Volume: ${fmt(vol)} mL`;
});

// Sólidos: unidades = dose / força
document.getElementById("sol-calc").addEventListener("click", () => {
  const dose = toNum(document.getElementById("sol-dose").value);
  const strength = toNum(document.getElementById("sol-strength").value);
  const out = document.getElementById("sol-result");

  if (!(dose > 0) || !(strength > 0)) {
    out.textContent = "Verifique os valores: dose e força devem ser maiores que zero.";
    return;
  }
  const units = dose / strength;
  out.textContent = `Unidades: ${fmt(units)}`;
});

// Infusão: mL/h e gtt/min
document.getElementById("inf-calc").addEventListener("click", () => {
  const vol = toNum(document.getElementById("inf-vol").value);
  const timeH = toNum(document.getElementById("inf-time").value);
  const drop = toNum(document.getElementById("inf-drop").value);
  const out = document.getElementById("inf-result");

  if (!(vol > 0) || !(timeH > 0) || !(drop > 0)) {
    out.textContent = "Verifique os valores: volume, tempo e fator devem ser maiores que zero.";
    return;
  }
  const mlPerHour = vol / timeH;
  const gttPerMin = (vol * drop) / (timeH * 60);
  out.textContent = `Taxa: ${fmt(mlPerHour)} mL/h | Gotejamento: ${fmt(gttPerMin)} gtt/min`;
});

// Peso: dose total = kg * mg/kg
document.getElementById("peso-calc").addEventListener("click", () => {
  const kg = toNum(document.getElementById("peso-kg").value);
  const mgkg = toNum(document.getElementById("peso-mgkg").value);
  const out = document.getElementById("peso-result");

  if (!(kg > 0) || !(mgkg > 0)) {
    out.textContent = "Verifique os valores: peso e dose por kg devem ser maiores que zero.";
    return;
  }
  const total = kg * mgkg;
  out.textContent = `Dose total: ${fmt(total)} mg`;
});

// Gotejamento: gtt/min = (volume × fator) ÷ tempo
document.getElementById("got-calc").addEventListener("click", () => {
  const vol = toNum(document.getElementById("got-vol").value);
  const timeMin = toNum(document.getElementById("got-time").value);
  const drop = toNum(document.getElementById("got-drop").value);
  const out = document.getElementById("got-result");

  if (!(vol > 0) || !(timeMin > 0) || !(drop > 0)) {
    out.textContent = "Verifique os valores: volume, tempo e fator devem ser maiores que zero.";
    return;
  }
  const gttPerMin = (vol * drop) / timeMin;
  out.textContent = `Gotejamento: ${fmt(gttPerMin)} gtt/min`;
});

// Antibiótico: volume = dose / concentração do frasco
document.getElementById("anti-calc").addEventListener("click", () => {
  const dose = toNum(document.getElementById("anti-dose").value);
  const frasco = toNum(document.getElementById("anti-frasco").value);
  const out = document.getElementById("anti-result");

  if (!(dose > 0) || !(frasco > 0)) {
    out.textContent = "Verifique os valores: dose e concentração do frasco devem ser maiores que zero.";
    return;
  }
  const vol = dose / frasco;
  out.textContent = `Volume necessário: ${fmt(vol)} mL`;
});

// Injetável: volume = dose / concentração
document.getElementById("inj-calc").addEventListener("click", () => {
  const dose = toNum(document.getElementById("inj-dose").value);
  const conc = toNum(document.getElementById("inj-conc").value);
  const out = document.getElementById("inj-result");

  if (!(dose > 0) || !(conc > 0)) {
    out.textContent = "Verifique os valores: dose e concentração devem ser maiores que zero.";
    return;
  }
  const vol = dose / conc;
  out.textContent = `Volume necessário: ${fmt(vol)} mL`;
});

// Insulina: volume = dose (UI) / concentração (UI/mL)
document.getElementById("insu-calc").addEventListener("click", () => {
  const dose = toNum(document.getElementById("insu-dose").value);
  const conc = toNum(document.getElementById("insu-conc").value);
  const out = document.getElementById("insu-result");

  if (!(dose > 0) || !(conc > 0)) {
    out.textContent = "Verifique os valores: dose e concentração devem ser maiores que zero.";
    return;
  }
  const vol = dose / conc;
  out.textContent = `Volume (seringa): ${fmt(vol)} mL`;
});

// Google search
document.getElementById("google-search").addEventListener("click", () => {
  const q = document.getElementById("google-query").value.trim();
  const out = document.getElementById("google-result");
  if (!q) {
    out.textContent = "Digite um termo para buscar.";
    return;
  }
  const url = "https://www.google.com/search?q=" + encodeURIComponent(q);
  window.open(url, "_blank", "noopener,noreferrer");
  out.textContent = `Abrindo busca por: ${q}`;
});
document.getElementById("google-clear").addEventListener("click", () => {
  document.getElementById("google-query").value = "";
  document.getElementById("google-result").textContent = "Digite um termo e clique em Buscar. A pesquisa abrirá em nova aba.";
});
