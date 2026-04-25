// Three.js 3D Background
let scene, camera, renderer, codeParticles;

function init3DBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('bg-canvas'),
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Code characters to display
    const codeChars = ['{', '}', '(', ')', '[', ']', ';', '<', '>', '/', '=', '+', '-', '*', 'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'async', 'await', '=>', '===', '!==', '&&', '||', '?', ':'];
    
    // Create code particles
    const codeParticlesGroup = new THREE.Group();
    const particleCount = 200;
    
    for (let i = 0; i < particleCount; i++) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 128;
        
        // Random code character
        const char = codeChars[Math.floor(Math.random() * codeChars.length)];
        
        // Draw text on canvas
        context.font = 'bold 60px monospace';
        context.fillStyle = '#667eea';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(char, 64, 64);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        
        // Create sprite
        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });
        
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80
        );
        sprite.scale.set(2, 2, 1);
        
        // Add custom properties for animation
        sprite.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            ),
            rotationSpeed: (Math.random() - 0.5) * 0.01
        };
        
        codeParticlesGroup.add(sprite);
    }
    
    codeParticles = codeParticlesGroup;
    scene.add(codeParticles);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Add point lights for more dynamic lighting
    const pointLight1 = new THREE.PointLight(0x667eea, 1, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xf093fb, 0.5, 100);
    pointLight2.position.set(-20, -20, -20);
    scene.add(pointLight2);

    camera.position.z = 40;

    animate3D();
}

function animate3D() {
    requestAnimationFrame(animate3D);

    // Animate individual code particles
    codeParticles.children.forEach((sprite, index) => {
        // Move particles
        sprite.position.add(sprite.userData.velocity);
        
        // Wrap around boundaries
        ['x', 'y', 'z'].forEach(axis => {
            if (sprite.position[axis] > 40) sprite.position[axis] = -40;
            if (sprite.position[axis] < -40) sprite.position[axis] = 40;
        });
        
        // Rotate particles
        sprite.rotation.z += sprite.userData.rotationSpeed;
        
        // Pulse effect
        const scale = 2 + Math.sin(Date.now() * 0.001 + index) * 0.3;
        sprite.scale.set(scale, scale, 1);
    });

    // Rotate entire group
    codeParticles.rotation.x += 0.0003;
    codeParticles.rotation.y += 0.0005;

    // Mouse interaction
    const mouseX = (window.innerWidth / 2 - mouse.x) * 0.00005;
    const mouseY = (window.innerHeight / 2 - mouse.y) * 0.00005;
    
    codeParticles.rotation.x += mouseY;
    codeParticles.rotation.y += mouseX;

    renderer.render(scene, camera);
}

// Mouse tracking for 3D interaction
const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

document.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Handle window resize
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Project Management System
class ProjectManager {
    constructor() {
        this.projects = this.loadProjects();
        this.achievements = this.loadAchievements();
        this.currentEditId = null;
        this.currentEditAchievementId = null;
        this.currentAchievementImage = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderProjects();
        this.renderAchievements();
        this.setupProfileImage();
    }

