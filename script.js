

function loadProfileImage() {
    const profileImage = localStorage.getItem('profileImage');
    if (profileImage) {
        document.getElementById('heroProfileImage').src = profileImage;
        document.getElementById('aboutProfileImage').src = profileImage;
    } else {
        document.getElementById('heroProfileImage').src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="250"%3E%3Crect fill="%230f172a" width="250" height="250"/%3E%3Ctext fill="%2300ffff" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProfile%3C/text%3E%3C/svg%3E';
        document.getElementById('aboutProfileImage').src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%230f172a" width="200" height="200"/%3E%3Ctext fill="%2300ffff" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProfile%3C/text%3E%3C/svg%3E';
    }
    
    const aboutDescription = localStorage.getItem('aboutDescription');
    if (aboutDescription) {
        document.getElementById('aboutDescription').textContent = aboutDescription;
    }
}

function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('skills') || '[]');
    const container = document.getElementById('skillsContainer');
    
    if (skills.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No skills added yet.</p>';
        return;
    }

    window.allSkills = skills;
    displaySkills(skills);
}

function displaySkills(skills) {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = skills.map((skill, index) => `
        <div class="skill-item" style="animation-delay: ${index * 0.1}s">
            <div class="skill-name">
                <span>${skill.name}</span>
                <span>${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
        </div>
    `).join('');
}

function loadExperiences() {
    const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
    const container = document.getElementById('experienceContainer');
    
    if (experiences.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No experiences added yet.</p>';
        return;
    }

    window.allExperiences = experiences;
    displayExperiences(experiences);
}

function displayExperiences(experiences) {
    const container = document.getElementById('experienceContainer');
    container.innerHTML = experiences.map((exp, index) => `
        <div class="experience-item" style="animation-delay: ${index * 0.1}s; opacity: 0; animation: fadeInUp 0.6s ease forwards;">
            <h3>${exp.role}</h3>
            <div class="company">${exp.company}</div>
            <div class="date">${exp.date}</div>
            <p>${exp.description}</p>
        </div>
    `).join('');
}

function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const container = document.getElementById('portfolioContainer');
    
    if (projects.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No projects added yet.</p>';
        return;
    }

    window.allProjects = projects;
    
    const allTechs = new Set();
    projects.forEach(project => {
        const techs = project.tech.split(',').map(t => t.trim());
        techs.forEach(tech => allTechs.add(tech));
    });
    
    const filterButtons = document.getElementById('filterButtons');
    filterButtons.innerHTML = '<button class="filter-btn active" data-filter="all">All</button>' +
        Array.from(allTechs).map(tech => 
            `<button class="filter-btn" data-filter="${tech}">${tech}</button>`
        ).join('');
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            if (filter === 'all') {
                displayProjects(projects);
            } else {
                const filtered = projects.filter(p => p.tech.includes(filter));
                displayProjects(filtered);
            }
        });
    });
    
    displayProjects(projects);
}

function displayProjects(projects) {
    const container = document.getElementById('portfolioContainer');
    container.innerHTML = projects.map((project, index) => `
        <div class="portfolio-item" onclick="openProjectModal(${window.allProjects.indexOf(project)})" style="animation-delay: ${index * 0.1}s; opacity: 0; animation: fadeInUp 0.6s ease forwards;">
            <div class="portfolio-image">
                <img src="${project.images[0]}" alt="${project.title}">
                <div class="portfolio-overlay">
                    <span style="color: #020617; font-weight: bold; font-size: 1.2rem;">View Project</span>
                </div>
            </div>
            <div class="portfolio-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="portfolio-tech">${project.tech}</div>
                <div class="image-count">${project.images.length} ${project.images.length > 1 ? 'images' : 'image'}</div>
            </div>
        </div>
    `).join('');
}

let currentProjectIndex = 0;
let currentImageIndex = 0;
let currentProjects = [];

function openProjectModal(projectIndex) {
    currentProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    currentProjectIndex = projectIndex;
    currentImageIndex = 0;
    
    const project = currentProjects[projectIndex];
    const modal = document.getElementById('portfolioModal');
    
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalTech').textContent = project.tech;
    
    showModalImage(0);
    loadThumbnails(project.images);
    
    modal.style.display = 'flex';
}

