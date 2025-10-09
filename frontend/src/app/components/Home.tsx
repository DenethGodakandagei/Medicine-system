import React from 'react';

const Home = () => {
  return (
    <main className="smooth-scroll bg-[#F8F9FA] text-[#202124]">
      {/* Hero Section */}
      <section className="relative h-[90vh] parallax bg-[url('/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="glassmorphism rounded-3xl p-8 md:p-16 max-w-4xl text-center text-white shadow-xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
              MediRequest - Your Health, Simplified
            </h1>
            <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
              Browse medicines, order prescriptions, and get healthcare delivered at your doorstep.
            </p>
            <button className="bg-[#1A73E8] hover:bg-[#4285F4] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Browse Medicines
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-[#1A73E8] mb-4 text-5xl">💊</div>
              <h3 className="font-semibold text-xl mb-2">Browse Medicines</h3>
              <p className="text-[#5F6368]">Find medicines quickly and easily from a wide selection.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-[#1A73E8] mb-4 text-5xl">📝</div>
              <h3 className="font-semibold text-xl mb-2">Upload Prescriptions</h3>
              <p className="text-[#5F6368]">Securely upload your prescription and order online.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-[#1A73E8] mb-4 text-5xl">🚚</div>
              <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
              <p className="text-[#5F6368]">Get medicines delivered straight to your doorstep.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-[#1A73E8] mb-4 text-5xl">💬</div>
              <h3 className="font-semibold text-xl mb-2">24/7 Support</h3>
              <p className="text-[#5F6368]">Our healthcare experts are available anytime for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <div className="text-[#1A73E8] font-bold text-5xl mb-4">1</div>
              <h3 className="font-semibold text-xl mb-2">Browse & Search</h3>
              <p className="text-[#5F6368]">Easily search and browse medicines in our catalog.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <div className="text-[#1A73E8] font-bold text-5xl mb-4">2</div>
              <h3 className="font-semibold text-xl mb-2">Upload Prescription</h3>
              <p className="text-[#5F6368]">Upload your prescription securely and select medicines.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md">
              <div className="text-[#1A73E8] font-bold text-5xl mb-4">3</div>
              <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
              <p className="text-[#5F6368]">Receive your order quickly at your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Medicines Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Medicines</h2>
          <div className="flex overflow-x-auto space-x-6 pb-8 no-scrollbar">
            <div className="min-w-[280px] bg-white rounded-2xl shadow-md p-6 flex-shrink-0 hover:scale-105 transition-transform duration-300">
              <img src="/med1.jpg" alt="Amoxicillin" className="rounded-xl mb-4 w-full h-40 object-cover" />
              <h3 className="font-semibold text-xl mb-2">Amoxicillin</h3>
              <p className="text-[#5F6368]">$12.99</p>
            </div>
            <div className="min-w-[280px] bg-white rounded-2xl shadow-md p-6 flex-shrink-0 hover:scale-105 transition-transform duration-300">
              <img src="/med2.jpg" alt="Paracetamol" className="rounded-xl mb-4 w-full h-40 object-cover" />
              <h3 className="font-semibold text-xl mb-2">Paracetamol</h3>
              <p className="text-[#5F6368]">$5.99</p>
            </div>
            <div className="min-w-[280px] bg-white rounded-2xl shadow-md p-6 flex-shrink-0 hover:scale-105 transition-transform duration-300">
              <img src="/med3.jpg" alt="Ibuprofen" className="rounded-xl mb-4 w-full h-40 object-cover" />
              <h3 className="font-semibold text-xl mb-2">Ibuprofen</h3>
              <p className="text-[#5F6368]">$7.49</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#F8F9FA] p-8 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
              <p className="text-lg text-[#5F6368] mb-4 italic">“Fast and reliable service, highly recommend MediRequest!”</p>
              <div className="flex items-center gap-4">
                <img src="/user1.jpg" alt="User 1" className="w-14 h-14 rounded-full border-2 border-[#1A73E8]" />
                <span className="font-semibold text-lg">Alice R.</span>
              </div>
            </div>
            <div className="bg-[#F8F9FA] p-8 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
              <p className="text-lg text-[#5F6368] mb-4 italic">“Uploading my prescription was easy and delivery was quick.”</p>
              <div className="flex items-center gap-4">
                <img src="/user2.jpg" alt="User 2" className="w-14 h-14 rounded-full border-2 border-[#1A73E8]" />
                <span className="font-semibold text-lg">Mark T.</span>
              </div>
            </div>
            <div className="bg-[#F8F9FA] p-8 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 hidden lg:block">
              <p className="text-lg text-[#5F6368] mb-4 italic">“A great platform for all my medical needs. Simple and efficient!”</p>
              <div className="flex items-center gap-4">
                <img src="/user3.jpg" alt="User 3" className="w-14 h-14 rounded-full border-2 border-[#1A73E8]" />
                <span className="font-semibold text-lg">Sarah L.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="accordion border border-[#E0E0E0] rounded-lg p-6 bg-white shadow-sm">
              <h3 className="font-semibold text-lg mb-2 cursor-pointer text-[#1A73E8]">How do I upload my prescription?</h3>
              <div className="accordion-content text-[#5F6368] pt-2 border-t border-[#E0E0E0]">
                Click the “Upload Prescription” button, select your prescription files, and submit. Our team will review it and process your order.
              </div>
            </div>
            <div className="accordion border border-[#E0E0E0] rounded-lg p-6 bg-white shadow-sm">
              <h3 className="font-semibold text-lg mb-2 cursor-pointer text-[#1A73E8]">What payment methods are accepted?</h3>
              <div className="accordion-content text-[#5F6368] pt-2 border-t border-[#E0E0E0]">
                We accept all major credit cards, debit cards, and mobile payment options. Cash on delivery is also available in select areas.
              </div>
            </div>
            <div className="accordion border border-[#E0E0E0] rounded-lg p-6 bg-white shadow-sm">
              <h3 className="font-semibold text-lg mb-2 cursor-pointer text-blue-700">Is my data secure?</h3>
              <div className="accordion-content text-[#5F6368] pt-2 border-t border-[#E0E0E0]">
                Yes, we use industry-standard encryption to protect all your personal and medical information. Your privacy is our top priority.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;