#!/usr/bin/env bash
rm -rf dist*
npm run packagr

rm -rf ./node_modules/d3charts/*
cp -r dist/bundles ./node_modules/d3charts/
cp -r dist/esm2015 ./node_modules/d3charts/
cp -r dist/esm5 ./node_modules/d3charts/
cp -r dist/src ./node_modules/d3charts/
cp dist/d3charts.d.ts ./node_modules/d3charts/
cp dist/d3charts.metadata.json ./node_modules/d3charts/
cp dist/package.json ./node_modules/d3charts/
cp dist/public_api.d.ts ./node_modules/d3charts/
cp dist/README.md ./node_modules/d3charts/
