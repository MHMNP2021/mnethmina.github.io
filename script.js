// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Get the height of the navbar
        const navbarHeight = document.querySelector(".navbar").offsetHeight

        // Calculate the position to scroll to (element position - navbar height)
        const targetPosition = targetElement.offsetTop - navbarHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Project Carousel
  const carouselContainer = document.querySelector(".carousel-container")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const dotsContainer = document.querySelector(".carousel-dots")

  if (carouselContainer && prevBtn && nextBtn && dotsContainer) {
    const projectCards = document.querySelectorAll(".project-card")
    let currentIndex = 0

    // Create dots based on number of projects
    projectCards.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("dot")
      if (index === 0) dot.classList.add("active")

      dot.addEventListener("click", () => {
        goToSlide(index)
      })

      dotsContainer.appendChild(dot)
    })

    // Update the carousel display
    function updateCarousel() {
      carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`

      // Update active dot
      document.querySelectorAll(".dot").forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add("active")
        } else {
          dot.classList.remove("active")
        }
      })
    }

    // Go to specific slide
    function goToSlide(index) {
      currentIndex = index
      updateCarousel()
    }

    // Previous slide
    prevBtn.addEventListener("click", () => {
      currentIndex = currentIndex === 0 ? projectCards.length - 1 : currentIndex - 1
      updateCarousel()
    })

    // Next slide
    nextBtn.addEventListener("click", () => {
      currentIndex = currentIndex === projectCards.length - 1 ? 0 : currentIndex + 1
      updateCarousel()
    })

    // Auto slide (optional)
    // setInterval(() => {
    //     currentIndex = (currentIndex === projectCards.length - 1) ? 0 : currentIndex + 1;
    //     updateCarousel();
    // }, 5000);
  }

  // Contact Form Validation and Submission
  const contactForm = document.getElementById("contactForm")
  const formMessage = document.getElementById("formMessage")
  const thankYouModal = document.getElementById("thankYouModal")
  const closeModal = document.querySelector(".close-modal")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const subject = document.getElementById("subject").value.trim()
      const message = document.getElementById("message").value.trim()

      // Basic validation
      if (name === "" || email === "" || subject === "" || message === "") {
        showFormMessage("Please fill in all fields", "error")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showFormMessage("Please enter a valid email address", "error")
        return
      }

      // If validation passes, show success message
      // In a real application, you would send the form data to a server here

      // Reset form
      contactForm.reset()

      // Show thank you modal
      if (thankYouModal) {
        thankYouModal.style.display = "flex"
      }
    })
  }

  // Close modal when clicking the close button
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      thankYouModal.style.display = "none"
    })
  }

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === thankYouModal) {
      thankYouModal.style.display = "none"
    }
  })

  // Show form message
  function showFormMessage(message, type) {
    if (formMessage) {
      formMessage.textContent = message
      formMessage.className = "form-message"
      formMessage.classList.add(type)

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none"
      }, 5000)
    }
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get email value
      const email = this.querySelector('input[type="email"]').value.trim()

      // Basic validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address")
        return
      }

      // In a real application, you would send the email to a server here

      // Reset form
      this.reset()

      // Show success message
      alert("Thank you for subscribing to our newsletter!")
    })
  }

  // Sticky Navigation
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")

    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.padding = "15px 0"
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    }
  })
})

