import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default async function MenuPage() {
  const productsSnapshot = await getDocs(collection(db, "products"));
  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Menú del Pub</h1>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div
              className={`card ${
                !product.available ? "bg-light text-muted" : ""
              }`}
            >
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Precio:</strong> ${product.price}
                </p>
                <p
                  className={`badge ${
                    product.available ? "bg-success" : "bg-danger"
                  }`}
                >
                  {product.available ? "Disponible" : "No disponible"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