function showModalImage(index) {
    const project = currentProjects[currentProjectIndex];
    currentImageIndex = index;
    document.getElementById('modalImage').src = project.images[index];
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function loadThumbnails(images) {
    const container = document.getElementById('modalThumbnails');
    container.innerHTML = images.map((img, index) => `
        <img src="${img}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="showModalImage(${index})">
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initHamburgerMenu();
    initScrollProgress();
    
    setTimeout(() => {
        loadProfileImage();
        loadSkills();
        loadExperiences();
        loadProjects();
        loadCertificates();
        loadSocialLinks();
        loadContactInfo();
        initTypingAnimation();
        initSearchFunctionality();
        initStatsCounter();
        
        setTimeout(() => {
            document.getElementById('loadingOverlay').classList.add('hidden');
        }, 500);
    }, 1000);
    
    const modal = document.getElementById('portfolioModal');
    const closeBtn = document.querySelector('.close-modal');
    const certModal = document.getElementById('certificateModal');
    
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        if (event.target === certModal) {
            certModal.style.display = 'none';
        }
    };
    
    document.querySelector('.modal-nav.prev').onclick = function(e) {
        e.stopPropagation();
        const project = currentProjects[currentProjectIndex];
        currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
        showModalImage(currentImageIndex);
    };
    
    document.querySelector('.modal-nav.next').onclick = function(e) {
        e.stopPropagation();
        const project = currentProjects[currentProjectIndex];
        currentImageIndex = (currentImageIndex + 1) % project.images.length;
        showModalImage(currentImageIndex);
    };
    
    document.getElementById('certPrevBtn').onclick = function(e) {
        e.stopPropagation();
        navigateCertificate(-1);
    };
    
    document.getElementById('certNextBtn').onclick = function(e) {
        e.stopPropagation();
        navigateCertificate(1);
    };
    
    document.addEventListener('keydown', function(e) {
        if (certModal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                navigateCertificate(-1);
            } else if (e.key === 'ArrowRight') {
                navigateCertificate(1);
            } else if (e.key === 'Escape') {
                certModal.style.display = 'none';
            }
        }
    });
});

function loadCertificates() {
    const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    const container = document.getElementById('certificateContainer');
    
    if (certificates.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No certificates added yet.</p>';
        return;
    }

    container.innerHTML = certificates.map((cert, index) => `
        <div class="certificate-item" onclick="openCertificateModal(${index})">
            <div class="certificate-image">
                <img src="${cert.image}" alt="${cert.name}">
            </div>
            <div class="certificate-info">
                <h3>${cert.name}</h3>
                <p>${cert.issuer}</p>
                <p style="color: var(--text-muted);">${cert.year}</p>
            </div>
        </div>
    `).join('');
}

function openCertificateModal(index) {
    const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    window.currentCertIndex = index;
    window.allCertificates = certificates;
    showCertificate(index);
    
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'flex';
}

function showCertificate(index) {
    const certificates = window.allCertificates;
    const cert = certificates[index];
    
    document.getElementById('certModalImage').src = cert.image;
    document.getElementById('certModalName').textContent = cert.name;
    document.getElementById('certModalIssuer').textContent = cert.issuer;
    document.getElementById('certModalYear').textContent = cert.year;
    document.getElementById('certModalCounter').textContent = `Certificate ${index + 1} of ${certificates.length}`;
    
    const descriptionElement = document.getElementById('certModalDescription');
    if (cert.description && cert.description.trim() !== '') {
        descriptionElement.textContent = cert.description;
        descriptionElement.style.display = 'block';
    } else {
        descriptionElement.style.display = 'none';
    }
    
    window.currentCertIndex = index;
}

function navigateCertificate(direction) {
    const certificates = window.allCertificates;
    let newIndex = window.currentCertIndex + direction;
    
    if (newIndex < 0) {
        newIndex = certificates.length - 1;
    } else if (newIndex >= certificates.length) {
        newIndex = 0;
    }
    
    showCertificate(newIndex);
}

function initTypingAnimation() {
    const texts = ['an Informatics Engineering Student', 'a Web Developer', 'a Software Engineer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, pauseTime);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }

    type();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeIcon.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

function initSearchFunctionality() {
    document.getElementById('skillsSearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = window.allSkills.filter(skill => 
            skill.name.toLowerCase().includes(searchTerm)
        );
        displaySkills(filtered);
    });
    
    document.getElementById('experienceSearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = window.allExperiences.filter(exp => 
            exp.role.toLowerCase().includes(searchTerm) ||
            exp.company.toLowerCase().includes(searchTerm) ||
            exp.description.toLowerCase().includes(searchTerm)
        );
        displayExperiences(filtered);
    });
    
    document.getElementById('portfolioSearch').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = window.allProjects.filter(project => 
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.tech.toLowerCase().includes(searchTerm)
        );
        displayProjects(filtered);
    });
}

function initStatsCounter() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

function animateCounters() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const skills = JSON.parse(localStorage.getItem('skills') || '[]');
    const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    
    animateCounter('projectsCount', projects.length);
    animateCounter('skillsCount', skills.length);
    animateCounter('certificatesCount', certificates.length);
}

function animateCounter(id, target) {
    const element = document.getElementById(id);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function downloadCV() {
    const cv = localStorage.getItem('cv');
    if (cv) {
        const cvData = JSON.parse(cv);
        const link = document.createElement('a');
        link.href = cvData.data;
        link.download = cvData.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('CV not available. Please contact admin.');
    }
}

function loadContactInfo() {
    const contactInfo = JSON.parse(localStorage.getItem('contactInfo') || '{}');
    
    const emailLink = document.getElementById('emailLink');
    const whatsappLink = document.getElementById('whatsappLink');
    const linkedinContactLink = document.getElementById('linkedinContactLink');
    
    if (contactInfo.email) {
        emailLink.href = 'mailto:' + contactInfo.email;
        emailLink.textContent = contactInfo.email;
    } else {
        emailLink.textContent = '-';
        emailLink.removeAttribute('href');
    }
    
    if (contactInfo.whatsapp) {
        whatsappLink.href = contactInfo.whatsapp;
        whatsappLink.textContent = contactInfo.whatsapp;
    } else {
        whatsappLink.textContent = '-';
        whatsappLink.removeAttribute('href');
    }
    
    if (contactInfo.linkedinContact) {
        linkedinContactLink.href = contactInfo.linkedinContact;
        linkedinContactLink.textContent = contactInfo.linkedinContact;
    } else {
        linkedinContactLink.textContent = '-';
        linkedinContactLink.removeAttribute('href');
    }
}

function loadSocialLinks() {
    const socialLinks = JSON.parse(localStorage.getItem('socialLinks') || '{}');
    
    const facebookIcon = document.getElementById('facebookIcon');
    const instagramIcon = document.getElementById('instagramIcon');
    const linkedinIcon = document.getElementById('linkedinIcon');
    const githubIcon = document.getElementById('githubIcon');
    
    if (socialLinks.facebook) {
        facebookIcon.href = socialLinks.facebook;
        facebookIcon.target = '_blank';
        facebookIcon.style.display = 'flex';
    } else {
        facebookIcon.style.display = 'none';
    }
    
    if (socialLinks.instagram) {
        instagramIcon.href = socialLinks.instagram;
        instagramIcon.target = '_blank';
        instagramIcon.style.display = 'flex';
    } else {
        instagramIcon.style.display = 'none';
    }
    
    if (socialLinks.linkedin) {
        linkedinIcon.href = socialLinks.linkedin;
        linkedinIcon.target = '_blank';
        linkedinIcon.style.display = 'flex';
    } else {
        linkedinIcon.style.display = 'none';
    }
    
    if (socialLinks.github) {
        githubIcon.href = socialLinks.github;
        githubIcon.target = '_blank';
        githubIcon.style.display = 'flex';
    } else {
        githubIcon.style.display = 'none';
    }
}
