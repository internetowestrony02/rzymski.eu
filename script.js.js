// Inicjalizacja danych demo - cennik i aktualności (puste do edycji przez admina)
// Struktura localStorage: 'rzymski_news' i 'rzymski_pricing'

document.addEventListener('DOMContentLoaded', function() {
    initData();
    loadNewsPreview();
    loadPricingPreview();
    setupMobileMenu();
});

function initData() {
    // Inicjalizacja przykładowych danych jeśli brak
    if (!localStorage.getItem('rzymski_news')) {
        const sampleNews = [
            { id: 1, title: "Nowe godziny przyjęć", date: "2025-03-15", content: "Od kwietnia przyjmuję również w środy popołudniu. Zapraszam do rejestracji." },
            { id: 2, title: "Udział w konferencji PTG", date: "2025-03-01", content: "W dniach 10-12 kwietnia udział w konferencji Polskiego Towarzystwa Ginekologicznego." },
            { id: 3, title: "Nowoczesne USG w gabinecie", date: "2025-02-20", content: "Wzbogaciliśmy sprzęt o nową głowicę do elastografii piersi." }
        ];
        localStorage.setItem('rzymski_news', JSON.stringify(sampleNews));
    }
    
    if (!localStorage.getItem('rzymski_pricing')) {
        const samplePricing = [
            { id: 1, name: "Konsultacja ginekologiczna", price: "200 zł" },
            { id: 2, name: "USG ginekologiczne", price: "180 zł" },
            { id: 3, name: "USG piersi + elastografia", price: "250 zł" },
            { id: 4, name: "Zakładanie wkładki wewnątrzmacicznej", price: "350 zł" }
        ];
        localStorage.setItem('rzymski_pricing', JSON.stringify(samplePricing));
    }
}

function loadNewsPreview() {
    const newsContainer = document.getElementById('news-list');
    if (!newsContainer) return;
    
    const news = JSON.parse(localStorage.getItem('rzymski_news') || '[]');
    if (news.length === 0) {
        newsContainer.innerHTML = '<p>Brak aktualności. Dodaj pierwsze wpisy w panelu admina.</p>';
        return;
    }
    
    const latestNews = news.slice(-3).reverse(); // ostatnie 3
    newsContainer.innerHTML = latestNews.map(item => `
        <div class="news-card">
            <div class="news-date">${formatDate(item.date)}</div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.content.substring(0, 120))}${item.content.length > 120 ? '...' : ''}</p>
        </div>
    `).join('');
}

function loadPricingPreview() {
    const pricingContainer = document.getElementById('pricing-list');
    if (!pricingContainer) return;
    
    const pricing = JSON.parse(localStorage.getItem('rzymski_pricing') || '[]');
    if (pricing.length === 0) {
        pricingContainer.innerHTML = '<p>Brak cennika. Dodaj pozycje w panelu admina.</p>';
        return;
    }
    
    const firstFour = pricing.slice(0, 4);
    pricingContainer.innerHTML = firstFour.map(item => `
        <div class="pricing-item">
            <span class="pricing-name">${escapeHtml(item.name)}</span>
            <span class="pricing-price">${escapeHtml(item.price)}</span>
        </div>
    `).join('');
}

function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pl-PL', options);
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function setupMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    if (btn && navList) {
        btn.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
        
        // Zamknij menu po kliknięciu linku
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    }
}

// Eksport dla ewentualnego użycia w admin.html (nie wymagane)
window.rzymskiData = {
    loadNewsPreview,
    loadPricingPreview,
    escapeHtml
};