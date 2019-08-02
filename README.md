# [![architus](https://i.imgur.com/vcZzSQC.png)](https://archit.us)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Farchitus%2Farchit.us.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Farchitus%2Farchit.us?ref=badge_shield) [![Build Status](https://travis-ci.org/architus/archit.us.svg?branch=master)](https://travis-ci.org/architus/archit.us) [![Website Uptime](https://img.shields.io/uptimerobot/ratio/7/m782992402-55108abd64186f416df0be18.svg?label=website%20uptime)](https://status.archit.us/) [![API Uptime](https://img.shields.io/uptimerobot/ratio/7/m782992399-3443671051db8aeaecfe7434.svg?label=API%20uptime)](https://status.archit.us/) [![Netlify Status](https://api.netlify.com/api/v1/badges/bbdc33fe-8cac-4466-beaa-97ea193d92f9/deploy-status)](https://app.netlify.com/sites/architus/deploys) [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://storybook.archit.us)

> Archit.us provides a web dashboard server administrators and members can use to modify settings, view statistics and logs, and manage custom emoji and auto-responses
<br/>

![Web dashboard](https://i.imgur.com/QDsegsp.png)

## Getting Started

To use archit.us to manage the Architus bot on installed servers or add it to new ones, [connect with Discord](https://api.archit.us/login) to be redirected to the web dashboard, where you can view settings and add the bot to your servers.

## Setup

To set up the archit.us web application, you'll need to have [Node.js](https://nodejs.org/en/download/) installed. Once installed, run the following commands to download dependencies:

```console
npm install -g yarn
yarn install
```

### Development Server

Because the web application is built with [react-static](https://github.com/nozzle/react-static) at its core, there are two options to preview the app while developing: a **hot reload-enabled development server** *(recommended)* and a **statically-generated site preview**.

#### Hot-reload-enabled

```console
yarn start
```

#### Statically-generated preview

```console
yarn build
yarn serve
```

### Code Style

Archit.us uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) to enforce JavaScript code style across the repository. To run the linter locally, run:

```console
yarn run lint
```

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Farchitus%2Farchit.us.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Farchitus%2Farchit.us?ref=badge_large)
