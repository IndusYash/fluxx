const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    let newContent = content.replace(/She Leads[\s]*[-–—][\s]*Tessy Thomas( 2026)?/gi, "She Leads – Dr. Tessy Thomas Annual Conclave");
    // Also replace just "She Leads" in text, but be careful.
    // The user said: "Use this name. navbar ko chodkar sabhi jagha yahi name use karn ahai"
    // (Except navbar, use this name everywhere).
    
    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for(const file of files) {
        const p = path.join(dir, file);
        if (p.includes('node_modules') || p.includes('.git') || p.includes('Navbar') || p.includes('MobileNavbar')) {
            continue;
        }
        if(fs.statSync(p).isDirectory()) {
            walk(p);
        } else if(p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.js') || p.endsWith('.html')) {
            replaceInFile(p);
        }
    }
}

walk('c:/Users/rishi/Downloads/fluxx-main/fluxx-main');
