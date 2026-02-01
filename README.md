# Metaprobity Website

Professional website for **metaprobity.com** showcasing GridSense-AI Pro - Real-Time Power Grid Monitoring & Predictive Analytics.

## 🌐 Website Structure

```
metaprobity-website/
├── index.html          # Main landing page
├── styles.css          # Professional styling
├── script.js           # Interactive features
├── .htaccess          # Apache configuration
├── DEPLOYMENT.md       # Detailed deployment guide
└── README.md          # This file
```

## ✨ Features

- **Hero Section** - Compelling introduction with key metrics
- **Live Dashboard** - Embedded GridSense-AI dashboard with real-time updates
- **Feature Showcase** - Comprehensive product capabilities
- **Technical Details** - Architecture, performance metrics, and tech stack
- **Business Value** - ROI, use cases, and pricing information
- **Implementation Guide** - Quick start and deployment options
- **Contact Form** - Lead generation and support requests
- **Responsive Design** - Mobile-friendly layout
- **SEO Optimized** - Meta tags and semantic HTML

## 🚀 Quick Deploy

### For Namecheap Shared Hosting (cPanel)

1. Log in to your Namecheap hosting cPanel
2. Open File Manager → public_html
3. Upload all files from this directory
4. Configure dashboard URL in index.html (line 137)
5. Visit https://metaprobity.com

### For VPS/Cloud Hosting

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on:
- Nginx configuration
- SSL setup with Let's Encrypt
- GridSense-AI backend deployment
- Docker deployment
- Domain configuration

## 🔧 Configuration

### Update Dashboard URL

Edit `index.html` to point to your GridSense-AI backend:

```html
<!-- Line 137 -->
<iframe id="dashboard-frame" src="YOUR_BACKEND_URL/dashboard_enhanced.html"></iframe>
```

Options:
- **Same server**: `/dashboard_enhanced.html` or `http://localhost:8001`
- **Cloud backend**: `https://api.metaprobity.com/dashboard_enhanced.html`
- **Demo mode**: Point to existing demo instance

### Update Contact Information

Search and replace in `index.html`:
- Email addresses
- Social media links
- Company information

## 📱 Testing Locally

```bash
# Using Python
cd metaprobity-website
python3 -m http.server 8080

# Visit http://localhost:8080
```

Or use any local web server (Live Server extension in VS Code, etc.)

## 🎨 Customization

### Colors

Edit CSS variables in `styles.css` (lines 3-12):

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* Modify colors to match your brand */
}
```

### Content

All content is in `index.html` with clear section markers:
- Hero section
- Features
- Technical details
- Business value
- Pricing
- Contact information

## 📊 Performance

- Lightweight vanilla JavaScript (no frameworks)
- Optimized CSS with minimal dependencies
- Lazy loading for images
- Browser caching enabled
- Gzip compression

## 🔒 Security

- HTTPS enforced (when configured)
- Security headers in .htaccess
- XSS protection
- Content Security Policy ready
- CORS configuration for API

## 📈 Analytics (Optional)

Add Google Analytics or similar:

```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## 🐛 Troubleshooting

**Dashboard not showing:**
- Verify GridSense-AI backend is running
- Check iframe src URL
- Verify CORS settings on backend
- Check browser console for errors

**Contact form not working:**
- Add backend API endpoint
- Configure email service (SendGrid, Mailgun, etc.)
- Update script.js with proper form handling

**Styles not loading:**
- Clear browser cache
- Verify file paths are correct
- Check .htaccess permissions

## 📞 Support

- **Email**: [email protected]
- **GitHub**: https://github.com/hushare1/GRIDSENSE-STREAM-AI
- **Documentation**: See DEPLOYMENT.md

## 📝 License

This website template is part of the GridSense-AI Pro project and follows the same MIT License.

---

**Version:** 1.0.0  
**Last Updated:** January 2026  
**Deployed At:** https://metaprobity.com
