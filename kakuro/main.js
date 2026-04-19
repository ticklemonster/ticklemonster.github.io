'use strict';

import KakuroStore from './kakuro-store.js';
// import KakuroEditView from './kakuro-edit-view';
import KakuroPlayView from './kakuro-view.js';
import SolveSingle from './solve-single.js';
import ReduceValidCombos from './reduce-validcombos.js';

// const puzzlestring = "B1:B5=21;C1:C2=5;D1:D5=34;B1:D1=7;A2:A4=9;E2:E4=8;A2:E2=16;A3:B3=6;D3:E3=8;A4:E4=34;C4:C5=16;B5:D5=22";
// const puzzlestring = "A1:A2=6;B1:B5=33;C1:C3=11;E1:E2=12;F1:F5=16;A1:C1=22;E1:F1=13;A2:C2=10;E2:G2=8;G2:G5=21;B3:D3=13;D3:D5=22;F3:G3=15;A4:A5=7;E4:E5=13;A4:B4=9;D4:G4=12;A5:B5=12;D5:G5=27";
// const puzzlestring = "C1:C2=3;D1:D3=6;G1:G3=6;H1:H2=4;A2:A4=6;B2:B4=8;C1:D1=4;G1:H1=3;A2:D2=10;E3:E4=4;F3:F5=7;G2:H2=4;A3:B3=4;C4:C6=7;D3:G3=10;A4:C4=7;D5:D6=4;E4:F4=4;G5:G7=7;H5:H7=8;B6:B8=6;C5:D5=4;E6:E8=22;F5:H5=7;A7:A8=4;B6:E6=11;F7:F8=16;G6:H6=4;A7:B7=3;E7:H7=23;A8:B8=4;E8:F8=16";
// const puzzlestring = "A1:A2=9;B1:B3=24;C1:C4=14;F1:F2=8;G1:G3=12;H1:H5=31;A1:C1=11;E2:E8=41;F1:H1=24;I2:I5=12;A2:C2=24;D3:D5=24;E2:I2=23;B3:E3=28;G3:I3=9;A5:A8=30;B5:B9=18;C4:E4=11;F5:F7=23;H4:I4=12;A5:B5=13;D5:F5=22;G6:G9=30;H5:I5=4;A6:B6=7;C7:C9=7;E6:G6=22;H7:H9=23;A7:C7=12;D8:D9=12;E7:H7=30;I8:I9=6;A8:E8=20;G8:I8=17;B9:D9=19;G9:I9=16";
// const puzzlestring = "B1:B9=45;C1:C2=8;E1:E4=13;F1:F2=7;G1:G2=5;H1:H9=45;A2:A4=13;B1:C1=12;E1:H1=17;I2:I4=9;A2:C2=7;D3:D5=14;E2:I2=19;A3:B3=12;D3:E3=3;G4:G5=6;H3:I3=12;A4:B4=7;C5:C6=8;D4:E4=10;F5:F7=21;G4:I4=7;A6:A8=24;B5:D5=9;E6:E9=28;F5:H5=9;I6:I8=19;A6:C6=23;E6:F6=16;H6:I6=5;A7:B7=10;C8:C9=7;D8:D9=14;E7:F7=15;G8:G9=15;H7:I7=14;A8:E8=35;G8:I8=21;B9:E9=22;G9:H9=16";
const DEFAULT_PUZZLE =  'B1:B6=37;C1:C2=5;D1:D3=17;E1:E4=12;H1:H2=16;I1:I2=10;A2:A5=27;G2:G6=32;F3:F5=23;C4:C8=31;H4:H9=30;D5:D7=8;I5:I8=29;E6:E9=10;F7:F9=22;A8:A9=8;B8:B9=15;G8:G9=17;B1:E1=22;H1:I1=11;A2:E2=16;G2:I2=23;A3:B3=16;D3:G3=12;A4:C4=23;E4:H4=27;A5:D5=29;F5:I5=29;B6:E6=12;G6:I6=24;C7:F7=13;H7:I7=12;A8:C8=23;E8:I8=24;A9:B9=8;E9:H9=25';

const Solve_Steps = [
    SolveSingle, ReduceValidCombos,
];

function onLoadPuzzlePressed() {
    let puzzlestring = document.getElementById('puzzleInput').value;
    if (puzzlestring > '') {
        loadPuzzle(puzzlestring);
    }
}

function loadPuzzle (puzzlestring) {
    let puzzleelement = document.getElementById('puzzleTable');
    let puzzlecontrols = document.getElementById('puzzleControls');

    try {
        // laod the puzzle
        puzzle = new KakuroStore (puzzlestring);
        view = new KakuroPlayView (puzzle);

        puzzleelement.innerHTML = '';
        puzzlecontrols.innerHTML = '';
        view.renderHtml (puzzleelement);
        view.renderControls (puzzlecontrols);

        // bind buttons
        document.getElementById('nextStepButton').addEventListener ('click', nextStep);
        document.getElementById('stepDescription').addEventListener ('blur', applyPendingStep);

    } catch (err) {
        alert('Error in the loaded Kakuro!');
        puzzleelement.innerHTML = '<h2>Invalid puzzle</h2><p>' + err + '</p>';
    }
}

function applyPendingStep() {
    if (pendingStep !== null) {
        console.log('Applying pending ' + pendingStep.type + ' step...');
        puzzle.applyStep(pendingStep);
        view.removeAllHighlights();
        pendingStep = null;
    }
}

function nextStep() {
    if (!puzzle || !view) return;

    applyPendingStep();
    
    if (puzzle.getUnfinishedCount() == 0) {
        document.getElementById('stepDescription').value = 'Finished!';
        return;
    }
    
    document.getElementById('nextStepButton').disabled = true;
    //view.setShowValueHints(true);

    console.debug('\nNEXT STEP\n------------------------------------------------------------\n');
    let didSomething = true;
    while (didSomething && !pendingStep) {
        didSomething = false;

        for (let step of Solve_Steps) {
            console.debug('STEP ' + step.name() + '...');
            const stepresult = step.solve(puzzle);
            if (stepresult) {
                //console.debug('\tSUCCESS', stepresult.title);
                didSomething = true;   // won't be done until the user accepts it

                let waitForUser = view.showStep (stepresult);
                if (waitForUser) {
                    document.getElementById('stepDescription').value = stepresult.description;   
                    document.getElementById('stepDescription').focus();
                    pendingStep = stepresult;
                } else {
                    puzzle.applyStep (stepresult);
                    pendingStep = null;
                }
                break;
            }
        }   

        if (!didSomething && !pendingStep) {
            // NO MORE SOLVING IDEAS!
            console.debug('NO STEPS REMAIN.');
            document.getElementById('stepDescription').value = 'No more ideas. Sorry';
        }
    }

    //console.debug (puzzle.getUnfinishedCount() + ' cells remaining');
    document.getElementById('nextStepButton').disabled = false;
}

//
// MAIN  
//
let puzzle = null;
let view = null;
let pendingStep = null;


console.info('-- KAKURO.JS --');

let puzzlestring = window.sessionStorage.getItem('@kakuro/clues') || DEFAULT_PUZZLE;
loadPuzzle (puzzlestring);

document.getElementById('loadPuzzleBtn').addEventListener ('click', onLoadPuzzlePressed);



