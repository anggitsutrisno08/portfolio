# Workflow: Mengelola Konten Portfolio

Panduan lengkap untuk mengelola konten portfolio dan menyimpan gambar ke folder yang sesuai.

## 📋 Workflow Lengkap

### 1️⃣ **Input Konten via Admin Panel**

```bash
# Buka admin panel
open login.html

# Login
Username: admin
Password: 123

# Input data:
- Profile image
- Skills
- Experience
- Projects (dengan gambar)
- Certificates (dengan gambar)
- About Me description
- Contact info
```

### 2️⃣ **Download Gambar Otomatis**

Saat Anda upload gambar, browser akan **otomatis download** gambar tersebut:

#### **Profile Image:**
- Upload → Auto-download sebagai `profile-[timestamp].jpg`
- Save ke: `assets/images/profile/`

#### **Project Images:**
- Upload → Auto-download sebagai `project-name-1.jpg`, `project-name-2.jpg`, dll
- Save ke: `assets/images/projects/`

#### **Certificate Images:**
- Upload → Auto-download sebagai `cert-name-year.jpg`
- Save ke: `assets/images/certificates/`

### 3️⃣ **Organize File Downloads**

```bash
# Setelah upload, Anda akan punya file di Downloads folder
# Pindahkan ke folder yang sesuai:

# Profile images
mv ~/Downloads/profile-*.jpg assets/images/profile/

# Project images
mv ~/Downloads/project-*.jpg assets/images/projects/

# Certificate images
mv ~/Downloads/cert-*.jpg assets/images/certificates/
```

### 4️⃣ **Export Data JSON**

```bash
# Di admin panel
1. Klik "📥 Export Data"
2. Save file ke folder data/
3. File akan bernama: portfolio-data-YYYY-MM-DD.json
```

### 5️⃣ **Commit ke GitHub**

```bash
# Add semua file
git add assets/images/
git add data/portfolio-data-*.json

# Commit
git commit -m "Update portfolio content"

# Push
git push origin main
```

### 6️⃣ **Deploy Otomatis**

```
GitHub Pages akan otomatis deploy setelah push!
Website live di: https://username.github.io/portfolio/
```

## 🎯 **Tombol "💾 Download All Images"**

Jika Anda lupa download gambar saat upload, gunakan tombol ini:

```bash
# Di admin panel
1. Klik "💾 Download All Images"
2. Semua gambar akan di-download sekaligus
3. Organize ke folder yang sesuai
4. Commit & push
```

## 📊 **Struktur Folder Hasil**

```
portfolio-website/
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   │   └── profile-1234567890.jpg     ✅ Manual save
│   │   ├── projects/
│   │   │   ├── my-project-1.jpg           ✅ Manual save
│   │   │   └── my-project-2.jpg           ✅ Manual save
│   │   └── certificates/
│   │       └── cert-aws-2024.jpg          ✅ Manual save
│   └── cv/
│       └── cv-anggit.pdf                  ✅ Manual save (if any)
└── data/
    └── portfolio-data-2024-01-15.json     ✅ Export dari admin
```

## 🔄 **Update Konten (Workflow Harian)**

```bash
# 1. Edit konten
open login.html → Edit via admin panel

# 2. Download gambar baru (otomatis saat upload)
# Browser akan download otomatis

# 3. Organize downloads
mv ~/Downloads/new-image.jpg assets/images/projects/

# 4. Export data
Klik "📥 Export Data" → Save to data/

# 5. Commit & push
git add assets/ data/
git commit -m "Add new project"
git push

# 6. Done! Website updated
```

## 💡 **Tips & Best Practices**

### **Naming Convention:**
```
Profile:      profile-[timestamp].jpg
Projects:     [project-name]-[number].jpg
Certificates: cert-[name]-[year].jpg
Data:         portfolio-data-YYYY-MM-DD.json
```

### **Image Optimization:**
```bash
# Sebelum commit, compress gambar untuk performa lebih baik
# Gunakan tools:
- TinyPNG (https://tinypng.com)
- ImageOptim (Mac)
- Squoosh (https://squoosh.app)

# Target size: < 500KB per image
```

### **Git Workflow:**
```bash
# Commit frequently
git add assets/images/
git commit -m "Add project images"
git push

# Separate commits untuk data dan images
git add data/
git commit -m "Update portfolio data"
git push
```

## 🆘 **Troubleshooting**

### **Gambar tidak auto-download?**
```
1. Cek browser settings (allow downloads)
2. Gunakan tombol "💾 Download All Images"
3. Manual download dari localStorage (advanced)
```

### **File terlalu besar untuk GitHub?**
```bash
# GitHub limit: 100MB per file
# Repository limit: 1GB

# Solusi:
1. Compress images
2. Gunakan Git LFS untuk file besar
3. Host images di CDN (Cloudinary, ImgBB)
```

### **Lupa save gambar ke folder?**
```bash
# Gambar masih ada di localStorage
# Gunakan "💾 Download All Images" untuk download ulang
```

## 📱 **Workflow di Device Baru**

```bash
# 1. Clone repository
git clone https://github.com/username/portfolio.git
cd portfolio

# 2. Buka admin panel
open login.html

# 3. Import data
Klik "📤 Import Data" → Pilih file dari data/

# 4. Done! Semua konten restored
# Gambar sudah ada di folder assets/
```

## ✅ **Checklist Sebelum Push**

```
□ Gambar sudah di-save ke folder assets/images/
□ Data sudah di-export ke folder data/
□ Gambar sudah di-compress (< 500KB)
□ File naming sesuai convention
□ Test di localhost (open index.html)
□ git add, commit, push
□ Cek website live di GitHub Pages
```

## 🎉 **Summary**

```
Upload → Auto-download → Organize → Export → Commit → Push → Live!
```

Workflow ini memastikan:
- ✅ Semua gambar tersimpan sebagai file
- ✅ Data ter-backup di JSON
- ✅ Bisa di-commit ke GitHub
- ✅ Website selalu up-to-date
- ✅ Portable ke device lain
