// src/pages/AboutUs.jsx
export default function AboutUs() {
  const team = [
    { name: 'Dr. Vishwa Mori',   role: 'Chief Nutritionist',  emoji: '👩‍⚕️', bio: '2 Year experience in pediatric nutrition and dietetics.' },
    { name: 'Arjun Patel',        role: 'Health Coach',        emoji: '🏋️', bio: 'Certified health coach specializing in family wellness.' },
    { name: 'Meera Joshi',        role: 'Recipe Developer',    emoji: '👩‍🍳', bio: 'Chef and food scientist with a passion for healthy cooking.' },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-700 to-green-600 text-white py-16 px-4 text-center">
        <div className="text-6xl mb-4">🌿</div>
        <h1 className="text-5xl font-black font-display mb-4">About Us</h1>
        <p className="text-primary-100 max-w-xl mx-auto text-lg">We believe healthy eating should be accessible, enjoyable, and rewarding for everyone — at every age.</p>
      </div>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-black font-display text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          Healthy Food Guide was built to make nutrition simple, fun and rewarding. We provide age-specific food recommendations backed by science, so every family can eat well at every stage of life — and get rewarded for it.
        </p>
      </section>

      {/* Stats */}
      <section className="bg-primary-50 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['500+', 'Healthy Recipes'], ['5', 'Age Groups'], ['10K+', 'Happy Users'], ['50+', 'Expert Tips']].map(([num, label]) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-card">
              <p className="text-3xl font-black text-primary-600 font-display">{num}</p>
              <p className="text-gray-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black font-display text-gray-800 text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map(member => (
            <div key={member.name} className="bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
              <div className="text-5xl mb-3">{member.emoji}</div>
              <h3 className="font-bold text-lg font-display text-gray-800">{member.name}</h3>
              <p className="text-primary-600 text-sm font-semibold mb-2">{member.role}</p>
              <p className="text-gray-500 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
