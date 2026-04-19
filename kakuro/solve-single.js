
export default class SolveSingle {
    static name () { return 'Solve: single values'; }

    static solve (puzzle) { 
        for (const cell of puzzle.getAllUnfinished()) {
            let cellMask = cell.valuemask;
            let value = 0;
            if (cellMask === 0x001) value = 1;
            if (cellMask === 0x002) value = 2;
            if (cellMask === 0x004) value = 3;
            if (cellMask === 0x008) value = 4;
            if (cellMask === 0x010) value = 5;
            if (cellMask === 0x020) value = 6;
            if (cellMask === 0x040) value = 7;
            if (cellMask === 0x080) value = 8;
            if (cellMask === 0x100) value = 9;
            if (value > 0) {
                console.debug('\tsolution step found - ' + cell.ref + '=' + value);

                let solveStep = {
                    type: 'SOLVE',
                    cells: [cell],
                    values: [value],
                    title: `${value} is the only possible value for cell ${cell.ref}`,
                    description: `${value} is the only possible value for cell ${cell.ref}`,
                    constraints: cell.clues,
                    shouldWaitForUser: true,
                };

                return solveStep;
            }
             
        }

        return null;
    }
}
