const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'sheLeads', 'SheLeadsPopup.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const regexModalWrapper = /\{\/\* Backdrop \*\/\}\s*<motion\.div[\s\S]*?className="fixed inset-0 bg-black\/80 backdrop-blur-md transition-opacity"\s*\/>\s*\{\/\* Modal Card \*\/\}\s*<motion\.div[\s\S]*?className="relative w-full max-w-xl max-h-\[92vh\] overflow-y-auto rounded-3xl bg-\[#0b0b0f\] border border-white\/15 text-white shadow-2xl shadow-black\/80 z-10 custom-scrollbar"\s*>/;

const replacement = `{/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            />
            
            <div className="flex min-h-full items-center justify-center p-4 py-12 pointer-events-none">
              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                className="relative w-full max-w-xl rounded-3xl bg-[#0b0b0f] border border-white/15 text-white shadow-2xl shadow-black/80 z-10 pointer-events-auto"
              >`;
              
content = content.replace(regexModalWrapper, replacement);

const regexFooter = /<\/form>\s*\}\)\s*<\/div>\s*<\/motion\.div>\s*<\/div>\s*\)\}\s*<\/AnimatePresence>/;
const footerRepl = `</form>
                )}
              </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>`;
content = content.replace(regexFooter, footerRepl);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed SheLeadsPopup.tsx layout');
