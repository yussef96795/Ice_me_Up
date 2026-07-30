$outDir = "C:\Users\msi\Desktop\web\ice-me-up\out"
$repoUrl = "https://github.com/yussef96795/Ice_me_Up.git"

Set-Location $outDir

"" | Out-File -FilePath ".nojekyll" -Encoding ASCII

git init
git checkout --orphan gh-pages
git add -A
git commit -m "Deploy [skip ci]"
git remote add origin $repoUrl
git push -f origin gh-pages

Set-Location "C:\Users\msi\Desktop\web\ice-me-up"
if (Test-Path ".git") { Remove-Item -Recurse -Force ".git" -ErrorAction SilentlyContinue }
Write-Host "Deployed successfully!"
