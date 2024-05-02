// This Command Line Interface (CLI) App will be used as a Slot Machine.
// A Slot machine, fruit machine, poker machine or pokies is a gambling machine that creates a game of chance for its customers. A slot machine's standard layout features a screen displaying three or more reels that "spin" when the game is activated.

const prompt = require("prompt-sync")();

console.log("!...Welcome To The World of Gambling...!");

/// Initializing global constants for spining slot machine
// In these variables initializing rows and columns  
const ROWS = 3;
const COLS = 3;

// In this variable below symbols is used in slot machine 
const SYMBOLS_COUNT = {
    "💎": 2,
    "🍒": 4,
    "⭐": 6,
    "🍀": 8
}

// In this variable below symbols is used to give bet winning amount
const SYMBOLS_VALUES = {
    "💎": 8,
    "🍒": 10,
    "⭐": 12,
    "🍀": 14
}


// Func1 : This function is to deposit some money through the user input.
const deposit = () => {
    while (true) {
        const DepositAmount = prompt("Enter some amount to deposit : ");
        const NumberDepositAmount = parseFloat(DepositAmount);
        if (isNaN(NumberDepositAmount) || NumberDepositAmount <= 0) {
            console.log("Please enter a valid amount, try again");
        }
        else {
            return NumberDepositAmount;
        }
    }
};

// Func2 : This function is to determine the number of lines to bet on through the user input.
const getNumberOfLines = () => {
    while (true) {
        const GetNumberOfLines = prompt("Enter the number of lines (1-3) to bet on : ");
        const NumberOfLines = parseFloat(GetNumberOfLines);
        if (isNaN(NumberOfLines) || NumberOfLines <= 0 || NumberOfLines > 3) {
            console.log("Enter the valid number of lines, try again");
        }
        else {
            return NumberOfLines;
        }
    }
};

// Func3 : This function is used to collect a bet amount through the user input.
const getBet = (balance, lines) => {
    while (true) {
        const Bet = prompt("Enter the bet per line : ");
        const NumberBet = parseFloat(Bet);
        if (isNaN(NumberBet) || NumberBet <= 0 || NumberBet > balance / lines) {
            console.log("Invalid Bet amount per line, try again");
        }
        else {
            return NumberBet;
        }
    }
};

// Func4 : This function is used to spin the slot machine.
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};


// Func5 : This function is used to transpose the Func4 in the rows 
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

// Func6 : This function is used to print the Func5 in reels
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

// Func7 : This function is used to give the user their winnings.
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};

// Func8 : This function is used to call the functions which we created earlier.
const game = () => {
    let Balance = deposit();

    while (true) {
        console.log(`Your Current Balance is $${Balance}`);
        const NumberOfLines = getNumberOfLines();
        const Bet = getBet(Balance, NumberOfLines);
        Balance -= Bet * NumberOfLines;
        const Spin = spin();
        const Trans = transpose(Spin);
        printRows(Trans);
        const Winnings = getWinnings(Trans, Bet, NumberOfLines);
        Balance += Winnings;
        console.log(`You won $${Winnings.toString()}`);

        if (Balance <= 0) console.log("You ran out of money!!");
        
        const PlayAgain = prompt("Do you want to play again(y/n)? : ");
        if (PlayAgain != "y") break;
    }
}; 
game();

