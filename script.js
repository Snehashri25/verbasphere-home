document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to VerbaSphere ✨");
  
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  
    // CTA action
    const ctaBtn = document.querySelector(".cta-button");
    ctaBtn?.addEventListener("click", () => {
      console.log("CTA button clicked!");
    });
  
    // Set footer year
    const year = new Date().getFullYear();
    document.getElementById("year").textContent = year;
  
    // Back to Top Button
    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });
  
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  