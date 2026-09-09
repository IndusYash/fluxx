$files = git grep -l -E '=======|>>>>>>>'
foreach ($file in $files) {
    $content = Get-Content $file
    $newContent = @()
    $inConflict = $false
    foreach ($line in $content) {
        if ($line -match '^=======$') {
            $inConflict = $true
            continue
        }
        if ($line -match '^>>>>>>>') {
            $inConflict = $false
            continue
        }
        if (-not $inConflict) {
            $newContent += $line
        }
    }
    Set-Content $file $newContent
}
