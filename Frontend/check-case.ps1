$files = Get-ChildItem -Recurse -File | Select-Object FullName
$lines = Select-String -Path ".\**\*.tsx", ".\**\*.ts" -Pattern 'import.*from\s+[''"](\.[^''"]+)[''"]' -AllMatches

foreach ($match in $lines) {
    $importPath = $match.Matches.Groups[1].Value
    $sourceFile = $match.Path
    
    # Resolve the path relative to the source file
    $sourceDir = Split-Path $sourceFile
    $resolvedPath = Resolve-Path (Join-Path $sourceDir $importPath) -ErrorAction SilentlyContinue
    
    if ($resolvedPath) {
        # Check case exactly
        $actualPath = (Get-Item $resolvedPath).FullName
        if ($actualPath -cne $resolvedPath) {
            # On Windows, Resolve-Path might return the exact casing if we ask for it, 
            # actually we need a better way. Let's just use a node script.
        }
    }
}
