
import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Products could not be loaded. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <div key={product.id} style={styles.card}>
          <img
            src={product.image}
            alt={product.title}
            style={styles.image}
          />

          <h4 style={styles.title}>{product.title}</h4>

          <p style={styles.price}>${product.price}</p>
          <button style={styles.btn}>Buy Now</button>
        </div>
      ))}
    </div>
  );
}

const styles={
    grid:{
        display:"grid",
       gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
       gap:"20px",
       padding:"20px",
     },
    card:{
        border:"1px solid #060505",
        borderRadius:"5px",
        padding:"15px",
      textAlign:"center",
      backgroundColor:"rgb(246, 240, 240)"
    },
    image:{
        width:"140px",
      height:"150px",
        objectFit:"contain"
    },
    title:{
      minHeight:"48px",
      color:"black"
    },
    price:{
      fontWeight:"bold",
      color:"#dc2626"
    },
    btn:{
        backgroundColor:"green",
        padding:"5px 12px",
        border:"none",
        borderRadius:"20px",
        curser:"pointer",
     }
 
  }
export default Products;
