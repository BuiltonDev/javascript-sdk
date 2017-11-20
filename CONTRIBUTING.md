# Contributing Guide

Contributions are welcome and are greatly appreciated! Every little bit helps, and credit will
always be given.


## Setting up your environment

After forking to your own github org, do the following steps to get started:

```bash
# clone your fork to your local machine
git clone https://github.com/shareactorIO/javascript-sdk.git

# step into local repo
cd javascript-sdk

# install dependencies
npm install

# run packager for development
npm run dev
```

### Style & Linting

This codebase adheres to the [Airbnb Styleguide](https://github.com/airbnb/javascript) and is
enforced using [ESLint](http://eslint.org/).

It is recommended that you install an eslint plugin for your editor of choice when working on this
codebase, however you can always check to see if the source code is compliant by running:

```bash
npm run lint
```

### Testing

Tests are present in the test folder. You should create tests for new functionality before submitting a pull request.
We are using [MochaJS](https://mochajs.org/). You can run them by running:

```bash
npm run test
```

## Pull Request Guidelines

Before you submit a pull request from your forked repo, check that it meets these guidelines:

1. If the pull request adds functionality, the docs should be updated as part of the same PR.
1. If the pull request adds functionality, code in the example app that demonstrates the new functionality should be updated as part of the same PR.
1. If the pull request adds functionality, the PR description should include motivation and use cases for the feature.
1. If the pull request fixes a bug, an explanation including what the bug was, and how to reproduce it should be included in the PR description.
1. Please rebase and resolve all conflicts before submitting.
