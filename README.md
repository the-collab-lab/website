[![Netlify Status](https://api.netlify.com/api/v1/badges/d419806f-0315-41c6-917a-52167ab9902c/deploy-status)](https://app.netlify.com/sites/the-collab-lab/deploys)

# 🖥 The Collab Lab Website

The source repository for [The Collab Lab website](https://the-collab-lab.codes/).

Want to contribute? Check [the issues tab](https://github.com/the-collab-lab/website/issues) for what needs to be done!

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#-built-with">🛠 Built With</a>
    </li>
    <li>
      <a href="#-getting-started">📝 Getting Started</a>
      <ul>
        <li>
          <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#installation">Installation</a>
        </li>
        <li>
          <a href="#graphql-introspection">GraphQL</a>
          <ul>
            <li>
              <a href="#vs-code">VS Code</a>
            </li>
            <li>
              <a href="#intellij">IntelliJ</a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <a href="#-usage">🔬 Usage</a>
    </li>
    <li>
      <a href="#-contributing">✨Contributing</a>
      <ul>
        <li>
          <a href="#how-to-fork-the-project">How to Fork the Project</a>
        </li>
      </ul>
    </li>
  </ol>
</details>

## 🛠 Built With

- 🧑‍🚀 [Astro](https://astro.build/) - Static Site Generator that supports modern JavaScript templating
- ⌨️ [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- 📚 [Hygraph](https://hygraph.com/) (Previously GraphCMS) - Content management
- 📡 [GraphQL](https://www.graphql.com/) - Data Querying from our CMS
- 💵 [Stripe](https://stripe.com/docs/api?lang=node) - Processing payments for donations
- 🖥 [Netlify](https://www.netlify.com/) - Continuous Deployment / Integration

## 📝 Getting Started

### Prerequisites

This website requires Node (16.17.1 or later) and NPM to be installed in order to run locally. You can view the NPM documentation to [learn more about installation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

You may also need the [Netlify CLI](https://cli.netlify.com/) to test certain features, such as the Stripe donation buttons. If you need access to Netlify, you can request access in [#committee-website](https://the-collab-lab.slack.com/archives/CUS0DJ614) and someone will invite you to the Netlify project.

### Installation

Clone the repository to your machine using [Github CLI](https://cli.github.com/) or a plain Git command.

```shell
gh repo clone the-collab-lab/website-next tcl-website
```

Or:

```shell
git repo clone git@github.com:the-collab-lab/website-next.git tcl-website
```

This command will create a new directory called `tcl-website` in your current working directory. Navigate into the new directory and install the project dependencies.

```shell
cd tcl-website
npm ci
```

This installs all the necessary packages and sets up [Husky](https://typicode.github.io/husky/#/) for pre-commit linting.

### GraphQL Introspection

Use this link to [access the playground and schema for our GraphQL endpoint](https://api-us-east-1.graphcms.com/v2/ckfwosu634r7l01xpco7z3hvq/master).

Depending on your IDE, you may have the ability to introspect the schema and unlock type checking in your editor:

#### VS Code

1. Install both the [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode) and [GraphQL: Language Feature Support](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) plugins.
2. Create a `graphql.config.json` and copy/paste the json found below.
3. VSCode will automatically introspect the schema without having to create a schema file.

#### IntelliJ

1. Install the [GraphQL Plugin](https://plugins.jetbrains.com/plugin/8097-graphql).
2. Create a `.graphqlconfig` file and copy/paste the json found below.
3. Use the GraphQL plugin to generate a `schema.graphql` file from the config.

The JSON config for either VS Code's or IntelliJ's config file is:

```json
{
	"name": "Collab Lab GraphQL Schema",
	"schemaPath": "schema.graphql",
	"extensions": {
		"endpoints": {
			"Default GraphQL Endpoint": {
				"url": "https://api-us-east-1.hygraph.com/v2/ckfwosu634r7l01xpco7z3hvq/master",
				"headers": {
					"user-agent": "JS GraphQL"
				},
				"introspect": true
			}
		}
	}
}
```

For other platforms, consult the documentation for your IDE.

## 🔬 Usage

- The `src/data` directory contains all of our logic for fetching third-party data, such as content from Hygraph.
- The `src/layouts` directory contains a layout `.astro` file. The contents of our pages (in `src/pages`) are rendered inside of this layout.
- The `src/components` directory contains all of our reusable components. Files with the `.astro` extension are [Astro components](https://docs.astro.build/core-concepts/astro-components/), and files with the `.tsx` extension are [React components](https://reactjs.org/docs/components-and-props.html).
- The `./public` directory contains static assets that are copied to the root of the build directory. This is where we store our images, fonts, and other assets.

To run the site:

```shell
# Starts the development server on localhost:3000
# and opens your browser
npm start
```

To build the site:

```shell
# builds the site and outputs it in the /dist/ folder
npm run build
```

## ✨ Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you're a member of the Collab Lab GitHub organization, you can create a new branch and open a pull request. If you're not a member, you can [fork the project](https://github.com/the-collab-lab/website-next/fork) and open a pull request from your fork.

If you spot an issue, or have a suggestion to make the website better, feel free to [create a new issue](https://github.com/the-collab-lab/website-next/issues)!

### How to Fork the Project

1. Use this link to [fork the repository](https://github.com/the-collab-lab/website-next/fork) or use the “Fork” button at the top of the repository page
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request, using your repository and branch as the source, and the `main` branch of this repo as the base.
