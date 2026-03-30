let aktualnosciData = [
    { tytul: "Nowa strona internetowa", data: "2026-03-30", tresc: "Witamy na naszej odświeżonej stronie. Znajdą Państwo wszystkie informacje o zakresie usług i kontakcie." },
    { tytul: "Szczepienia przeciw HPV", data: "2026-03-25", tresc: "Zachęcamy do zapoznania się z programem szczepień przeciw HPV. W gabinecie wykonujemy szczepienia dla dziewcząt i chłopców." }
];
let cennikData = [
    { usluga: "Konsultacja ginekologiczna", cena: "200 zł" },
    { usluga: "USG piersi + biopsja", cena: "300 zł" },
    { usluga: "Wizyta kontrolna w ciąży", cena: "180 zł" },
    { usluga: "Zabieg laparoskopowy", cena: "od 2500 zł" }
];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    history.pushState({ page: pageId }, '', '#' + pageId);
    window.scrollTo(0, 0);
}
function loadAktualnosci() {
    const container = document.getElementById('aktualnosci-lista');
    if (!container) return;
    const saved = localStorage.getItem('rzymski_aktualnosci');
    if (saved) aktualnosciData = JSON.parse(saved);
    container.innerHTML = '';
    aktualnosciData.forEach(a => {
        let div = document.createElement('div');
        div.className = 'aktualnosc';
        div.innerHTML = `<h3>${a.tytul}</h3><div class="data">${formatDate(a.data)}</div><p>${a.tresc}</p>`;
        container.appendChild(div);
    });
    if (aktualnosciData.length === 0) container.innerHTML = '<p>Brak aktualności. Zapraszamy wkrótce.</p>';
}
function loadCennik() {
    const container = document.getElementById('cennik-tabela');
    if (!container) return;
    const saved = localStorage.getItem('rzymski_cennik');
    if (saved) cennikData = JSON.parse(saved);
    let html = '<table class="cennik-table"><thead><tr><th>Usługa</th><th>Cena (orientacyjna)</th></tr></thead><tbody>';
    cennikData.forEach(u => { html += `<tr><td>${u.usluga}</td><td>${u.cena}</td></tr>`; });
    html += '</tbody></table>';
    container.innerHTML = html;
}
function formatDate(d) { return new Date(d).toLocaleDateString('pl-PL'); }
function toggleMenu() { document.querySelector('nav').classList.toggle('active'); }
function updateSocialLinks(fb, ig) {
    if (fb) document.getElementById('fb-link')?.setAttribute('href', fb);
    if (ig) document.getElementById('ig-link')?.setAttribute('href', ig);
}
window.onpopstate = (e) => {
    let hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) showPage(hash);
    else showPage('home');
};
document.addEventListener('DOMContentLoaded', () => {
    loadAktualnosci();
    loadCennik();
    let hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) showPage(hash);
    else showPage('home');
    updateSocialLinks(localStorage.getItem('rzymski_fb'), localStorage.getItem('rzymski_ig'));
});
