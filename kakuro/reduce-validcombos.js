export default class ReduceValidCombos {
    static name() { return 'Reduce hidden pairs'; }

    
    static solve (puzzle) {
        for (const clue of puzzle.getAllClues()) {
            const sortedCells = clue.cells.sort (
                (a, b) => maskValues(a.valuemask).length - maskValues(b.valuemask).length 
            ).filter(
                (a) => a.value === undefined
            );
            const solvedVals = clue.cells.map (
                c => c.value
            ).filter (
                v => v !== undefined
            );
            const solvedMask = nums2mask (solvedVals);

            const validComboMasks = clue.combinations.map(
                combo => nums2mask(combo)
            ).filter (
                mask => solvedMask == 0 || (mask & solvedMask) > 0
            );

            // console.debug('ReduceValidCombos: clue=' + clue.name + 
            //     '\n - solved=' + solvedVals.join('') + 
            //     '\n - combos=' + clue.combinations.join(',') +
            //     '\n - cells=' + sortedCells.map(c => c.ref + '(' + maskValues(c.valuemask).join('') + ')'));
                
            for (const testcell of sortedCells) {
                let indvalidopts = [];

                for (const testval of maskValues(testcell.valuemask)) {
                    const testvalmask = 1 << (testval - 1);
                    const testsolvedmask = solvedMask | testvalmask;

                    let remainingcombos = validComboMasks.filter (
                        // only accept masks that work with the test value
                        m => (m & testsolvedmask) === testsolvedmask
                    ).map (
                        // remove the test value from the mask (reduces # cells by one)
                        m => m & ~testvalmask
                    );

                    //console.debug(`\tTry ${testcell.ref} = ${testval} ...`);
                    let cansolve = false;
                    for (const rc of remainingcombos) {
                        cansolve = isPossible (rc, sortedCells.filter (c => c !== testcell));
                        if (cansolve) break;
                    }
                    //console.debug(`\tIf ${testcell.ref} = ${testval} ? ${cansolve}`);

                    if (!cansolve) {
                        indvalidopts.push(testval);
                    }
                    
                }

                if (indvalidopts.length > 0) {
                    // FOUND A REDUCTION!
                    console.debug(`\tREDUCE FOUND: ${testcell.ref} cannot be ${indvalidopts}`);
                    let newmask = testcell.valuemask & ~nums2mask(indvalidopts);
                    let step = {
                        type: 'REDUCE',
                        cells: [testcell],
                        valueMasks: [newmask],
                        constraints: [ clue ],
                        title: `remove impossible options from ${testcell.ref}`,
                        description: `There are no possible combinations for ${clue.name} if ${testcell.ref} is ${indvalidopts}.`
                    };
                    return step;
                }
            }



        }
        return null;
    }

}

function isPossible (mask, cells) {
    let prefix = '> '.repeat(9-cells.length);
    // console.debug(prefix + maskValues([mask]).join('') + ' in ' +
    //     'cells=' + cells.map(c => c.ref + ' (' + maskValues(c.valuemask).join('') + ')'));

    // if there is only one cell left, does it meet the mask?
    if (cells.length == 1) {
        return ((cells[0].valuemask & mask) > 0);
    }

    // There is more than one cell - recursively test each possible value of the first cell
    const rec_cells = cells.slice(1);
    for (const digit of maskValues([cells[0].valuemask & mask])) {
        const rec_mask = mask & ~(1 << (digit -1));
        if (isPossible (rec_mask, rec_cells)) {
            return true;
        }
    }

    return false;
}

// These are not exported - so are not public
function maskValues (mask) {
    let rval = [];
    if (mask & 0x001) rval.push(1);
    if (mask & 0x002) rval.push(2);
    if (mask & 0x004) rval.push(3);
    if (mask & 0x008) rval.push(4);
    if (mask & 0x010) rval.push(5);
    if (mask & 0x020) rval.push(6);
    if (mask & 0x040) rval.push(7);
    if (mask & 0x080) rval.push(8);
    if (mask & 0x100) rval.push(9);
    return rval;
}

function nums2mask (digits) {
    let mask = 0;
    for (const d of digits) {
        let dv = parseInt(d);
        if (!isNaN(dv) && dv >=1 && dv <= 9)
            mask |= (1 << (dv - 1));
    }
    return mask;
}