#!/bin/bash
cd /home/kavia/workspace/code-generation/manufacturing-critical-path-calculator-105353-107781/mct_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

