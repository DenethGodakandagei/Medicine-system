import React from 'react';

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-[#E3F2FD] to-[#FFFFFF] text-[#202124] font-inter smooth-scroll">
      
      {/* Hero Section */}
      <section className="relative h-[90vh] parallax bg-[url('/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D47A1]/90 to-[#1976D2]/70"></div>
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up drop-shadow-lg">
              MediRequest — Smarter Healthcare, Simplified
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-90 animate-fade-in-up">
              Manage your prescriptions, order medicines, and receive trusted healthcare at your doorstep.
            </p>
            <button className="bg-[#1565C0] hover:bg-[#0D47A1] text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Browse Medicines
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#F8FAFF]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14 text-[#0D47A1]">
            Why Choose MediRequest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: "💊", title: "Browse Medicines", desc: "Quickly find medicines from a vast verified catalog." },
              { icon: "📝", title: "Upload Prescriptions", desc: "Easily upload and manage your prescriptions securely." },
              { icon: "🚚", title: "Fast Delivery", desc: "Get your orders delivered swiftly to your doorstep." },
              { icon: "💬", title: "24/7 Support", desc: "Healthcare experts ready to assist you anytime." }
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#0D47A1] mb-3">{feature.title}</h3>
                <p className="text-[#5F6368]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-[#FFFFFF] to-[#E3F2FD]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#0D47A1] mb-14">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { num: "1", title: "Search Medicines", desc: "Find your required medicines or healthcare items." },
              { num: "2", title: "Upload Prescription", desc: "Upload your prescription and confirm your order securely." },
              { num: "3", title: "Get Delivery", desc: "Receive your medicines safely and on time." }
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2"
              >
                <div className="text-[#1565C0] font-bold text-6xl mb-4">{step.num}</div>
                <h3 className="text-2xl font-semibold text-[#0D47A1] mb-3">{step.title}</h3>
                <p className="text-[#5F6368]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14 text-[#0D47A1]">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
  { 
    text: "Fast and reliable service, highly recommend MediRequest!", 
    name: "Alice R.", 
    img: "https://randomuser.me/api/portraits/women/68.jpg" 
  },
  { 
    text: "Uploading my prescription was easy and delivery was quick.", 
    name: "Mark T.", 
    img: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  { 
    text: "A one-stop solution for all my medical needs.", 
    name: "Sarah L.", 
    img: "https://randomuser.me/api/portraits/women/44.jpg" 
  }
].map((user, i) => (
              <div
                key={i}
                className="bg-[#E3F2FD] rounded-3xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300"
              >
                <p className="text-[#0D47A1] italic mb-6">“{user.text}”</p>
                <div className="flex flex-col items-center">
                  <img src={user.img} alt={user.name} className="w-16 h-16 rounded-full border-4 border-[#1976D2] mb-3" />
                  <span className="font-semibold text-lg text-[#0D47A1]">{user.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#F8FAFF]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14 text-[#0D47A1]">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How do I upload my prescription?",
                a: "Click 'Upload Prescription', choose your files, and submit. Our team reviews it quickly."
              },
              {
                q: "What payment methods are accepted?",
                a: "We accept all major cards, mobile payments, and cash on delivery in select areas."
              },
              {
                q: "Is my data secure?",
                a: "Yes, we use industry-standard encryption to ensure complete privacy and safety."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#E0E0E0] shadow-sm hover:shadow-md transition-all">
                <h3 className="font-semibold text-[#1565C0] text-lg mb-2">{faq.q}</h3>
                <p className="text-[#5F6368]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
