import React from 'react';

const Home = () => {
  return (
    <main className="smooth-scroll">
      {/* Hero Section */}
      <section className="relative h-[90vh] parallax bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2-B6_HvCdLDI_fYqtAyd3vnsnW0qY14Cmm9Nx55d__ibw6xZVgaacb-jeqC2ZlmcJ91cQd6jJ-iVtcVll8d_0LevnFoFXSCFuXAaH95E73FIqwwsl_kygnomKhIgVOmYVQxoI4ZRxA3E6CU9s59EZDRutcAxiFMZZ1Sb6lNAgJwdMa3DaYVHQZNmCCi4aI1hKG7bUWDtBWO-DeJ_LFHqveS8F5KQnbOfW1WsfTHeHzWzmlGhyRvRH2fd5sWeWdBmgQiNIwhxjhXHD')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="glassmorphism rounded-3xl p-8 md:p-16 max-w-4xl text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
              MediLink - Your Health, Simplified
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
  <div className="container mx-auto px-6 lg:px-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
        Our Features
      </h2>
      <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
        Explore how MediRequest makes healthcare simple and efficient.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Feature 1 - Browse Medicines */}
      <div className="group glassmorphism rounded-2xl p-8 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="text-[var(--primary-color)] text-6xl mb-6 flex items-center justify-center w-24 h-24 transition-all duration-300 group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Browse Medicines
        </h3>
        <p className="text-[var(--text-secondary)]">
          Find medicines quickly and easily from a wide selection.
        </p>
      </div>

      {/* Feature 2 - Upload Prescriptions */}
      <div className="group glassmorphism rounded-2xl p-8 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="text-[var(--primary-color)] text-6xl mb-6 flex items-center justify-center w-24 h-24 transition-all duration-300 group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.68l50.34-50.34a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Upload Prescriptions
        </h3>
        <p className="text-[var(--text-secondary)]">
          Securely upload your prescription and order online.
        </p>
      </div>

      {/* Feature 3 - Fast Delivery */}
      <div className="group glassmorphism rounded-2xl p-8 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="text-[var(--primary-color)] text-6xl mb-6 flex items-center justify-center w-24 h-24 transition-all duration-300 group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M247.42,117l-14-35A15.93,15.93,0,0,0,218.58,72H184V64a8,8,0,0,0-8-8H24A16,16,0,0,0,8,72V184a16,16,0,0,0,16,16H41a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,247.42,117ZM184,88h34.58l9.6,24H184ZM24,72H168v64H24ZM72,208a16,16,0,1,1,16-16A16,16,0,0,1,72,208Zm81-24H103a32,32,0,0,0-62,0H24V152H168v12.31A32.11,32.11,0,0,0,153,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,184,208Zm48-24H215a32.06,32.06,0,0,0-31-24V128h48Z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Fast Delivery
        </h3>
        <p className="text-[var(--text-secondary)]">
          Get medicines delivered straight to your doorstep.
        </p>
      </div>

      {/* Feature 4 - 24/7 Support */}
      <div className="group glassmorphism rounded-2xl p-8 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="text-[var(--primary-color)] text-6xl mb-6 flex items-center justify-center w-24 h-24 transition-all duration-300 group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          24/7 Support
        </h3>
        <p className="text-[var(--text-secondary)]">
          Our healthcare experts are available anytime for you.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* How It Works Section */}
     <section className="py-24 bg-white">
  <div className="container mx-auto px-6 lg:px-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
        How It Works
      </h2>
      <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
        Get started in just three simple steps.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Step 1 */}
      <div className="group glassmorphism rounded-2xl p-8 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="text-[var(--primary-color)] text-6xl mb-6 flex items-center justify-center w-20 h-20 font-bold transition-all duration-300 group-hover:scale-110">
          1
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Browse & Search
        </h3>
        <p className="text-[var(--text-secondary)]">
          Easily search and browse medicines in our catalog.
        </p>
      </div>

      {/* Step 2 */}
      <div className="group glassmorphism rounded-2xl p-8 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="text-[var(--primary-color)] text-6xl mb-6 flex items-center justify-center w-20 h-20 font-bold transition-all duration-300 group-hover:scale-110">
          2
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Upload Prescription
        </h3>
        <p className="text-[var(--text-secondary)]">
          Upload your prescription securely and select medicines.
        </p>
      </div>

      {/* Step 3 */}
      <div className="group glassmorphism rounded-2xl p-8 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <div className="text-[var(--primary-color)] text-6xl mb-6 flex items-center justify-center w-20 h-20 font-bold transition-all duration-300 group-hover:scale-110">
          3
        </div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Fast Delivery
        </h3>
        <p className="text-[var(--text-secondary)]">
          Receive your order quickly at your doorstep.
        </p>
      </div>
    </div>
  </div>
</section>
<section className="py-24">
  <div className="container mx-auto px-6 lg:px-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
        How It Works
      </h2>
    </div>

    <div className="relative">
      {/* Connector Line (only visible on md+) */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Step 1 */}
        <div className="text-center">
          <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
            1
          </div>
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
            Browse & Select
          </h3>
          <p className="text-[var(--text-secondary)]">
            Explore our extensive catalog and choose the medicines you need.
          </p>
        </div>

        {/* Step 2 */}
        <div className="text-center">
          <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
            2
          </div>
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
            Request Medicines
          </h3>
          <p className="text-[var(--text-secondary)]">
            Submit your request to multiple pharmacies and compare offers.
          </p>
        </div>

        {/* Step 3 */}
        <div className="text-center">
          <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
            3
          </div>
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
            Receive Delivery
          </h3>
          <p className="text-[var(--text-secondary)]">
            Get your medicines delivered to your doorstep quickly and safely.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



    </main>
  );
};

export default Home;
