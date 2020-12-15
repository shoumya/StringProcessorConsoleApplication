const sp = require('./strings-processor');
const myArgs = process.argv.slice(2);
let sprocessor = new sp();
sprocessor.setInputData(myArgs);
sprocessor.processInputString();

/*
======================== APPLICATION LOGIC =======================
1. The applicartion logic is to take command line arguments in the form of numbers and predefined operators and then 
   pass it to the string processor to perform the operations and then show the output 

   ========== The Application logic is divided into 3 javascript files ============
   a. main.js - this creates and instance of the string processor 
   b. strings-processor.js - this holds all the logic to process the string 
   c. message.js - which holds the valid operators which can be accepted through command line 

2. This is the main.js file which creates an instance of the string processor and then passes the command line 
   arguments to it 

   1. Create an instance of the string processor 
   2. Capture the command line arguments and set the input string 
   3. Call the instance method processInputString() to process the string
   4. Output is shown on the screen

*/

/* 

Test cases 
The operations which need to be performed are,

1. "DUP": Duplicates the element at stack top.
=============== (There should be at least one element present in the stack to perform this operation.)

2. "POP": Removes an element from stack top.
============== (There should be at least one element present in the stack to perform this operation.)

3. "+": Remove the top two elements from the stack. Add them and push the result into the stack.

================= There should be at least two elements present in the stack to perform this operation.

4. "-": Remove the top two elements from the stack. Subtract them and push the result into the stack.

============= (There should be at least two elements present in the stack to perform this operation &
============== The top element should be greater than the element below it.)
=============== You need to build a processor for this type of string. And once you are done processing
================ you should return the stack top. If there is anything wrong, then you should return -1.


*/ 
