# Metaprobity Website - Deployment Guide

This guide will help you deploy the Metaprobity website to your Namecheap hosting.

## Files Overview

```
metaprobity-website/
├── index.html          # Main website page
├── styles.css          # Website styling
├── script.js           # Interactive features
├── README.md           # This file
└── .htaccess          # Apache configuration (optional)
```

## Prerequisites

- Domain name: **metaprobity.com** (registered with Namecheap)
- Web hosting plan with Namecheap (cPanel recommended)
- FTP/SFTP access credentials
- GridSense-AI backend running (for live dashboard)

---

## Option 1: Deploy to Namecheap Shared Hosting (cPanel)

### Step 1: Access cPanel

1. Log in to your Namecheap account
2. Go to **Hosting List** → **Manage** for your hosting plan
3. Click **cPanel** to access the control panel

### Step 2: Upload Files via File Manager

1. In cPanel, open **File Manager**
2. Navigate to `public_html` directory
3. Upload all website files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `.htaccess` (if using)

4. Set proper permissions:
   - Files: `644`
   - Directories: `755`

### Step 3: Configure Dashboard Connection

Since the dashboard requires the GridSense-AI backend running on `localhost:8001`, you have two options:

**Option A: Host Backend on Same Server**
- Deploy the GridSense-AI application to your server
- Update the iframe src in `index.html` to point to your domain

**Option B: Use Cloud/VPS for Backend**
- Deploy GridSense-AI to AWS, Azure, or DigitalOcean
- Update dashboard iframe URL to your backend URL
- Configure CORS in `src/web_api.py`

### Step 4: Update Configuration

Edit `index.html` line 137:
```html
<!-- Change from localhost to your actual backend URL -->
<iframe id="dashboard-frame" src="https://api.metaprobity.com/dashboard_enhanced.html" frameborder="0" allowfullscreen></iframe>
```

---

## Option 2: Deploy to Namecheap VPS/Dedicated Server

### Step 1: Connect via SSH

```bash
ssh root@your-server-ip
```

### Step 2: Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install Python 3.11+ for GridSense-AI backend
sudo apt install python3.11 python3.11-venv python3-pip -y

# Install Node.js (optional, for any build tools)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y
```

### Step 3: Setup Website Directory

```bash
# Create website directory
sudo mkdir -p /var/www/metaprobity.com

# Set ownership
sudo chown -R $USER:$USER /var/www/metaprobity.com

# Upload files using SCP or SFTP
scp -r metaprobity-website/* user@your-server-ip:/var/www/metaprobity.com/
```

### Step 4: Configure Nginx

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/metaprobity.com
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name metaprobity.com www.metaprobity.com;
    root /var/www/metaprobity.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Proxy API requests to GridSense-AI backend
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve dashboard from backend
    location /dashboard_enhanced.html {
        proxy_pass http://localhost:8001;
    }

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/metaprobity.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 5: Install SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d metaprobity.com -d www.metaprobity.com
```

### Step 6: Deploy GridSense-AI Backend

```bash
# Navigate to home directory
cd ~

# Clone repository
git clone https://github.com/hushare1/GRIDSENSE-STREAM-AI.git
cd GRIDSENSE-STREAM-AI

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run as background service
nohup python3 run_integrated.py > gridsense.log 2>&1 &
```

### Step 7: Create Systemd Service (Production)

Create service file:

```bash
sudo nano /etc/systemd/system/gridsense-ai.service
```

Add:

```ini
[Unit]
Description=GridSense-AI Pro Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/home/user/GRIDSENSE-STREAM-AI
Environment="PATH=/home/user/GRIDSENSE-STREAM-AI/venv/bin"
ExecStart=/home/user/GRIDSENSE-STREAM-AI/venv/bin/python3 run_integrated.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable gridsense-ai
sudo systemctl start gridsense-ai
sudo systemctl status gridsense-ai
```

---

## Option 3: Deploy Using Docker (Recommended for Production)

### Create Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 8001

# Run application
CMD ["python3", "run_integrated.py"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  gridsense-backend:
    build: ./GRIDSENSE-STREAM-AI
    ports:
      - "8001:8001"
    restart: always
    environment:
      - PYTHONUNBUFFERED=1
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./metaprobity-website:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - gridsense-backend
    restart: always
```

### Deploy

```bash
docker-compose up -d
```

---

## Domain Configuration (Namecheap)

### Point Domain to Your Server

1. Log in to Namecheap
2. Go to **Domain List** → **Manage** for metaprobity.com
3. Click **Advanced DNS**
4. Add A Records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | Your-Server-IP | Automatic |
| A Record | www | Your-Server-IP | Automatic |

5. Wait 15-30 minutes for DNS propagation

### Verify DNS

```bash
nslookup metaprobity.com
dig metaprobity.com
```

---

## Testing Your Deployment

1. **Test Website**: Visit `https://metaprobity.com`
2. **Test Dashboard**: Check the live dashboard section
3. **Test API**: Visit `https://metaprobity.com/api/latest`
4. **Test SSL**: Verify HTTPS is working
5. **Mobile Test**: Check responsive design

### Browser Console Check

```javascript
// Open browser console and check for errors
console.log('Testing Metaprobity website...');
```

---

## Performance Optimization

### Enable Caching (.htaccess for cPanel)

Create `.htaccess` file:

```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

### CDN (Optional)

Consider using Cloudflare for:
- DDoS protection
- Global CDN
- Free SSL
- Performance optimization

---

## Monitoring & Maintenance

### Check Backend Status

```bash
# View logs
tail -f gridsense.log

# Check service status
sudo systemctl status gridsense-ai

# Monitor resources
htop
```

### Backup Strategy

```bash
# Backup website files
tar -czf metaprobity-backup-$(date +%Y%m%d).tar.gz /var/www/metaprobity.com

# Backup database (if any)
# mysqldump -u root -p database_name > backup.sql
```

### Update Deployment

```bash
# Pull latest changes
cd ~/GRIDSENSE-STREAM-AI
git pull origin main

# Restart service
sudo systemctl restart gridsense-ai
```

---

## Troubleshooting

### Dashboard Not Loading

1. Check backend is running: `curl http://localhost:8001/api/latest`
2. Verify CORS settings in `src/web_api.py`
3. Check browser console for errors
4. Verify iframe src URL is correct

### SSL Certificate Issues

```bash
# Renew certificate
sudo certbot renew --dry-run
sudo certbot renew
```

### High Traffic Performance

- Enable Nginx caching
- Use Redis for session storage
- Scale with load balancer
- Consider cloud hosting (AWS, Azure, GCP)

---

## Support

For questions or issues:
- Email: [email protected]
- GitHub: https://github.com/hushare1/GRIDSENSE-STREAM-AI
- Documentation: Check README.md in GridSense-AI repo

---

## Production Checklist

- [ ] Domain DNS configured
- [ ] SSL certificate installed
- [ ] Backend service running
- [ ] Website files uploaded
- [ ] Dashboard iframe configured
- [ ] API endpoints tested
- [ ] Mobile responsiveness verified
- [ ] Performance optimization enabled
- [ ] Backup strategy in place
- [ ] Monitoring setup
- [ ] Contact form working
- [ ] Analytics configured (optional)

---

**Version:** 1.0  
**Last Updated:** January 2026  
**Author:** Metaprobity
