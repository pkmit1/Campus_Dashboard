import Navbar from "../components/Navbar"

import ContactHero from "../components/ContactHero";
import Footer from "../components/Footer";
export default function Contact(){
    return(
        <div className="bg-black text-white">
            <Navbar/>
           <ContactHero/>
           <Footer/>
        </div>
    )
}