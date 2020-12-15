// var assert = require('assert');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
const config = require('../staticdata');
var sp = require('../strings-processor');
var sProcessor = new sp();


describe('Unit Tests', function () {

    before(function () {
        // runs once before the first test in this block
    });

    after(function () {
        // runs once after the last test in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        sProcessor = new sp();
    });

    afterEach(function () {
        // runs after each test in this block
        sProcessor.resetInputMetaData();
    });

    describe('Set the Input String & Check its contents', function () {

        it("Set the input String & => Check it contents", function () {
            sProcessor.setInputData(["12", "12", "20", "POP", "-"]);
            expect(sProcessor.getInputData()).to.be.an('array');
            expect(sProcessor.getInputData()).to.have.lengthOf(5);
            sProcessor.getInputData().should.be.an('array').that.includes("12");
            sProcessor.getInputData().should.be.an('array').that.includes("20");
            sProcessor.getInputData().should.be.an('array').that.includes("POP");
            sProcessor.getInputData().should.be.an('array').that.includes("-");
        })
    });

    describe("Count()=> the input Parameters", function () {
        it("Find the numbers count()=> in input", function () {
            sProcessor.setInputData(["25", "55", "10", "POP", "-"]);
            sProcessor.findNumbersInInput();
            const inputData = sProcessor.getInputMetaData();
            expect(inputData.finiteStack).to.be.an('array');
            expect(inputData.finiteStack).to.have.lengthOf(3);
            expect(inputData.finiteStack).to.be.an('array').that.includes(25);
            expect(inputData.finiteStack).to.be.an('array').that.includes(10);
        })

        it("Find the operators count()=> in input", function () {
            sProcessor.setInputData(["25", "80", "20", "POP", "+"]);
            sProcessor.findOprStringsInInput();
            const inputData = sProcessor.getInputMetaData();
            expect(inputData.operatorsStack).to.be.an('array');
            expect(inputData.operatorsStack).to.have.lengthOf(2);
            expect(inputData.operatorsStack).to.be.an('array').that.includes("POP");
            expect(inputData.operatorsStack).to.be.an('array').that.includes("+");
        })

    })

    describe('Validate Input Operations ', function () {
        it("To Validate => Operators in input => TestCase 1", function () {
            sProcessor.setInputData(["25", "80", "20", "POP", "+"]);
            sProcessor.findOprStringsInInput();
            expect(sProcessor.getInputMetaData().operatorsStack[0]).to.be.equal('POP');
            expect(sProcessor.getInputMetaData().operatorsStack[1]).to.be.equal('+');
        })

        it("To Validate => Operators in input => TestCase 2", function () {
            sProcessor.setInputData(["25", "20", "DUP", "+", "-"]);
            sProcessor.findOprStringsInInput();
            expect(sProcessor.getInputMetaData().operatorsStack[2]).to.be.equal('-');
            expect(sProcessor.getInputMetaData().operatorsStack[1]).to.be.equal('+');
            expect(sProcessor.getInputMetaData().operatorsStack[0]).to.be.equal('DUP');
        })
    })

    describe("Perform DUP operation ", function () {
        it("To Perform Operation => DUP", function () {
            sProcessor.setInputData(["25", "DUP", "+"]);
            sProcessor.findNumbersInInput();
            sProcessor.findOprStringsInInput();
            expect(sProcessor.validateOperationInput("DUP")).to.be.equal(true);
            sProcessor.performOperation("DUP");
        })

    })

    describe("Perform Operation POP", function () {
        it("To Peform Operation => POP", function () {
            sProcessor.setInputData(["10", "25", "50", "75", "85", "POP", "POP", "POP", "DUP"]);
            sProcessor.processInputString();
        })
    })

    describe("Dont PASS any command line paramters and check", function () {
        it("No Inpiut parameters to the string processor", function () {
            sProcessor.processInputString();
        })
    })

    describe("Dont PASS any command line paramters and check", function () {
        it("No Inpiut parameters to the string processor", function () {
            sProcessor.processInputString();
        })
    })

    describe("Set only Numbers to => Input string", function () {
        it("No Inpiut parameters to the string processor", function () {
            sProcessor.setInputData(["10", "25", "50", "75", "85"]);
            sProcessor.processInputString();
        })
    })

    describe("Set only Operators to => Input string", function () {
        it("No Inpiut parameters to the string processor", function () {
            sProcessor.setInputData(["POP", "DUP", "+", "-", "POP"]);
            sProcessor.processInputString();
        })
    })

});

