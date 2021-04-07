import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';

async function cleanup(): Promise<void> {
  const baseDir = core.getInput('base_dir', { required: true });
  const githubWorkspacePath = process.env['GITHUB_WORKSPACE'] || '';
  const baseDirPath = path.join(githubWorkspacePath, baseDir);

  try {
    await new Promise((resolve, reject) => {
      fs.rmdir(baseDirPath, { recursive: true }, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  } catch (e) {
    core.debug(e);
    core.setFailed(e.message);
  }
}

cleanup();
