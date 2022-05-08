import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as path from 'path';

export interface Parameters {
  repos: string;
  token: string;
  baseDir: string;
  githubWorkspacePath: string;
  fullHistory: boolean;
}

export interface ActionRepo {
  owner: string;
  name: string;
  ref: string;
}

export function parseActionRepo(repos: string): { result: ActionRepo[]; errors: string[] } {
  const result: ActionRepo[] = [];
  const errors: string[] = [];
  for (let repo of repos.split(',')) {
    try {
      repo = repo.trim();
      const owner = repo.split('/')[0];
      const name = repo.split('/')[1].split('@')[0];
      const ref = repo.split('/')[1].split('@')[1];

      if (owner && name && ref) {
        result.push({ owner, name, ref });
      } else {
        errors.push(`Cannot parse repo: ${JSON.stringify(repo)}`);
      }
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (result.length === 0) {
    errors.push(
      `No repos found in: ${repos}. Did you specify a comma separated list of repos of the form '<owner>/<repo>@<version>'?`,
    );
  }

  return { result, errors };
}

export async function checkout(parameters: Parameters): Promise<void> {
  const actionReposResult = parseActionRepo(parameters.repos);
  if (actionReposResult.errors.length > 0) {
    throw new Error(`Cannot parse repositories:  ${actionReposResult.errors.join('\r\n')}`);
  }

  for (const repo of actionReposResult.result) {
    core.startGroup(`clone ${repo.owner}/${repo.name}@${repo.ref}`);

    const cloneDir = path.join(parameters.githubWorkspacePath, parameters.baseDir, repo.name);

    const gitArgs: string[] = [];

    gitArgs.push('clone');
    gitArgs.push(`https://x-access-token:${parameters.token}@github.com/${repo.owner}/${repo.name}.git`);
    if (!parameters.fullHistory) {
      gitArgs.push('--depth');
      gitArgs.push('1');
    }
    gitArgs.push('--branch');
    gitArgs.push(repo.ref);
    gitArgs.push(cloneDir);

    const exitCode = await exec.exec(`git`, gitArgs);

    if (exitCode !== 0) {
      throw new Error(`Clone repos failed with exit code ${exitCode}`);
    }
    core.endGroup();
  }
}
