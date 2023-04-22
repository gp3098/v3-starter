#!/bin/bash

remoteWorkDir="/home/deployer/Projects"
projectName="logger-service"
remoteProjectPath="$remoteWorkDir/$projectName"
distDir="dist"
frontendDir="public"
tag="$(git describe --tag --always)"
packageName="${tag}.tar.gz"

remoteServer=$1

rm -fr "$distDir" 
npm run build

tar zcvf "$packageName" "$distDir"

if [[ -z "$remoteServer" ]]; then
		echo "Usage: deploy.sh <remote server>"
		echo "first param to be remote server"
		echo "sencond param to be replace frontend dir"
		rm -fr "$distDir"
		rm "$packageName"
		exit 1
fi
rsync -avhPz "$packageName" "$remoteServer":"${remoteProjectPath}/${packageName}" 

echo "$packageName has been placed to $remoteServer"
rm -fr "$packageName"

if [ -z $2 ]; then
	  exit 0
fi

ssh $1 <<EOF
	cd "$remoteProjectPath"
	tar zxvf "$packageName"
	if [ ! -d "$frontendDir" ]; then mkdir "$frontendDir"; fi
	rsync -avhPz --delete "$remoteProjectPath/$distDir/" "$remoteProjectPath/$frontendDir/"
	rm -fr "$remoteProjectPath/$distDir/"
	exit
EOF

echo "Deployed to $remoteServer success: ${tag}"
exit




