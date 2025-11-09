'use client';

import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center py-20">
            <h1
              className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Welcome to{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-light) 100%)',
                }}
              >
                Trunq
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-8"
              style={{ color: 'var(--text-muted)' }}
            >
              Built with Next.js and beautiful theming
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                }}
              >
                Get Started
              </button>
              <button
                className="px-8 py-3 rounded-lg font-semibold transition-all"
                style={{
                  border: '2px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Learn More
              </button>
            </div>
          </section>

          {/* Features Grid */}
          <section className="grid md:grid-cols-3 gap-6 py-12">
            {[
              {
                title: 'Light & Dark Mode',
                description: 'Seamless theme switching with beautiful teal-inspired color palettes',
                icon: '🌓',
              },
              {
                title: 'Responsive Design',
                description: 'Works perfectly on all devices from mobile to desktop',
                icon: '📱',
              },
              {
                title: 'Modern Stack',
                description: 'Built with Next.js 14, React, and Tailwind CSS',
                icon: '⚡',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl transition-all"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-light)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </section>

          {/* Color Palette Showcase */}
          <section className="py-12">
            <h2
              className="text-3xl font-bold mb-6 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              Color Palette
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Primary Dark', var: '--primary-dark' },
                { name: 'Primary', var: '--primary' },
                { name: 'Primary Light', var: '--primary-light' },
                { name: 'Accent', var: '--accent' },
              ].map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className="h-24 rounded-lg mb-2"
                    style={{ backgroundColor: `var(${color.var})` }}
                  />
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
