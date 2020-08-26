//Required to write results to a file
const fs = require('fs') 

class InventoryAllocator {

    /**
     * Determine if the order requsted by the user is able to be processed
     * based on the warehouses and the amount of items available
     * 
     * @param {Object} order - The object containing the orders for the user 
     * @param {Array} warehouse - The inventory of the warehouse, stores all 
     * available warehouses and what items are available
     */
    InventoryAllocator(order, warehouse) {
        //If either input is null, instantly return an empty array
        if(order === null || warehouse === null) return [];

        //Get all the keys in the 'order' to loop through
        const getKeys = Object.keys(order);

        //Output array
        let output = []
        let containsNull = false;
        getKeys.forEach(item => {
            let itemQuantity = order[item];
            //Check for null value inside the 'order' object
            if(itemQuantity === null) {
                containsNull = true;
                return;
            }
    
            warehouse.forEach(product => {
                const getInventoryCount = product['inventory'][item];
                if(getInventoryCount === undefined) return;
                //Check if value is null at the index inside the inventory array
                if(getInventoryCount === null) {
                    containsNull = true;
                    return;
                }

                const getInventoryName = product['name'];
                const getIndex = output.findIndex(x => Object.keys(x).includes(getInventoryName)) 

                if(itemQuantity >= getInventoryCount) {
                    if(getIndex !== -1) {
                        output[getIndex][getInventoryName][item] = getInventoryCount 
                        itemQuantity = itemQuantity - getInventoryCount;
                    } else {
                        output.push({[getInventoryName]: {[item]: getInventoryCount}});
                        itemQuantity = itemQuantity - getInventoryCount;
                    } 
                    
                } else {
                    if(getIndex !== -1) {
                        if(itemQuantity !== 0) output[getIndex][getInventoryName][item] = itemQuantity 
                        itemQuantity = 0;    
                    } else {
                        if(itemQuantity !== 0) output.push({[getInventoryName]: {[item]: itemQuantity}});
                        itemQuantity = 0;
                    }
                    
                }
            })
    
            //If there is a leftover amount, then there is not enough inventory
            //Using containsNull as that will return an empty array outside the loop
            if(itemQuantity > 0) containsNull = true;
        })

        if(containsNull) return [];
        return output;
    }
}

//Testing inputs to print to 'Output.txt' file
let Inventory = new InventoryAllocator();
let value = Inventory.InventoryAllocator({ apple: 5, banana: 5, orange: 5 }, 
    [ { name: 'owd', inventory: { apple: 2, orange: 4 } }, { name: 'dm', inventory: { banana: 5, orange: 10 } } ]);
    
//Write the output to file
fs.writeFile('Output.txt', JSON.stringify(value), (err) => {  
    if (err) throw err; 
}) 

//Required for using in test.js
module.exports = InventoryAllocator