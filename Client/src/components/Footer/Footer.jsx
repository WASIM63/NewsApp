import './Footer.css'

const Footer=()=>{
    return(
        <footer className="footer">
        <div className="footer-container">
            <div className="footer-section">
                <h3>Quick Links</h3>
                <a href="/home">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </div>

            <div className="footer-section">
                <h3>Follow Me</h3>
                <div className="social-icons">
                    <a href="#">🔵 Facebook</a>
                    <a href="#">🐦 Twitter</a>
                    <a href="https://www.instagram.com/wasimakrammalli/">📸 Instagram</a>
                    <a href="https://www.linkedin.com/in/wasim-akram-mallick-542096282/">💼 LinkedIn</a>
                </div>
            </div>

            <div className="footer-section">
                <h3>Contact Me</h3>
                <p>Email: wamallick001@gmail.com</p>
                <p>Phone: +91 9662371363</p>
                <p>Address: Bhuta, Daspur, Paschim Medinipur</p>
            </div>
        </div>

        <div className="footer-bottom">
            © 2025 News App | None of any Rights Reserved
        </div>
    </footer>
    )
}
export default Footer;