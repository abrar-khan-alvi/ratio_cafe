/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  MapPin,
  Clock,
  Phone,
  Facebook,
  Instagram,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

// --- DATA ---
const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reservation', href: '#reservation' },
];

const SIGNATURE_MENU = {
  Starters: [
    { name: 'Truffle Mushroom Bruschetta', desc: 'Toasted artisan bread, wild mushrooms, truffle oil, parmesan.', price: '৳450' },
    { name: 'Calamari Fritti', desc: 'Crispy fried calamari rings with garlic aioli and lemon.', price: '৳650' },
    { name: 'Burrata Caprese', desc: 'Fresh burrata, heirloom tomatoes, basil pesto, balsamic glaze.', price: '৳850' },
  ],
  'Main Course': [
    { name: 'Grilled Chicken Steak', desc: 'Herb-marinated chicken breast, seasonal vegetables, peppercorn sauce.', price: '৳950' },
    { name: 'Creamy Alfredo Pasta', desc: 'Fettuccine, rich garlic cream sauce, roasted chicken, parmesan.', price: '৳850' },
    { name: 'Pan-Seared Salmon', desc: 'Atlantic salmon, asparagus, lemon butter sauce, potato purée.', price: '৳1450' },
    { name: 'Beef Tenderloin', desc: 'Premium dry-aged beef, mashed potatoes, red wine reduction.', price: '৳1850' },
  ],
  Beverages: [
    { name: 'Ratio Signature Espresso', desc: 'Perfectly balanced double shot espresso.', price: '৳250' },
    { name: 'Caramel Macchiato', desc: 'Freshly steamed milk with vanilla-flavored syrup, espresso, caramel drizzle.', price: '৳450' },
    { name: 'Iced Matcha Latte', desc: 'Premium ceremonial grade matcha, milk, lightly sweetened.', price: '৳550' },
    { name: 'Sunset Mocktail', desc: 'Passionfruit, peach, sparkling water, mint.', price: '৳450' },
  ],
  Desserts: [
    { name: 'Classic Tiramisu', desc: 'Coffee-soaked ladyfingers, mascarpone cream, cocoa powder.', price: '৳550' },
    { name: 'Molten Chocolate Cake', desc: 'Warm chocolate center, vanilla bean ice cream.', price: '৳650' },
    { name: 'Basque Cheesecake', desc: 'Caramelized top, creamy center, berry compote.', price: '৳600' },
  ],
};

const GALLERY_IMAGES = [
  '/assets/images/gallery-1.jpg',
  '/assets/images/gallery-2.jpg',
  '/assets/images/gallery-3.jpg',
  '/assets/images/gallery-4.jpg',
  '/assets/images/gallery-5.jpg',
  '/assets/images/gallery-6.jpg',
];

