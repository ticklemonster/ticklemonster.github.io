'use strict';

const combinations = new Map([
    ['1.1',['1']],
    ['1.2',['2']],
    ['1.3',['3']],
    ['1.4',['4']],
    ['1.5',['5']],
    ['1.6',['6']],
    ['1.7',['7']],
    ['1.8',['8']],
    ['1.9',['9']],
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

const VALID_SUMS = [
    [0, 0],
    [1, 9],
    [3, 17],
    [6, 24],
    [10, 30],
    [15, 35],
    [21, 39],
    [28, 42],
    [36, 44],
    [45, 45],
];


//
// Helper functions
//
const CLUE_REGEXP = /^([A-Z])(\d+):([A-z])(\d+)=(\d+)$/;
const RANGE_REGEXP = /([A-Z])(\d+):([A-Z])(\d+)/;
const REF_REGEXP = /([A-Z])(\d+)/;

function rc2ref (row, col) {
    // return a string version of this ref - UP TO 64 COLS MAX!
    const rowval = parseInt(row);
    const colval = parseInt(col);

    if (isNaN(rowval) || isNaN(colval) || rowval < 0 || colval < 0 || colval > 64)
        return undefined;

    let ref = (colval === 0 ? '_' : String.fromCharCode(64 + colval)) + rowval.toString();
    return ref;
}

function ref2rc (ref) {
    // convert from A1 to a [row,col] array format - ONE LETTER ROW NAMES ONLY
    try {
        let result = REF_REGEXP.exec(ref);
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

function refrange2rc (refrange) {
    try {
        let [ref1, ref2] = refrange.split(':');
        if (ref1 === undefined || ref2 === undefined) {
            throw new Error('invalid range', refrange);
        }

        let [r1, c1] = ref2rc(ref1);
        let [r2, c2] = ref2rc(ref2);

        return [r1, c1, r2, c2];
    }
    catch (err) {
        console.error('refrange2rc error: ', err);
    }
    
    return [undefined, undefined, undefined, undefined];
}

function clue2rc (cluestring) {
    try {
        let [refrange, clueval] = cluestring.split('=');
        if (refrange === undefined || clueval === undefined) 
            throw new Error('invalid clue format ' + cluestring);
        
        let [r1, c1, r2, c2] = refrange2rc(refrange);
        let val = parseInt(clueval);

        return [r1, c1, r2, c2, val];
    }
    catch (err) {
        console.error('refrange2rc error: ', err);
    }
    
    return [undefined, undefined, undefined, undefined];
}

function isValidClue (cluestr) {
    return CLUE_REGEXP.test(cluestr);
}

//
// UI Interactions
//
function clearPuzzle () {
    console.debug('clearPuzzle');
    puzzle.clues = [];
    drawPuzzle();
}

function resetPuzzle () {
    document.getElementById('inputRows').value = 9;
    document.getElementById('inputCols').value = 9;
    puzzle = { rows: 0, cols: 0, clues: [] };
    resizePuzzle (9,9);
}

function playPuzzle () {
    window.sessionStorage.setItem('@kakuro/clues', puzzle.clues.join(','));
    window.location = './kakuro.html';
}

function parseClues () {
    console.debug('load clues');
    const cluetxt = document.getElementById('cluestxt').value;

    var rawclues = cluetxt.split(',');
    console.debug('\traw clues: ' + rawclues.length);

    var validclues = rawclues.filter(clue => isValidClue(clue));
    console.debug('\tvalid clues: ' + validclues.length);

    if (validclues.length > 0) {
        puzzle.clues = validclues;

        // Determine puzzle bounds from clues
        puzzle.rows = validclues.reduce((a,clue) => {
            const [ , , r2, , ] = clue2rc(clue);
            return Math.max(r2, a);
        }, 1);
        puzzle.cols = validclues.reduce((a,clue) => {
            const [ , , r2, c2, ] = clue2rc(clue);
            return Math.max(c2, a);
        }, 1);

        document.getElementById('inputRows').value = puzzle.rows;
        document.getElementById('inputCols').value = puzzle.cols;

        drawPuzzle();
    }
}
function changeRows (rowsInput) {
    const r = parseInt(rowsInput.value);
    if (r === undefined || r < 0 ) {
        console.warn('changeRows: out of range!');
        rowsInput.value = puzzle.rows;
        return;
    }

    resizePuzzle (r, puzzle.cols);
}

function changeCols (colsInput) {
    const c = parseInt(colsInput.value);
    if (c === undefined || c < 0 ) {
        console.warn('changeCols: out of range!');
        colsInput.value = puzzle.rows;
        return;
    }

    resizePuzzle (puzzle.rows, c);
}

function resizePuzzle (rows, cols) {
    if (rows === undefined ) rows = puzzle.rows;
    if (cols === undefined ) cols = puzzle.cols;
    if (puzzle.rows === rows && puzzle.cols === cols) return;

    // change should be accepted
    puzzle.rows = rows;
    puzzle.cols = cols;

    // filter out any clues that are no longer in range...
    puzzle.clues = puzzle.clues.filter( clue => {
        const [ , , r2, c2, ] = clue2rc(clue);
        return (r2 <= rows & c2 <= cols);
    });

    drawPuzzle();
}

// function selectCell (cell) {
//     cell.classList.toggle('selected');
// }

function onDragStart (e) {
    console.debug('onDragStart: ' + e.target.id);
    puzzle.selectStartId = e.target.id;
    puzzle.selectEndId = e.target.id;
    updatePuzzleSelection();
}
function onDragEnter (e) {
    console.debug('onDragEnter: ' + e.target.id);
    puzzle.selectEndId = e.target.id;
    updatePuzzleSelection();
}
function onDragEnd () {
    enableClueEntry();
}

function onClueEntryKeyDown(e) {
    //console.debug('- KEY: ' + e.key + ' ' + e.keyCode)

    if (e.keyCode >= 48 && e.keyCode <= 58) {
        // a number 

    } else if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 ||
        e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 ) {
        // backspace or delete and arrow keys

    } else if (e.keyCode == 13) {
        // accept the change
        e.target.blur();
    } else if (e.keyCode == 27) { 
        // ESC - back out the change
        e.target.blur();
    } else {
        e.preventDefault();
    }
}


//
// UI Feedback / Updates
//
function updatePuzzleSelection () {
    // then make a best-case straight-line selection
    var [r1, c1] = ref2rc(puzzle.selectStartId);
    var [r2, c2] = ref2rc(puzzle.selectEndId);
    if (r1 != r2 && c1 != c2) {
        if (Math.abs(c2-c1) < Math.abs(r1-r2)) {
            c2 = c1;
        } else {
            r2 = r1;
        }
        puzzle.selectEndId = rc2ref(r2, c2);
    }

    console.debug('selection: ' + puzzle.selectStartId + ':' + puzzle.selectEndId);
    console.debug('\t', r1, c1, r2, c2);

    // run through every cell and only highglight those in range...
    if (r2 < r1) [r1, r2] = [r2, r1];
    if (c2 < c1) [c1, c2] = [c2, c1];
    for (var r = 0; r <= puzzle.rows; r++) {
        for (var c = 0; c <= puzzle.cols; c++) {
            const el = document.getElementById(rc2ref(r,c));
            if (r >= r1 && r <= r2 && c >= c1 && c <= c2) {
                el.classList.add('selected');
            } else {
                el.classList.remove('selected');
            }
        }
    }

}

function enableClueEntry () {
    if (puzzle.selectStartId && puzzle.selectEndId && puzzle.selectStartId != puzzle.selectEndId) {
        // there looks to be at least two selections...
        const [r1, c1] = ref2rc(puzzle.selectStartId);
        const [r2, c2] = ref2rc(puzzle.selectEndId);
        var r0 = (r1 == r2 ? r1 : Math.min(r1, r2) - 1);
        var c0 = (c1 == c2 ? c1 : Math.min(c1, c2) - 1);

        // mark the clue metric:
        puzzle.clueEntry = rc2ref(r0, c0);
        puzzle.clueRange = rc2ref (Math.min(r1,r2), Math.min(c1,c2)) + ':' +
            rc2ref (Math.max(r1,r2), Math.max(c1,c2));
        puzzle.clueLength = Math.abs(r1 - r2) + Math.abs(c1 -c2) + 1;

        // which cell should hold this clue?
        console.debug('adding clue entry to: ' + puzzle.clueEntry);
        const el = document.getElementById(puzzle.clueEntry);
        el.classList.add (r1 == r2 ? 'clueEntryHoriz' : 'clueEntryVert');

        // is there an existing clue that we should be editing?
        let en = null;
        for (var c of el.children) {
            console.debug('Clue child: ', c, ' ? ', puzzle.clueRange);
            if (c.id.startsWith('clue@' + rc2ref(r1, c1))) {
                en = c;
                break;
            }
        }
        console.debug('enbleClueEntry - existing child? ', en);

        // create a temporary input element if we're not updating one
        if (en === null) {
            en = document.createElement('div');
            en.id = 'clue@' + puzzle.clueRange;
            en.classList.add (r1 == r2 ? 'clueRight' : 'clueDown');
            el.appendChild( en );
        }
        
        // setup the input for editing...
        en.contentEditable = true;
        en.addEventListener( 'keydown', onClueEntryKeyDown );
        en.addEventListener( 'blur', endClueEntry );
        en.focus();
    }
    else
    {
        console.debug('Not enough cells selected!');
    }

}

function endClueEntry (event) {
    const clueent = event.target;
    const clueval = parseInt(clueent.innerText);

    if (clueent && !isNaN(clueval)) {
        // if there is a valid clue entry then add it to the clues array
        const clueentry = puzzle.clueRange + '=' + clueval;
        const cleanclues = puzzle.clues.filter(clue => !cluesOverlap(clueentry, clue));
        cleanclues.push (clueentry);
        puzzle.clues = cleanclues;
    }

    // Don't try to fix highlights or child cells here, just redraw everything
    drawPuzzle();
}

function cluesOverlap (clue1, clue2) {
    try {
        const [r1, c1, r2, c2, ] = clue2rc(clue1);
        const [cr1, cc1, cr2, cc2, ] = clue2rc(clue2);
        
        // run through all the cells in clue1 and count how many are also in clue2
        let overlaps = 0;
        for (let r = r1; r <= r2; r++) {
            for (let c = c1; c <= c2; c++) {
                if (r >= cr1 && r <= cr2 && c >= cc1 && c <= cc2) overlaps++;
            }
        }

        return overlaps > 1;
    }
    catch (err) {
        console.error('cluesOverlap error: ', err);
    }
    return false;
}
//
// UI Builders
//
function cell2Html(cell, colnum, rownum, rowlen) {
    var attrs = [
        'id="' + rc2ref(rownum, colnum) + '"',
        'class="' + cell.className + '"',
    ];

    if (colnum != 0 && rownum != 0) {
        attrs.push(
            'taborder=' + (rownum * rowlen + colnum),
            'draggable="true"',
            'onDragStart="onDragStart(event)"',
            'onDragEnter="onDragEnter(event)"',
            'onDragEnd="onDragEnd(event)"'
        );
    }

    const htmlval = '<td ' + attrs.join(' ') + ' >' + cell.clues.join(' ') + '</td>';
    
    return htmlval;
}


function buildPuzzleHtml (puzzle) {
    // expects a puzzle object...
    if (puzzle === null || puzzle === undefined ||
        puzzle.rows === undefined || puzzle.cols === undefined)
    {
        return '<div class="error">Not a valid puzzle</div>';
    }

    // build a default array of cells...
    var tbl = [];
    for (var r = 0; r <= puzzle.rows; r++) {
        var tblrow = [];
        for (var c = 0; c <= puzzle.cols; c++) {
            tblrow.push({ className: 'puzzleClue', clues: [], cluerefs: 0 });
        }
        tbl.push (tblrow);
    }

    // process clues to update cells
    for (const clue of puzzle.clues) {
        // process clue
        const [r1, c1, r2, c2, val] = clue2rc(clue);
        const clueid = 'clue@' + rc2ref(r1, c1) + ':' + rc2ref(r2, c2);

        console.debug('\tClue ' + clue + ': ', clue, ' : ', r1, c1, r2, c2, val);

        for (var tr = r1; tr <= r2; tr++) {
            for (var tc = c1; tc <= c2; tc++) {
                tbl[tr][tc].cluerefs += 1;
                tbl[tr][tc].className = 'puzzleSpace' + (tbl[tr][tc].cluerefs == 2 ? '':' invalid');
            }
        }
        if (r1 == r2) {
            tbl[r1][c1-1].clues.push('<div id="' + clueid + '" class="clueRight">' + val + '</div>');
        }
        if (c1 == c2) {
            tbl[r1-1][c1].clues.push('<div id="' + clueid + '" class="clueDown">' + val + '</div>');
        }
        
    }

    // map the array back to html
    var htmlval = '<tbody>';
    for (r in tbl) {
        htmlval += '<tr>';
        for (c in tbl[r]) {
            htmlval += cell2Html(tbl[r][c], c, r, r.length);
        }
        htmlval += '</tr>';
    }
    htmlval += '</tbody>';


    return htmlval;
}

function drawPuzzle () {
    const el = document.getElementById('puzzleTable');

    if (puzzle.rows <= 0 || puzzle.cols <= 0) {
        el.innerHTML = '<i>Puzzle is empty</i>';
    }
    else
    {
        el.innerHTML = buildPuzzleHtml (puzzle);
    }

    document.getElementById('cluestxt').value = puzzle.clues.join(',');
}



//
// MAIN  
//
var puzzle = {
    rows: 0,
    cols: 0,
    clues: [],
};

resizePuzzle (document.getElementById('inputCols').value, document.getElementById('inputRows').value);


/*
parseKakuro(puzzlestring);
if (document.getElementsByClassName('unknown').length > 0) {
    alert('Error in the loaded Kakuro!');
    exit;
}
*/
//nextStep();


