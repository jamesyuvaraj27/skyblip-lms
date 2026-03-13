import React from 'react';

const LandingPageFlow = () => {
  const sections = [
    {
      id: 1,
      label: 'Hero area of landing page',
      description: 'Primary value proposition — public, not yet signed in',
      color: 'bg-emerald-800',
      items: [],
    },
    {
      id: 2,
      label: 'Top strip',
      description: 'Key highlights — benefits, video, stats, primary CTA',
      color: 'bg-sky-900',
      items: [
        'Hero headline & subheading',
        'Key stats / social proof',
        'Primary CTA (Get started)',
        'Secondary CTA (Browse courses)',
      ],
    },
    {
      id: 3,
      label: 'Value-driven rows',
      description: 'Focused content sections that address different intents',
      color: 'bg-sky-900',
      items: [
        'For students: Learn by solving real problems',
        'For instructors: Publish structured courses',
        'For teams: Track progress and analytics',
      ],
    },
    {
      id: 4,
      label: 'Use cases',
      description: 'Specific scenarios that map to real user goals',
      color: 'bg-sky-900',
      items: [
        'Practice coding problems with rich editor',
        'Prepare for exams with quizzes and results',
        'Complete courses and earn certificates',
      ],
    },
    {
      id: 5,
      label: 'Trust & proof',
      description: 'Testimonials, logos, metrics that build trust',
      color: 'bg-sky-900',
      items: [
        'Student testimonials',
        'Instructor stories',
        'Usage metrics / platform stats',
      ],
    },
    {
      id: 6,
      label: 'Bottom CTA strip',
      description: 'Final call-to-action for each key role',
      color: 'bg-violet-900',
      items: [
        'For students: Start solving now',
        'For instructors: Start teaching',
        'For admins/teams: Talk to us',
      ],
    },
    {
      id: 7,
      label: 'Footer navigation',
      description: 'Supporting pages that sit under the landing page',
      color: 'bg-stone-900',
      items: [
        'About',
        'Help & support',
        'Explore courses',
        'Explore problems',
      ],
    },
  ];

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        backgroundColor: '#0b1020',
        minHeight: '100vh',
        color: '#f9fafb',
        padding: '2.5rem 3rem 4rem',
      }}
    >
      <header style={{ marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontSize: '1.9rem',
            fontWeight: 700,
            letterSpacing: '0.03em',
            marginBottom: '0.4rem',
          }}
        >
          Landing page — complete flow
        </h1>
        <p style={{ color: '#e5e7eb', fontSize: '0.9rem' }}>
          Sections the visitor scrolls through before they sign in or sign up.
        </p>
      </header>

      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '1080px',
        }}
      >
        {sections.map((section) => (
          <section
            key={section.id}
            style={{
              borderRadius: '999px',
              padding: '1rem 1.5rem',
              background:
                section.color === 'bg-emerald-800'
                  ? 'linear-gradient(90deg, #065f46, #047857)'
                  : section.color === 'bg-violet-900'
                  ? 'linear-gradient(90deg, #4c1d95, #5b21b6)'
                  : section.color === 'bg-stone-900'
                  ? 'linear-gradient(90deg, #1c1917, #292524)'
                  : 'linear-gradient(90deg, #0f172a, #1d4ed8)',
              boxShadow: '0 18px 45px rgba(15, 23, 42, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  {section.id}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>{section.label}</div>
                  <div style={{ fontSize: '0.85rem', color: '#e5e7eb' }}>
                    {section.description}
                  </div>
                </div>
              </div>
            </div>

            {section.items.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '0.2rem',
                }}
              >
                {section.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.35rem 0.8rem',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(15, 23, 42, 0.75)',
                      border: '1px solid rgba(148, 163, 184, 0.4)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
};

export default LandingPageFlow;

