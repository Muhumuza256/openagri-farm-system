// Initialize the map
const map = L.map('farm-map').setView([0.3476, 32.5825], 13); // Kampala coordinates

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add drawing functionality
let drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Draw controls
document.getElementById('draw-polygon').addEventListener('click', () => {
    alert('Farm drawing mode activated. Click on the map to start drawing your farm boundaries.');
});

document.getElementById('add-marker').addEventListener('click', () => {
    alert('Click on the map to place a marker at important locations.');
});

document.getElementById('clear-map').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all drawings?')) {
        drawnItems.clearLayers();
    }
});

// Farm drawing simulation
const mainFarmCoords = [
    [0.350, 32.580], [0.355, 32.580], 
    [0.355, 32.590], [0.350, 32.590]
];

const northFarmCoords = [
    [0.360, 32.575], [0.365, 32.575], 
    [0.365, 32.585], [0.360, 32.585]
];

const southFarmCoords = [
    [0.340, 32.585], [0.345, 32.585], 
    [0.345, 32.595], [0.340, 32.595]
];

// Add farm polygons to map
const mainFarm = L.polygon(mainFarmCoords, {color: '#e74c3c'}).addTo(map)
    .bindPopup('Main Farm Area<br>12.5 acres');

const northFarm = L.polygon(northFarmCoords, {color: '#3498db'}).addTo(map)
    .bindPopup('North Fields<br>8.2 acres');

const southFarm = L.polygon(southFarmCoords, {color: '#2ecc71'}).addTo(map)
    .bindPopup('South Pasture<br>15.3 acres');

// Fit map to show all farms
const bounds = L.latLngBounds([...mainFarmCoords, ...northFarmCoords, ...southFarmCoords]);
map.fitBounds(bounds);

// Role management functionality
const roleTabs = document.querySelectorAll('.role-tab');
roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and content
        roleTabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.role-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const role = tab.dataset.role;
        document.getElementById(`${role}-content`).classList.add('active');
    });
});

// Farm item selection
const farmItems = document.querySelectorAll('.farm-item');
farmItems.forEach(item => {
    item.addEventListener('click', () => {
        const farm = item.dataset.farm;
        
        // Highlight farm on map
        if (farm === 'main') {
            map.fitBounds(mainFarm.getBounds());
            mainFarm.setStyle({weight: 5});
            northFarm.setStyle({weight: 2});
            southFarm.setStyle({weight: 2});
        } else if (farm === 'north') {
            map.fitBounds(northFarm.getBounds());
            mainFarm.setStyle({weight: 2});
            northFarm.setStyle({weight: 5});
            southFarm.setStyle({weight: 2});
        } else if (farm === 'south') {
            map.fitBounds(southFarm.getBounds());
            mainFarm.setStyle({weight: 2});
            northFarm.setStyle({weight: 2});
            southFarm.setStyle({weight: 5});
        }
    });
});

// Priority handling
const activities = document.querySelectorAll('.activity-item');
activities.forEach(activity => {
    activity.addEventListener('click', function() {
        const priority = this.querySelector('.activity-priority').classList[1];
        
        // Visual feedback for priority
        this.style.borderLeft = '4px solid';
        if (priority === 'priority-high') this.style.borderLeftColor = 'var(--danger)';
        else if (priority === 'priority-medium') this.style.borderLeftColor = 'var(--warning)';
        else this.style.borderLeftColor = 'var(--success)';
        
        setTimeout(() => {
            this.style.borderLeft = 'none';
        }, 1000);
    });
});

// Simple interactivity for the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Toggle navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Toggle switch functionality
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(switchInput => {
        switchInput.addEventListener('change', function() {
            const label = this.closest('.toggle-container').querySelector('.toggle-label');
            if(this.checked) {
                label.style.color = 'var(--success)';
            } else {
                label.style.color = '';
            }
        });
    });
    
    // Download button animation
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.color = 'var(--success)';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-download"></i>';
                this.style.color = 'var(--primary)';
            }, 2000);
        });
    });
});
