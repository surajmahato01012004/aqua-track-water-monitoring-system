let map;
let lastMarker = null;
let allMarkers = [];

function colorHexFromCategory(color) {
    if (color === 'success') return '#28a745';
    if (color === 'primary') return '#0d6efd';
    if (color === 'warning') return '#ffc107';
    if (color === 'danger') return '#dc3545';
    if (color === 'dark') return '#343a40';
    return '#343a40';
}

function addMarker(lat, lng, wqi, status, color) {
    if (lastMarker) {
        lastMarker.setMap(null);
    }

    const icon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: colorHexFromCategory(color),
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 10
    };

    lastMarker = new google.maps.Marker({
        position: { lat, lng },
        map,
        icon
    });

    const info = new google.maps.InfoWindow({
        content: `
            <div style="min-width:200px">
                <div class="fw-bold mb-1">Nearest Location</div>
                <div>Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}</div>
                <div class="mt-2">WQI: <span class="fw-bold">${wqi}</span></div>
                <div>Status: <span class="badge bg-${color}">${status}</span></div>
            </div>
        `
    });
    info.open(map, lastMarker);
}

function addLocationMarker(lat, lng, name, wqi, status, color) {
    const icon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: colorHexFromCategory(color),
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 8
    };
    const marker = new google.maps.Marker({ position: { lat, lng }, map, icon });
    const info = new google.maps.InfoWindow({
        content: `
            <div style="min-width:220px">
                <div class="fw-bold mb-1">${name || 'Location'}</div>
                <div>Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}</div>
                <div class="mt-2">WQI: <span class="fw-bold">${wqi ?? '-'}</span></div>
                <div>Status: <span class="badge bg-${color}">${status}</span></div>
            </div>
        `
    });
    marker.addListener('click', () => info.open(map, marker));
    allMarkers.push(marker);
}

async function fetchWqi(lat, lng) {
    const url = `/api/wqi?lat=${lat}&lng=${lng}`;
    const res = await fetch(url);
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
    }
    return res.json();
}

async function fetchLocations() {
    const res = await fetch('/api/locations');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

function initMap() {
    const center = { lat: 20.5937, lng: 78.9629 }; // Default: India centroid
    map = new google.maps.Map(document.getElementById('map'), {
        center,
        zoom: 5,
        mapTypeControl: false,
        streetViewControl: false
    });

    fetchLocations()
        .then(list => {
            list.forEach(item => {
                addLocationMarker(item.latitude, item.longitude, item.name, item.wqi, item.status, item.color);
            });
        })
        .catch(() => {});

    map.addListener('click', async (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        try {
            const result = await fetchWqi(lat, lng);
            addMarker(result.latitude, result.longitude, result.wqi, result.status, result.color);
            map.panTo({ lat: result.latitude, lng: result.longitude });
            map.setZoom(10);
        } catch (err) {
            alert(`No data available: ${err.message}`);
        }
    });
}

window.initMap = initMap;
