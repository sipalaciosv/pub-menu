"use client";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function AdminPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsSnapshot = await getDocs(collection(db, "products"));
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const toggleAvailability = async (id, currentStatus) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { available: !currentStatus });
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, available: !currentStatus } : product
      )
    );
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestión del Menú</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  <span
                    className={`badge ${
                      product.available ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {product.available ? "Disponible" : "No disponible"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleAvailability(product.id, product.available)}
                    className={`btn ${
                      product.available ? "btn-danger" : "btn-success"
                    }`}
                  >
                    {product.available ? "Deshabilitar" : "Habilitar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
