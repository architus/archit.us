# [![architus](https://i.imgur.com/vcZzSQC.png)](https://archit.us)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Farchitus%2Farchit.us.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Farchitus%2Farchit.us?ref=badge_shield) [![Build Status](https://travis-ci.org/architus/archit.us.svg?branch=master)](https://travis-ci.org/architus/archit.us) [![Website Uptime](https://img.shields.io/uptimerobot/ratio/7/m782992402-55108abd64186f416df0be18.svg?label=website%20uptime)](https://status.archit.us/) [![API Uptime](https://img.shields.io/uptimerobot/ratio/7/m782992399-3443671051db8aeaecfe7434.svg?label=API%20uptime)](https://status.archit.us/) [![Netlify Status](https://api.netlify.com/api/v1/badges/bbdc33fe-8cac-4466-beaa-97ea193d92f9/deploy-status)](https://app.netlify.com/sites/architus/deploys) [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://storybook.archit.us) [![Discord Server](https://img.shields.io/discord/607637793107345431?color=7289DA&logo=discord&logoColor=white)](https://discord.gg/FpyhED) [![Codacity](https://api.codacy.com/project/badge/Grade/ca99ce2723ff40739a64fb87a2b17ade)](https://www.codacy.com/app/jazevedo620/archit.us?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=architus/archit.us&amp;utm_campaign=Badge_Grade)

> Archit.us provides a web dashboard server administrators and members can use to modify settings, view statistics and logs, and manage custom emoji and auto-responses
<br/>

[![Web dashboard](https://i.imgur.com/QDsegsp.png)](https://archit.us/app)

## 🚀 Getting Started

To use archit.us to manage the Architus bot on installed servers or add it to new ones, [connect with Discord](https://api.archit.us/login) to be redirected to the web dashboard, where you can view settings and add the bot to your servers.

### Setup

To set up the archit.us web application, you'll need to have [Node.js](https://nodejs.org/en/download/) installed. Once installed, run the following commands to download dependencies:

```console
npm install -g yarn
yarn install
```

## 📡 Development Server

Because the web application is built with [react-static](https://github.com/nozzle/react-static) at its core, there are two options to preview the app while developing: a **hot reload-enabled development server** *(recommended)* and a **statically-generated site preview**.

### Hot-reload-enabled

```console
yarn start
```

### Statically-generated preview

```console
yarn build
yarn serve
```

### Code Style

Archit.us uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) to enforce JavaScript code style across the repository. To run the linter locally, run:

```console
yarn run lint
```

## ❓ Getting Help

If you have an issue about the bot, the web dashboard, or have any other questions, feel free to [create a new issue](https://github.com/architus/archit.us/issues/new) or [join our Discord server](https://discord.gg/FpyhED)

## 🛠 Tooling

This project uses a variety of useful tooling to help preview, manage, and deploy the application. Among those are:

- [Netlify](https://www.netlify.com/) - Used to automatically deploy & generate previews for PRs. Deploy information is available at [the Deploy page](https://app.netlify.com/sites/architus/deploys)
  - Production (`master`) is deployed at [archit.us](https://archit.us/)
  - Develop (`develop`) is deployed at [develop.archit.us](https://develop.archit.us/)
- [Storybook](https://storybook.js.org/) - Used to document & preview individual components. Hosted at [storybook.archit.us](https://storybook.archit.us/), which automatically [deploys from the `develop` branch](https://app.netlify.com/sites/storybook-architus/deploys)
- [ESLint](https://eslint.org/) / [Prettier](https://prettier.io/) - Used to enforce consistent code style across the project & catch errors
- [TravisCI](https://travis-ci.org/) - Used to automatically run the linter on ever PR
- [FOSSA](https://fossa.com/) - Used to scan dependencies and perform license compliance
- [UptimeRobot](uptimerobot.com) - Used to track uptime and notify upon outage for [the websites and the API](https://status.archit.us/)
- [Codacy](https://www.codacy.com/) - Used to analyze code quality and track regressions

## 📜 License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Farchitus%2Farchit.us.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Farchitus%2Farchit.us?ref=badge_large)
