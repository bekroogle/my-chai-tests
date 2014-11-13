var PEG = require('pegjs');
var expect = require('chai').expect;
var fs = require('fs');
var grammar = fs.readFileSync('../pegs/commutative.peg', 'utf-8');
var parse = PEG.buildParser(grammar).parse;

describe("Mult/Div expressions", function() {
	it("should handle chained division: 8/2/2 = 2", function() {
		expect(parse("8/2/2")).to.equal(2);
	});

	it("should be able to mix multiplication and division", function() {
		expect(parse("2*4/2/2")).to.equal(2);
		expect(parse("8/2/2*4")).to.equal(8);
	});
});

describe("Additon and Mult/Div", function() {
	it("should allow addition and multiplication intermixed", function() {
		expect(parse("2+2*2*2")).to.equal(10);
	});
	it("should allow addition with mult & div intermixed", function() {
		expect(parse("2+2*4/2/2")).to.equal(4);
	});
});

describe("Permutations of combined operators", function() {

	it("should handle 1+5-2*8/4", function() {
		expect(parse("1+5-2*8/4")).to.equal(2);
	});
	it("should handle 1+5-2/4*8", function() {
		expect(parse("1+5-2/4*8")).to.equal(2);
	});
	it("should handle 1+5/2*8-4", function() {
		expect(parse("1+5/2*8-4")).to.equal(17);
	});
	it("should handle 1+5/2-8*4", function() {
		expect(parse("1+5/2-8*4")).to.equal(-28.5);
	});
	it("should handle 1+5*2-8/4", function() {
		expect(parse("1+5*2-8/4")).to.equal(9);
	});
	it("should handle 1+5*2/8-4", function() {
		expect(parse("1+5*2/8-4")).to.equal(-1.75);
	});
	it("should handle 1-5+2*8/4", function() {
		expect(parse("1-5+2*8/4")).to.equal(0);
	});
	it("should handle 1-5+2/8*4", function() {
		expect(parse("1-5+2/8*4")).to.equal(-3);
	});
	it("should handle 1-5*2+8/4", function() {
		expect(parse("1-5*2+8/4")).to.equal(-7);
	});
	it("should handle 1-5*2/8+4", function() {
		expect(parse("1-5*2/8+4")).to.equal(3.75);
	});
	it("should handle 1-5/2*8+4", function() {
		expect(parse("1-5/2*8+4")).to.equal(-15);
	});
	it("should handle 1-5/2+8*4", function() {
		expect(parse("1-5/2+8*4")).to.equal(30.5);
	});
	it("should handle 1*5+2-8/4", function() {
		expect(parse("1*5+2-8/4")).to.equal(5);
	});
	it("should handle 1*5+2/8-4", function() {
		expect(parse("1*5+2/8-4")).to.equal(1.25);
	});
	it("should handle 1*5-2-8/4", function() {
		expect(parse("1*5-2-8/4")).to.equal(1);
	});
	it("should handle 1*5-2/8-4", function() {
		expect(parse("1*5-2/8-4")).to.equal(0.75);
	});
	it("should handle 1*5/2+8-4", function() {
		expect(parse("1*5/2+8-4")).to.equal(6.5);
	});
	it("should handle 1*5/2-8+4", function() {
		expect(parse("1*5/2-8+4")).to.equal(-1.5);
	});
	it("should handle 1/5+2-8*4", function() {
		expect(parse("1/5+2-8*4")).to.equal(-29.8);
	});
	it("should handle 1/5+2*8-4", function() {
		expect(parse("1/5+2*8-4")).to.equal(12.2);
	});
	it("should handle 1/5-2+8*4", function() {
		expect(parse("1/5-2+8*4")).to.equal(30.2);
	});
	it("should handle 1/5-2*8+4", function() {
		expect(parse("1/5-2*8+4")).to.equal(-11.8);
	});
	it("should handle 1/5*2+8-4", function() {
		expect(parse("1/5*2+8-4")).to.equal(4.4);
	});
	it("should handle 1/5*2-8+4", function() {
		expect(parse("1/5*2-8+4")).to.be.closeTo(-3.599, .001);
	});
	
});