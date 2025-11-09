'use client';

import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animated-gradient {
          background: linear-gradient(
            90deg,
            #0D4D56,
            #15797F,
            #20C9C9,
            #3CDEDE,
            #5ef3f3,
            #3CDEDE,
            #20C9C9,
            #15797F,
            #0D4D56
          );
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 4px 20px rgba(32, 201, 201, 0.4));
        }
      `}</style>

      <main className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap"
          rel="stylesheet"
        />
        <h1
          className="text-8xl md:text-9xl font-bold animated-gradient"
          style={{
            fontFamily: "'Comfortaa', cursive",
          }}
        >
          Trunq
        </h1>
      </main>
    </div>
  );
}
