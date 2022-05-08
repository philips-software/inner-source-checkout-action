import * as core from '@actions/core';
import { checkout } from './checkout';

async function run(): Promise<void> {
  try {
    const repos = core.getInput('repos', { required: true });
    const token = core.getInput('token', { required: true });
    const baseDir = core.getInput('base_dir', { required: true });
    const fullHistory = core.getBooleanInput('full_history', { required: true });
    const githubWorkspacePath = process.env['GITHUB_WORKSPACE'] || '';

    await checkout({
      baseDir,
      githubWorkspacePath,
      repos,
      token,
      fullHistory,
    });
  } catch (error) {
    core.debug(error);
    core.setFailed(error.message);
  }
}

run();
