// Dashboard-specific JavaScript

// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Dashboard iframe health check
function checkDashboardHealth() {
    const iframe = document.getElementById('dashboard-frame');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'dashboard-loading';
    loadingIndicator.innerHTML = `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 10;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">⚡</div>
            <div style="font-size: 1.2rem; font-weight: 600; color: #6366f1; margin-bottom: 0.5rem;">Loading Dashboard...</div>
            <div style="color: #6b7280;">Connecting to GridSense-AI</div>
        </div>
    `;
    loadingIndicator.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: white; z-index: 5;';

    if (iframe) {
        const container = iframe.parentElement;
        
        // Show loading indicator
        container.appendChild(loadingIndicator);

        // Auto-hide loading after 3 seconds regardless of load event
        const hideLoading = () => {
            loadingIndicator.style.opacity = '0';
            loadingIndicator.style.transition = 'opacity 0.5s ease-in-out';
            setTimeout(() => {
                if (loadingIndicator.parentElement) {
                    loadingIndicator.remove();
                }
            }, 500);
        };

        // Handle iframe load
        iframe.addEventListener('load', function() {
            setTimeout(hideLoading, 500);
        });

        // Fallback: hide loading after 3 seconds
        setTimeout(hideLoading, 3000);

        // Handle iframe error
        iframe.addEventListener('error', function() {
            loadingIndicator.innerHTML = `
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <div style="font-size: 1.2rem; font-weight: 600; color: #ef4444; margin-bottom: 0.5rem;">Connection Error</div>
                    <div style="color: #6b7280; margin-bottom: 1.5rem;">Unable to load the dashboard. The service may be starting up.</div>
                    <button onclick="location.reload()" style="padding: 0.75rem 1.5rem; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                        Retry
                    </button>
                </div>
            `;
        });
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    checkDashboardHealth();

    // Add fade-in animation to info sections
    const infoSections = document.querySelectorAll('.info-section');
    infoSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
});

// Refresh dashboard periodically (optional - the dashboard itself auto-updates)
// Uncomment if you want to force iframe refresh
/*
setInterval(function() {
    const iframe = document.getElementById('dashboard-frame');
    if (iframe) {
        // Check if dashboard is responsive
        console.log('Dashboard running at:', iframe.src);
    }
}, 30000); // Every 30 seconds
*/

// Add keyboard shortcut to refresh dashboard (Ctrl+R or Cmd+R)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        const iframe = document.getElementById('dashboard-frame');
        if (iframe && document.activeElement !== iframe) {
            e.preventDefault();
            iframe.src = iframe.src; // Force reload
        }
    }
});

// Track dashboard visibility
let isVisible = true;
document.addEventListener('visibilitychange', function() {
    isVisible = !document.hidden;
    if (isVisible) {
        console.log('Dashboard page is now visible');
    } else {
        console.log('Dashboard page is now hidden');
    }
});

// Log dashboard initialization
console.log('GridSense-AI Dashboard initialized');
console.log('Backend URL:', 'https://gridsense-ai.onrender.com/');
