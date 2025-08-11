#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('./package.json');
const fs = require('fs');
const path = require('path');
const { jsxPageTemplate, tsxPageTemplate } = require('./util/template.js');

// Helper function to create the file
const createNextFile = (filePath, content) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    try {
        fs.writeFileSync(filePath, content.trim() + '\n');
        console.log(`✅ File created successfully at ${filePath}`);
    } catch (error) {
        console.error(`❌ Failed to create file at ${filePath}:`, error);
    }
};

program
    .name('next-gen')
    .description('A  CLI tool to generate pages and routes files for Next.js applications')
    .version(version);

program
    .command('make:page <path>')
    .description('Generate pages and routes files for Next.js applications')
    .option('-t, --type', 'Specify the file type (jsx or tsx)', 'tsx')
    .action((pagePath, options) => {
        const { type } = options;
        if (type !== 'jsx' && type !== 'tsx') {
            console.error('❌ Error: The file type must be either "jsx" or "tsx".');
            process.exit(1);
        }

        const template = type === 'tsx' ? tsxPageTemplate() : jsxPageTemplate();
        const fullPath = path.join(process.cwd(), pagePath, `page.${type}`);

        createNextFile(fullPath, template);
    });


program.parse(process.argv);