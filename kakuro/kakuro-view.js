import KakuroStore from './kakuro-store.js';

export default class KakuroView {
    constructor (puzzle) {
        if (!(puzzle instanceof KakuroStore)) {
            throw new Error('KakuroView constructor must supply a KakuroStore object');
        }
        this.puzzle = puzzle;
        this.renderEl = null;
        this.showClueHints = false;
        this.showValueHints = false;
        this.shouldWaitForUser = false;
       
        // subscribe to puzzle updates, if we can...
        this.puzzle.addEventListener('update', (e) => this.onStoreUpdate(e));
        this.puzzle.addEventListener('update-mask', (e) => this.onStoreUpdateMask(e));

        // bind the event handlers
        this.showCombinationsHover = this.showCombinationsHover.bind(this);
        this.hideCombinationsHover = this.hideCombinationsHover.bind(this);
        this.handleCellChange = this.handleCellChange.bind(this);

        console.debug(`Create new KakuroView with ${puzzle.rows}x${puzzle.cols} puzzle`);
    }

    // 
    // Rendering functions
    //
    // renderHtml will draw the FULL HTML to the supplied element
    //
    renderHtml (htmlelement) {
        if (!(htmlelement instanceof HTMLElement)) {
            throw new Error('KakuroView constructor must supply a HTMLElement object');
        }
        this.renderEl = htmlelement;

        // build the base table...
        let puzzleTable = document.createElement('table');
        puzzleTable.className = 'fixedTable';
        puzzleTable.cellPadding = 0;
        puzzleTable.cellSpacing = 0;

        // build the tablecontent...
        let taborder = 1;
        for (const r in this.puzzle.grid) {
            let trow = puzzleTable.insertRow();
            for (const c in this.puzzle.grid[r]) {
                let cell = trow.insertCell();
                let data = this.puzzle.grid[r][c];
                
                cell.id = data.ref;
                if (data.isSpace) {
                    cell.className = 'puzzleSpace';
            
                    // need a container div to hold the two content parts
                    let cellContent = cell.appendChild (document.createElement('div'));
                    cellContent.className = 'puzzleCellContainer';
                        
                    // append a hint table elements to this item...
                    let hinttable = cellContent.appendChild( document.createElement('table') );
                    hinttable.className = 'puzzleCellHintsTable';
                    hinttable.cellPadding = 0; 
                    hinttable.cellSpacing = 0;
                    for (let hr = 0; hr < 3; hr++) {
                        let hintrow = hinttable.insertRow();
                        for (let hc = 1; hc <= 3; hc++) {
                            let val = hr*3 + hc;
                            let hint = hintrow.insertCell();
                            hint.id = `${cell.id}--${val}`;
                            hint.className = 'hintDigit';
                            hint.innerText = val;
                            hint.contentEditable = false;
                            hint.disabled = true;
                        }
                    }
            
                    // add a value display/edit node      
                    let inputNode = cellContent.appendChild( document.createElement('input') );
                    inputNode.className = 'puzzleInput';
                    inputNode.setAttribute('maxlength', '9');
                    inputNode.setAttribute ('taborder', taborder++);
                    inputNode.addEventListener('keydown', this.filterKeyPresses);
                    inputNode.addEventListener('input', this.handleInput);
                    inputNode.addEventListener('change', (event) => this.handleCellChange(event, data.ref));
                } else {
                    // add the clue to the grid
                    cell.className = 'puzzleClue';
                    
                    for (const c in data.clues) {
                        let clueDiv = cell.appendChild (document.createElement('div'));
                        clueDiv.appendChild (document.createTextNode (data.clues[c].value));
                        clueDiv.setAttribute ('data-cluename', data.clues[c].name);
                        clueDiv.addEventListener ('mouseover', this.showCombinationsHover);
                        clueDiv.addEventListener ('mouseout', this.hideCombinationsHover);
                        clueDiv.className = data.clues[c].isHorizontal ? 'clueRight' : 'clueDown';
                    }
                }
            }
        }

        htmlelement.innerHTML = ''; // Is there a better way to do this?
        htmlelement.appendChild (puzzleTable);
    }
    renderControls (element) {
        let label = element.appendChild( document.createElement('b') );
        label.textContent = 'Hints: ';

        let cluespan = element.appendChild (document.createElement('span'));
        let showCluesBtn = cluespan.appendChild (document.createElement('input'));
        showCluesBtn.type = 'checkbox';
        showCluesBtn.addEventListener ('click', (event) => { 
            this.showClueHints = event.target.checked; 
        });
        cluespan.appendChild (document.createTextNode('Clues'));

        let valuespan = element.appendChild (document.createElement('span'));
        let showValuesBtn = valuespan.appendChild (document.createElement('input'));
        showValuesBtn.type = 'checkbox';
        showValuesBtn.addEventListener ('click', (event) => { 
            this.showValueHints = event.target.checked; 
            this.showAllHints ();
        });
        valuespan.appendChild (document.createTextNode('Values'));
    }