// --- COMPONENTS ---

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px", amount: "some" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Starters');
  const [showSpecialModal, setShowSpecialModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    document.documentElement.classList.add('smooth-scroll');

    const timer = setTimeout(() => {
      setShowSpecialModal(true);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-espresso text-cream font-sans selection:bg-gold selection:text-espresso">
      
      {/* NAVBAR */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? 'bg-espresso/90 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-4' : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2 group">
            <img src="/assets/images/logo.png" alt="Ratio Logo" className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
            <div className="flex flex-col leading-none">
              <span className="font-bold tracking-widest text-[1rem] uppercase heading-premium">Ratio</span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold mt-0.5">Cafe & Bistro</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-gold transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#reservation"
              className="border border-gold text-gold hover:bg-gold hover:text-espresso px-6 py-2 rounded-full transition-all duration-300"
            >
              Book Table
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-cream hover:text-gold transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden bg-espresso/95 backdrop-blur-xl border-t border-white/10 mt-4"
        >
          <div className="flex flex-col items-center gap-6 py-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg uppercase tracking-wider hover:text-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/hero.jpg"
            alt="Cafe Interior"
            className="w-full h-full object-cover transform scale-105"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-espresso/90" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="uppercase tracking-[0.3em] text-gold mb-6 text-sm font-medium">
              Welcome to Ratio
            </p>
            <h1 className="heading-premium text-5xl md:text-7xl lg:text-8xl mb-8 font-light text-white leading-tight">
              Fine Continental Dining, <br/>
              <span className="italic text-cream/90 font-serif">Without Compromise</span>
            </h1>
            <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Experience taste, ambiance, and comfort in the heart of Uttara.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <a
              href="#menu"
              className="bg-gold text-espresso hover:bg-white px-8 py-4 rounded-full uppercase tracking-wider text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(198,156,109,0.4)]"
            >
              View Menu
            </a>
            <a
              href="#reservation"
              className="border border-cream/30 hover:border-gold hover:text-gold px-8 py-4 rounded-full uppercase tracking-wider text-sm font-medium transition-all duration-300 backdrop-blur-sm bg-black/20"
            >
              Book a Table
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="uppercase tracking-[0.2em] text-gold mb-4 text-sm font-semibold">Our Story</p>
            <h2 className="heading-premium text-4xl md:text-5xl mb-8 font-light">
              A blend of modern culinary artistry and warm hospitality.
            </h2>
            <div className="w-16 h-[1px] bg-gold mb-8" />
            <p className="text-cream/70 font-light leading-relaxed mb-6 text-lg">
              At Ratio Cafe & Bistro, we believe that dining is not just about food, but the experience. We blend modern continental cuisine with a warm, inviting atmosphere designed to make you feel both indulged and entirely at home.
            </p>
            <p className="text-cream/70 font-light leading-relaxed mb-10 text-lg">
              Every dish is crafted with precision, using the finest ingredients, and served with a passion for excellence. Whether you're here for a morning espresso or a celebratory dinner, we ensure every moment is exceptional.
            </p>
            <a href="#about" className="inline-flex items-center text-gold hover:text-white transition-colors group">
              <span className="uppercase tracking-wider text-sm mr-2 font-medium">Read More</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-t-[100px] rounded-br-[100px] rounded-bl-xl border border-white/5">
                <img
                  src="/assets/images/about-1.jpg"
                  alt="Cafe atmosphere"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-10 left-4 sm:-left-8 md:-bottom-12 md:-left-12 aspect-square w-32 sm:w-48 md:w-64 rounded-full border-[8px] border-espresso overflow-hidden shadow-2xl z-10 bg-zinc-800">
                <img
                  src="/assets/images/about-2.jpg"
                  alt="Coffee detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* MODAL FOR TODAY'S SPECIAL */}
      <AnimatePresence>
        {showSpecialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <button
                onClick={() => setShowSpecialModal(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-gold hover:text-espresso transition-all"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-gold w-4 h-4" />
                    <span className="uppercase tracking-[0.2em] text-gold text-xs font-semibold">Today's Special</span>
                  </div>
                  <h3 className="heading-premium text-3xl md:text-4xl font-light mb-4">Signature Summer Refreshers</h3>
                  <p className="text-cream/70 font-light text-base mb-8 leading-relaxed">
                    Beat the heat with our vibrant, handcrafted seasonal mocktails. A perfect blend of tropical fruits and citrus notes, designed to provide "A Refreshing Twist in Every Sip."
                  </p>
                  <div className="flex items-center gap-6">
                    <span className="text-gold text-2xl font-sans font-medium">৳550</span>
                    <button
                      onClick={() => {
                        setShowSpecialModal(false);
                        window.location.href = '#reservation';
                      }}
                      className="inline-flex items-center border-b border-gold/40 text-gold hover:text-white hover:border-white transition-all pb-1 uppercase tracking-wider text-sm font-medium"
                    >
                      Reserve A Table
                    </button>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src="/assets/images/special.jpg"
                    alt="Today's Special"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-zinc-900/90 via-zinc-900/40 to-transparent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 3. SIGNATURE MENU SECTION */}
      <section id="menu" className="py-24 md:py-32 px-6 bg-zinc-900 border-y border-white/5 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto container relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="uppercase tracking-[0.2em] text-gold mb-4 text-sm font-semibold">Discover</p>
              <h2 className="heading-premium text-4xl md:text-5xl font-light">Signature Menu</h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* Menu Tabs */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-16 border-b border-white/10 pb-4">
              {Object.keys(SIGNATURE_MENU).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`uppercase tracking-wider text-sm transition-all duration-300 px-2 py-1 relative ${
                    activeTab === category ? 'text-gold' : 'text-cream/50 hover:text-cream/80'
                  }`}
                >
                  {category}
                  {activeTab === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-gold"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
            >
              {SIGNATURE_MENU[activeTab as keyof typeof SIGNATURE_MENU].map((item, index) => (
                <div key={index} className="group cursor-pointer p-4 rounded-xl hover:bg-white/5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 -ml-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                  <div className="flex justify-between items-baseline mb-2 border-b border-white/10 border-dashed pb-2 group-hover:border-gold/30 transition-colors relative z-10">
                    <h3 className="heading-premium text-xl tracking-wide group-hover:text-gold transition-colors duration-300">{item.name}</h3>
                    <span className="text-gold font-medium ml-4 font-sans relative z-10">{item.price}</span>
                  </div>
                  <p className="text-cream/60 font-light text-sm leading-relaxed pr-8 relative z-10 group-hover:text-cream/80 transition-colors duration-300">{item.desc}</p>
                </div>
              ))}
            </motion.div>

            <div className="text-center mt-16">
              <a
                href="#menu"
                className="inline-flex items-center border border-cream/20 hover:border-gold hover:text-gold px-8 py-3 rounded-full uppercase tracking-wider text-sm transition-all duration-300"
              >
                Download Full Menu
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. GALLERY / EXPERIENCE */}
      <section id="gallery" className="py-24 md:py-32">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-gold mb-4 text-sm font-semibold">Atmosphere</p>
            <h2 className="heading-premium text-4xl md:text-5xl font-light mb-4">The Ratio Experience</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 px-1 md:px-2">
          {GALLERY_IMAGES.map((img, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="group relative overflow-hidden aspect-square h-full">
                <img
                  src={img}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 5. RESERVATION SECTION */}
      <section id="reservation" className="py-24 md:py-32 px-6 bg-cream text-ink relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
           <div className="w-[500px] h-[500px] rounded-full border-[1px] border-black absolute -top-40 -right-40" />
           <div className="w-[600px] h-[600px] rounded-full border-[1px] border-black absolute -top-50 -right-50" />
        </div>

        <div className="max-w-6xl mx-auto container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <FadeIn>
            <p className="uppercase tracking-[0.2em] text-gold mb-4 text-sm font-semibold">Join Us</p>
            <h2 className="heading-premium text-4xl md:text-5xl mb-6 font-light">
              Skip the wait.<br />Reserve your table.
            </h2>
            <p className="text-ink/70 font-light leading-relaxed mb-10 text-lg">
              Whether it's an intimate dinner, a business lunch, or a casual weekend brunch, we ensure your table is ready.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-ink/70 ml-2">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-ink/20 py-3 px-2 focus:outline-none focus:border-gold transition-colors font-light placeholder:text-ink/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-ink/70 ml-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="+880 1..."
                    className="w-full bg-transparent border-b border-ink/20 py-3 px-2 focus:outline-none focus:border-gold transition-colors font-light placeholder:text-ink/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-ink/70 ml-2">Guests</label>
                  <select className="w-full bg-transparent border-b border-ink/20 py-3 px-2 focus:outline-none focus:border-gold transition-colors font-light appearance-none rounded-none text-ink cursor-pointer">
                    {[1, 2, 3, 4, 5, 6, '7+'].map((num) => (
                      <option key={num} value={num}>
                        {num} Person{num !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-ink/70 ml-2">Date</label>
                  <input
                    type="date"
                    className="w-full bg-transparent border-b border-ink/20 py-3 px-2 focus:outline-none focus:border-gold transition-colors font-light text-ink placeholder:text-ink/30 cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-ink/70 ml-2">Time</label>
                  <input
                    type="time"
                    className="w-full bg-transparent border-b border-ink/20 py-3 px-2 focus:outline-none focus:border-gold transition-colors font-light text-ink placeholder:text-ink/30 cursor-pointer"
                  />
                </div>
              </div>

              <button className="w-full mt-12 bg-espresso text-cream py-4 hover:bg-gold hover:text-espresso transition-colors duration-300 uppercase tracking-widest text-sm font-semibold flex items-center justify-center gap-2 group shadow-xl">
                Confirm Reservation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="text-center mt-6">
                <p className="text-ink/50 text-xs uppercase tracking-wider">Or reserve instantly via</p>
                <a href="https://wa.me/8801634347328" target="_blank" rel="noreferrer" className="inline-block mt-2 text-ink hover:text-gold font-medium transition-colors border-b border-ink/20 pb-1">
                  WhatsApp
                </a>
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={0.2} className="hidden lg:block h-full">
            <div className="h-full w-full bg-espresso p-8 flex items-center justify-center rounded-sm">
                <div className="border border-gold/30 p-12 text-center w-full min-h-[400px] flex flex-col justify-center">
                   <h3 className="heading-premium text-gold text-3xl mb-4">Hours of Service</h3>
                   <div className="space-y-6 mt-8 text-cream/70 font-light text-lg">
                      <div>
                        <p className="uppercase tracking-widest text-xs font-semibold text-cream/90 mb-1">Monday – Friday</p>
                        <p>11:00 AM – 11:00 PM</p>
                      </div>
                      <div>
                        <p className="uppercase tracking-widest text-xs font-semibold text-cream/90 mb-1">Weekend</p>
                        <p>09:00 AM – 12:00 AM</p>
                      </div>
                   </div>
                </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. CONTACT & LOCATION */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto container grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="heading-premium text-3xl md:text-4xl font-light mb-12">Find Us</h2>
            <div className="space-y-8 font-light text-cream/80 text-lg">
              <div className="flex items-start gap-4">
                <MapPin className="text-gold shrink-0 mt-1" />
                <div>
                  <p className="uppercase tracking-wider text-xs font-semibold text-white mb-1">Address</p>
                  <p>House 44, Sector 13<br />Shah Makhdum Ave, Uttara<br />Dhaka 1230, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-gold shrink-0 mt-1" />
                <div>
                  <p className="uppercase tracking-wider text-xs font-semibold text-white mb-1">Reservations & Enquiries</p>
                  <p>01634-347328</p>
                </div>
              </div>
              <div className="flex items-start gap-4 lg:hidden">
                <Clock className="text-gold shrink-0 mt-1" />
                <div>
                    {/* Only show on mobile since it's in the reservation box on desktop */}
                  <p className="uppercase tracking-wider text-xs font-semibold text-white mb-1">Hours</p>
                  <p>Daily: 11:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="h-64 lg:h-auto min-h-[300px] w-full bg-zinc-900 overflow-hidden relative">
            {/* Map Placeholder */}
            <div className="absolute inset-0 grayscale opacity-50 pointer-events-none hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.4552089408456!2d90.38152567605994!3d23.873403278586884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5fa05c0900f%3A0xf8d5a7b440ae1b29!2sRatio%20Cafe%20%26%20Bistro!5e0!3m2!1sen!2sbd!4v1714645058863!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ratio Cafe Location"
              />
            </div>
            {/* Overlay link */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <a href="https://maps.app.goo.gl/YbSEzFrKNoL12zFS8" target="_blank" rel="noreferrer" className="pointer-events-auto bg-espresso/90 backdrop-blur-sm text-cream px-6 py-3 border border-white/10 hover:border-gold hover:text-gold transition-colors text-sm uppercase tracking-wider flex items-center gap-2">
                    Open in Maps
                 </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink border-t border-white/5 pt-20 pb-10 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            
            {/* Column 1: Brand & Social */}
            <div className="space-y-8">
              <a href="#home" className="flex items-center gap-3 group">
                <img src="/assets/images/logo.png" alt="Ratio Logo" className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-110" />
                <div className="flex flex-col leading-none">
                  <span className="font-bold tracking-widest text-[1.2rem] uppercase heading-premium text-white">Ratio</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.4em] text-gold mt-1">Cafe & Bistro</span>
                </div>
              </a>
              <p className="text-cream/60 font-light text-sm leading-relaxed max-w-xs">
                Crafting exceptional culinary experiences in the heart of Uttara. From morning espresso to fine continental dining.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/ratiocafe.bd" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cream/60 hover:bg-gold hover:text-espresso hover:border-gold transition-all duration-300">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/ratiocafe.bd/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cream/60 hover:bg-gold hover:text-espresso hover:border-gold transition-all duration-300">
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs font-semibold mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-cream/50 hover:text-gold transition-colors text-sm font-light flex items-center gap-2 group">
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs font-semibold mb-8">Visit Us</h4>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <MapPin size={18} className="text-gold shrink-0" />
                  <span className="text-cream/60 font-light text-sm">House 44, Sector 13, Shah Makhdum Ave, Uttara, Dhaka 1230</span>
                </li>
                <li className="flex gap-4 items-start">
                  <Phone size={18} className="text-gold shrink-0" />
                  <span className="text-cream/60 font-light text-sm">01634-347328</span>
                </li>
                <li className="flex gap-4 items-start">
                  <Sparkles size={18} className="text-gold shrink-0" />
                  <span className="text-cream/60 font-light text-sm">Open Daily: 11 AM - 11 PM</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="text-white uppercase tracking-[0.2em] text-xs font-semibold mb-8">Newsletter</h4>
              <p className="text-cream/60 font-light text-sm mb-6">Subscribe to receive updates on our weekly specials and events.</p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm text-white focus:outline-none focus:border-gold transition-colors font-light"
                />
                <button className="absolute right-1 top-1 bg-gold text-espresso w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-widest text-cream/30 font-medium">
              &copy; {new Date().getFullYear()} Ratio Cafe & Bistro. All rights reserved.
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest text-cream/30 font-medium">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gold transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>


      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/8801634347328"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_24px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.227 5.227 0 00-.571-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute right-full mr-4 bg-espresso text-cream border border-gold/20 text-xs font-semibold px-4 py-2 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none tracking-wide uppercase">
          Chat with us
        </span>
      </a>
    </div>
  );
}

