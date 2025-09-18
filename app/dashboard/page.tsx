"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Process from "../components/Process";
import ProductDemo from "../components/ProductInAction";
import Trusted from "../components/TrustedSection";

export default function Dashboard() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ProductDemo />
        <Trusted />
        <Process />
      </main>
      <Footer />
    </div>
  );
}