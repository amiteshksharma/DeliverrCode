# InventoryAllocator

To run this file, make sure you do the following:

    1. npm init (May not be needed as Package.json exists in the project)
    2. npm install
    3. npm install mocha - package used for writing test cases

To run the InventoryAllocator file, do the following command:

    node .\InventoryAllocator.js
   
The output for any function call in this file will output to a txt file when run.
The txt file is left out of the commit, but will be generated in the project
folder when executed.

To run the test cases, do the following command:

    npm test


For this problem I made the following assumptions:

1. I decided that if any item in the order can't be fulfilled due to lack of inventory in all warehouses combined, 
   then the return value is an empty array. I made this assumption based on the test cases provided in the Github README
   that provided three simple test cases.
2. Any null values inside the order object or warehouse array will result in the return value of an empty array
3. If there is more inventory than the order requires, it will return the number from the order (ie. if the order is {orange: 10} and the warehouse has 15 oranges,
                                                                                                 then it will have {orange: 10} in the output)
