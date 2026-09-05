import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(){
  return (
    <nav style={styles.nav}>
        <h2>Fake Store</h2>
        <div style={styles.links}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/products" style={styles.link}>Products</Link>
            <Link to="/about" style={styles.link}>About</Link>
            <Link to="/contact" style={styles.link}>Contact</Link>
        </div>
    </nav>
  )
}

const styles ={
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    background: "black",
    color: "#fff",
    alignItems: "center",
    padding: "15px 40px"
  },
  links:{
    display: "flex",
    gap: "20px"
  },
  link:{
    textDecoration: "none",
    color: "#fff"
    
  }
}

export default Navbar