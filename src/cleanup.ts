import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';

async function cleanup(): Promise<void> {
  const baseDir = core.getInput('base_dir', { required: true });
  const githubWorkspacePath = process.env['GITHUB_WORKSPACE'] || '';
  const baseDirPath = path.join(githubWorkspacePath, baseDir);
  fs.rm(baseDirPath, { force: true, recursive: true }, (error) => {
    if (error) {
      core.debug(error?.stack || 'stack trace not state.');
      core.setFailed(error?.message || 'error while delete, no error message available.');
    }
  });
}

cleanup();
