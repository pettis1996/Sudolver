const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-btn')
const message = document.querySelector('#message')
const squares = 81 // 9x9 sudoku
let submission = []

for (let i = 0; i < squares; i++) 
{
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    // use only numbers 0 - 9 
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    puzzleBoard.appendChild(inputElement)
    if(
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) || 
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) || 
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    )
    {
        inputElement.classList.add('odd-section')
    }
}

const joinValues = () => 
{
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => 
        {
            if (input.value) {
                submission.push(input.valueAsNumber)
            } 
            else
            {
                submission.push(0) // for empty squares
            }
        })
}

const populateValues = (response) => {
    const inputs = document.querySelectorAll('input')
    if(response)
    {
        inputs.forEach((input, i) => {
            input.valueAsNumber = response[i]
        })
        message.innerHTML = 'The solution is found and is shown on the Sudoku Board.'
    }
}

const solve = () =>
{
    submission.length = 0 
    joinValues()
    const data = {"input": submission}
    console.log('data', data)

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => {
            populateValues(data.answer)
        }).catch((error) => {
            console.error(error);
        })
}

solveButton.addEventListener('click', solve)