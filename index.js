#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('./package.json');
const fs = require('fs');
const path = require('path');
const {
    jsxPageTemplate,
    tsxPageTemplate,
    routeJsTemplate,
    routeTsTemplate,
    serverComponentsJsTemplate,
    serverComponentsTsTemplate,
    clientComponentsJsTemplate,
    clientComponentsTsTemplate
} = require('./util/template.js');

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
    .description('A  CLI tool to generate pages, components and routes files for Next.js applications')
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


program
    .command('make:route <path>')
    .description('Generate a route file for Next.js applications')
    .option('-t, --type <type>', 'Specify the file type (js or ts)', 'ts')
    .action((routePath, options) => {
        const { type } = options;
        if (type !== 'js' && type !== 'ts') {
            console.error('❌ Error: The file type must be either "js" or "    ts".');
            process.exit(1);
        }
        const template = type === 'ts' ? routeTsTemplate() : routeJsTemplate();
        const fullPath = path.join(process.cwd(), routePath, `route.${type}`);
        // check if there is page file in the same directory as the route file is about to be created
        const pageFilePath = path.join(process.cwd(), routePath, 'page.js');
        if (fs.existsSync(pageFilePath) || fs.existsSync(pageFilePath.replace('.jsx', '.tsx'))) {
            console.error(`❌ Error: A page file already exists at ${pageFilePath}. Please remove it before creating a route file.`);
            process.exit(1);
        }
        createNextFile(fullPath, template);
    });


program
    .command('make:component <name> <path>')
    .description('Generate a server or client component for Next.js applications')
    .option('-t, --type <type>', 'Specify the component type (server or client)', 'server')
    .option('--no-ts', 'Generate component without TypeScript')
    .action((name, componentPath, options) => {
        const { type, ts } = options;
        if (type !== 'server' && type !== 'client') {
            console.error('❌ Error: The component type must be either "server" or "client".');
            process.exit(1);
        }
        const componentName = name.charAt(0).toUpperCase() + name.slice(1);
        let template;
        if (type === 'server') {
            template = ts ? serverComponentsTsTemplate(componentName) : serverComponentsJsTemplate(componentName);
        } else {
            template = ts ? clientComponentsTsTemplate(componentName) : clientComponentsJsTemplate(componentName);
        }
        const fullPath = path.join(process.cwd(), componentPath, `${componentName}.${ts ? 'tsx' : 'jsx'}`);
        createNextFile(fullPath, template);
    });


program.parse(process.argv);