const fs = require('fs');
const path = require('path');

function resolveConflictsInFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    // We want to KEEP the content between <<<<<<< HEAD and =======
    // and REMOVE the content between ======= and >>>>>>> branch
    // Regex explanation:
    // <<<<<<< HEAD[^\n]*\n  : matches the start marker and newline
    // ([\s\S]*?)            : captures the HEAD content (lazy)
    // =======\n             : matches the middle marker
    // [\s\S]*?              : matches the incoming content (lazy)
    // >>>>>>> [^\n]*\n      : matches the end marker
    const pattern = /<<<<<<< HEAD[^\n]*\r?\n([\s\S]*?)=======\r?\n[\s\S]*?>>>>>>> [^\n]*\r?\n/g;
    
    let count = 0;
    const newContent = content.replace(pattern, (match, p1) => {
        count++;
        return p1;
    });
    
    if (count > 0) {
        fs.writeFileSync(filepath, newContent, 'utf-8');
        console.log(`Resolved ${count} conflicts in ${filepath}`);
    }
}

const filesToFix = [
    'src/pages/team/team.tsx',
    'src/components/layout/Navbar.tsx',
    'src/components/layout/MobileNavbar.tsx',
    'src/components/sections/events/UpcomingEvents/UpcomingEvents.tsx',
    'src/index.css',
    'src/pages/faculty/facultyData.ts',
    'src/pages/faculty/StatsCounter.tsx'
];

for(const file of filesToFix) {
    const fullPath = path.join(__dirname, file);
    if(fs.existsSync(fullPath)) {
        resolveConflictsInFile(fullPath);
    } else {
        console.log(`File not found: ${fullPath}`);
    }
}
