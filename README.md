# Inner source repository checkout action

This action allows to clone a list of inner source (private / internal repositories) by providing an app token that has read access to the repositories. The action allows you easy use private / internal action in almost identical way as the public one. The action will execute a shallow clone for a specific ref.


## Inputs

| parameter | description                                                                 | required | default  |
| --------- | --------------------------------------------------------------------------- | -------- | -------- |
| token     | App installation or PAT token that have read access to action repositories. | `true`   |          |
| repos     | A comma separated list of actions repos (owner/repo)                        | `true`   |          |
| base_dir  | base dir for cloning actions                                                | `false`  | .actions |


## Runs

This action is an `node12` action.


## Usages

### Setup

We recommend to use an app installation token over a PAT token.  

1. Create an GitHub in your org.
2. Grant read access to content in the repository section.
3. Install the app in your internal action repositories.

### Workfows

Below an example snippet of a workflow to setup your inner source actions.

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

Running locally requires you hav have a token (app installation token) that has read access to the code in a repo. To run the local ensure you have set the environment variables:

- `INPUT_TOKEN` : access token
- `INPUT_REPOS`: list of repos, eg owner/repo1, owner/repo2.
- `INPUT_BASE_DIR`: for example `.actions`.

INPUT_TOKEN=<token>
INPUT_REPOS=philips-internal/fastlane-action@master
INPUT_BASE_DIR=.actions
**Example:**

```bash
export INPUT_TOKEN=philips-software
export INPUT_TOKEN=philips-software/app-token-action
export INPUT_BASE_DIR=.actions
yarn watch
```

## Contribution

We welcome contributions, please checkout the [contribution guide](CONTRIBUTING.md). 


## License

This project are released under the [MIT License](./LICENSE).

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