////////////////////////////////////////////////////////////////////////////////
// 
// Kakuro model
//
// state is stored in this model and all modifications should be via the accesses
// 

const CLUE_COMBINATIONS = new Map([
    ['2.3',['12']],
    ['2.4',['13']],
    ['2.5',['14', '23']],
    ['2.6',['15', '24']],
    ['2.7',['16', '25', '34']],
    ['2.8',['17', '26', '35']],
    ['2.9',['18', '27', '36', '45']],
    ['2.10',['19', '28', '37', '46']],
    ['2.11',['29', '38', '47', '56']],
    ['2.12',['39', '48', '57']],
    ['2.13',['49', '58', '67']],
    ['2.14',['59', '68']],
    ['2.15',['69', '78']],
    ['2.16',['79']],
    ['2.17',['89']],
    ['3.6',['123']],
    ['3.7',['124']],
    ['3.8',['125', '134']],
    ['3.9',['126', '135', '234']],
    ['3.10',['127', '136', '145', '235']],
    ['3.11',['128', '137', '146', '236', '245']],
    ['3.12',['129', '138', '147', '156', '237', '246', '345']],
    ['3.13',['139', '148', '157', '238', '247', '256', '346']],
    ['3.14',['149', '158', '167', '239', '248', '257', '347', '356']],
    ['3.15',['159', '168', '249', '258', '267', '348', '357', '456']],
    ['3.16',['169', '178', '259', '268', '349', '358', '367', '457']],
    ['3.17',['179', '269', '278', '359', '368', '458', '467']],
    ['3.18',['189', '279', '369', '378', '459', '468', '567']],
    ['3.19',['289', '379', '469', '478', '568']],
    ['3.20',['389', '479', '569', '578']],
    ['3.21',['489', '579', '678']],
    ['3.22',['589', '679']],
    ['3.23',['689']],
    ['3.24',['789']],
    ['4.10',['1234']],
    ['4.11',['1235']],
    ['4.12',['1236', '1245']],
    ['4.13',['1237', '1246', '1345']],
    ['4.14',['1238', '1247', '1256', '1346', '2345']],
    ['4.15',['1239', '1248', '1257', '1347', '1356', '2346']],
    ['4.16',['1249', '1258', '1267', '1348', '1357', '1456', '2347', '2356']],
    ['4.17',['1259', '1268', '1349', '1358', '1367', '1457', '2348', '2357', '2456']],
    ['4.18',['1269', '1278', '1359', '1368', '1458', '1467', '2349', '2358', '2367', '2457', '3456']],
    ['4.19',['1279', '1369', '1378', '1459', '1468', '1567', '2359', '2368', '2458', '2467', '3457']],
    ['4.20',['1289', '1379', '1469', '1478', '1568', '2369', '2378', '2459', '2468', '2567', '3458', '3467']],
    ['4.21',['1389', '1479', '1569', '1578', '2379', '2469', '2478', '2568', '3459', '3468', '3567']],
    ['4.22',['1489', '1579', '1678', '2389', '2479', '2569', '2578', '3469', '3478', '3568', '4567']],
    ['4.23',['1589', '1679', '2489', '2579', '2678', '3479', '3569', '3578', '4568']],
    ['4.24',['1689', '2589', '2679', '3489', '3579', '3678', '4569', '4578']],
    ['4.25',['1789', '2689', '3589', '3679', '4579', '4678']],
    ['4.26',['2789', '3689', '4589', '4679', '5678']],
    ['4.27',['3789', '4689', '5679']],
    ['4.28',['4789', '5689']],
    ['4.29',['5789']],
    ['4.30',['6789']],
    ['5.15',['12345']],
    ['5.16',['12346']],
    ['5.17',['12347', '12356']],
    ['5.18',['12348', '12357', '12456']],
    ['5.19',['12349', '12358', '12367', '12457', '13456']],
    ['5.20',['12359', '12368', '12458', '12467', '13457', '23456']],
    ['5.21',['12369', '12378', '12459', '12468', '12567', '13458', '13467', '23457']],
    ['5.22',['12379', '12469', '12478', '12568', '13459', '13468', '13567', '23458', '23467']],
    ['5.23',['12389', '12479', '12569', '12578', '13469', '13478', '13568', '14567', '23459', '23468', '23567']],
    ['5.24',['12489', '12579', '12678', '13479', '13569', '13578', '14568', '23469', '23478', '23568', '24567']],
    ['5.25',['12589', '12679', '13489', '13579', '13678', '14569', '14578', '23479', '23569', '23578', '24568', '34567']],
    ['5.26',['12689', '13589', '13679', '14579', '14678', '23489', '23579', '23678', '24569', '24578', '34568']],
    ['5.27',['12789', '13689', '14589', '14679', '15678', '23589', '23679', '24579', '24678', '34569', '34578']],
    ['5.28',['13789', '14689', '15679', '23689', '24589', '24679', '25678', '34579', '34678']],
    ['5.29',['14789', '15689', '23789', '24689', '25679', '34589', '34679', '35678']],
    ['5.30',['15789', '24789', '25689', '34689', '35679', '45678']],
    ['5.31',['16789', '25789', '34789', '35689', '45679']],
    ['5.32',['26789', '35789', '45689']],
    ['5.33',['36789', '45789']],
    ['5.34',['46789']],
    ['5.35',['56789']],
    ['6.21',['123456']],
    ['6.22',['123457']],
    ['6.23',['123458', '123467']],
    ['6.24',['123459', '123468', '123567']],
    ['6.25',['123469', '123478', '123568', '124567']],
    ['6.26',['123479', '123569', '123578', '124568', '134567']],
    ['6.27',['123489', '123579', '123678', '124569', '124578', '134568', '234567']],
    ['6.28',['123589', '123679', '124579', '124678', '134569', '134578', '234568']],
    ['6.29',['123689', '124589', '124679', '125678', '134579', '134678', '234569', '234578']],
    ['6.30',['123789', '124689', '125679', '134589', '134679', '135678', '234579', '234678']],
    ['6.31',['124789', '125689', '134689', '135679', '145678', '234589', '234679', '235678']],
    ['6.32',['125789', '134789', '135689', '145679', '234689', '235679', '245678']],
    ['6.33',['126789', '135789', '145689', '234789', '235689', '245679', '345678']],
    ['6.34',['136789', '145789', '235789', '245689', '345679']],
    ['6.35',['146789', '236789', '245789', '345689']],
    ['6.36',['156789', '246789', '345789']],
    ['6.37',['256789', '346789']],
    ['6.38',['356789']],
    ['6.39',['456789']],
    ['7.28',['1234567']],
    ['7.29',['1234568']],
    ['7.30',['1234569', '1234578']],
    ['7.31',['1234579', '1234678']],
    ['7.32',['1234589', '1234679', '1235678']],
    ['7.33',['1234689', '1235679', '1245678']],
    ['7.34',['1234789', '1235689', '1245679', '1345678']],
    ['7.35',['1235789', '1245689', '1345679', '2345678']],
    ['7.36',['1236789', '1245789', '1345689', '2345679']],
    ['7.37',['1246789', '1345789', '2345689']],
    ['7.38',['1256789', '1346789', '2345789']],
    ['7.39',['1356789', '2346789']],
    ['7.40',['1456789', '2356789']],
    ['7.41',['2456789']],
    ['7.42',['3456789']],
    ['8.36',['12345678']],
    ['8.37',['12345679']],
    ['8.38',['12345689']],
    ['8.39',['12345789']],
    ['8.40',['12346789']],
    ['8.41',['12356789']],
    ['8.42',['12456789']],
    ['8.43',['13456789']],
    ['8.44',['23456789']],
    ['9.45',['123456789']],
]);
const CLUE_RE = /([A-Z]+)([1-9][0-9]*):([A-Z]+)([1-9][0-9]*)=([0-9]+)/;
const REF_RE = /([A-Z])(\d+)/;
const ALL_VALUES_MASK = 0x1ff;

