// Dane początkowe (właściciel może to edytować)
let aktualnosciData = [
    {
        tytul: "Nowe wnętrza już wkrótce!",
        data: "2026-03-30",
        tresc: "Przygotowujemy dla Państwa odświeżone wnętrza. Już niedługo zaprezentujemy efekty remontu."
    },
    {
        tytul: "Promocja na wiosnę",
        data: "2026-03-25",
        tresc: "Skorzystaj z wiosennej promocji -10% na wszystkie usługi do końca kwietnia!"
    },
    {
        tytul: "Godziny otwarcia w święta",
        data: "2026-03-20",
        tresc: "W okresie świątecznym pracujemy w godzinach 9:00-15:00. Zapraszamy!"
    }
];

let cennikData = [
    { usluga: "Konsultacja", cena: "100 zł" },
    { usluga: "Usługa podstawowa", cena: "250 zł" },
    { usluga: "Pakiet premium", cena: "500 zł" },
    { usluga: "Usługa z dojazdem", cena: "od 150 zł" }
];

// Funkcje do wyświetlania stron
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Zapamiętanie w historii przeglądarki
    history.pushState({ page: pageId }, '', '#' + pageId);
    
    // Przewinięcie na górę
    window.scrollTo(0, 0);
}

// Funkcja do ładowania aktualności
function loadAktualnosci() {
    const container = document.getElementById('aktualnosci-lista');
    if (!container) return;
    
    container.innerHTML = '';
    
    aktualnosciData.forEach(akt => {
        const div = document.createElement('div');
        div.className = 'aktualnosc';
        div.innerHTML = `
            <div class="aktualnosc-content">
                <h3>${akt.tytul}</h3>
                <div class="data">${formatDate(akt.data)}</div>
                <p>${akt.tresc}</p>
            </div>
        `;
        container.appendChild(div);
    });
    
    // Jeśli brak aktualności
    if (aktualnosciData.length === 0) {
        container.innerHTML = '<p style="text-align:center;">Brak aktualności. Zapraszamy wkrótce!</p>';
    }
}

// Funkcja do ładowania cennika
function loadCennik() {
    const container = document.getElementById('cennik-tabela');
    if (!container) return;
    
    let html = '<table class="cennik-table"><thead><tr><th>Usługa</th><th>Cena</th></tr></thead><tbody>';
    
    cennikData.forEach(item => {
        html += `<tr><td>${item.usluga}</td><td>${item.cena}</td></tr>`;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Formatowanie daty
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Obsługa menu mobilnego
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}

// Obsługa linków social media (do uzupełnienia)
function updateSocialLinks(fbUrl, igUrl) {
    const fbLink = document.getElementById('fb-link');
    const igLink = document.getElementById('ig-link');
    if (fbLink && fbUrl) fbLink.href = fbUrl;
    if (igLink && igUrl) igLink.href = igUrl;
}

// Obsługa nawigacji wstecz/do przodu
window.onpopstate = function(event) {
    if (event.state && event.state.page) {
        showPage(event.state.page);
    } else {
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) {
            showPage(hash);
        } else {
            showPage('home');
        }
    }
};

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    loadAktualnosci();
    loadCennik();
    
    // Obsługa hash w URL
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
    
    // Tu później wstawisz linki do social media
    // updateSocialLinks('https://facebook.com/...', 'https://instagram.com/...');
});