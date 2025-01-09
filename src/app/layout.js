"use client";

import "./globals.css"; // Tus estilos globales
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar */}
        <AppNavbar />

        {/* Contenido Principal */}
        <main className="container my-4">{children}</main>
      </body>
    </html>
  );
}