export default class KakuroStore extends EventTarget {
    constructor (puzzlestring) {
        super();

        this.clues = [];
        this.grid = [];
        this.rows = 0;
        this.cols = 0;
    
        let rawclues = puzzlestring.split(/[,;]/);
        console.debug (`DEBUG: KakuroStore constructing from ${rawclues.length} clues`);

        // determine the grid dimensions
        this.rows = rawclues.reduce((maxrow, clue) => {
            let [,,R1,,R2,] = clue.match(CLUE_RE);
            return Math.max(maxrow, Math.max(R1, R2));
        }, 0);
        this.cols = rawclues.reduce((maxcol, clue) => {
            let [,C1,,C2,,] = clue.match(CLUE_RE);
            return Math.max(maxcol, Math.max(C1.charCodeAt(0), C2.charCodeAt(0)));
        }, 65) - 64;
        console.debug(`DEBUG: KakuroStore size = ${this.cols}x${this.rows}`);

        // build the base grid array
        for( var r = 0; r <= this.rows; r++) {
            let gridrow = [];
            for( var c = 0; c <= this.cols; c++) {
                gridrow.push ({ ref: KakuroStore.rc2ref(r, c), isSpace: false, clues: [] });
            }
            this.grid.push (gridrow);
        }

        // parse the clue strings into something easier to use
        // and fill the grid with content...
        for (const cluestr of rawclues) {
            let [r1, c1, r2, c2, val] = KakuroStore.clue2rc(cluestr);

            let thisclue = {
                name: cluestr,
                value: val,
                cells: [],   
            };

            // get the clue combinations - key is [length].[value] 
            const cluelength = Math.abs(r2 - r1) + Math.abs(c2 - c1) + 1;
            thisclue.combinations = CLUE_COMBINATIONS.get (`${cluelength}.${val}`).slice (0);
            
            // add the clue labels
            if (r1 == r2) {
                // Horizontal clue
                thisclue.isHorizontal = true;
                let labelCell = this.grid[r1][c1 - 1];
                if (labelCell.isSpace)
                    throw new Error('Invalid puzzle string - clue labels would overlap spaces @ '+ KakuroStore.rc2ref(r1, c1 - 1));
                if (labelCell.clues.find (cl => cl.isHorizontal) != undefined)
                    throw new Error('Inavlid puzzle string - multiple horizontal labels in one cell @ ' + KakuroStore.rc2ref(r1, c1 - 1));
                
                labelCell.clues.push(thisclue);
            } else {
                // Vertical clue
                thisclue.isHorizontal = false;
                let labelCell = this.grid[r1 - 1][c1];
                if (labelCell.isSpace)
                    throw new Error('Invalid puzzle string - clue labels would overlap spaces @ ' + KakuroStore.rc2ref(r1, c1 - 1));
                if (labelCell.clues.find (cl => !cl.isHorizontal) !== undefined)
                    throw new Error('Inavlid puzzle string - multiple vertical labels in one cell @ ' + KakuroStore.rc2ref(r1 - 1, c1));

                labelCell.clues.push(thisclue);
            }

            // add all of the cells to the clue
            for (let row = r1; row <= r2; row++) {
                for (let col = c1; col <= c2; col++) {
                    let cell = this.grid[row][col];
                    if (!cell.isSpace && cell.clues.length > 0)
                        throw new Error('Invalid puzzle string - clue labels would overlap spaces.');
                    cell.ref = KakuroStore.rc2ref (row, col);
                    cell.isSpace = true;
                    cell.clues.push (thisclue);
                    cell.valuemask = ALL_VALUES_MASK;
                    cell.value = undefined;
                    thisclue.cells.push (cell);
                }
            }        
            this.clues.push(thisclue);
        }

        this.resetAllValueMasks();
    }

