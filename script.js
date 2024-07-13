// Wait until the entire DOM is loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the class 'cell' and convert the NodeList to an array
    const cells = [...document.querySelectorAll('.cell')];
    // Select the puzzle container element
    const puzzle = document.querySelector('.puzzle');
    // Select the shuffle button element
    const shuffleButton = document.getElementById('shuffle-button');
    // Select the win message element
    const winMessage = document.getElementById('win-message');

    // Function to check if two indices are adjacent in the 3x3 grid
    const isAdjacent = (index1, index2) => {
        // Calculate row and column for the first index
        const [row1, col1] = [Math.floor(index1 / 3), index1 % 3];
        // Calculate row and column for the second index
        const [row2, col2] = [Math.floor(index2 / 3), index2 % 3];
        // Check if they are adjacent by row or column
        return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
    };

    // Function to swap the contents of two cells
    const swapCells = (cell1, cell2) => {
        // Swap the innerHTML of the cells
        [cell1.innerHTML, cell2.innerHTML] = [cell2.innerHTML, cell1.innerHTML];
        // Toggle the 'empty' class for the two cells
        cell1.classList.toggle('empty');
        cell2.classList.toggle('empty');
    };

    // Function to get the indices of adjacent cells in the 3x3 grid
    const getAdjacentIndices = index => {
        // Calculate row and column for the given index
        const [row, col] = [Math.floor(index / 3), index % 3];
        // Return an array of adjacent indices, filtering out null values
        return [
            row > 0 ? index - 3 : null,   // Index above
            row < 2 ? index + 3 : null,   // Index below
            col > 0 ? index - 1 : null,   // Index to the left
            col < 2 ? index + 1 : null    // Index to the right
        ].filter(n => n !== null);
    };

    // Function to check if the puzzle is solved
    const isSolved = () => 
        cells.slice(0, -1).every((cell, i) => cell.innerHTML === (i + 1).toString());

    // Function to shuffle the puzzle
    const shufflePuzzle = () => {
        // Hide the win message
        winMessage.classList.add('hidden');
        // Perform 100 random swaps to shuffle the puzzle
        for (let i = 0; i < 100; i++) {
            // Find the empty cell
            const emptyCell = cells.find(cell => cell.classList.contains('empty'));
            const emptyIndex = cells.indexOf(emptyCell);
            // Get the adjacent cells
            const neighbors = getAdjacentIndices(emptyIndex);
            // Pick a random adjacent cell
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            // Swap the empty cell with the random adjacent cell
            swapCells(cells[randomNeighbor], emptyCell);
        }
    };

    // Add an event listener to the puzzle for click events
    puzzle.addEventListener('click', e => {
        const cell = e.target;
        // If the clicked cell is not the empty cell
        if (!cell.classList.contains('empty')) {
            // Find the empty cell
            const emptyCell = cells.find(cell => cell.classList.contains('empty'));
            const cellIndex = cells.indexOf(cell);
            const emptyIndex = cells.indexOf(emptyCell);

            // If the clicked cell is adjacent to the empty cell
            if (isAdjacent(cellIndex, emptyIndex)) {
                // Swap the clicked cell with the empty cell
                swapCells(cell, emptyCell);
                // Check if the puzzle is solved and show the win message if it is
                if (isSolved()) winMessage.classList.remove('hidden');
            }
        }
    });

    // Add an event listener to the shuffle button
    shuffleButton.addEventListener('click', shufflePuzzle);
});
