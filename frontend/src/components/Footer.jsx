import React from 'react'

function Footer (){
  return (
    <footer style={styles.footer}>
        <p style={styles.text}>© 2026 My Fake Store. All rights reserved.</p>
    </footer>
  )
}
const styles = {
    footer: {
        backgroundColor: 'rgb(236, 102, 102)',
        padding: '20px',
        textAlign: 'center',
        color: '#dce9f5',
    },
    text: {
        margin: 0,
    fontFamily: 'Poppins, sans-serif',
    textAlign:"center",

    }
}
export default Footer
