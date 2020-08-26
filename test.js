const assert = require('assert');
const Inventory = require('./InventoryAllocator')

const inventory = new Inventory();

describe('Block 1', function () {
  describe('Check for working function with simple inputs', function () {
    it('should return 1 when there is only 1 item in inventory', function () {
      assert.deepEqual(inventory.InventoryAllocator({ apple: 1 }, [{ name: 'owd', inventory: { apple: 1 } }]), [{ 'owd': { apple: 1 }} ]);
    });
    it('should return an empty array when there is no items in inventory', function () {
      assert.deepEqual(inventory.InventoryAllocator({ apple: 1 }, [{ name: 'owd', inventory: { apple: 0 } }]), []);
    });
  });
});

describe('Block 2', function () {
  describe('Checking for null inputs', function () {
    it('When input is null for order', function () {
      assert.deepEqual(inventory.InventoryAllocator(null, [{ name: 'owd', inventory: { apple: 1 } }]), []);
    });

    it('When input is null for warehouse', function () {
      assert.deepEqual(inventory.InventoryAllocator({ apple: 10 }, null), []);
    });
  });
});

describe('Block 3', function () {
  describe('Testing with two warehouses and only one item in the order', function () {
    it('Output of nonempty array with two warehouses', function () {
      const getOutput = inventory.InventoryAllocator({ apple: 10 }, [{ name: 'owd', inventory: { apple: 5 } }, { name: 'dm', inventory: { apple: 5 } }])
      assert.deepEqual(getOutput, [{ 'owd': { apple: 5 }}, { 'dm': { apple: 5 }}  ]);
    });

    it('Output of nonempty array with two warehouses, inventory is satisfied by one warehouse and the other has extras', function () {
      const getOutput = inventory.InventoryAllocator({ apple: 10 }, [{ name: 'owd', inventory: { apple: 10 } }, { name: 'dm', inventory: { apple: 5 } }])
      assert.deepEqual(getOutput, [{ 'owd': { apple: 10 }}]);
    });

    it('Output of empty array with two warehouses when there is not enough inventory', function () {
      const getOutput = inventory.InventoryAllocator({ apple: 11 }, [{ name: 'owd', inventory: { apple: 5 } }, { name: 'dm', inventory: { apple: 5 } }])
      assert.deepEqual(getOutput, []);
    });
  });
});

describe('Block 4', function () {
  describe('Testing with one warehouse and two items in the order', function () {
    it('Output of nonempty array with one warehouse', function () {
      const getOutput = inventory.InventoryAllocator({ apple: 10, banana: 5 }, [{ name: 'owd', inventory: { apple: 10, banana: 5 } }])
      assert.deepEqual(getOutput, [{ 'owd': { apple: 10, banana: 5 }}]);
    });

    it('Output of empty array with two warehouses when there is not enough inventory', function () {
      const getOutput = inventory.InventoryAllocator({ apple: 11, banana: 3 }, [{ name: 'owd', inventory: { apple: 5, banana: 2 } }])
      assert.deepEqual(getOutput, []);
    });
  });
});

describe('Block 5', function () {
  describe('Testing with two warehouses and two items in the order', function () {
    it('Output of nonempty array with two warehouse and two items in the order', function () {
      const getOutput = inventory.InventoryAllocator({ apple: 10, banana: 10 }, [{ name: 'owd', inventory: { apple: 5, banana: 5 } },
       { name: 'dm', inventory: { apple: 5, banana: 5} } ])
      assert.deepEqual(getOutput, [{ 'owd': { apple: 5, banana: 5 }}, { 'dm': { apple: 5, banana: 5 }}]);
    });

    it('Output of empty array with two warehouses when there is not enough inventory for both two items', function () {
      const getOutput = inventory.InventoryAllocator({ apple: 20, banana: 20 }, [{ name: 'owd', inventory: { apple: 5, banana: 5 } },
      { name: 'dm', inventory: { apple: 5, banana: 5} } ])
     assert.deepEqual(getOutput, []);
    });

    it('Output of empty array with two warehouses when there is enough inventory for one item but not the other', function () {
      const getOutput = inventory.InventoryAllocator({ apple: 20, banana: 20 }, [{ name: 'owd', inventory: { apple: 15, banana: 5 } },
      { name: 'dm', inventory: { apple: 5, banana: 5} } ])
     assert.deepEqual(getOutput, []);
    });
  });
});

