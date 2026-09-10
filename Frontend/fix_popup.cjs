const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'sheLeads', 'SheLeadsPopup.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Move button lower
content = content.replace(
  /absolute bottom-10 right-4 sm:bottom-28 sm:right-8 md:bottom-32 md:right-10/g,
  'absolute bottom-4 right-4 sm:bottom-12 md:bottom-16'
);

// 2. Fix modal wrapper scrolling layout (remove max-h and use outer scroll)
content = content.replace(
  '<div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">',
  '<div className="fixed inset-0 z-50 overflow-y-auto">'
);
content = content.replace(
  'className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"\n            />\n\n            {/* Modal Card */}\n            <motion.div\n              initial={{ opacity: 0, scale: 0.92, y: 20 }}\n              animate={{ opacity: 1, scale: 1, y: 0 }}\n              exit={{ opacity: 0, scale: 0.92, y: 20 }}\n              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}\n              className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0b0b0f] border border-white/15 text-white shadow-2xl shadow-black/80 z-10 custom-scrollbar"\n            >',
  'className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"\n            />\n\n            <div className="flex min-h-full items-center justify-center p-4 py-12 pointer-events-none">\n              {/* Modal Card */}\n              <motion.div\n                initial={{ opacity: 0, scale: 0.92, y: 20 }}\n                animate={{ opacity: 1, scale: 1, y: 0 }}\n                exit={{ opacity: 0, scale: 0.92, y: 20 }}\n                transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}\n                className="relative w-full max-w-xl rounded-3xl bg-[#0b0b0f] border border-white/15 text-white shadow-2xl shadow-black/80 z-10 pointer-events-auto"\n              >'
);
// Make sure to close the div added above
content = content.replace(
  '              </div>\n            </motion.div>\n          </div>\n        )}\n      </AnimatePresence>',
  '              </div>\n              </motion.div>\n            </div>\n          </div>\n        )}\n      </AnimatePresence>'
);

// 3. Fix chips
content = content.replace(
  'Only for Female Students',
  'Open To All'
);

// 4. Fix empowering title
content = content.replace(
  'Empowering Women in Technology',
  'Empowering Students in Technology'
);

// 5. Fix female validation string
content = content.replace(
  'She Leads – Dr. Tessy Thomas Annual Conclave registration is strictly reserved for female candidates.',
  'Please confirm your participation eligibility.'
);
content = content.replace(
  'Female Participant Verification (Mandatory)',
  'Participant Verification (Mandatory)'
);
content = content.replace(
  'I confirm that I am a female student of MMMUT. She Leads – Dr. Tessy Thomas Annual Conclave is organized exclusively to uplift and empower women in technology and engineering.',
  'I confirm that I am a student of MMMUT. She Leads – Dr. Tessy Thomas Annual Conclave is organized to uplift and empower students in technology and engineering.'
);

// 6. Fix backend gender passing
content = content.replace(
  "gender: 'Female',",
  "gender: 'Not Specified',"
);

// 7. Add padding bottom 10 just in case to submit button
content = content.replace(
  '<div className="pt-2 flex flex-col gap-2">',
  '<div className="pt-2 flex flex-col gap-2 pb-10">'
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed SheLeadsPopup.tsx');
