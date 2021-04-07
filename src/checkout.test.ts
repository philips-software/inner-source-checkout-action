import { checkout, parseActionRepo, ActionRepo } from './checkout';
import { exec } from '@actions/exec';

jest.mock('@actions/exec');
const mockedExec = exec as jest.Mock<Promise<number>>;

const defaultValidRepo1: ActionRepo = {
  owner: 'philips-software',
  name: 'spdx-action',
  ref: '1.0.0',
};
const defaultValidRepo1String = `${defaultValidRepo1.owner}/${defaultValidRepo1.name}@${defaultValidRepo1.ref}`;
const defaultValidRepo2: ActionRepo = {
  owner: 'philips-software',
  name: 'spdx-action',
  ref: '2.0.0',
};
const defaultValidRepo2String = `${defaultValidRepo2.owner}/${defaultValidRepo2.name}@${defaultValidRepo2.ref}`;

describe('Clone repos succeeds.', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    mockedExec.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(0);
      });
    });
  });

  test('Shoudd clone without error a single repo.', async () => {
    const token = 'invalid';
    await checkout({
      baseDir: '',
      githubWorkspacePath: '',
      repos: defaultValidRepo1String,
      token,
    });
    expect(exec).toHaveBeenCalledWith('git', [
      'clone',
      `https://x-access-token:${token}@github.com/${defaultValidRepo1.owner}/${defaultValidRepo1.name}.git`,
      '--depth',
      '1',
      '--branch',
      `${defaultValidRepo1.ref}`,
      `${defaultValidRepo1.name}`,
    ]);
  });

  test('Shoudd clone without error a single repo.', async () => {
    const token = 'invalid';
    await checkout({
      baseDir: '',
      githubWorkspacePath: '',
      repos: `${defaultValidRepo1String},${defaultValidRepo2String}`,
      token,
    });
    expect(exec).toHaveBeenCalledTimes(2);
  });
});

describe('Clone repos error scenarios.', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    mockedExec.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(666);
      });
    });
  });

  test('Should return error if clone fails', async () => {
    const token = 'invalid';

    await expect(
      checkout({
        baseDir: '',
        githubWorkspacePath: '',
        repos: `${defaultValidRepo1String},${defaultValidRepo2String}`,
        token,
      }),
    ).rejects.toThrow();
  });

  test('Should return error if repo string is invalid.', async () => {
    const token = 'invalid';

    await expect(
      checkout({
        baseDir: '',
        githubWorkspacePath: '',
        repos: `invalid`,
        token,
      }),
    ).rejects.toThrow();
    expect(exec).toHaveBeenCalledTimes(0);
  });
});

describe('Checking parsing repos', () => {
  test('Empty string results should return an error object.', () => {
    expect(parseActionRepo('').errors.length).toBeGreaterThan(0);
  });

  test('Non valid repo results should return an error object.', () => {
    expect(parseActionRepo('owner').errors.length).toBeGreaterThan(0);
    expect(parseActionRepo('owner/repo').errors.length).toBeGreaterThan(0);
    expect(parseActionRepo('owner/repo@').errors.length).toBeGreaterThan(0);
    expect(parseActionRepo('/repo@').errors.length).toBeGreaterThan(0);
    expect(parseActionRepo('owner/@').errors.length).toBeGreaterThan(0);
    expect(parseActionRepo('/@').errors.length).toBeGreaterThan(0);
    expect(parseActionRepo('/').errors.length).toBeGreaterThan(0);
    expect(parseActionRepo('@').errors.length).toBeGreaterThan(0);
  });

  test('Parse a list with one valid repo.', () => {
    const result = parseActionRepo(defaultValidRepo1String);

    expect(result.errors.length).toEqual(0);
    expect(result.result.length).toEqual(1);
    expect(result.result[0]).toEqual(defaultValidRepo1);
  });

  test('Parse a list with multiple valid repos.', () => {
    const result = parseActionRepo(`${defaultValidRepo1String}, ${defaultValidRepo2String}`);

    expect(result.errors.length).toEqual(0);
    expect(result.result.length).toEqual(2);
  });

  test('Parse a list with multiple valid and invalid repos.', () => {
    const result = parseActionRepo(`${defaultValidRepo1String}, ${defaultValidRepo2String},invalid`);

    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.result.length).toEqual(2);
  });
});
