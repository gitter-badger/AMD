# AMD
Custom AMD implementation

[![Build Status](https://travis-ci.org/dobre-robert-marius/AMD.svg?branch=master)](https://travis-ci.org/dobre-robert-marius/AMD)
[![Bower version](https://badge.fury.io/bo/nucleo-amd.svg)](http://badge.fury.io/bo/nucleo-amd)

### Usage

    // make documentation about:
    - define
    - require
    - accept relative paths

### Install

    npm install
    npm install -g grunt-cli

### Tests

    npm install -g testem
    npm install -g phantomjs
    testem

### Build

    grunt build:prod

### Deploy

    grunt deploy:patch
    grunt deploy:minor
    grunt deploy:major

### Planned features

    - require folder path should get file main or index. ex: require('pkg/utils/') should get 'pkg/utils/main'
    - default prefix: require('utils/isString') will get 'pkg/utils/isString'

## Authors ##

* [Robert Dobre](https://twitter.com/robert_cnih87)

## Versioning ##

This library follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this framework. Please see our
[Contribution Guidelines](https://dobre-robert-marius/AMD/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[@robertcnih87](https://twitter.com/robert_cnih87)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
