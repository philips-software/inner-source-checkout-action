# Changelog

## Unreleased

 * Changed fs.rmdir usage to fs.rm per deprication warning `[DEP0147] DeprecationWarning: In future versions of Node.js, fs.rmdir(path, { recursive: true }) will be removed. Use fs.rm(path, { recursive: true }) instead`
 * Fixed error in action cleanup if action is used multiple times:
   * Behavoir of recursive fs.rmdir has changed between node12 and node16: In node12, no error was returned if path does not exist (which is the case for the second cleanup of the action). In node16, a 'path does not exist' error is raised if the path does not exist.
 * changed `set-output` usage per [github deprication warning](https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/)

## [1.3.0](https://github.com/philips-software/inner-source-checkout-action/compare/v1.2.1...v1.3.0) (2022-12-14)


### Features

* node12 is no longer supported ([d1bda8e](https://github.com/philips-software/inner-source-checkout-action/commit/d1bda8ed3e5b541f5f3fbcc00e556970815244c5))

## [1.2.0](https://github.com/philips-software/inner-source-checkout-action/compare/v1.1.0...v1.2.0) (2022-05-18)


### Features

* Add optional full_history boolean flag ([#173](https://github.com/philips-software/inner-source-checkout-action/issues/173)) ([d042e2c](https://github.com/philips-software/inner-source-checkout-action/commit/d042e2cafc9ea411870d45b495d488cf3afc4d13))

## [1.1.0](https://github.com/philips-software/inner-source-checkout-action/compare/v1.0.0...v1.1.0) (2021-04-07)


### Features

* cleanup actions with post hook ([#13](https://github.com/philips-software/inner-source-checkout-action/issues/13)) ([b29d714](https://github.com/philips-software/inner-source-checkout-action/commit/b29d714699cb48a83e5ac4344cfb6d4224a17b99))

## 1.0.0 (2021-03-18)


### Features

* inner source checkout action ([2780494](https://github.com/philips-software/inner-source-checkout-action/commit/2780494763f8a55c7266530e1a1ba0863d85fc4b))
* inner source checkout action ([cfe134a](https://github.com/philips-software/inner-source-checkout-action/commit/cfe134acd47f7a81b934d5e759fce4ffe247ec64))