    setupEventListeners() {
        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                }
            });
        });

        // Add project button
        document.getElementById('add-project-btn').addEventListener('click', () => {
            this.openModal();
        });

        // Modal controls
        const modal = document.getElementById('project-modal');
        const closeBtn = document.querySelector('.close');
        const cancelBtn = document.getElementById('cancel-btn');
        const form = document.getElementById('project-form');

        closeBtn.addEventListener('click', () => this.closeModal());
        cancelBtn.addEventListener('click', () => this.closeModal());

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProject();
        });

        // Achievement event listeners
        const addAchievementBtn = document.getElementById('add-achievement-btn');
        if (addAchievementBtn) {
            addAchievementBtn.addEventListener('click', () => {
                console.log('Achievement button clicked!');
                this.openAchievementModal();
            });
        } else {
            console.error('Add achievement button not found!');
        }

        const achievementModal = document.getElementById('achievement-modal');
        const closeAchievementBtn = document.querySelector('.close-achievement');
        const cancelAchievementBtn = document.getElementById('cancel-achievement-btn');
        const achievementForm = document.getElementById('achievement-form');

        closeAchievementBtn.addEventListener('click', () => this.closeAchievementModal());
        cancelAchievementBtn.addEventListener('click', () => this.closeAchievementModal());

        window.addEventListener('click', (e) => {
            if (e.target === achievementModal) {
                this.closeAchievementModal();
            }
        });

        achievementForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAchievement();
        });
    }

    openModal(projectId = null) {
        const modal = document.getElementById('project-modal');
        const modalTitle = document.getElementById('modal-title');
        const form = document.getElementById('project-form');

        if (projectId) {
            const project = this.projects.find(p => p.id === projectId);
            if (project) {
                modalTitle.textContent = 'Edit Project';
                document.getElementById('project-name').value = project.name;
                document.getElementById('project-description').value = project.description;
                document.getElementById('project-tech').value = project.technologies.join(', ');
                document.getElementById('project-url').value = project.url || '';
                document.getElementById('project-image').value = project.image || '';
                this.currentEditId = projectId;
            }
        } else {
            modalTitle.textContent = 'Add New Project';
            form.reset();
            this.currentEditId = null;
        }

        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.getElementById('project-modal');
        modal.style.display = 'none';
        document.getElementById('project-form').reset();
        this.currentEditId = null;
    }

    saveProject() {
        const name = document.getElementById('project-name').value.trim();
        const description = document.getElementById('project-description').value.trim();
        const tech = document.getElementById('project-tech').value.trim();
        const url = document.getElementById('project-url').value.trim();
        const image = document.getElementById('project-image').value.trim();

        if (!name || !description) {
            alert('Please fill in all required fields');
            return;
        }

        const project = {
            id: this.currentEditId || Date.now().toString(),
            name,
            description,
            technologies: tech ? tech.split(',').map(t => t.trim()).filter(t => t) : [],
            url: url || null,
            image: image || `https://picsum.photos/seed/${name}/400/200.jpg`
        };

        if (this.currentEditId) {
            const index = this.projects.findIndex(p => p.id === this.currentEditId);
            if (index !== -1) {
                this.projects[index] = project;
            }
        } else {
            this.projects.push(project);
        }

        this.saveProjects();
        this.renderProjects();
        this.closeModal();
    }

    deleteProject(projectId) {
        if (confirm('Are you sure you want to delete this project?')) {
            this.projects = this.projects.filter(p => p.id !== projectId);
            this.saveProjects();
            this.renderProjects();
        }
    }

    renderProjects() {
        const grid = document.getElementById('projects-grid');
        
        if (this.projects.length === 0) {
            grid.innerHTML = `
                <div class="no-projects" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <h3 style="color: var(--text-secondary); margin-bottom: 1rem;">No projects yet</h3>
                    <p style="color: var(--text-secondary);">Click "Add New Project" to get started!</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.projects.map(project => `
            <div class="project-card" data-id="${project.id}">
                <img src="${project.image}" alt="${project.name}" class="project-image" onerror="this.src='https://picsum.photos/seed/default/400/200.jpg'">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-actions">
                    ${project.url ? `<a href="${project.url}" target="_blank" class="project-link">View Project →</a>` : '<span></span>'}
                    <div>
                        <button class="project-edit" onclick="projectManager.openModal('${project.id}')" style="background: none; border: none; color: var(--primary-color); cursor: pointer; margin-right: 1rem; font-size: 1.2rem;" title="Edit Project">✏️</button>
                        <button class="project-delete" onclick="projectManager.deleteProject('${project.id}')" title="Delete Project">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    saveProjects() {
        localStorage.setItem('portfolio-projects', JSON.stringify(this.projects));
    }

    loadProjects() {
        // Clear any existing default projects and start fresh
        localStorage.removeItem('portfolio-projects');
        const saved = localStorage.getItem('portfolio-projects');
        return saved ? JSON.parse(saved) : this.getDefaultProjects();
    }

    setupProfileImage() {
        const profileImageContainer = document.querySelector('.profile-image-container');
        const profileImage = document.getElementById('profile-image');
        
        // Load saved profile image
        const savedImage = localStorage.getItem('portfolio-profile-image');
        if (savedImage) {
            profileImage.src = savedImage;
        }
        
        // Handle image change
        profileImageContainer.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imageUrl = e.target.result;
                        profileImage.src = imageUrl;
                        localStorage.setItem('portfolio-profile-image', imageUrl);
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            input.click();
        });
    }

    // Achievement Methods
    openAchievementModal(achievementId = null) {
        const modal = document.getElementById('achievement-modal');
        const modalTitle = document.getElementById('achievement-modal-title');
        const form = document.getElementById('achievement-form');

        if (achievementId) {
            const achievement = this.achievements.find(a => a.id === achievementId);
            if (achievement) {
                modalTitle.textContent = 'Edit Achievement';
                document.getElementById('achievement-name').value = achievement.name;
                document.getElementById('achievement-type').value = achievement.type;
                document.getElementById('achievement-result').value = achievement.result;
                document.getElementById('achievement-date').value = achievement.date;
                this.currentEditAchievementId = achievementId;
                this.currentAchievementImage = achievement.imageUrl;
            }
        } else {
            modalTitle.textContent = 'Add Achievement';
            form.reset();
            this.currentEditAchievementId = null;
            this.currentAchievementImage = null;
        }

        modal.style.display = 'block';
    }

    closeAchievementModal() {
        const modal = document.getElementById('achievement-modal');
        modal.style.display = 'none';
        document.getElementById('achievement-form').reset();
        this.currentEditAchievementId = null;
        this.currentAchievementImage = null;
    }

    saveAchievement() {
        const name = document.getElementById('achievement-name').value.trim();
        const type = document.getElementById('achievement-type').value;
        const result = document.getElementById('achievement-result').value.trim();
        const date = document.getElementById('achievement-date').value;
        const imageFile = document.getElementById('achievement-image').files[0];

        if (!name || !type || !result || !date) {
            alert('Please fill in all required fields');
            return;
        }

        const processAchievement = (imageUrl) => {
            const achievement = {
                id: this.currentEditAchievementId || Date.now().toString(),
                name,
                type,
                result,
                date,
                imageUrl: imageUrl || `https://picsum.photos/seed/${name}/400/200.jpg`
            };

            if (this.currentEditAchievementId) {
                const index = this.achievements.findIndex(a => a.id === this.currentEditAchievementId);
                if (index !== -1) {
                    this.achievements[index] = achievement;
                }
            } else {
                this.achievements.push(achievement);
            }

            this.saveAchievements();
            this.renderAchievements();
            this.closeAchievementModal();
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                processAchievement(e.target.result);
            };
            reader.readAsDataURL(imageFile);
        } else {
            processAchievement(this.currentAchievementImage);
        }
    }

    deleteAchievement(achievementId) {
        if (confirm('Are you sure you want to delete this achievement?')) {
            this.achievements = this.achievements.filter(a => a.id !== achievementId);
            this.saveAchievements();
            this.renderAchievements();
        }
    }

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        
        if (this.achievements.length === 0) {
            grid.innerHTML = `
                <div class="no-achievements" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <h3 style="color: var(--text-secondary); margin-bottom: 1rem;">No achievements yet</h3>
                    <p style="color: var(--text-secondary);">Click "Add Achievement" to showcase your hackathons and programs!</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.achievements.map(achievement => `
            <div class="achievement-card" data-id="${achievement.id}">
                <img src="${achievement.imageUrl}" alt="${achievement.name}" class="achievement-image" onerror="this.src='https://picsum.photos/seed/default-achievement/400/200.jpg'">
                <div class="achievement-header">
                    <div>
                        <h3 class="achievement-title">${achievement.name}</h3>
                        <span class="achievement-type ${achievement.type}">${achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}</span>
                    </div>
                </div>
                <div class="achievement-result">🏆 ${achievement.result}</div>
                <div class="achievement-date">📅 ${new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div class="achievement-actions">
                    <span></span>
                    <div>
                        <button class="achievement-edit" onclick="projectManager.openAchievementModal('${achievement.id}')" style="background: none; border: none; color: var(--primary-color); cursor: pointer; margin-right: 1rem; font-size: 1.2rem;" title="Edit Achievement">✏️</button>
                        <button class="achievement-delete" onclick="projectManager.deleteAchievement('${achievement.id}')" title="Delete Achievement">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    saveAchievements() {
        localStorage.setItem('portfolio-achievements', JSON.stringify(this.achievements));
    }

    loadAchievements() {
        // Clear any existing default achievements and start fresh
        localStorage.removeItem('portfolio-achievements');
        const saved = localStorage.getItem('portfolio-achievements');
        return saved ? JSON.parse(saved) : this.getDefaultAchievements();
    }

    getDefaultAchievements() {
        return [];
    }

    getDefaultProjects() {
        return [];
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D background
    init3DBackground();
    
    // Initialize project manager
    window.projectManager = new ProjectManager();

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
