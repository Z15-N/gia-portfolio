#!/bin/sh
# Builds ../gia-portfolio-amplify.zip with a version stamp on every asset URL, so browsers never serve a stale file after a deploy.
set -e
cd "$(dirname "$0")/.."
V=$(date +%Y%m%d%H%M)
rm -rf build && mkdir -p build/assets
sed -e "s#styles.css\"#styles.css?v=$V\"#" -e "s#script.js\"#script.js?v=$V\"#" -e "s#assets/\([a-z0-9-]*\.\(svg\|jpg\|png\)\)#assets/\1?v=$V#g" index.html > build/index.html
cp styles.css script.js build/
cp assets/*.svg assets/*.jpg assets/*.png build/assets/
rm -f ../gia-portfolio-amplify.zip
(cd build && zip -q -r ../../gia-portfolio-amplify.zip .)
rm -rf build
echo "built ../gia-portfolio-amplify.zip (v=$V)"