    //
    // Utility functions to convert row/col numbers to A1 refs...
    //
    static rc2ref (row, col) {
        // return a string version of this ref - UP TO 64 COLS MAX!
        const rowval = parseInt(row);
        const colval = parseInt(col);
    
        if (isNaN(rowval) || isNaN(colval) || rowval < 0 || colval < 0 || colval > 64)
            return undefined;
    
        let ref = (colval === 0 ? '_' : String.fromCharCode(64 + colval)) + rowval.toString();
        return ref;
    }
    static ref2rc (ref) {
        // convert from A1 to a [row,col] array format - ONE LETTER ROW NAMES ONLY
        try {
            let result = REF_RE.exec(ref);
            let rowval = parseInt(result[2]);
            if (isNaN(rowval)) 
                throw new Error('row number is not valid ' + ref);
            if (result[1].charCodeAt(0) < 64 || result[1].charCodeAt(0) > 90)
                throw new Error('col letter is not valid ' + ref);
    
            let colval = result[1].charCodeAt(0) - 64;
    
            return [rowval, colval];
        }
        catch (err) {
            console.error('ref2rc error: ', err);
        }
        return [undefined, undefined];
    }
    static refrange2rc (refrange) {
        try {
            let [ref1, ref2] = refrange.split(':');
            if (ref1 === undefined || ref2 === undefined) {
                throw new Error('invalid range', refrange);
            }
    
            let [r1, c1] = KakuroStore.ref2rc(ref1);
            let [r2, c2] = KakuroStore.ref2rc(ref2);
    
            return [r1, c1, r2, c2];
        }
        catch (err) {
            console.error('refrange2rc error: ', err);
        }
        
        return [undefined, undefined, undefined, undefined];
    }
    static clue2rc (cluestring) {
        try {
            let [refrange, clueval] = cluestring.split('=');
            if (refrange === undefined || clueval === undefined) 
                throw new Error('invalid clue format ' + cluestring);
            
            let [r1, c1, r2, c2] = KakuroStore.refrange2rc(refrange);
            let val = parseInt(clueval);
    
            return [r1, c1, r2, c2, val];
        }
        catch (err) {
            console.error('refrange2rc error: ', err);
        }
        
        return [undefined, undefined, undefined, undefined];
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    //
    // Puzzle readers 
    //
    getUnfinishedCount () {
        // count the unfinished puzzle cells in the current grid
        let rval = 0;
        for (const row of this.grid) {
            for (const cell of row) {
                if (cell.isSpace && !cell.value) rval++;
            }
        }
        return rval;
    }
    getDataAt (row, col) {
        return this.grid[row][col];
    }
    getDataAtRef (ref) {
        const [row, col] = KakuroStore.ref2rc(ref);
        return this.getDataAt (row, col);
    }
    getValueAtRC (row, col) {
        return this.grid[row][col].value;
    }
    getValueAtRef (refstr) {
        let [row, col] = KakuroStore.ref2rc(refstr);
        return this.getValueAtRC(row, col);
    }
    isValidValueFor (val, row, col) {
        const valmask = 1 << (val - 1);
        return (this.grid[row][col].valuemask & valmask) > 0;
    }
    isValidValueForRef (val, ref) {
        const [row, col] = KakuroStore.ref2rc(ref);
        return this.isValidValueFor (val, row, col);
    }
    isClueAt (row, col) {
        const gridItem = this.grid[row][col];
        return !gridItem.isSpace && gridItem.clues.length > 0;
    }
    getAllSpaces () {
        let rval = [];
        for (const row of this.grid) {
            for (const cell of row) {
                if (cell.isSpace) rval.push(cell);
            }
        }
        return rval;
    }
    getAllUnfinished () {
        let rval = [];
        for (const row of this.grid) {
            for (const cell of row) {
                if (cell.isSpace && !cell.value) rval.push(cell);
            }
        }
        return rval;
    }
    getAllClues () {
        return this.clues;
    }
    getClue (name) {
        return this.clues.find(item => item.name == name);
    }


    ////////////////////////////////////////////////////////////////////////////////
    //
    // Puzzle updating functions
    // - manage changing the state of the puzzle after changing a digit
    //

    // recalcValueMask
    // - reset the mask to the combination of clue masks and related solved cells
    // - do not overwrite any manual working => do not add possible values unless "forced"
    recalcValueMask (cell, overwrite) {
        // if (!cell.hasAttribute('data-valuemask') || !cell.hasAttribute('data-clues')) {
        //     console.warn('resetCellMask with invalid cell ref: ', cell);
        //     return;
        // }
        const oldmask = cell.valuemask;
        if (overwrite === null || overwrite === undefined) {
            overwrite = false;
        }
        let newmask = ALL_VALUES_MASK;
        cell.clues.forEach (clue => {
            // build a mask for all currently solved cells in this clue
            let solvedmask = 0;
            clue.cells.forEach (cell => {
                let soln = parseInt(cell.value);
                if (!isNaN(soln) && soln > 0 && soln < 10) {
                    solvedmask |= (1 << (soln - 1));
                }
            });
            //console.debug('resetCellMask ' + cell.id + ': clue=' + clue.name + ' solved=' + maskToString(solvedmask));

            // reduce the mask by the clue masks
            let cluemask = 0;
            const combos = CLUE_COMBINATIONS.get(`${clue.cells.length}.${clue.value}`);
            for (const combo of combos) {
                // include this combo this combo can be met given the current solved cells ...
                const combomask = combosToMask([combo]);
                if ((combomask & solvedmask) == solvedmask) {
                    cluemask |= (combomask & ~solvedmask);
                }
            }

            //console.debug('\t: clue=' + clue.name + ' results in:' + maskToString(cluemask));
            newmask &= cluemask;
        });

        // ensure we don't add back any values we eliminated, unless we really want to
        if (!overwrite) newmask &= oldmask;

        if (oldmask !== newmask) {
            cell.valuemask = newmask;
            this.dispatchEvent (new CustomEvent('update-mask', { detail: { updated: [cell] }}));
        }
    }
    resetAllValueMasks () {
        for (const r of this.grid) {
            for (const c of r) {
                if (c.isSpace) this.recalcValueMask(c);
            }
        }
    }
    setValueAtRef (ref, value) {
        //console.debug('KakuroStore.setValueAtRef', ref, value);
        const [row, col] = KakuroStore.ref2rc(ref);
        if (row == undefined || col == undefined) {
            console.warn('KakuroStore.setValueAtRef with invalid ref ', ref);
            return;
        }
        this.setValueAt (row, col, value);
    }
    setValueAt (row, col, value) {
        //console.debug('KakuroStore.setValueAt: ', row, col, value);
        if (!row || !col || row < 0 || col < 0 || row > this.rows || col > this.cols) {
            console.warn('KakuroStore.setValueAt with invalid rc ', row, col);
            return;
        }

        // upate only if there was a change
        const cell = this.grid[row][col];
        const oldval = cell.value;
        let newval = parseInt(value);
        console.debug('KakuroStore.setValueAt: ', cell.ref, oldval, '=>', newval);

        if (isNaN(newval) || newval < 1 || newval > 9) newval = undefined;
        if (oldval != newval) {
            cell.value = newval;
            cell.valuemask = 1 << (newval -1);
            this.dispatchEvent (new CustomEvent('update', { detail: { updated: [cell] }}));
            //this.dispatchEvent (new CustomEvent('update-mask', { detail: { updated: [cell] }}));

            // cascade updates...
            this.recalcValueMask (cell);
            for (const clue of cell.clues) {
                for (const rcell of clue.cells) {
                    if (rcell !== cell) {
                        this.recalcValueMask (rcell);
                    }
                }
            }
        }
        
    }

    // Update the puzzle state by applying a solution step
    applyStep (step) {
        switch (step.type) {
        case 'SOLVE':
            for (const n in step.cells) {
                this.setValueAtRef (step.cells[n].ref, step.values[n]);
            }
            break;
        case 'REDUCE':
            for (const n in step.cells) {
                // assume mask updates are valid
                step.cells[n].valuemask = step.valueMasks[n];
            }
            this.dispatchEvent (new CustomEvent('update-mask', { detail: { updated: step.cells }}));
            break;
        default:
            console.warn('KakuroStore.applyStep - unknown step type ' + step.type);
        }
    }


    toString() {
        let str = `${this.rows} x ${this.cols} puzzle:\n`;
        for (const r of this.grid) {
            for (const c of r) {
                str += c.isSpace ? (c.value || '.') : '#';
            }
            str += '\n';
        }
        return str;
    }
}


function maskToString (maskval) {
    let rval = '';
    rval += (maskval & 1)?'1':'.'; 
    rval += (maskval & 2)?'2':'.'; 
    rval += (maskval & 4)?'3':'.'; 
    rval += (maskval & 8)?'4':'.'; 
    rval += (maskval & 16)?'5':'.'; 
    rval += (maskval & 32)?'6':'.'; 
    rval += (maskval & 64)?'7':'.'; 
    rval += (maskval & 128)?'8':'.'; 
    rval += (maskval & 256)?'9':'.'; 
    return rval;
}
function stringToMask (stringval) {
    let rval = 0;
    rval += (stringval.indexOf('1') >= 0)?1:0;
    rval += (stringval.indexOf('2') >= 0)?2:0;
    rval += (stringval.indexOf('3') >= 0)?4:0;
    rval += (stringval.indexOf('4') >= 0)?8:0;
    rval += (stringval.indexOf('5') >= 0)?16:0;
    rval += (stringval.indexOf('6') >= 0)?32:0;
    rval += (stringval.indexOf('7') >= 0)?64:0;
    rval += (stringval.indexOf('8') >= 0)?128:0;
    rval += (stringval.indexOf('9') >= 0)?256:0;
    return rval;
}
function combosToMask (combos) {
    let mask = 0;
    for (let combo of combos) {
        for (let digit of combo) {
            let d = parseInt(digit);
            let m = 1 << (d-1);
            mask |= m;
        }
    }
    return mask;
}
function combosToString (combos) {
    return maskToString (combosToMask (combos));
}




////////////////////////////////////////////////////////////////////////////////
//
// Puzzle updating functions
// - manage changing the state of the puzzle after changing a digit
//
// function findDataValueEl (element) {
//     // find the element with the data value (upstream if necessary)
//     var el = element;
//     while (el && !el.hasAttribute('data-value')) {
//         el = el.parentNode;
//     }
//     if (!el) {
//         console.debug('findDataValueEl for', element, 'found no data-value');
//         return null;
//     }    

//     return el;
// }


// function getCluesForCell (cell) {
//     if (!cell.hasAttribute('data-clues')) {
//         console.warn('getCluesForCell called with invalid cell ', cell);
//         return [];
//     }

//     // get the clues linked to this element...
//     const clueids = cell.getAttribute('data-clues');
//     const rval = clues.filter(clue => clueids.indexOf(clue.name) >= 0);

//     return rval;
// }

// function findRelatedCells (element) {
//     if (element === null || element === undefined || !element.hasAttribute('data-clues')) {
//         console.debug('findRelatedCells... element is not valid ', element);
//         return [];
//     }

//     // run through all cells in related clues (except myself)
//     let relatedcells = [];
//     for (const clue of getCluesForCell(element)) {
//         for (const cell of clue.cells) {
//             if (cell !== element)   relatedcells.push(cell);
//         }
//     }

//     return relatedcells;
// }



// function addToCellMask (cell, value) {
//     if (!cell.hasAttribute('data-valuemask') || !cell.hasAttribute('data-clues')) {
//         console.warn('resetCellMask with invalid cell ref: ', cell);
//         return;
//     }
//     resetCellMask(cell);

//     // for now - save the old mask, then see if the value would be allowed.
//     // if it is, then merge the old mask with the new value (not the recalc'd)
//     // let savedmask = cell.getAttribute('data-valuemask');
//     // resetCellMask(cell);
//     // let newmask = cell.getAttribute('data-valuemask');
//     // let valuemask = (1 << (value - 1));
//     // if ((newmask & valuemask) == valuemask) {
//     //     // the value can be added.
//     //     savedmask |= valuemask;
//     //     cell.setAttribute('data-valuemask', savedmask);
//     //     showHintDigits(cell);
//     // }

// }
// function delFromCellMask (cell, value) {
//     if (!cell.hasAttribute('data-valuemask') || isNaN(parseInt(value))) {
//         console.warn('delFromCellMask with invalid cell ref or value: ', cell, value);
//         return;
//     }
//     resetCellMask(cell);

//     // let cellmask = cell.getAttribute ('data-valuemask');
//     // let valuemask = (1 << (parseInt(value) - 1));
//     // cellmask &= ~valuemask;
//     // cell.setAttribute ('data-valuemask', cellmask);
//     // showHintDigits(cell);
// }


