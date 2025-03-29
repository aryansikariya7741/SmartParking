import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.heading}>SmartPark AI</h3>
            <p style={styles.text}>Revolutionizing parking with AI technology</p>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.heading}>Quick Links</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><a href="/" style={styles.link}>Home</a></li>
              <li style={styles.listItem}><a href="/about" style={styles.link}>About</a></li>
              <li style={styles.listItem}><a href="/services" style={styles.link}>Services</a></li>
              <li style={styles.listItem}><a href="/contact" style={styles.link}>Contact</a></li>
            </ul>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.heading}>Contact Us</h3>
            <p style={styles.text}>info@smartparkai.com</p>
            <p style={styles.text}>+1 (555) 123-4567</p>
          </div>
        </div>
        
        <div style={styles.copyright}>
          <p style={styles.copyrightText}>© {new Date().getFullYear()} SmartPark AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Styles object
const styles = {
  footer: {
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: '40px 0 20px',
    borderTop: '1px solid #eaeaea',
    width: '100%'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  footerContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '30px'
  },
  footerSection: {
    flex: '1',
    minWidth: '250px',
    marginBottom: '20px',
    padding: '0 15px'
  },
  heading: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#222'
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '5px 0',
    color: '#555'
  },
  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  listItem: {
    marginBottom: '10px'
  },
  link: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#0066cc'
    }
  },
  copyright: {
    borderTop: '1px solid #eaeaea',
    paddingTop: '20px',
    textAlign: 'center'
  },
  copyrightText: {
    fontSize: '14px',
    color: '#777'
  }
};

export default Footer;