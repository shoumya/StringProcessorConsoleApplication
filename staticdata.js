module.exports = {
    operationTypesMetaData: ["DUP", "POP", "+", "-"],
    configMessages: function () {
        return {
            MIN_ITEMS: `Minimum one item should be present in the array to perform any operation`,
            NO_OPERATORS: `No Operators are present in the string. String cannot be processed`,
            SUBTRACTION: `Second last item in the array should be greater then the last item`,
            NO_OPERATION: `Operation could not be performed as atleast two items are needed to produce the final result`
        }
    },
    operationTypes: function () {
        return this.operationTypesMetaData;
    },

}
