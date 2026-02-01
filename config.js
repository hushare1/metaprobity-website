// GridSense-AI Backend Configuration
// Update this URL after deploying the backend to Render/Fly/DigitalOcean

const GRIDSENSE_CONFIG = {
    // Development (local)
    // backendUrl: 'http://localhost:8001',
    
    // Production - Update this after backend deployment
    // Replace with your actual backend URL from Render, Fly, or DigitalOcean
    backendUrl: 'https://gridsense-ai.onrender.com', // Example: Change after deployment
    
    // API endpoints
    endpoints: {
        health: '/api/health',
        latest: '/api/latest',
        bus: '/api/latest/bus',
        dashboard: '/dashboard_enhanced.html',
        simpleDashboard: '/simple'
    },
    
    // Polling interval for live data (milliseconds)
    pollInterval: 1000, // 1 second
    
    // Enable/disable live data fetching
    enableLiveData: true
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GRIDSENSE_CONFIG;
}
