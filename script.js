// Alternar abas
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(btn.dataset.tab).classList.remove("hidden");
  });
});

// Funções de cálculo
function calcLiquidos() {
  const dose = parseFloat(document.getElementById("liq-dose").value);
  const conc = parseFloat(document.getElementById("liq-conc").value);
  const result = dose / conc;
  document.getElementById("liq-result").innerText = `Volume: ${result.toFixed(2)} mL`;
}

function calcSolidos() {
  const dose = parseFloat(document.getElementById("sol-dose").value);
  const strength = parseFloat(document.getElementById("sol-strength").value);
  const result = dose / strength;
  document.getElementById("sol-result").innerText = `Unidades: ${result.toFixed(2)}`;
}

function calcInfusao() {
  const vol = parseFloat(document.getElementById("inf-vol").value);
  const time = parseFloat(document.getElementById("inf-time").value);
  const drop = parseFloat(document.getElementById("inf-drop").value);
  const mlh = vol / time;
  const gttmin = (vol * drop) / (time * 60);
  document.getElementById("inf-result").innerText = `Taxa: ${mlh.toFixed(2)} mL/h | ${gttmin.toFixed(2)} gtt/min`;
}

function calcPeso() {
  const kg = parseFloat(document.getElementById("peso-kg").value);
  const mgkg = parseFloat(document.getElementById("peso-mgkg").value);
  const result = kg * mgkg;
  document.getElementById("peso-result").innerText = `Dose total: ${result.toFixed(2)} mg`;
}

function buscarGoogle() {
  const q = document.getElementById("google-query").value;
  if (q) window.open("https://www.google.com/search?q=" + encodeURIComponent(q), "_blank");
}
