export default function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        <div className="footer-top">
          <h3>Trovr</h3>
          <p>
            Discover the best products recommended by real users across Reddit.
          </p>
        </div>

        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-disclaimer">
          <p>
            As an affiliate, we may earn a commission from qualifying purchases.
            We only recommend products based on real user discussions and research.
          </p>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Trovr. All rights reserved.</p>
        </div>

      </div>

    </footer>
  )
}