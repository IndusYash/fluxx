import React, { useEffect, useRef, useCallback } from 'react';
import { YEAR_SECTIONS } from './teamData';
import { TeamHero } from './TeamHero';
import { TeamYearNav } from './TeamYearNav';
import { TeamSection, type SectionDOMHandle } from './TeamSection';
import { TeamJoinBanner } from './TeamJoinBanner';
import './team.css';

interface CardMeasurement {
  cardRelX: number;
  cardRelY: number;
  s0: number;
  rowIndex: number;
  colIndex: number;
  rowY: number;
}

export default function TeamPage() {
  const sectionsRef = useRef<Map<number, SectionDOMHandle>>(new Map());
  const measurementsRef = useRef<Map<number, CardMeasurement[]>>(new Map());
  const totalRowsMapRef = useRef<Map<number, number>>(new Map());
  const dealtRowsMapRef = useRef<Map<number, Set<number>>>(new Map());
  const rafIdRef = useRef<number | null>(null);

  // Animation calculation for all sections based on scroll
  const updateAnimation = useCallback(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const innerH = window.innerHeight || 800;
    const triggerThreshold = innerH * 0.82;
    const retractThreshold = innerH * 0.94;

    sectionsRef.current.forEach((handle, secIdx) => {
      const { stageEl, stackFrontEl, cardEls, pathEl, nodeEls, arrowEl } = handle;
      const measurements = measurementsRef.current.get(secIdx);
      if (!stageEl || !stackFrontEl || !measurements || measurements.length !== cardEls.length)
        return;

      const totalRows = totalRowsMapRef.current.get(secIdx) || 1;
      let dealtSet = dealtRowsMapRef.current.get(secIdx);
      if (!dealtSet) {
        dealtSet = new Set<number>();
        dealtRowsMapRef.current.set(secIdx, dealtSet);
      }

      const stageRect = stageEl.getBoundingClientRect();
      const stackRect = stackFrontEl.getBoundingClientRect();
      const stackCenterX = stackRect.left + stackRect.width / 2;
      const stackCenterY = stackRect.top + stackRect.height / 2;

      // Accessibility / Reduced motion
      if (prefersReducedMotion) {
        stageEl.classList.add('flux-settled');
        cardEls.forEach((cardEl) => {
          cardEl.style.transition = 'none';
          cardEl.style.transform = '';
          cardEl.style.filter = '';
          cardEl.style.opacity = '1';
          cardEl.style.pointerEvents = '';
          cardEl.classList.add('done');
        });
        for (let r = 0; r < totalRows; r++) dealtSet.add(r);
        if (pathEl) pathEl.style.strokeDashoffset = '0';
        nodeEls.forEach((n) => {
          if (n) n.style.opacity = '1';
        });
        if (arrowEl) arrowEl.style.opacity = '1';
        return;
      }

      // Passed section completely -> settle all cards instantly
      if (stageRect.bottom < -200) {
        stageEl.classList.add('flux-settled');
        cardEls.forEach((cardEl) => {
          cardEl.style.transition = 'none';
          cardEl.style.transform = '';
          cardEl.style.filter = '';
          cardEl.style.opacity = '1';
          cardEl.style.pointerEvents = '';
          cardEl.classList.add('done');
        });
        for (let r = 0; r < totalRows; r++) dealtSet.add(r);
        if (pathEl) pathEl.style.strokeDashoffset = '0';
        nodeEls.forEach((n) => {
          if (n) n.style.opacity = '1';
        });
        if (arrowEl) arrowEl.style.opacity = '1';
        return;
      }

      // Way above section -> ensure all cards rest hidden in the stack
      if (stageRect.top > innerH + 300) {
        stageEl.classList.remove('flux-settled');
        cardEls.forEach((cardEl, i) => {
          const m = measurements[i];
          if (m) {
            const dx = stackCenterX - (stageRect.left + m.cardRelX);
            const dy = stackCenterY - (stageRect.top + m.cardRelY);
            const startRot = 7.5 + (m.colIndex - 1.5) * 2.5;
            cardEl.style.transition = 'none';
            cardEl.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) rotate(${startRot.toFixed(2)}deg) scale(${m.s0.toFixed(4)})`;
            cardEl.style.filter = 'blur(1.5px)';
            cardEl.style.opacity = '0';
            cardEl.style.pointerEvents = 'none';
            cardEl.classList.remove('done');
          }
        });
        dealtSet.clear();
        if (pathEl) pathEl.style.strokeDashoffset = '1';
        nodeEls.forEach((n) => {
          if (n) n.style.opacity = '0';
        });
        if (arrowEl) arrowEl.style.opacity = '0';
        return;
      }

      // Section in active view: check each row independently
      for (let r = 0; r < totalRows; r++) {
        const sampleCard = measurements.find((m) => m.rowIndex === r);
        if (!sampleCard) continue;

        const rowViewportY = stageRect.top + sampleCard.rowY;
        const isDealt = dealtSet.has(r);

        if (!isDealt && rowViewportY < triggerThreshold) {
          // Trigger deal for entire row r - self-completing GPU transition
          dealtSet.add(r);
          const isFarAbove = rowViewportY < -100;

          cardEls.forEach((cardEl, i) => {
            const m = measurements[i];
            if (m && m.rowIndex === r) {
              if (isFarAbove) {
                // If already scrolled past on refresh/jump, snap into place
                cardEl.style.transition = 'none';
                cardEl.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
                cardEl.style.filter = '';
                cardEl.style.opacity = '1';
                cardEl.style.pointerEvents = '';
                cardEl.classList.add('done');
              } else {
                const delay = m.colIndex * 90;
                const startRot = 7.5 + (m.colIndex - 1.5) * 2.5;
                const dx = stackCenterX - (stageRect.left + m.cardRelX);
                const dy = stackCenterY - (stageRect.top + m.cardRelY);

                // Set initial stack starting position
                cardEl.style.transition = 'none';
                cardEl.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) rotate(${startRot.toFixed(2)}deg) scale(${m.s0.toFixed(4)})`;
                cardEl.style.filter = 'blur(1.5px)';
                cardEl.style.opacity = '0.35';
                cardEl.style.pointerEvents = 'none';

                // Force browser reflow to commit stack coordinates before transition
                void cardEl.offsetWidth;

                // Animate smoothly to grid slot (runs to completion even if scrolling stops)
                cardEl.style.transition = `transform 0.62s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 0.4s ease ${delay}ms, filter 0.45s ease ${delay}ms`;
                cardEl.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
                cardEl.style.filter = 'blur(0px)';
                cardEl.style.opacity = '1';
                cardEl.style.pointerEvents = '';

                setTimeout(() => {
                  if (dealtRowsMapRef.current.get(secIdx)?.has(r)) {
                    cardEl.classList.add('done');
                  }
                }, 640 + delay);
              }
            }
          });
        } else if (isDealt && rowViewportY > retractThreshold) {
          // Retract row r back to stack (user scrolled back up)
          dealtSet.delete(r);

          cardEls.forEach((cardEl, i) => {
            const m = measurements[i];
            if (m && m.rowIndex === r) {
              cardEl.classList.remove('done');
              const dx = stackCenterX - (stageRect.left + m.cardRelX);
              const dy = stackCenterY - (stageRect.top + m.cardRelY);
              const startRot = 7.5 + (m.colIndex - 1.5) * 2.5;

              cardEl.style.transition =
                'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, filter 0.3s ease';
              cardEl.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) rotate(${startRot.toFixed(2)}deg) scale(${m.s0.toFixed(4)})`;
              cardEl.style.filter = 'blur(1.5px)';
              cardEl.style.opacity = '0';
              cardEl.style.pointerEvents = 'none';
            }
          });
        }
      }

      // Neon trajectory path and indicators follow row 0
      const row0Dealt = dealtSet.has(0);
      if (pathEl) {
        pathEl.style.transition = 'stroke-dashoffset 0.5s ease';
        pathEl.style.strokeDashoffset = row0Dealt ? '0' : '1';
      }
      nodeEls.forEach((nodeEl, idx) => {
        if (nodeEl) {
          nodeEl.style.transition = `opacity 0.25s ease ${idx * 60}ms`;
          nodeEl.style.opacity = row0Dealt ? '1' : '0';
        }
      });
      if (arrowEl) {
        arrowEl.style.transition = 'opacity 0.3s ease 240ms';
        arrowEl.style.opacity = row0Dealt ? '1' : '0';
      }

      // Find the next undealt row in this section
      let nextRow = -1;
      for (let r = 0; r < totalRows; r++) {
        if (!dealtSet.has(r)) {
          nextRow = r;
          break;
        }
      }

      // Update stack front card to display the member who is next to be dealt out
      if (nextRow !== -1 && handle.setNextMemberIndex) {
        const nextCardIdx = measurements.findIndex(
          (m) => m.rowIndex === nextRow && m.colIndex === 0
        );
        const targetIdx =
          nextCardIdx !== -1
            ? nextCardIdx
            : measurements.findIndex((m) => m.rowIndex === nextRow);
        if (targetIdx !== -1) {
          handle.setNextMemberIndex(targetIdx);
        }
      }

      // Settle state: once all rows in this section are dealt, show interactive Spotlight
      if (dealtSet.size === totalRows && totalRows > 0) {
        stageEl.classList.add('flux-settled');
      } else {
        stageEl.classList.remove('flux-settled');
      }
    });
  }, []);

  // Measure initial coordinates and offsets with transforms cleared
  const measureAll = useCallback(() => {
    const isSmall = window.innerWidth <= 1180;

    sectionsRef.current.forEach((handle, secIdx) => {
      const { stageEl, stackFrontEl, cardEls } = handle;
      if (!stageEl || !stackFrontEl || cardEls.length === 0) return;

      // Temporarily clear transforms to get un-animated natural layout positions
      const savedTransforms = cardEls.map((c) => c.style.transform);
      const savedTransitions = cardEls.map((c) => c.style.transition);
      cardEls.forEach((c) => {
        c.style.transition = 'none';
        c.style.transform = 'none';
      });

      const stageRect = stageEl.getBoundingClientRect();
      const stackRect = stackFrontEl.getBoundingClientRect();
      const stackCenterX = stackRect.left + stackRect.width / 2;
      const stackCenterY = stackRect.top + stackRect.height / 2;

      // Compute stack width and height
      const firstCardRect = cardEls[0].getBoundingClientRect();
      const cardWidth = firstCardRect.width || 144;
      const sw = isSmall ? Math.min(210, window.innerWidth * 0.5) : cardWidth * 1.42;
      const sh = sw / 0.68;

      stageEl.style.setProperty('--sw', `${sw.toFixed(1)}px`);
      stageEl.style.setProperty('--sh', `${sh.toFixed(1)}px`);

      const rawMeasurements = cardEls.map((cardEl) => {
        const cRect = cardEl.getBoundingClientRect();
        const cardCenter = {
          x: cRect.left + cRect.width / 2,
          y: cRect.top + cRect.height / 2,
        };
        const cardRelX = cardCenter.x - stageRect.left;
        const cardRelY = cardCenter.y - stageRect.top;
        const s0 = cRect.width > 0 ? sw / cRect.width : 1.42;

        return { cardRelX, cardRelY, s0 };
      });

      // Group into rows based on cardRelY (clustering cards within 25px vertical distance)
      const rowYList: number[] = [];
      rawMeasurements.forEach((m) => {
        const existingRow = rowYList.find((ry) => Math.abs(ry - m.cardRelY) < 25);
        if (existingRow === undefined) {
          rowYList.push(m.cardRelY);
        }
      });
      rowYList.sort((a, b) => a - b);
      totalRowsMapRef.current.set(secIdx, rowYList.length);

      const measurements: CardMeasurement[] = rawMeasurements.map((m) => {
        const rowIndex = rowYList.findIndex((ry) => Math.abs(ry - m.cardRelY) < 25);
        const rowY = rowYList[rowIndex] !== undefined ? rowYList[rowIndex] : m.cardRelY;

        // Find all cards in this same row to determine column order
        const sameRowCards = rawMeasurements.filter(
          (other) => Math.abs(other.cardRelY - rowY) < 25
        );
        sameRowCards.sort((a, b) => a.cardRelX - b.cardRelX);
        const colIndex = sameRowCards.findIndex((other) => other === m);

        return {
          cardRelX: m.cardRelX,
          cardRelY: m.cardRelY,
          s0: m.s0,
          rowIndex: Math.max(0, rowIndex),
          colIndex: Math.max(0, colIndex),
          rowY,
        };
      });

      measurementsRef.current.set(secIdx, measurements);

      // Restore transforms appropriately depending on whether row was already dealt
      let dealtSet = dealtRowsMapRef.current.get(secIdx);
      if (!dealtSet) {
        dealtSet = new Set<number>();
        dealtRowsMapRef.current.set(secIdx, dealtSet);
      }

      cardEls.forEach((c, i) => {
        const m = measurements[i];
        if (!m) return;
        if (dealtSet.has(m.rowIndex)) {
          c.style.transition = savedTransitions[i] || '';
          c.style.transform = savedTransforms[i] || 'translate(0px, 0px) rotate(0deg) scale(1)';
        } else {
          const dx = stackCenterX - (stageRect.left + m.cardRelX);
          const dy = stackCenterY - (stageRect.top + m.cardRelY);
          const startRot = 7.5 + (m.colIndex - 1.5) * 2.5;
          c.style.transition = 'none';
          c.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) rotate(${startRot.toFixed(2)}deg) scale(${m.s0.toFixed(4)})`;
          c.style.filter = 'blur(1.5px)';
          c.style.opacity = '0';
          c.style.pointerEvents = 'none';
          c.classList.remove('done');
        }
      });
    });

    // Run animation update immediately with fresh measurements
    updateAnimation();
  }, [updateAnimation]);

  const scheduleMeasure = useCallback(() => {
    requestAnimationFrame(() => {
      measureAll();
    });
  }, [measureAll]);

  const handleRegisterSection = useCallback(
    (index: number, handle: SectionDOMHandle) => {
      sectionsRef.current.set(index, handle);
      scheduleMeasure();
    },
    [scheduleMeasure]
  );

  const handleUnregisterSection = useCallback((index: number) => {
    sectionsRef.current.delete(index);
    measurementsRef.current.delete(index);
    totalRowsMapRef.current.delete(index);
    dealtRowsMapRef.current.delete(index);
  }, []);

  // Scroll listener with requestAnimationFrame
  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          updateAnimation();
          rafIdRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Connect with Lenis if available in project
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', onScroll);
    }

    const onResize = () => {
      scheduleMeasure();
    };
    window.addEventListener('resize', onResize);

    // Initial measure after fonts and layout ready
    scheduleMeasure();

    if (document.fonts && typeof document.fonts.ready?.then === 'function') {
      document.fonts.ready.then(() => {
        scheduleMeasure();
      });
    }

    const timer1 = setTimeout(scheduleMeasure, 120);
    const timer2 = setTimeout(scheduleMeasure, 500);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (lenis && typeof lenis.off === 'function') {
        lenis.off('scroll', onScroll);
      }
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [scheduleMeasure, updateAnimation]);

  return (
    <div className="flux-team-page min-h-screen">
      {/* ── Hero Section ── */}
      <TeamHero />

      {/* ── Sticky Year Sections Navigation Bar ── */}
      <TeamYearNav />

      {/* ── Spacing before Section 01 ── */}
      <div className="h-4 sm:h-6" />

      {/* ── Three Year Sections (01 Seniors -> 02 Juniors -> 03 Sophomores) ── */}
      <div className="flex flex-col">
        {YEAR_SECTIONS.map((section, index) => (
          <React.Fragment key={section.id}>
            <TeamSection
              section={section}
              sectionIndex={index}
              onRegisterSection={handleRegisterSection}
              onUnregisterSection={handleUnregisterSection}
            />

            {/* ~12vh vertical space between sections */}
            {index < YEAR_SECTIONS.length - 1 && (
              <div
                style={{ height: '12vh' }}
                className="w-full pointer-events-none"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Uniform 12vh vertical rhythm before Section 04 */}
      <div
        style={{ height: '12vh' }}
        className="w-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Section 04: Join FLUX / Community CTA Section ── */}
      <TeamJoinBanner />

      {/* Clean bottom padding before Footer */}
      <div className="h-10 sm:h-16 w-full" aria-hidden="true" />
    </div>
  );
}
