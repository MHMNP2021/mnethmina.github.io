// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Theme Toggle with System Preference Detection
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  // Check for system preference
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    body.classList.remove("dark-theme")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  } else if (savedTheme === "dark") {
    body.classList.add("dark-theme")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  } else if (prefersDarkScheme.matches) {
    body.classList.add("dark-theme")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    localStorage.setItem("theme", "dark")
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme")
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
      localStorage.setItem("theme", "light")
    } else {
      body.classList.add("dark-theme")
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
      localStorage.setItem("theme", "dark")
    }
  })

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active")
      }
    })
  })

  // Back to top button
  const backToTopButton = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const navbarHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.offsetTop - navbarHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Project Filtering with Animation
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get filter value
      const filterValue = button.getAttribute("data-filter")

      // Filter projects with animation
      projectCards.forEach((card) => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "scale(1)"
          }, 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "scale(0.8)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Contact Form Validation and Submission
  const contactForm = document.getElementById("contactForm")
  const formMessage = document.getElementById("formMessage")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Form will be handled by Formspree, but we can still do client-side validation
      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const subject = document.getElementById("subject").value.trim()
      const message = document.getElementById("message").value.trim()

      // Basic validation
      if (name === "" || email === "" || subject === "" || message === "") {
        e.preventDefault()
        showFormMessage("Please fill in all fields", "error")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        e.preventDefault()
        showFormMessage("Please enter a valid email address", "error")
        return
      }

      // If validation passes, form will submit to Formspree
      // We'll show a temporary "Sending..." message
      showFormMessage("Sending your message...", "pending")
    })
  }

  // Show form message
  function showFormMessage(message, type) {
    if (formMessage) {
      formMessage.textContent = message
      formMessage.className = "form-message"
      formMessage.classList.add(type)
      formMessage.style.display = "block"

      if (type !== "pending") {
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = "none"
        }, 5000)
      }
    }
  }

  // Newsletter form submission
  const newsletterForm = document.getElementById("newsletterForm")
  const newsletterMessage = document.getElementById("newsletterMessage")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      // Form will be handled by Formspree, but we can still do client-side validation
      const email = this.querySelector('input[type="email"]').value.trim()

      // Basic validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        e.preventDefault()
        showNewsletterMessage("Please enter a valid email address", "error")
        return
      }

      // If validation passes, form will submit to Formspree
      showNewsletterMessage("Subscribing...", "pending")
    })
  }

  // Show newsletter message
  function showNewsletterMessage(message, type) {
    if (newsletterMessage) {
      newsletterMessage.textContent = message
      newsletterMessage.className = "newsletter-message"
      newsletterMessage.classList.add(type)
      newsletterMessage.style.display = "block"

      if (type !== "pending") {
        // Hide message after 5 seconds
        setTimeout(() => {
          newsletterMessage.style.display = "none"
        }, 5000)
      }
    }
  }

  // Sticky Navigation with animation
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")

    if (window.scrollY > 50) {
      header.classList.add("sticky")
    } else {
      header.classList.remove("sticky")
    }
  })

  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 50) {
        element.classList.add("animated")
      }
    })
  }

  // Run animation check on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Run animation check on initial load
  animateOnScroll()
})

