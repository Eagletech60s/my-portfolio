async function getVisitorIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }
}
async function trackVisit() {
    const ip = await getVisitorIP();
    if (!ip) return;

    let visits = JSON.parse(localStorage.getItem('visits')) || {};

    if (visits[ip]) {
        visits[ip].count += 1;
        visits[ip].lastVisit = new Date().toLocaleString();
    } else {
        visits[ip] = {
            count: 1,
            lastVisit: new Date().toLocaleString()
        };
    }

    localStorage.setItem('visits', JSON.stringify(visits));
    displayVisits(visits);
}

function displayVisits(visits) {
    const tbody = document.getElementById('visitor-data');
    tbody.innerHTML = '';

    for (const ip in visits) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ip}</td>
            <td>${visits[ip].count}</td>
            <td>${visits[ip].lastVisit}</td>
        `;
        tbody.appendChild(row);
    }
}

trackVisit();
