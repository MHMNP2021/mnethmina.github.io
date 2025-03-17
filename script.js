// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    mirror: false,
  });
  
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
  themeToggle.addEventListener("click", function () {
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
  
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }
  
  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
  
  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");
  
  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });
    
    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active");
      }
    });
  });
  
  // Back to top button
  const backToTopButton = document.getElementById("backToTop");
  
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });
  
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  
  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get the height of the navbar
        const navbarHeight = document.querySelector(".header").offsetHeight;
        
        // Calculate the position to scroll to (element position - navbar height)
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
  
  // Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      
      // Add active class to clicked button
      button.classList.add("active");
      
      // Get filter value
      const filterValue = button.getAttribute("data-filter");
      
      // Filter projects
      projectCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
  
  // Testimonial Slider
  const testimonialContainer = document.querySelector(".testimonial-container");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const prevBtnTestimonial = document.querySelector(
    ".testimonial-controls .prev-btn"
  );
  const nextBtnTestimonial = document.querySelector(
    ".testimonial-controls .next-btn"
  );
  const dotsContainerTestimonial = document.querySelector(".testimonial-dots");
  
  if (testimonialContainer && testimonialCards.length > 0) {
    let currentIndexTestimonial = 0;
    
    // Create dots based on number of testimonials
    testimonialCards.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      
      dot.addEventListener("click", () => {
        goToSlideTestimonial(index);
      });
      
      dotsContainerTestimonial.appendChild(dot);
    });
    
    // Update the testimonial slider
    function updateSliderTestimonial() {
      testimonialContainer.style.transform = `translateX(-${
        currentIndexTestimonial * 100
      }%)`;
      
      // Update active dot
      document
        .querySelectorAll(".testimonial-dots .dot")
        .forEach((dot, index) => {
          if (index === currentIndexTestimonial) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
    }
    
    // Go to specific slide
    function goToSlideTestimonial(index) {
      currentIndexTestimonial = index;
      updateSliderTestimonial();
    }
    
    // Previous slide
    prevBtnTestimonial.addEventListener("click", () => {
      currentIndexTestimonial =
        currentIndexTestimonial === 0
          ? testimonialCards.length - 1
          : currentIndexTestimonial - 1;
      updateSliderTestimonial();
    });
    
    // Next slide
    nextBtnTestimonial.addEventListener("click", () => {
      currentIndexTestimonial =
        currentIndexTestimonial === testimonialCards.length - 1
          ? 0
          : currentIndexTestimonial + 1;
      updateSliderTestimonial();
    });
    
    // Auto slide (optional)
    setInterval(() => {
      currentIndexTestimonial =
        currentIndexTestimonial === testimonialCards.length - 1
          ? 0
          : currentIndexTestimonial + 1;
      updateSliderTestimonial();
    }, 5000);
  }
  
  // Contact Form Validation and Submission
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const thankYouModal = document.getElementById("thankYouModal");
  const closeModal = document.querySelector(".close-modal");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
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
      
      // Show thank you modal
      if (thankYouModal) {
        thankYouModal.style.display = "flex";
      }
    });
  }
  
  // Close modal when clicking the close button
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      thankYouModal.style.display = "none";
    });
  }
  
  // Close modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === thankYouModal) {
      thankYouModal.style.display = "none";
    }
  });
  
  // Show form message
  function showFormMessage(message, type) {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.className = "form-message";
      formMessage.classList.add(type);
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }
  }
  
  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterMessage = document.getElementById("newsletterMessage");
  
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
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
      showNewsletterMessage(
        "Thank you for subscribing to our newsletter!",
        "success"
      );
    });
  }
  
  // Show newsletter message
  function showNewsletterMessage(message, type) {
    if (newsletterMessage) {
      newsletterMessage.textContent = message;
      newsletterMessage.className = "newsletter-message";
      newsletterMessage.classList.add(type);
      
      // Hide message after 5 seconds
      setTimeout(() => {
        newsletterMessage.style.display = "none";
      }, 5000);
    }
  }
  
  // Sticky Navigation
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    
    if (window.scrollY > 50) {
      header.style.padding = "10px 0";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.padding = "15px 0";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  });
  
  // Skills Radar Chart
  const ctx = document.getElementById("skillRadarChart");
  
  if (ctx) {
    const skillRadarChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "HTML/CSS",
          "JavaScript",
          "React",
          "Node.js",
          "UI/UX Design",
          "Database",
        ],
        datasets: [
          {
            label: "Skills",
            data: [90, 85, 80, 75, 70, 65],
            fill: true,
            backgroundColor: "rgba(74, 108, 247, 0.2)",
            borderColor: "rgba(74, 108, 247, 1)",
            pointBackgroundColor: "rgba(74, 108, 247, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(74, 108, 247, 1)",
          },
        ],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true,
              color: "rgba(255, 255, 255, 0.1)",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            pointLabels: {
              color: getComputedStyle(document.documentElement).getPropertyValue(
                "--text-color"
              ),
            },
            ticks: {
              backdropColor: "transparent",
              color: getComputedStyle(document.documentElement).getPropertyValue(
                "--text-color"
              ),
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
    
    // Update chart colors when theme changes
    themeToggle.addEventListener("click", function () {
      const textColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--text-color");
      
      skillRadarChart.options.scales.r.pointLabels.color = textColor;
      skillRadarChart.options.scales.r.ticks.color = textColor;
      skillRadarChart.update();
    });
  }
  
  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    // ESC key closes modal
    if (e.key === "Escape" && thankYouModal.style.display === "flex") {
      thankYouModal.style.display = "none";
    }
    
    // Arrow keys for testimonial navigation
    if (testimonialContainer) {
      if (e.key === "ArrowLeft") {
        currentIndexTestimonial =
          currentIndexTestimonial === 0
            ? testimonialCards.length - 1
            : currentIndexTestimonial - 1;
        updateSliderTestimonial();
      } else if (e.key === "ArrowRight") {
        currentIndexTestimonial =
          currentIndexTestimonial === testimonialCards.length - 1
            ? 0
            : currentIndexTestimonial + 1;
        updateSliderTestimonial();
      }
    }
  });
});
