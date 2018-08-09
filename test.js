"use strict";
const {auto: normalizeEOL} = require("eol");
const editDotenv = require("./");
const {expect} = require("chai");
const {it} = require("mocha");



it("replaces existing variables", () =>
{
	let after, before, vars;

	vars = { EXISTING_VARIABLE:"new value" };
	before = "EXISTING_VARIABLE=";
	after = "EXISTING_VARIABLE=new value";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { EXISTING_VARIABLE1:"new value1", EXISTING_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE1=\nEXISTING_VARIABLE2=";
	after = "EXISTING_VARIABLE1=new value1\nEXISTING_VARIABLE2=new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { EXISTING_VARIABLE:"new value" };
	before = "EXISTING_VARIABLE=value";
	after = "EXISTING_VARIABLE=new value";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { EXISTING_VARIABLE1:"new value1", EXISTING_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE1=value1\nEXISTING_VARIABLE2=value2";
	after = "EXISTING_VARIABLE1=new value1\nEXISTING_VARIABLE2=new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { EXISTING_VARIABLE:" new value " };
	before = "EXISTING_VARIABLE=value";
	after = "EXISTING_VARIABLE=new value";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { EXISTING_VARIABLE1:" new value1 ", EXISTING_VARIABLE2:" new value2 " };
	before = "EXISTING_VARIABLE1=value1\nEXISTING_VARIABLE2=value2";
	after = "EXISTING_VARIABLE1=new value1\nEXISTING_VARIABLE2=new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));
});



it("replaces existing variables containing various whitespace", () =>
{
	let after, before, vars;

	vars = { EXISTING_VARIABLE:"new value" };
	before = "EXISTING_VARIABLE  =  ";
	after = "EXISTING_VARIABLE  =  new value";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { EXISTING_VARIABLE1:"new value1", EXISTING_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE1  =  \nEXISTING_VARIABLE2  =  ";
	after = "EXISTING_VARIABLE1  =  new value1\nEXISTING_VARIABLE2  =  new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { EXISTING_VARIABLE:"new value" };
	before = "EXISTING_VARIABLE  =  value";
	after = "EXISTING_VARIABLE  =  new value";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { EXISTING_VARIABLE1:"new value1", EXISTING_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE1  =  value1\nEXISTING_VARIABLE2  =  value2";
	after = "EXISTING_VARIABLE1  =  new value1\nEXISTING_VARIABLE2  =  new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { EXISTING_VARIABLE:"new value" };
	before = "  EXISTING_VARIABLE=value";
	after = "  EXISTING_VARIABLE=new value";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { EXISTING_VARIABLE1:"new value1", EXISTING_VARIABLE2:"new value2" };
	before = "  EXISTING_VARIABLE1=value1\n  EXISTING_VARIABLE2=value2";
	after = "  EXISTING_VARIABLE1=new value1\n  EXISTING_VARIABLE2=new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { EXISTING_VARIABLE:"new value" };
	before = "EXISTING_VARIABLE=value  ";
	after = "EXISTING_VARIABLE=new value  ";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { EXISTING_VARIABLE1:"new value1", EXISTING_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE1=value1  \nEXISTING_VARIABLE2=value2  ";
	after = "EXISTING_VARIABLE1=new value1  \nEXISTING_VARIABLE2=new value2  ";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { EXISTING_VARIABLE:"new\r\nvalue" };
	before = "EXISTING_VARIABLE = value";
	after = "EXISTING_VARIABLE = new\\r\\nvalue";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { EXISTING_VARIABLE1:"new\r\nvalue1", EXISTING_VARIABLE2:"new\r\nvalue2" };
	before = "EXISTING_VARIABLE1 = value1\nEXISTING_VARIABLE2 = value2";
	after = "EXISTING_VARIABLE1 = new\\r\\nvalue1\nEXISTING_VARIABLE2 = new\\r\\nvalue2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));
});



it("replaces existing variables containing RegExp special characters", () =>
{
	let after, before, vars;

	vars = { "/^\\w+$/":"new value" };
	before = "/^\\w+$/=value";
	after = "/^\\w+$/=new value";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { "/^\\w+1$/":"new value1", "/^\\w+2$/":"new value2" };
	before = "/^\\w+1$/=value1\n/^\\w+2$/=value2";
	after = "/^\\w+1$/=new value1\n/^\\w+2$/=new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { "EXISTING_VARIABLE":"/^\\w+$/" };
	before = "EXISTING_VARIABLE=value";
	after = "EXISTING_VARIABLE=/^\\w+$/";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { EXISTING_VARIABLE1:"/^\\w+1$/", EXISTING_VARIABLE2:"/^\\w+2$/" };
	before = "EXISTING_VARIABLE1=value1\nEXISTING_VARIABLE2=value2";
	after = "EXISTING_VARIABLE1=/^\\w+1$/\nEXISTING_VARIABLE2=/^\\w+2$/";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { EXISTING_VARIABLE:"$1" };
	before = "EXISTING_VARIABLE=value";
	after = "EXISTING_VARIABLE=$1";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { EXISTING_VARIABLE1:"$1", EXISTING_VARIABLE2:"$1" };
	before = "EXISTING_VARIABLE1=value1\nEXISTING_VARIABLE2=value2";
	after = "EXISTING_VARIABLE1=$1\nEXISTING_VARIABLE2=$1";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { $:"new value" };
	before = "$=value";
	after = "$=new value";
	expect(editDotenv(before, vars)).to.equal(after);

	vars = { $1:"new value1", $2:"new value2" };
	before = "$1=value1\n$2=value2";
	after = "$1=new value1\n$2=new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));
});



it("appends new variables", () =>
{
	let after, before, vars;

	vars = { APPENDED_VARIABLE:"new\r\nvalue" };
	before = "";
	after = "APPENDED_VARIABLE=new\\r\\nvalue\n";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));

	vars = { APPENDED_VARIABLE1:"new\r\nvalue1", APPENDED_VARIABLE2:"new\r\nvalue2" };
	before = "";
	after = "APPENDED_VARIABLE1=new\\r\\nvalue1\nAPPENDED_VARIABLE2=new\\r\\nvalue2\n";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { APPENDED_VARIABLE:" new value " };
	before = "";
	after = "APPENDED_VARIABLE=new value\n";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));

	vars = { APPENDED_VARIABLE1:" new value1 ", APPENDED_VARIABLE2:" new value2 " };
	before = "";
	after = "APPENDED_VARIABLE1=new value1\nAPPENDED_VARIABLE2=new value2\n";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { APPENDED_VARIABLE:"new value" };
	before = "EXISTING_VARIABLE=";
	after = "EXISTING_VARIABLE=\n\nAPPENDED_VARIABLE=new value";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));

	vars = { APPENDED_VARIABLE1:"new value1", APPENDED_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE=";
	after = "EXISTING_VARIABLE=\n\nAPPENDED_VARIABLE1=new value1\nAPPENDED_VARIABLE2=new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { APPENDED_VARIABLE:"new value" };
	before = "EXISTING_VARIABLE=value";
	after = "EXISTING_VARIABLE=value\n\nAPPENDED_VARIABLE=new value";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));

	vars = { APPENDED_VARIABLE1:"new value1", APPENDED_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE=value";
	after = "EXISTING_VARIABLE=value\n\nAPPENDED_VARIABLE1=new value1\nAPPENDED_VARIABLE2=new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { APPENDED_VARIABLE:"new value" };
	before = "EXISTING_VARIABLE=value\n";
	after = "EXISTING_VARIABLE=value\n\nAPPENDED_VARIABLE=new value\n";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));

	vars = { APPENDED_VARIABLE1:"new value1", APPENDED_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE=value\n";
	after = "EXISTING_VARIABLE=value\n\nAPPENDED_VARIABLE1=new value1\nAPPENDED_VARIABLE2=new value2\n";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { APPENDED_VARIABLE:"new value" };
	before = "EXISTING_VARIABLE=APPENDED_VARIABLE";
	after = "EXISTING_VARIABLE=APPENDED_VARIABLE\n\nAPPENDED_VARIABLE=new value";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));

	vars = { APPENDED_VARIABLE1:"new value1", APPENDED_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE=APPENDED_VARIABLE";
	after = "EXISTING_VARIABLE=APPENDED_VARIABLE\n\nAPPENDED_VARIABLE1=new value1\nAPPENDED_VARIABLE2=new value2";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));
});



