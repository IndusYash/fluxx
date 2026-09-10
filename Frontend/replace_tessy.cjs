const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Regex matches "She Leads" (case-insensitive) only if it's NOT followed by " - Tessy Thomas"
    const regex = /She Leads(?![\s]*[-–—][\s]*Tessy Thomas)/ig;
    
    const newContent = content.replace(regex, (match) => {
        return "She Leads - Tessy Thomas";
    });
    
    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for(const file of files) {
        const p = path.join(dir, file);
        if(fs.statSync(p).isDirectory()) {
            walk(p);
        } else if(p.endsWith('.tsx') || p.endsWith('.ts')) {
            replaceInFile(p);
        }
    }
}

walk('src');
