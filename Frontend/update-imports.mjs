import fs from 'fs';
import path from 'path';

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
}

walk(path.resolve('./src'), function(err, results) {
  if (err) throw err;
  
  results.filter(f => f.endsWith('.ts') || f.endsWith('.tsx')).forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace imports from assets/images pointing to jpg/jpeg/png
    // It could be absolute `@/assets/images/...` or relative `../../assets/images/...` or `/src/assets/images/...`
    const regex = /(import\s+.*?from\s+["'](?:@|\.\.|\/src)\/.*?assets\/images\/.*?)\.(jpg|jpeg|png)(["'];?)/gi;
    
    // Also handle dynamic imports or direct string assignments if they match
    // Let's just catch any string containing "assets/images/" and ending in .jpg/.jpeg/.png
    const genericRegex = /(["'])([^"']*?assets\/images\/[^"']*?)\.(jpg|jpeg|png)\1/gi;
    
    let updated = content;
    
    updated = updated.replace(genericRegex, (match, quote, p1, ext) => {
        return `${quote}${p1}.webp${quote}`;
    });

    if (content !== updated) {
      fs.writeFileSync(file, updated);
      console.log(`Updated imports in ${file}`);
    }
  });
});
