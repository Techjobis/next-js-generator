# Next-Gen CLI 🚀

A powerful and intuitive command-line interface (CLI) tool for generating files for Next.js applications. Easily create pages, components, and API routes with a single command, speeding up your development workflow.

---

## Installation

You can install `next-gen` to use it in any Next.js project.

```bash
npm install -g @techjobis/next-gen
```

You can also use npx to run the command if you don't want to install the package globally.

```bash
npx @techjobis/next-gen help make:page
```

## Usage

The next-gen CLI provides three main commands to help you quickly scaffold your Next.js application: make:page, make:route, and make:component.

`make:page` - Generate a New Page
This command creates a new page file in your specified directory. It's perfect for quickly adding new pages to your application's app or pages directory.

#### Syntax:

```bash
next-gen make:page <path>
```

or

```bash
npx @techjobis/next-gen make:page <path>
```

#### Options:

-t, --type <filetype>: Specify the file type. The default is tsx.

--type jsx

--type tsx (default)

#### Examples:

```bash
# Creates a page.tsx file at src/app/dashboard/
next-gen make:page src/app/dashboard
```

or

```bash
npx @techjobis/next-gen make:page src/app/dashboard
```

```bash
# Creates a page.tsx file at src/app/blog/[slug]
next-gen make:page 'src/app/blog/[slug]'
```

```bash
# Creates a page.jsx file at pages/blog/

next-gen make:page pages/blog --type jsx
```

or

```bash
npx @techjobis/next-gen make:page pages/blog --type jsx
```

`make:route` - Generate a New API Route
This command creates a new route file, ideal for building API endpoints. Note: This command will not create a route file if a page file already exists in the same directory to avoid conflicts.

Syntax:

```bash
next-gen make:route <path>
```

or

```bash
npx @techjobis/next-gen make:route <path>
```

#### Options:

-t, --type <filetype>: Specify the file type. The default is ts.

--type js

--type ts (default)

#### Examples:

```bash
# Creates a route.ts file at src/app/api/products/
next-gen make:route src/app/api/products
```

or

```bash
npx @techjobis/next-gen make:route src/app/api/products
```

```bash
# Creates a route.js file at src/app/api/users/
next-gen make:route src/app/api/users --type js
```

or

```bash
npx @techjobis/next-gen make:route src/app/api/users --type js
```

`make:component` - Generate a New Component
This command allows you to create either a server or client component. The generated component will be a functional component with a default export.

#### Syntax:

```bash
next-gen make:component <name> <path>
```

or

```bash
npx @techjobis/next-gen make:component src/app/api/products
```

#### Options:

-t, --type <componentType>: Specify the component type. The default is server.

--type server (default)

--type client

--no-ts: Use this flag to generate a component using JavaScript (.jsx) instead of TypeScript (.tsx).

#### Examples:

```bash
# Creates a ServerComponent.tsx at src/components/ui/
next-gen make:component ServerComponent src/components/ui
```

or

```bash
npx @techjobis/next-gen make:component ServerComponent src/components/ui

# Creates a ClientComponent.jsx at src/app/
next-gen make:component ClientComponent src/app --type client --no-ts
```

or

```bash
npx @techjobis/next-gen make:component ClientComponent src/app --type client --no-ts
```

## Contributing

We welcome contributions! If you'd like to improve the next-gen cli, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature).

Create a new Pull Request.

## License

This project is licensed under the MIT License.
