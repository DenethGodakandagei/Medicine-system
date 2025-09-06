import React from 'react';

const Home = () => {
  return (
    <main className="smooth-scroll">
      {/* Hero Section */}
      <section className="relative h-[90vh] parallax bg-[url('/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="glassmorphism rounded-3xl p-8 md:p-16 max-w-4xl text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
              MediRequest - Your Health, Simplified
            </h1>
            <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
              Browse medicines, order prescriptions, and get healthcare delivered at your doorstep.
            </p>
            <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white font-semibold py-3 px-6 rounded-full transition-all">
              Browse Medicines
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow p-6 text-center hover:scale-105 transition-transform">
              <div className="text-[var(--primary-color)] mb-4 text-4xl">💊</div>
              <h3 className="font-semibold text-xl mb-2">Browse Medicines</h3>
              <p className="text-gray-500">Find medicines quickly and easily from a wide selection.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center hover:scale-105 transition-transform">
              <div className="text-[var(--primary-color)] mb-4 text-4xl">📝</div>
              <h3 className="font-semibold text-xl mb-2">Upload Prescriptions</h3>
              <p className="text-gray-500">Securely upload your prescription and order online.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center hover:scale-105 transition-transform">
              <div className="text-[var(--primary-color)] mb-4 text-4xl">🚚</div>
              <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
              <p className="text-gray-500">Get medicines delivered straight to your doorstep.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center hover:scale-105 transition-transform">
              <div className="text-[var(--primary-color)] mb-4 text-4xl">💬</div>
              <h3 className="font-semibold text-xl mb-2">24/7 Support</h3>
              <p className="text-gray-500">Our healthcare experts are available anytime for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-[var(--primary-color)] font-bold text-5xl mb-4">1</div>
              <h3 className="font-semibold text-xl mb-2">Browse & Search</h3>
              <p className="text-gray-500">Easily search and browse medicines in our catalog.</p>
            </div>
            <div className="text-center">
              <div className="text-[var(--primary-color)] font-bold text-5xl mb-4">2</div>
              <h3 className="font-semibold text-xl mb-2">Upload Prescription</h3>
              <p className="text-gray-500">Upload your prescription securely and select medicines.</p>
            </div>
            <div className="text-center">
              <div className="text-[var(--primary-color)] font-bold text-5xl mb-4">3</div>
              <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
              <p className="text-gray-500">Receive your order quickly at your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Medicines Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Medicines</h2>
          <div className="flex overflow-x-auto space-x-6 pb-8 no-scrollbar">
            <div className="min-w-[250px] bg-white rounded-xl shadow p-6 flex-shrink-0 hover:scale-105 transition-transform">
              <img src="/med1.jpg" alt="Amoxicillin" className="rounded-md mb-4 w-full h-40 object-cover" />
              <h3 className="font-semibold text-xl mb-2">Amoxicillin</h3>
              <p className="text-gray-500">$12.99</p>
            </div>
            <div className="min-w-[250px] bg-white rounded-xl shadow p-6 flex-shrink-0 hover:scale-105 transition-transform">
              <img src="/med2.jpg" alt="Paracetamol" className="rounded-md mb-4 w-full h-40 object-cover" />
              <h3 className="font-semibold text-xl mb-2">Paracetamol</h3>
              <p className="text-gray-500">$5.99</p>
            </div>
            <div className="min-w-[250px] bg-white rounded-xl shadow p-6 flex-shrink-0 hover:scale-105 transition-transform">
              <img src="/med3.jpg" alt="Ibuprofen" className="rounded-md mb-4 w-full h-40 object-cover" />
              <h3 className="font-semibold text-xl mb-2">Ibuprofen</h3>
              <p className="text-gray-500">$7.49</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:scale-105 transition-transform">
              <p className="text-gray-600 mb-4">“Fast and reliable service, highly recommend MediRequest!”</p>
              <div className="flex items-center gap-4">
                <img src="/user1.jpg" alt="User 1" className="w-12 h-12 rounded-full" />
                <span className="font-semibold">Alice R.</span>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:scale-105 transition-transform">
              <p className="text-gray-600 mb-4">“Uploading my prescription was easy and delivery was quick.”</p>
              <div className="flex items-center gap-4">
                <img src="/user2.jpg" alt="User 2" className="w-12 h-12 rounded-full" />
                <span className="font-semibold">Mark T.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="accordion border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2 cursor-pointer">How do I upload my prescription?</h3>
              <div className="accordion-content text-gray-500">
                Click the “Upload Prescription” button, select your prescription files, and submit.
              </div>
            </div>
            <div className="accordion border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2 cursor-pointer">What payment methods are accepted?</h3>
              <div className="accordion-content text-gray-500">
                We accept all major credit cards, debit cards, and mobile payment options.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
