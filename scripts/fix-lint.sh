#!/bin/bash

# Fix unescaped entities
find src -type f -name "*.tsx" -exec sed -i 's/You'\''re/You\&apos;re/g' {} +

# Remove unused imports
npm run lint -- --fix

# Run Prettier
npm run format

# Run TypeScript check
npm run type-check
