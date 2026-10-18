import React, { useState } from 'react';
import type { Member } from './teamData';

interface TeamCardProps {
  member: Member;
  isStackFront?: boolean;
  className?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  member,
  isStackFront = false,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  // Neutral placeholder if image fails to load
  const imageSrc =
    imgError || !member.image
      ? `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="100%" height="100%" fill="%23111b15"/><circle cx="100" cy="80" r="36" fill="%23243a2e"/><path d="M40 180 C40 135 70 120 100 120 C130 120 160 135 160 180 Z" fill="%23243a2e"/></svg>`
      : member.image;

  return (
    <div
      className={`flux-team-card ${isStackFront ? 'flux-stack-front' : ''} ${className}`}
      style={{
        aspectRatio: '0.68',
        borderRadius: '12px',
        border: isStackFront
          ? '1px solid rgba(77, 255, 124, 0.8)'
          : '1px solid rgba(255, 255, 255, 0.17)',
        backgroundColor: '#0a100d',
        overflow: 'hidden',
        containerType: 'inline-size',
        position: 'relative',
        width: '100%',
        height: '100%',
        boxShadow: isStackFront
          ? '0 0 25px rgba(77, 255, 124, 0.3), 0 12px 26px rgba(0, 0, 0, 0.55)'
          : undefined,
      }}
    >
      {/* Photo with optimized framing */}
      <img
        src={imageSrc}
        alt={member.name}
        onError={() => setImgError(true)}
        className="pointer-events-none select-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '70%',
          objectFit: 'cover',
          objectPosition: member.imagePosition || 'center 22%',
          transform: member.imageScale ? `scale(${member.imageScale})` : undefined,
        }}
      />

      {/* Smooth Gradient Overlay: keeps face clear, fades softly into card */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, transparent 34%, rgba(10, 16, 13, 0.35) 58%, rgba(10, 16, 13, 0.85) 78%, #0a100d 92%)',
        }}
      />

      {/* Name: bold, clean scaling, strictly one line for uniform look across all cards */}
      <div
        title={member.name}
        style={{
          position: 'absolute',
          bottom: '21.8cqw',
          left: '7cqw',
          right: '7cqw',
          fontSize: isStackFront
            ? (member.name.length > 18 ? '7.4cqw' : '8.2cqw')
            : (member.name.length > 20 ? '6.3cqw' : member.name.length > 15 ? '6.9cqw' : '7.6cqw'),
          fontWeight: 700,
          lineHeight: 1.2,
          color: '#ffffff',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          letterSpacing: '-0.015em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          pointerEvents: 'none',
        }}
      >
        {member.name}
      </div>

      {/* Role: uppercase, green double-bar, clear contrast, strictly one line */}
      <div
        title={member.role}
        style={{
          position: 'absolute',
          bottom: '15.6cqw',
          left: '7cqw',
          right: '7cqw',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5cqw',
          textTransform: 'uppercase',
          fontSize: member.role.length > 20 ? '4.0cqw' : '4.6cqw',
          letterSpacing: '0.04em',
          color: 'rgba(255, 255, 255, 0.78)',
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          pointerEvents: 'none',
        }}
      >
        {/* Small green double-bar marker: two 1.5px green lines */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '4.2cqw',
            height: '2.2cqw',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              width: '1.5px',
              height: '100%',
              backgroundColor: '#4dff7c',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              width: '1.5px',
              height: '100%',
              backgroundColor: '#4dff7c',
              display: 'inline-block',
            }}
          />
        </span>
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {member.role}
        </span>
      </div>

      {/* Social icons: fixed at bottom 6.5cqw, left 7cqw */}
      <div
        style={{
          position: 'absolute',
          bottom: '6.5cqw',
          left: '7cqw',
          display: 'flex',
          alignItems: 'center',
          gap: '5.5cqw',
          zIndex: 2,
        }}
      >
        {/* LinkedIn */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn Profile`}
            className="flux-social-link"
            style={{
              width: '9cqw',
              height: '9cqw',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.65)',
              textDecoration: 'none',
              borderRadius: '2px',
              outlineOffset: '2px',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        )}

        {/* GitHub */}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} GitHub Profile`}
            className="flux-social-link"
            style={{
              width: '9cqw',
              height: '9cqw',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.65)',
              textDecoration: 'none',
              borderRadius: '2px',
              outlineOffset: '2px',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        )}

        {/* Mail */}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            className="flux-social-link"
            style={{
              width: '9cqw',
              height: '9cqw',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.65)',
              textDecoration: 'none',
              borderRadius: '2px',
              outlineOffset: '2px',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};