    showAllHints (show) {
        if (!this.renderEl) return;

        for (const cell of this.renderEl.getElementsByClassName('puzzleSpace')) {
            this.showHintDigits (cell, show);
        }
    }
    showHintDigits (cell, show) {
        if (show === undefined || show === null) {
            show = this.showValueHints;
        }
    
        let data = this.puzzle.getDataAtRef(cell.id);
        for (const digit of cell.getElementsByClassName('hintDigit')) {
            const digitval = parseInt(digit.id[digit.id.length - 1]);
            const isValid = this.puzzle.isValidValueForRef(digitval, cell.id);
            const isSolved = (data.value !== undefined);
            let showdigit = show && !isSolved && isValid;
            digit.style.visibility = showdigit ? 'visible' : 'hidden';
        }
    }
    highlightHintDiff (cell, oldmask, newmask) {
        // console.debug('highlightHintDiff', cell, 
        //     oldmask.toString(2).padStart(9,'0'), 
        //     newmask.toString(2).padStart(9,'0'));
        if (cell === undefined || cell === null) return;

        // this will ALWAYS force showing the hint digits
        for (let n = 1; n <= 9; n++) {
            const digitMask = 1 << (n - 1);
            const digitElem = cell.querySelector(`#${cell.id}--${n}`);
            //console.debug('\tDigit: ', digitElem);
            digitElem.style.visibility = (digitMask & oldmask) || (digitMask & newmask) ? 'visible' : 'hidden';
            if ((digitMask & oldmask) && !(digitMask & newmask)) {
                digitElem.classList.add('removed');
            }
            if ((digitMask & newmask) && !(digitMask & oldmask)) {
                digitElem.classList.add('added');
            }
        }        
    }
    
    showStep (solveStep) {
        if (!this.renderEl) {
            console.warn('KakuroView.showStep with invalid render element', this.renderEl);
            return;
        }

        // highlight cells from matching rules...
        for (const i in solveStep.cells) {
            const element = this.renderEl.querySelector (`#${solveStep.cells[i].ref}`);

            if (solveStep.type === 'SOLVE') {
                console.debug('KakuroView.showStep   SOLVE ', solveStep.cells[i].ref + ' = ' + solveStep.values[i]);
                element.classList.add('solveStep');
                this.showHintDigits (element, false);
    
                const inputel = element.querySelector('input');
                inputel.value = solveStep.values[i];
                this.shouldWaitForUser = true;
            } 
            else if (solveStep.type === 'REDUCE') {
                console.debug('KakuroView.showStep  REDUCE ', solveStep.cells[i].ref + ' = ' + solveStep.valueMasks[i].toString(2).padStart(9,'0'));
                // highlight the values that will be removed from the possible set
                if (this.showValueHints) {
                    this.highlightHintDiff (element, solveStep.cells[i].valuemask, solveStep.valueMasks[i]);
                }
                this.shouldWaitForUser = this.showValueHints;
            } else {
                console.warn('KakuroView.showStep - Unknown step type: ' + solveStep.type);
            }
        }

        // highlight cells in the constraints...
        for (let clue of solveStep.constraints) {
            for (let cell of clue.cells) {
                let element = this.renderEl.querySelector ('#'+cell.ref);
                element.classList.add('solveConstraint');
            }
        }

        // should we wait for the user?
        return this.shouldWaitForUser;
    }

    getWaitForUser () {
        return this.shouldWaitForUser;
    }
    removeAllHighlights() {
        this.renderEl.querySelectorAll('.solveConstraint').forEach(cell => cell.classList.remove('solveConstraint'));
        this.renderEl.querySelectorAll('.solveStep').forEach(cell => cell.classList.remove('solveStep'));
        this.renderEl.querySelectorAll('.hintDigit').forEach(cell => cell.classList.remove(['added', 'removed']));
    }

