import { useState } from 'react'
function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const[xIsNext, setXIsNext] = useState(true)

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ]

    function getWinner(squares) {
     
      for(let combination of winningCombinations) {
        const [a,b,c] = combination;
          if (
              squares[a] &&
              squares[a] === squares[b] &&
              squares[a] === squares[c] 
            ){
              return squares[a]
            }
      }
                  return null              
    }

    function handleSquareClick(index) {
      if (board[index] || getWinner(board)) return;

      const updateBoard = [...board];
      updateBoard[index] = xIsNext ? 'X' : 'O';

      setBoard(updateBoard);
      setXIsNext(!xIsNext);

    }

    function getGameStatus() {
      const winner = getWinner(board);
      if(winner) {
        return `Winner: ${winner}`
      }

      if(board.every((square) => square !== null)) {
        return 'It\'s a draw Game 😕 One More ? '
      }

      return `Next player: ${xIsNext ? 'X' : 'O'}`	
      
    }

    function restGame() {
      setBoard(Array(9).fill(null));
      setXIsNext(true);
    }

  return (
    <>
    <div className=" min-h-screen bg-slate-900 flex items-center justify-center">

      <div className="w-full max-w-[400px] mx-5">

        <h1 className="text-5xl font-semibold text-white mb-8 text-center">
          Tic Tac Toe
        </h1>

          <div className={`text-center mb-8
             ${getWinner(board) ? "text-2xl font-bold text-green-500" : "text-2xl font-bold text-white" }` }> 
            {getGameStatus()}
          </div>

          <div className=" grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6"> 
             {
               board.map((square, index) => (
                 <button key={index} 
                 onClick={() => handleSquareClick(index)}
                 className={`h-32 w-full border border-slate-600 text-4xl font-light 
                    text-white bg-slate-800 hover:bg-gray-400 transition-colors 
                    duration-300 ${square === 'X' ? 'text-green-500' : 'text-white' }`}>

                    {square}
                 </button>
             ))
             }
          </div>
          <button className="w-full py3 text-lg text-white border rounded-xl 
          hover:bg-gray-400 transition-colors duration-300"
          onClick={restGame}
          >Reset / new game</button>

      </div>
      </div>
    </>
  )
}

export default App
