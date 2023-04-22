#!/bin/bash

rm -rf dist
npm run build

tag="$(git describe --tag --always)"
tagTmpPath="$(git describe --tag --always)_tmp"
if [ -z "$tag" ]; then
		exit 1
fi
echo $tag
packageName="${tag}.tar.gz"

#如果文件不存在就创建文件
if test ! -e $tagTmpPath ; then mkdir $tagTmpPath; fi
cp -r dist ${tagTmpPath}/public/
cd ${tagTmpPath}
tar zcvf ${packageName} public
mv ${packageName} ../
cd ..
if test -d "${tagTmpPath}"; then rm -rf "${tagTmpPath}"; fi