# nomfmt: Nomad Formatter for VS Code

_[Install from VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mrkaran.nomfmt)_

`nomfmt` is a Visual Studio Code extension that integrates `nomad fmt` to provide on-the-fly code formatting for Nomad job spec files written in HCL (HashiCorp Configuration Language).

![Formatting in action](images/nomfmt-demo.gif)

## Requirements

1. **Prerequisites:**
    - [`nomad`](https://developer.hashicorp.com/nomad/docs/install) CLI tool should be installed and available in your system's `PATH`.
    - [`HashiCorp.HCL`](https://marketplace.visualstudio.com/items?itemName=HashiCorp.HCL) extension for Visual Studio Code must be installed for syntax highlighting.

2. **VS Code Configuration:**
    - Set up file associations for syntax highlighting:

```json
{
    "files.associations": {
        "*.nomad.hcl": "hcl",
        "*.nomad": "hcl"
    },
    "editor.formatOnSave": true
}
```

## Extension Settings

| ID             | Description                                 | Default |
|----------------|---------------------------------------------|---------|
| `nomfmt.enable`| Enable/disable nomfmt formatting.           | `true`  |


### Supported File Types

`nomfmt` is specifically designed to format `.nomad` and `.nomad.hcl` files. Ensure your job spec files have one of these extensions for the formatter to apply.