    //
    // Respond to underlying data changes
    //
    onStoreUpdate (event) {
        if (!event.detail || !event.detail.updated) return;

        // update each updated cell...
        for (const cell of event.detail.updated) {
            //console.debug('\tUpdated value for ' + cell.ref);

            const elem = this.renderEl.querySelector('#' + cell.ref);
            const inputel = elem.querySelector('input');
            inputel.value = cell.value;
            inputel.classList.add('updated');
        }
    }
    onStoreUpdateMask (event) {
        if (!event.detail || !event.detail.updated) return;

        for (const cell of event.detail.updated) {
            //console.debug('\tUpdated mask for ' + cell.ref);
            const elem = this.renderEl.querySelector('#' + cell.ref);
            this.showHintDigits (elem);
        }
    }

    //
    // Popup handlers for clue combinations
    //
    showCombinationsHover (event) {
        // show the combinations for a clue (if the hint is selected)
        if (!this.showClueHints) return;
    
        // find the clue
        const clue = this.puzzle.getClue (event.target.getAttribute('data-cluename'));
        if (clue === undefined) return;
    
        // build the popup content
        const clue_title = document.createElement('div');
        clue_title.className = 'title';
        clue_title.textContent = `${clue.value} in ${clue.cells.length}`;

        let values = clue.cells.map (cl => cl.value)
            .filter (cl => cl > 0);
        //console.debug('Values for clue ' + clue.name + ': ', values);
        //console.debug('Combinations for clue ' + clue.name + ': ' + clue.combinations.join(','));

        const clue_body = document.createElement('div');
        clue_body.className = 'body';
        clue.combinations.forEach( combo => {
            const valid = values.reduce( (pr, val) => combo.indexOf(val) < 0 ? false : pr, true);
            let rval = clue_body.appendChild (document.createElement('span'));
            rval.className = valid ? 'validcombo' : 'invalidcombo';
            rval.textContent = ' (' + combo.split('').join(',') + ') ';
        });
    
        // popup the clue details
        if (!this.hover) {
            this.hover = document.body.appendChild ( document.createElement('div'));
            this.hover.className = 'hover';
        }
        while (this.hover.firstChild) this.hover.removeChild(this.hover.firstChild);
        this.hover.appendChild(clue_title);
        this.hover.appendChild(clue_body);

        this.hover.style.display = 'block';
        this.hover.style.left = event.target.offsetLeft; //event.target.offsetLeft + event.target.offsetWidth / 2;
        this.hover.style.top = event.target.offsetTop - this.hover.clientHeight * 1.1; // event.target.clientHeight * 1.5; //event.target.offsetTop - hover.clientHeight;
    }
    hideCombinationsHover () {
        if (this.hover)
            this.hover.style.display = 'none';
    }

    // 
    // Solution entry handlers
    // 
    // filterKeyPresses - only allow entry of digits 
    filterKeyPresses (event) {
        if (event.key == 'Tab' || event.key == 'Delete' || event.key == 'Backspace' || 
            event.key == 'ArrowLeft' || event.key == 'ArrowRight' ||
            '123456789'.indexOf(event.key) >= 0) 
        {
            // only allow one of any digit
            if (event.target.value.indexOf(event.key) >= 0) event.preventDefault();
            return true;
        } else if (event.key == 'Enter' || event.key == 'Escape') {
            //console.debug('filterKeypress: end input on ' + event.key);
            event.target.blur();
            return true;
        }else {
            //console.debug('filterKeypress: reject ' + event.key);
            event.preventDefault();
            return false;
        }
    }
    // handleInput - changes the style to reflect a single digit or hint
    handleInput (event) {
        if (event.target.value.length <= 1) {
            event.target.classList.remove('hints'); // value input
        } else {
            event.target.classList.add('hints');    // hint input
        }
    }
    // handleCellChange - validate cell entry and tell the puzzle to update
    handleCellChange (event, ref) {
        //console.debug('handleCellChange', event, ref);
        
        // filter out any repeated digits.
        let digits = event.target.value.split('')
            .filter((v) => '123456789'.indexOf(v) >= 0) // digits only
            // .sort()
            .filter((val, idx, arr) => (arr.findIndex((e) => e === val) >= idx) );
        event.target.value = digits.join('');

        // Update the puzzle
        if (ref) {
            this.puzzle.setValueAtRef (ref, event.target.value);
        }
    }

}
