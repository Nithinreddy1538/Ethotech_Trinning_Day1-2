import React from 'react'

function HeroSection() {
  return (
    <section style={style.hero}>
        <div style={style.content}>
            <h1 style={style.title}>Welcome to Fake Store</h1>
            <p style={style.paragraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus beatae quia veritatis! Facere rem numquam necessitatibus totam, molestias laboriosam cum unde sit eius natus pariatur! Culpa officiis unde aspernatur iure.</p>
            <button style={style.button}>Shop Now</button>
        </div>
    </section>
  )
}

const style = {
    hero: {
        backgroundImage: 'url("https://img.magnific.com/free-photo/black-friday-sales-sign-neon-light_23-2151833112.jpg?semt=ais_hybrid&w=740&q=80")',
        backgroundSize: 'cover',
        backgroundrepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
     },
    content: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',

  },
  title: {
    fontSize: '3rem',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
  },
  paragraph: {
    fontSize: '1rem',
    color: '#fff',
    padding: '0 250px',
    alignItems: 'center',
    textAlign: 'center',

  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#ec6666',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
}
  
export default HeroSection
 