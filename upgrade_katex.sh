#!/bin/bash -
#===============================================================================
#
#          FILE: publish2npm.sh
#
#         USAGE: ./publish2npm.sh
#
#   DESCRIPTION: upgrade katex in package;json and move static files to plugin
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: YOUR NAME (),
#  ORGANIZATION:
#       CREATED: 04/07/2015 15:55
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error

# TODO auto incrémentation

cd KaTeX
git checkout master
#git pull
# Get new tags from remote
git fetch --tags
# Get latest tag name
katex_version=$(git describe --tags `git rev-list --tags --max-count=1`)
# Checkout latest tag
git checkout $katex_version

echo "Upgrading KaTeX to ${katex_version:1}"
cd ..
echo "Update katex version in package.json"
sed -i "s/\(\"katex\": \"^\).*\(\",$\)/\1${katex_version:1}\2/" package.json

echo "Copying static files"
rm ./static/fonts/* ./static/less/fonts.less ./static/less/katex.less
cp ./KaTeX/static/fonts/* ./static/fonts
cp ./KaTeX/static/fonts.less ./static/less
cp ./KaTeX/static/katex.less ./static/less

echo "Update path in fonts.less"
#-@font-folder: "plugins/nodebb-plugin-katex/fonts";
#+@font-folder: "fonts";
sed -i "s/\(@font-folder: \"\).*\(\";$\)/\1plugins\/nodebb-plugin-katex\/fonts\2/" ./static/less/fonts.less
