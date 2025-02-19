import React from 'react'

function Footer() {
  return (
    <div>
      <footer style={{ backgroundColor: "#333", color: "#fff", textAlign: "center", padding: "20px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px" }}>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>R-Cart - Your Shopping Partner</p>
          <p style={{ margin: "5px 0" }}>© 2025 R-Cart. All rights reserved.</p>
          <div>
            <a href="#" style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}>Terms of Service</a>
            <a href="#" style={{ color: "#fff", margin: "0 10px", textDecoration: "none" }}>Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer