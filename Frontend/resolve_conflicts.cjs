const fs = require('fs');
const path = require('path');

function resolveConflictsInFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    // Pattern: <<<<<<< HEAD\n(keep)\n=======\n(discard)\n>>>>>>> branch\n
    // Using [\s\S]*? to match across newlines
    const pattern = /<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n[\s\S]*?\r?\n>>>>>>> [^\n]+\r?\n/g;
    
    let count = 0;
    const newContent = content.replace(pattern, (match, p1) => {
        count++;
        return p1 + '\n';
    });
    
    if (count > 0) {
        fs.writeFileSync(filepath, newContent, 'utf-8');
        console.log(`Resolved ${count} conflicts in ${filepath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            walkDir(filepath);
        } else if (file.match(/\.(ts|tsx|css|js|jsx)$/)) {
            resolveConflictsInFile(filepath);
        }
    }
}

walkDir(path.join(__dirname, 'src'));
