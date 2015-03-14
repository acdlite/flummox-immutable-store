import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import chai from 'chai';
global.expect = chai.expect;

import 'babel-runtime/regenerator/runtime';
