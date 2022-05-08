# Inner source repository checkout action

This action allows you to clone a list of inner source (internal ) repositories by providing an app token that has read access to the repositories. The action allows you to easily use private actions in almost the same way as public ones,  executing a shallow clone for a specific ref.


## Inputs

| parameter    | description                                                                 | required | default  |
| ------------ | --------------------------------------------------------------------------- | -------- | -------- |
| token        | App installation or PAT token that have read access to action repositories. | `true`   |          |
| repos        | A comma separated list of actions repos (owner/repo)                        | `true`   |          |
| base_dir     | base dir for cloning actions                                                | `false`  | .actions |
| full_history | checkout repository with full history or only the HEAD                      | `false`  | false    |

## Runs

This action is an `node12` action.


## Usages

### Setup

We recommend using a GitHub [app installation token](https://docs.github.com/en/developers/apps/authenticating-with-github-apps) instead of a PAT.

1. Create a GitHub app token for your org.
2. Grant read access to content in the repository section.
3. Install the app in your internal action repositories.

### Workflows

Below is an example snippet of a workflow to setup and run your inner source actions.

```yaml

jobs:
  job1:

    runs-on: ...
    steps:

      # Setup private actions
      - name: Get Token
        id: token
        uses: philips-software/app-token-action@1.0.0
        with:
          app_id: <app_id>
          app_base64_private_key: ${{ secrets.APPLICATION_PRIVATE_KEY_BASE64 }}
          auth_type: 'installation'

      - uses: philips-software/inner-source-checkout-action@1.0.0
        with:
          token: ${{ steps.token.outputs.token }}
          base_dir: .actions
          repos: org/repo1@version, org/repo2@version

      # Use your private actions
      - uses: ./.actions/org/repo2

      - uses: ./.actions/org/repo1
        with:
          param1: value1


```

## Development

Standard commands such as lint, test and build are available via yarn. Check [package.json] for more details.

### Test locally

Running locally requires you to have an app installation token with read access to the action repo. Before running localy you must first set the following environment variables:

- `INPUT_TOKEN` : access token
- `INPUT_REPOS`: list of repos, eg owner/repo1, owner/repo2.
- `INPUT_BASE_DIR`: for example `.actions`.
- `INPUT_FULL_HISTORY`: for example `true`.

```
INPUT_TOKEN=<token>
INPUT_REPOS=philips-internal/fastlane-action@master
INPUT_BASE_DIR=.actions
INPUT_FULL_HISTORY=false
```

**Example:**

```bash
export INPUT_TOKEN=philips-software
export INPUT_REPOS=philips-software/app-token-action
export INPUT_BASE_DIR=.actions
export INPUT_FULL_HISTORY=false
yarn watch
```

## Contribution

We welcome contributions, please checkout the [contribution guide](CONTRIBUTING.md).


## License

This project is released under the [MIT License](./LICENSE).

## Philips Forest

This module is part of the Philips Forest.

```
                                                     ___                   _
                                                    / __\__  _ __ ___  ___| |_
                                                   / _\/ _ \| '__/ _ \/ __| __|
                                                  / / | (_) | | |  __/\__ \ |_
                                                  \/   \___/|_|  \___||___/\__|

                                                                            CI
```
