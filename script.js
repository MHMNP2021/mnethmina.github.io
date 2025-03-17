// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    
    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.remove("dark-theme");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add("dark-theme");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme
    themeToggle.addEventListener("click", function() {
        if (body.classList.contains("dark-theme")) {
            body.classList.remove("dark-theme");
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("theme", "light");
        } else {
            body.classList.add("dark-theme");
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", "dark");
        }
    });
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    hamburger.addEventListener("click", function() {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function() {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");
    
    window.addEventListener("scroll", function() {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href").substring(1) === current) {
                item.classList.add("active");
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.getElementById("backToTop");
    
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }
    });
    
    backToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // Project Filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            
            // Add active class to clicked button
            button.classList.add("active");
            
            // Get filter value
            const filterValue = button.getAttribute("data-filter");
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
    
    // Contact Form Validation and Submission
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();
            
            // Basic validation
            if (name === "" || email === "" || subject === "" || message === "") {
                showFormMessage("Please fill in all fields", "error");
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage("Please enter a valid email address", "error");
                return;
            }
            
            // If validation passes, show success message
            // In a real application, you would send the form data to a server here
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            showFormMessage("Your message has been sent successfully!", "success");
        });
    }
    
    // Show form message
    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = "form-message";
            formMessage.classList.add(type);
            
            // Hide message after 5 seconds
            setTimeout(function() {
                formMessage.style.display = "none";
            }, 5000);
        }
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterMessage = document.getElementById("newsletterMessage");
    
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get email value
            const email = this.querySelector('input[type="email"]').value.trim();
            
            // Basic validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNewsletterMessage("Please enter a valid email address", "error");
                return;
            }
            
            // In a real application, you would send the email to a server here
            
            // Reset form
            this.reset();
            
            // Show success message
            showNewsletterMessage("Thank you for subscribing to our newsletter!", "success");
        });
    }
    
    // Show newsletter message
    function showNewsletterMessage(message, type) {
        if (newsletterMessage) {
            newsletterMessage.textContent = message;
            newsletterMessage.className = "newsletter-message";
            newsletterMessage.classList.add(type);
            
            // Hide message after 5 seconds
            setTimeout(function() {
                newsletterMessage.style.display = "none";
            }, 5000);
        }
    }
    
    // Sticky Navigation
    window.addEventListener("scroll", function() {
        const header = document.querySelector(".header");
        
        if (window.scrollY > 50) {
            header.style.padding = "10px 0";
        } else {
            header.style.padding = "15px 0";
        }
    });
});