it("does not affect comments", () =>
{
	let after, before, vars;

	vars = { EXISTING_VARIABLE2:"new value" };
	before = "EXISTING_VARIABLE1=value\n# Comment\nEXISTING_VARIABLE2=value\n";
	after = "EXISTING_VARIABLE1=value\n# Comment\nEXISTING_VARIABLE2=new value\n";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));

	vars = { EXISTING_VARIABLE1:"new value1", EXISTING_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE1=value\n# Comment\nEXISTING_VARIABLE2=value\n";
	after = "EXISTING_VARIABLE1=new value1\n# Comment\nEXISTING_VARIABLE2=new value2\n";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));


	vars = { APPENDED_VARIABLE:"new value" };
	before = "EXISTING_VARIABLE1=value\n# Comment\nEXISTING_VARIABLE2=value\n";
	after = "EXISTING_VARIABLE1=value\n# Comment\nEXISTING_VARIABLE2=value\n\nAPPENDED_VARIABLE=new value\n";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));

	vars = { APPENDED_VARIABLE1:"new value1", APPENDED_VARIABLE2:"new value2" };
	before = "EXISTING_VARIABLE1=value\n# Comment\nEXISTING_VARIABLE2=value\n";
	after = "EXISTING_VARIABLE1=value\n# Comment\nEXISTING_VARIABLE2=value\n\nAPPENDED_VARIABLE1=new value1\nAPPENDED_VARIABLE2=new value2\n";
	expect(editDotenv(before, vars)).to.equal(normalizeEOL(after));
});
