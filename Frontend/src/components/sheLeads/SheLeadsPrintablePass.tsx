import React from 'react';
import { Calendar, Users, Lightbulb } from 'lucide-react';
import buildingImg from '@/assets/images/mmmut_building_pass.jpg';
import fluxLogoSilver from '@/assets/images/flux-logo-silver.jpg';

export interface SheLeadsPassData {
  name: string;
  rollNo: string;
  section: string;
  branch: string;
  year: string;
  ticketNumber: string;
  venue?: string;
  date?: string;
}

interface SheLeadsPrintablePassProps {
  data: SheLeadsPassData;
}

/**
 * Isolated pass printing:
 * Creates a dedicated, isolated iframe containing ONLY this pass card
 * and prints it directly, completely preventing the rest of the website from printing.
 */
export const printSheLeadsPass = () => {
  const passElem = document.getElementById('she-leads-printable-pass');
  if (!passElem) {
    window.print();
    return;
  }

  // Remove existing print frame if any
  const oldFrame = document.getElementById('she-leads-print-frame');
  if (oldFrame) {
    oldFrame.remove();
  }

  const iframe = document.createElement('iframe');
  iframe.id = 'she-leads-print-frame';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  // Collect all current stylesheets from document
  const headStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((el) => el.outerHTML)
    .join('\n');

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>She Leads 2026 - Participant Pass</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Dancing+Script:wght@700&family=Space+Grotesk:wght@400;600;700;800;900&display=swap" rel="stylesheet">
        ${headStyles}
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #000000 !important;
            color: #ffffff !important;
            width: 100% !important;
            min-height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-family: 'Space Grotesk', sans-serif !important;
          }
          #print-wrapper {
            width: 100% !important;
            max-width: 480px !important;
            margin: auto !important;
            padding: 8px !important;
          }
          #she-leads-printable-pass {
            width: 100% !important;
            margin: 0 auto !important;
            box-shadow: none !important;
          }
        </style>
      </head>
      <body>
        <div id="print-wrapper">
          ${passElem.outerHTML}
        </div>
      </body>
    </html>
  `);
  doc.close();

  // Wait for images to load before printing
  const images = Array.from(doc.images);
  if (images.length === 0) {
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 300);
  } else {
    let loadedCount = 0;
    const triggerPrint = () => {
      loadedCount++;
      if (loadedCount >= images.length) {
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        }, 350);
      }
    };
    images.forEach((img) => {
      if (img.complete) {
        triggerPrint();
      } else {
        img.onload = triggerPrint;
        img.onerror = triggerPrint;
      }
    });
  }
};

export const SheLeadsPrintablePass: React.FC<SheLeadsPrintablePassProps> = ({ data }) => {
  const {
    name = 'Participant Name',
    rollNo = '2025071116',
    section = 'B',
    branch = 'Information Technology (IT)',
    year = '2nd Year',
    ticketNumber = 'SHE-1116',
    venue = 'Online',
    date = 'To be announced',
  } = data;

  // QR Code payload containing Name, Roll No, Branch, Sec, Year, and Pass Code
  const qrData = `Name: ${name}\nRoll No: ${rollNo}\nBranch: ${branch}\nSec: ${section}\nYear: ${year}\nCode: ${ticketNumber}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    qrData
  )}&color=000000&bgcolor=ffffff&qzone=1&margin=0`;

  return (
    <div
      id="she-leads-printable-pass"
      className="relative w-full max-w-[500px] mx-auto rounded-[28px] p-[3px] bg-gradient-to-b from-[#ff3864] via-[#e11d48] to-[#9f1239] shadow-[0_0_50px_rgba(255,56,100,0.35)] select-none text-white font-sans overflow-hidden"
      style={{
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
      {/* ── Inner Main Container ── */}
      <div className="relative rounded-[25px] bg-[#07050a] px-5 sm:px-6 pt-6 pb-4 overflow-hidden border border-[#ff3864]/30">
        {/* Subtle laser wave curves in background */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50,80 Q120,20 300,120 T600,60"
            fill="none"
            stroke="#ff3864"
            strokeWidth="1.2"
          />
          <path
            d="M-50,110 Q140,40 320,150 T620,90"
            fill="none"
            stroke="#e11d48"
            strokeWidth="0.8"
          />
          <path
            d="M-50,140 Q160,60 340,180 T640,120"
            fill="none"
            stroke="#9f1239"
            strokeWidth="0.6"
          />
          <path
            d="M0,500 Q200,380 400,460 T600,400"
            fill="none"
            stroke="#ff3864"
            strokeWidth="0.8"
          />
        </svg>

        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-12 left-0 w-72 h-48 bg-rose-900/20 rounded-full blur-3xl" />

        {/* ── 1. Top Header: Official FLUX Brand Logo + BUILD INSPIRE LEAD ── */}
        <div className="relative z-10 flex items-center justify-between mb-5">
          {/* FLUX Official Society Logo */}
          <div className="flex items-center gap-2.5">
            <img
              src={fluxLogoSilver}
              alt="FLUX Official Society Logo"
              className="h-12 sm:h-14 w-12 sm:w-14 object-contain rounded-xl border border-white/15 bg-black p-0.5 shadow-md shadow-black/80"
            />
            <div>
              <div className="text-xl sm:text-[23px] font-black tracking-widest text-white font-sans leading-none">
                FLUX
              </div>
              <div className="text-[7px] sm:text-[7.5px] font-bold tracking-[0.22em] text-gray-300 uppercase mt-1">
                INNOVATE • INTERACT • IMPACT
              </div>
            </div>
          </div>

          {/* Right Header: BUILD INSPIRE LEAD */}
          <div className="text-right">
            <div className="text-[9.5px] sm:text-[10px] font-black tracking-[0.2em] text-gray-200 leading-[1.35] uppercase font-sans">
              BUILD<br />
              INSPIRE<br />
              LEAD
            </div>
            <div className="w-9 h-[2px] bg-rose-500/80 ml-auto mt-1 rounded-full" />
          </div>
        </div>

        {/* ── 2. Event Title & Tagline ── */}
        <div className="relative z-10 text-center mb-6 pt-1">
          {/* Slanted handwritten cursive text on the right */}
          <div
            className="absolute -top-1 -right-1 sm:right-1 text-right text-[#ff5287] leading-tight select-none pointer-events-none transform rotate-[-7deg] hidden xs:block"
            style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
          >
            <span className="block text-sm sm:text-base font-bold">More</span>
            <span className="block text-sm sm:text-base font-bold -mt-1">Women</span>
            <span className="block text-sm sm:text-base font-bold -mt-1">Brighter</span>
            <span className="block text-sm sm:text-base font-bold -mt-1">Tomorrows</span>
          </div>

          {/* Big Title: SHE LEADS */}
          <div className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
            <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]">
              SHE{' '}
            </span>
            <span className="relative inline-block bg-gradient-to-r from-[#ff3864] via-[#ff5c8a] to-[#f43f5e] bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(255,56,100,0.5)]">
              LE
              {/* Star inside the 'A' */}
              <span className="relative inline-block">
                A
                <span className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 text-[10px] sm:text-[12px] text-pink-200 pointer-events-none select-none">
                  ✦
                </span>
              </span>
              DS
            </span>
          </div>

          {/* Subtitle / Tagline */}
          <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.24em] text-gray-300 uppercase mt-2.5">
            LEARN • CONNECT • CREATE • EMPOWER
          </div>

          {/* Decorative year divider */}
          <div className="flex items-center justify-center gap-3 my-2 text-rose-400">
            <span className="w-10 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-rose-500/70" />
            <span className="text-xs sm:text-sm font-black tracking-[0.35em] text-white font-mono">
              2 0 2 6
            </span>
            <span className="w-10 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-rose-500/70" />
          </div>

          <div className="text-[8px] sm:text-[8.5px] font-bold tracking-[0.28em] text-rose-300/90 uppercase">
            A SPECIAL INITIATIVE BY <span className="text-white font-black">FLUX</span>
          </div>
        </div>

        {/* ── 3. Main Pass Card Box with Overhanging Badge ── */}
        <div className="relative z-10 pt-4 mb-5">
          {/* Overhanging Pill Badge: PARTICIPANT PASS */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="px-6 sm:px-8 py-1.5 rounded-full bg-gradient-to-r from-[#c2185b] via-[#e91e63] to-[#ad1457] text-white text-xs sm:text-[13px] font-black tracking-[0.22em] uppercase shadow-lg shadow-rose-950/80 border border-pink-400/40 whitespace-nowrap">
              PARTICIPANT PASS
            </div>
          </div>

          {/* Inner Card Frame */}
          <div className="rounded-[22px] border border-[#ff3864]/50 bg-[#0d0914]/90 p-4 sm:p-5 pt-7 backdrop-blur-md shadow-2xl relative">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Left Column: Attendee Data (7 Cols) */}
              <div className="col-span-7 space-y-2.5">
                {/* Name */}
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    NAME
                  </div>
                  <div className="text-base sm:text-lg font-black text-white tracking-wide truncate mt-0.5">
                    {name}
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                {/* Roll & Section */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[8.5px] font-bold uppercase tracking-wider text-gray-400">
                      ROLL NUMBER
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-white mt-0.5 font-mono">
                      {rollNo}
                    </div>
                  </div>
                  <div>
                    <div className="text-[8.5px] font-bold uppercase tracking-wider text-gray-400">
                      SECTION
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-white mt-0.5">
                      {section}
                    </div>
                  </div>
                </div>

                {/* Branch & Year */}
                <div>
                  <div className="text-[8.5px] font-bold uppercase tracking-wider text-gray-400">
                    BRANCH
                  </div>
                  <div className="text-xs font-semibold text-white mt-0.5 truncate">
                    {branch}
                  </div>
                </div>

                <div>
                  <div className="text-[8.5px] font-bold uppercase tracking-wider text-gray-400">
                    YEAR
                  </div>
                  <div className="text-xs font-semibold text-white mt-0.5">
                    {year}
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                {/* Venue & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <div className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                      VENUE
                    </div>
                    <div className="text-[11px] font-semibold text-white mt-0.5 truncate">
                      {venue}
                    </div>
                  </div>
                  <div>
                    <div className="text-[8px] font-bold uppercase tracking-wider text-gray-400">
                      DATE
                    </div>
                    <div className="text-[11px] font-semibold text-white mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-rose-400 flex-shrink-0" />
                      <span className="truncate">{date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Pass Code + QR Code + Female Category Badge (5 Cols) */}
              <div className="col-span-5 flex flex-col items-center justify-between text-center pl-1 border-l border-white/10">
                {/* PASS CODE Box */}
                <div className="w-full mb-2">
                  <div className="text-[8.5px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                    PASS CODE
                  </div>
                  <div className="py-1 px-2 rounded-lg bg-rose-950/50 border border-[#ff3864] text-[#ff3864] font-mono font-black text-xs sm:text-sm tracking-wider shadow-inner">
                    {ticketNumber}
                  </div>
                </div>

                {/* Real High-Contrast QR Code */}
                <div className="p-1.5 rounded-xl bg-white shadow-lg w-[105px] h-[105px] sm:w-[115px] sm:h-[115px] flex items-center justify-center overflow-hidden">
                  <img
                    src={qrCodeUrl}
                    alt={`QR Code for ${ticketNumber}`}
                    className="w-full h-full object-contain"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="text-[8px] font-semibold tracking-wider text-gray-400 uppercase mt-1">
                  Scan for Verification
                </div>

                {/* Female Category Verified Badge */}
                <div className="mt-2 w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-[#ff4579] to-[#f43f5e] text-black font-black text-[10px] sm:text-[11px] leading-tight text-center shadow-md">
                  Female Category<br />
                  Verified ✓
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. Middle Divider Tagline ── */}
        <div className="relative z-10 flex items-center justify-center gap-2 my-4">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-rose-500/50" />
          <span className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.24em] text-rose-300/90 uppercase text-center px-1">
            SAME OPPORTUNITIES BRIGHTER FUTURES
          </span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-rose-500/50" />
        </div>

        {/* ── 5. Three Pillar Icons: Event by FLUX | Community | Ideas ── */}
        <div className="relative z-10 grid grid-cols-3 gap-2 text-center py-2 mb-3">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-1">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[7.5px] font-bold tracking-wider text-gray-400 uppercase">
              EVENT BY
            </span>
            <span className="text-[10px] font-extrabold text-white tracking-wide">
              FLUX
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-1">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[7.5px] font-bold tracking-wider text-gray-400 uppercase">
              COMMUNITY
            </span>
            <span className="text-[10px] font-extrabold text-white tracking-wide leading-tight">
              STRONGER TOGETHER
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-1">
              <Lightbulb className="w-4 h-4" />
            </div>
            <span className="text-[7.5px] font-bold tracking-wider text-gray-400 uppercase">
              IDEAS FOR A
            </span>
            <span className="text-[10px] font-extrabold text-white tracking-wide leading-tight">
              BETTER TOMORROW
            </span>
          </div>
        </div>

        {/* ── 6. Bottom Silhouette: MMMUT Gorakhpur Building + Cursive ── */}
        <div className="relative z-10 mt-2 pt-1 border-t border-white/10">
          <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-xl bg-gradient-to-t from-black via-[#1c040d] to-transparent flex items-end justify-center">
            <img
              src={buildingImg}
              alt="MMMUT Gorakhpur Administrative Building"
              className="w-full h-full object-cover object-bottom opacity-85 mix-blend-screen"
            />
            {/* Gradient overlays to blend into bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07050a] via-transparent to-transparent pointer-events-none" />

            {/* MMMUT Gorakhpur label */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-rose-300/80 whitespace-nowrap">
              <span className="w-8 h-px bg-rose-500/50" />
              <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.28em] uppercase text-gray-300">
                MMMUT GORAKHPUR
              </span>
              <span className="w-8 h-px bg-rose-500/50" />
            </div>

            {/* Handwritten cursive: See you there! */}
            <div
              className="absolute bottom-1 right-2 text-[#ff5287] text-base sm:text-lg select-none pointer-events-none transform rotate-[-6deg]"
              style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
            >
              See you there!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheLeadsPrintablePass;
