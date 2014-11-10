var PEG = require('pegjs');
var expect = require('chai').expect;
var fs = require('fs');
var grammar = fs.readFileSync('../pegs/expression.peg', 'utf-8');
var parse = PEG.buildParser(grammar).parse;

describe("Expressions", function() {
	
	it("should infer proper operator precedence", function() {
		// Multiplication should precede addition:
		var result = parse("1+2*3");
		expect(result).to.equal(7);

		// Multiplication should precede subtraction:
		var result = parse("10-2*5");
		expect(result).to.equal(0);

		// Division should precede addition:
		var result = parse("3+4/2");
		expect(result).to.equal(5);

		// Division should precede subtraction:
		var result = parse("7-6/3");
		expect(result).to.equal(5);

	});

	it("should respond to parentheses properly", function() {
		var result = parse("3 * (2 + 5)");
		expect(result).to.equal(21);
	});

	it("should throw error on unmatched parens", function() {
		// Missing a closing paren:
		expect(function() {
				parse("((2)");
			}).to.throw(Error);

		// Extra closing paren:
		expect(function() {
			parse("(2))");
		}).to.throw(Error);
	});

	it("should be left-associative", function() {
		// Left minus should be parsed first:
		var result = parse("1-2-3");
		expect(result).to.equal(-4);

		// Left minus should be parsed before right plus:
		var result = parse("1-2+3");
		expect(result).to.equal(2);
	});

	it("should throw error on leading whitespace", function() {
		expect(function() {
			parse(" 1+1");
		}).to.throw(Error);
});
	
	it("should allow whitespace between tokens", function() {
		// Whitespace trailing the expression:
		var result = parse("2+2 ");
		expect(result).to.equal(4);

		// Whitespace after operator:
		var result = parse("2+ 2");
		expect(result).to.equal(4);

		// Whitespace after each operand:
		var result = parse("2 +2 ");
		expect(result).to.equal(4);
	});

	it("should allow floating-point numbers, too", function() {
		// Checking for equality +/- .001 delta
		expect(parse("10.3 * 10")).to.be.closeTo(103.0, .001);
		expect(parse("10 / 3")).to.be.closeTo(3.333, .001);
	});
	it("should calculate exponents", function() {
		expect(parse("2^3")).to.equal(8);
		expect(parse("2^10")).to.equal(1024);
		expect(parse("2^100")).to.be.closeTo(1.267e30, .001e30);
	});
});

