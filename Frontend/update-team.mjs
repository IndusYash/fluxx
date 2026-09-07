import fs from 'fs';

const filePath = 'src/pages/team/team.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace .jpg, .jpeg, .png imports with .webp
content = content.replace(/import\s+(.*?)\s+from\s+["'](\.\.\/\.\.\/assets\/images\/.*?)\.(jpg|jpeg|png)["'];/gi, (match, p1, p2) => {
  return `import ${p1} from "${p2}.webp";`;
});

fs.writeFileSync(filePath, content);
console.log('Updated team.tsx');