describe('Block 6 - Testing with nulls', function () {
  describe('Testing with null as values inside the parameters', function () {
    it('Output of empty array when there is a null value inside the order but is the last value', function () {
      const getOutput = inventory.InventoryAllocator({ apple: 10, banana: null }, [{ name: 'owd', inventory: { apple: 8, banana: 5 } }])
      assert.deepEqual(getOutput, []);
    });

    it('Output of empty array when there is a null value inside the order but is the first value', function () {
      const getOutput = inventory.InventoryAllocator({ apple: null, banana: 10 }, [{ name: 'owd', inventory: { apple: 8, banana: 5 } }])
      assert.deepEqual(getOutput, []);
    });

    it('Output of empty array when there is a null value inside the warehouse but is the first value for inventory', function () {
      const getOutput = inventory.InventoryAllocator({ apple: 20, banana: 20 }, [{ name: 'owd', inventory: { apple: null, banana: 5 } }])
     assert.deepEqual(getOutput, []);
    });

    it('Output of empty array when there is a null value inside the order but is the last value and the other item meets the required amount',
     function () {
      const getOutput = inventory.InventoryAllocator({ apple: 10, banana: null }, [{ name: 'owd', inventory: { apple: 10, banana: 5 } }])
      assert.deepEqual(getOutput, []);
    });

    it('Output of empty array when there is a null value inside the order but is the first value and the other item meets the required amount',
     function () {
      const getOutput = inventory.InventoryAllocator({ apple: null, banana: 10 }, [{ name: 'owd', inventory: { apple: 8, banana: 5 } }])
      assert.deepEqual(getOutput, []);
    });

    it('Output of empty array when there is a null value inside the warehouse but is the first value for inventory and the other value meets the required amount',
     function () {
      const getOutput = inventory.InventoryAllocator({ apple: 20, banana: 5 }, [{ name: 'owd', inventory: { apple: null, banana: 5 } }])
     assert.deepEqual(getOutput, []);
    });
  });
});

describe('Block 7', function () {
  describe('Testing the example provided in the github README', function () {
    it("Outputs two items from the 'owd' warehouse and one item from the 'dm' warehouse", function () {
      const getOutput = inventory.InventoryAllocator({ apple: 5, banana: 5, orange: 5 },
         [ { name: 'owd', inventory: { apple: 5, orange: 5 } }, { name: 'dm', inventory: { banana: 5, orange: 10 } } ])
      assert.deepEqual(getOutput, [{ 'owd': { apple: 5, orange: 5 }}, { 'dm': { banana: 5 }}  ]);
    });

    it("Outputs two items from the 'owd' warehouse and two items from the 'dm' warehouse", function () {
      const getOutput = inventory.InventoryAllocator({ apple: 5, banana: 5, orange: 5 },
         [ { name: 'owd', inventory: { apple: 5, orange: 4 } }, { name: 'dm', inventory: { banana: 5, orange: 10 } } ])
      assert.deepEqual(getOutput, [{ 'owd': { apple: 5, orange: 4 }}, { 'dm': { banana: 5, orange: 1 }}  ]);
    });

    it("return an empty array since one of the items in the order is not in stock", function () {
      const getOutput = inventory.InventoryAllocator({ apple: 5, banana: 5, orange: 5 },
         [ { name: 'owd', inventory: { apple: 2, orange: 4 } }, { name: 'dm', inventory: { banana: 5, orange: 10 } } ])
      assert.deepEqual(getOutput, []);
    });
  });
});

