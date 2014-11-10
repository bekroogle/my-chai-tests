var PEG = require('pegjs');
var chai = require('chai');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var fs = require('fs');

var grammar = fs.readFileSync('../pegs/expression.peg', 'utf-8');

var parse = PEG.buildParser(grammar).parse;


assert.equal(parse("1-2-3"), "-4", "1-2-3 = -4" );

