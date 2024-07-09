document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
        document.querySelector('.admin-section').style.display = 'block';
        displayVisits();
    }

    // Track visitor data
    trackVisit();
});

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

function getDeviceType() {
    const parser = new UAParser();
    const result = parser.getResult();
    return result.device.type || 'PC';
}

async function trackVisit() {
    const ip = await getVisitorIP();
    if (!ip) return;

    const deviceType = getDeviceType();
    const visitTime = new Date().toLocaleString();

    let visits = JSON.parse(localStorage.getItem('visits')) || [];

    visits.push({ ip, visitTime, deviceType });

    localStorage.setItem('visits', JSON.stringify(visits));
    displayVisits();
}

function displayVisits() {
    const visits = JSON.parse(localStorage.getItem('visits')) || [];
    const tbody = document.getElementById('visitor-data');
    tbody.innerHTML = '';

    visits.forEach(visit => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${visit.ip}</td>
            <td>${visit.visitTime}</td>
            <td>${visit.deviceType}</td>
        `;
        tbody.appendChild(row);
    });
}
