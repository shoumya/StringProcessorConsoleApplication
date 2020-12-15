const config = require('./staticdata');

module.exports = class SP {

    inputString = [];
    InputMetaData = {
        inputOperatorsCount: 0,
        inputNumbersCount: 0,
        finiteStack: [],
        operatorsStack: []
    }
    operationTypes = config.operationTypes();
    messages = config.configMessages();

    constructor() {
        console.log(`string processing => constructor`);
    }

    setInputData(inputData) {
        this.inputString = inputData;
        this.resetInputMetaData();
        console.log(`Input string is set => ${this.inputString}`);
    }

    getInputData() {
        return this.inputString;
    }

    resetInputMetaData() {
        this.InputMetaData.inputOperatorsCount = 0;
        this.InputMetaData.inputNumbersCount = 0;
        this.InputMetaData.finiteStack = [];
        this.InputMetaData.operatorsStack = [];
    }

    getInputMetaData(){
        return this.InputMetaData;
    }

    validateOperationInput = (operationType) => {
        return this.operationTypes.includes(operationType);
    }

    findNumbersInInput = () => {
        this.inputString.forEach((ref) => {
            if (isFinite(ref)) {
                this.InputMetaData.inputNumbersCount++;
                this.InputMetaData.finiteStack.push(Number(ref));
            }
        });
    }

    findOprStringsInInput = () => {
        this.inputString.forEach((op) => {
            const metaData = this.validateOperationInput(op);
            if (metaData) {
                this.InputMetaData.inputOperatorsCount++;
                this.InputMetaData.operatorsStack.push(op);
            }
        });
    }

    processInputString() {
        this.findNumbersInInput();
        this.findOprStringsInInput();
        console.log(`************************************************************`)
        console.log(`Numbers count => ${this.InputMetaData.inputNumbersCount} ✅`);
        console.log(`Finite Stack => ${this.InputMetaData.finiteStack} ✅`);
        console.log(`Operators Count => ${this.InputMetaData.inputOperatorsCount} ✅`)
        console.log(`Operators Stack => ${this.InputMetaData.operatorsStack} ✅`)
        console.log(`************************************************************`);

        if (this.InputMetaData.operatorsStack.length > 0 && this.InputMetaData.finiteStack.length > 0) {
            this.InputMetaData.operatorsStack.forEach((reference) => {
                this.performOperation(reference);
            });
        } else if (this.InputMetaData.operatorsStack.length === 0 || this.InputMetaData.finiteStack.length === 0) {
            console.log(`Input Empty => No Operation Perfomed ✖`);
            console.log(`Output is => -1`)
        }
    }

    performOperation(reference) {

        if (reference === "DUP") {
            if (this.InputMetaData.finiteStack.length >= 1) {
                const item = this.InputMetaData.finiteStack[this.InputMetaData.finiteStack.length - 1];
                this.InputMetaData.finiteStack.push(item);
                console.log(`Operation Performed is => DUP ✅`)
                console.log(`Output => ${item}`);
            } else if (this.InputMetaData.finiteStack.length === 0) {
                console.log("DUP operation no => No element in stack ✖");
            }
        }

        else if (reference === "POP") {
            if (this.InputMetaData.finiteStack.length >= 1) {
                this.InputMetaData.finiteStack.pop();
                console.log(`Operation Performed is => POP ✅`);
                console.log(`Output is => ${this.InputMetaData.finiteStack}`)
            } else if (this.InputMetaData.finiteStack.length === 0) {
                console.log("POP operation no => No element in stack ✖");
            }
        }

        else if (reference === "-") {
            // this operation requires atleast 2 elements in the stack
            const len = this.InputMetaData.finiteStack.length;
            if (len >= 2) {
                const condition = this.InputMetaData.finiteStack[len - 1] >= this.InputMetaData.finiteStack[len - 2];
                if (condition) {
                    let finalResult = (this.InputMetaData.finiteStack[len - 1]) - (this.InputMetaData.finiteStack[len - 2]);
                    this.InputMetaData.finiteStack[len - 2] = finalResult;
                    console.log(`Operation Performed - ✅`);
                    console.log(`Output is => ${finalResult}`);
                    this.InputMetaData.finiteStack.pop();
                } else {
                    console.log(`Cannot Perform Subtraction => last value in => stack < second last value ✖`);
                }
            } else if (len === 1) {
                console.log(`To Perform Operation => atleast 2 numbers needed ✖`)
            }
        }

        else if (reference === "+") {
            // this operation requires atleast 2 elements in the stack
            const len = this.InputMetaData.finiteStack.length;
            if (len >= 2) {
                let finalResult = (this.InputMetaData.finiteStack[len - 2]) + (this.InputMetaData.finiteStack[len - 1]);
                this.InputMetaData.finiteStack[len - 2] = finalResult;
                console.log(`Operation Performed => + ✅`);
                console.log(`Output is => ${finalResult}`);
                this.InputMetaData.finiteStack.pop();
            } else if (len === 1) {
                console.log(`To Perform Operation => atleast 2 numbers needed ✖`)
            }
        }
    }


}
