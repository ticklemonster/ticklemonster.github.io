// STEP (reduce pairs)
// - Try to eliminate options for a sum with only two remaining cells by testing them for validity
export default class ReducePairs {
    static name () { return 'Reduce Pairs'; }
    
    static solve (puzzle) {
        console.debug('ReducePairs.solve');

        for (const clue of puzzle.getAllClues()) {
            let remainder = clue.value;
            let unsolved = [];
            for (const cell of clue.cells) {
                if (cell.value === undefined) {
                    unsolved.push(cell);
                } else {
                    remainder -= parseInt(cell.value);
                }
            }

            // TODO: make a length-generic version of this approach
            if (unsolved.length == 2) {
                let masks = unsolved.map( cell => cell.valuemask );
    
                // test each possible value for each cell
                for (let pval = Math.max(remainder - 9, 1); pval <= Math.min(remainder - 1, 9); pval++) {
                    let pmask = 1 << (pval - 1);
                    let rmask = 1 << (remainder - pval - 1);
                    let valid = (masks[0] & pmask) > 0 && (masks[1] & rmask) > 0;
                    if (!valid) {
                        // remove these options from the masks...
                        masks[0] &= ~pmask;
                        masks[1] &= ~rmask;
                    }
                }
    
                // apply the reduction as a step...
                let solveStep = { 
                    type: 'REDUCE',
                    cells: [], 
                    valueMasks: [],
                    constraints: [ clue ],
                };
                for (const i in unsolved) {
                    //console.debug(`\t- Reduced masks: ${unsolved[i].ref} : ${unsolved[i].valuemask} => ${masks[i]}`);
                    if (unsolved[i].valuemask !== masks[i]) {
                        solveStep.cells.push(unsolved[i]);
                        solveStep.valueMasks.push(masks[i]);
                    }
                }

                if (solveStep.cells.length > 0) {
                    // we have reduced so fill in the rest of the reduction step
                    solveStep.title = 'Eliminated possibilities where ' + unsolved.length + ' cells = ' + remainder;
                    solveStep.description = `Eliminate values from ${unsolved.map(cell => cell.ref).join(', ')} that cannot make ${clue.name}`;

                    return solveStep;        
                }                                                                               
            }
        }
    
        return null;
    }
}
