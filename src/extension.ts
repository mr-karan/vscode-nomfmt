import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "nomfmt" is now active!');

    // Register the formatter
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider({ scheme: 'file', pattern: '**/*.{nomad,nomad.hcl}' }, {
        provideDocumentFormattingEdits(document: vscode.TextDocument): Thenable<vscode.TextEdit[]> {
            const isFormatterEnabled = vscode.workspace.getConfiguration().get('nomfmt.enable', true);

            console.log(`nomfmt enable status: ${isFormatterEnabled}`);  // Log the status of the formatter

            if (!isFormatterEnabled) {
                console.log('nomfmt is disabled. Skipping formatting.');
                return Promise.resolve([]);  // If disabled, return immediately with no edits.
            }

            return new Promise((resolve, reject) => {
                let formattedData = '';  // <-- Initialize an empty string to store formatted data.

                // Pipe the content of the document into `nomad fmt -`
                const nomadFmt = exec('nomad fmt -', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error formatting file with nomad fmt: ${error.message}`);
                        console.error(`stderr: ${stderr}`);  // Log any additional stderr messages
                        vscode.window.showErrorMessage('Failed to format the document using nomad fmt.');
                        reject([]);
                        return;
                    }

                    console.log(`Successfully formatted using nomad fmt.`);  // Log on successful formatting
                    // console.log(`stdout: ${stdout}`);  // Log any stdout messages

                    // Replace the entire content with the formatted content
                    const wholeDocument = new vscode.Range(
                        document.lineAt(0).range.start,
                        document.lineAt(document.lineCount - 1).range.end
                    );

                    formattedData = formattedData.trimEnd() + '\n';  // <-- Trim the end and add a single newline
                    resolve([vscode.TextEdit.replace(wholeDocument, formattedData)]);  // <-- Use the processed formattedData
                });

                // Handle stdout data
                nomadFmt.stdout!.on('data', (data) => {
                    formattedData += data;
                });

                // Write the current content of the document to the input of `nomad fmt`
                nomadFmt.stdin!.write(document.getText());
                nomadFmt.stdin!.end();
            });
        }
    }));
}

export function deactivate() { }
