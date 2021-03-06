const enhancer = require('./enhancer.js');

const baseSword = {
    name: "A Wooden Sword",
    durability: 5,
    enhancement: 10
};

const baseBook = {
    name: "An Old Book",
    durability: 5,
    enhancement: 20
};

const baseShield = {
    name: "An Iron Shield",
    durability: 15,
    enhancement: 19
};

describe('Testing enhancer.js', () => {
    // a repair(item) method that accepts an item object and
    // returns a new item with the durability restored to 100.
    describe('repair(item)', () => {
        it('returns a new item when passed an existing item', () => {
            const testSword = { ...baseSword };
            const result = enhancer.repair(testSword);

            expect(result).not.toBe(testSword);
        });
        it('returns an item with a durability of 100', () => {
            const testBook = { ...baseBook };
            const result = enhancer.repair(testBook);

            expect(result.durability).toBe(100);
        });
    });

    // a success(item) method that accepts an item object and
    // returns a new item object modified according to the
    // rules defined by the client for enhancement success.
    //
    // When enhancement succeeds
    //  - The item's enhancement increases by 1.
    //  - If the item enhancement level is 20, the enhancement level is not changed.
    //  - The durability of the item is not changed.
    describe('success(item)', () => {
        it('returns a new object', () => {
            const testSword = { ...baseSword };
            const newSword = enhancer.succeed(testSword);

            expect(newSword).not.toBe(testSword);
        });
        it('returns enhancement increased by 1 if currently less than 20', () => {
           const testShield = { ...baseShield };
           const newShield = enhancer.succeed(testShield);

           expect(newShield.enhancement).toBe(testShield.enhancement + 1);
        });
        it ('returns enhancement of 20 if already 20', () => {
            const testBook = { ...baseBook };
            const newBook = enhancer.succeed(testBook);

            expect(newBook.enhancement).not.toBeGreaterThan(20);
        })
    });

    // a fail(item) method that accepts an item object and returns a
    // new item object modified according to the rules defined by the
    // client for enhancement failure.
    //
    // When enhancement fails
    //  - If the item's enhancement is less than 15, the
    //     durability of the item is decreased by 5.
    //  - If the item's enhancement is 15 or more, the
    //    durability of the item is decreased by 10.
    //  - If the item's enhancement level is greater than
    //    16, the enhancement level decreases by 1 (17 goes
    //    down to 16, 18 goes down to 17).
    describe('fail(item)', () => {
        it('returns a new object', () => {
            const testSword = { ...baseSword };
            const newSword = enhancer.succeed(testSword);

            expect(newSword).not.toBe(testSword);
        });

        it('decreases durability by 5 if enhancement is less than 15', () => {
            const testBook = { ...baseBook, enhancement: 14 };
            const newBook = enhancer.fail(testBook);

            expect(newBook.durability).toBe(testBook.durability - 5);
        });

        it('decreases durability by 10 if enhancement is 15 or more', () => {
            const testShield = { ...baseShield, enhancement: 15 };
            const newShield = enhancer.fail(testShield);

            expect(newShield.durability).toBe(testShield.durability - 10);
        });

        it('decreases enhancement level by 1 if enhancement is greater than 16', () => {
           const testSword = { ...baseSword, enhancement: 17 }
           const newSword = enhancer.fail(testSword);

           expect(newSword.enhancement).toBe(testSword.enhancement - 1);
        });

        it('does not decrease enhancement if enhacement is 16 or less', () => {
            const testBook = { ...baseBook, enhancement: 16 };
            const testSword = { ...baseSword, enhancement: 14 };

            const newBook = enhancer.fail(testBook);
            const newSword = enhancer.fail(testSword);

            expect(newBook.enhancement).toBe(testBook.enhancement);
            expect(newSword.enhancement).toBe(testSword.enhancement);
        })
    });

    // Add a get() method to the enhancer object that takes an item and returns a new
    // item with the name property modified according to the following rules:
    //  - if the enhancement level is 0, the the name is not modified.
    //  - if the enhancement level is greater than 0, change the name to include the enhancement
    //    level, preceded by a plus sign ( + ), between square brackets before the item's name.
    //    Example: the name of a "Iron Sword" enhanced to 7 would be "[+7] Iron Sword".
    describe('get(item)', () => {
       it('returns copy of item when enhancement is 0', () => {
         const testBook = { ...baseBook, enhancement: 0 };
         const newBook = enhancer.get(testBook);

         expect(newBook).not.toBe(testBook);
         expect(newBook).toEqual(testBook);
       });
       it('prepends [+n] to the name where n = enhancement when enhancement is greater than 0', () => {
           const testSword = { ...baseSword, name: 'Sword', enhancement: 5 };
           const newSword = enhancer.get(testSword);

           expect(newSword.name).toBe('[+5] Sword');
       })
    });
});
