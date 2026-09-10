const fs = require('fs');
const path = require('path');

function checkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(f => {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) {
            checkDir(full);
        } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
            const content = fs.readFileSync(full, 'utf8');
            const regex = /import.*from\s+['"](\.[^'"]+)['"]/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
                const importStr = match[1];
                let resolved = path.resolve(dir, importStr);
                
                // Add extension if not present
                if (!fs.existsSync(resolved)) {
                    if (fs.existsSync(resolved + '.ts')) resolved += '.ts';
                    else if (fs.existsSync(resolved + '.tsx')) resolved += '.tsx';
                    else if (fs.existsSync(resolved + '.js')) resolved += '.js';
                    else if (fs.existsSync(resolved + '.jsx')) resolved += '.jsx';
                    else if (fs.existsSync(path.join(resolved, 'index.ts'))) resolved = path.join(resolved, 'index.ts');
                    else if (fs.existsSync(path.join(resolved, 'index.tsx'))) resolved = path.join(resolved, 'index.tsx');
                }

                if (fs.existsSync(resolved)) {
                    // Get actual case
                    const dirName = path.dirname(resolved);
                    const baseName = path.basename(resolved);
                    const actualFiles = fs.readdirSync(dirName);
                    if (!actualFiles.includes(baseName)) {
                        console.log('Case mismatch in file:', full);
                        console.log('Import:', importStr);
                        console.log('Expected:', baseName);
                    }
                } else {
                    console.log('Could not resolve:', importStr, 'in', full);
                }
            }
        }
    });
}

checkDir(path.join(__dirname, 'src'));
