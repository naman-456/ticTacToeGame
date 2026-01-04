import { useEffect, useState } from 'react'
import styles from '../styles/tictacGame.module.css'
export const TicTacToeGame = () => {
    const [myArray, setNewData] = useState(new Array(9).fill(''))
    const [userSlctdSymbol, setUserSymbol] = useState('')
    const [isGameStart, setGameStart] = useState(false)
    const [showGameWindow, setGameWindow] = useState(true)
    const [winningCells, setWinningCells] = useState<number[]>([])
    const [gameWon, setGameWon] = useState(false)
    const [gameTied, setGameTied] = useState(false)
    const gameSymbolList : string[] = ['X', '0']

    console.log('setGameWindow :', setGameWindow)
    useEffect(() => {
        // Check for wins after every move (when at least 3 moves have been made)
        let count = 0;
        for(let val of myArray){
            if(val) count++;
        }
        if(count >= 3 && !gameWon && !gameTied){
            checkWhoWins()
        }
        // Check for tie when all boxes are filled
        if(count === 9 && !gameWon && !gameTied){
            checkForTie()
        }
    }, [myArray] )

    const handleOnChange = (event: any) => {
        console.log('event : ', event.target.value)
        setUserSymbol(event.target.value)
    }

    const handleConfirm = () => {
        if(userSlctdSymbol){
            setGameStart(true)
        }
        else{
            alert('Please select either X or 0')
        }
    }

    const onSlctBox = (i: number) => {
        if(gameWon || gameTied) return // Prevent moves after game is won or tied
        if(userSlctdSymbol && isGameStart){
            if(myArray[i]) return // Prevent clicking on already filled boxes
            myArray[i] = userSlctdSymbol;
            console.log('myArray is:', myArray)
            const newArr = [...myArray]
            setNewData(newArr)
            setTimeout(() => {
                if(checkAnyRecBoxEmpty() && !gameWon && !gameTied){
                    fillBoxByComputer()
                }
            }, 1000)
        }
        else if(!userSlctdSymbol){
            alert('First select your symbol X or 0')
        }
        else{
            alert('Please click on confirm button');
        }
    }

    const checkAnyRecBoxEmpty = () => {
        for(let item of myArray){
            if(!item){
                return true
            }
        }
        return false
    }

    function fillBoxByComputer(){
        if(gameWon || gameTied) return // Don't make moves after game is won or tied
        const randNum = Math.floor(Math.random() * 10)
        if(randNum < 9 && !myArray[randNum]){
            myArray[randNum] = (userSlctdSymbol == 'X')? '0': 'X'
            const newArr = [...myArray]
            setNewData(newArr)
            return 0;
        }
        fillBoxByComputer()
    }

    const checkWhoWins = () => {
        const rowResult = rowWinningCondition()
        const columnResult = columnWinningCondition()
        const diagonalResult = diagonalWinningCondition()
        
        if(rowResult.winner == 'User has won' || columnResult.winner == 'User has won' || diagonalResult.winner == 'User has won'){
            const winningCells = rowResult.cells.length > 0 ? rowResult.cells : 
                                columnResult.cells.length > 0 ? columnResult.cells : 
                                diagonalResult.cells
            setWinningCells(winningCells)
            setGameWon(true)
            setTimeout(() => {
                alert('Congrats you have win')  
            }, 500)
        }
        else if(rowResult.winner == "Computer has won" || columnResult.winner == "Computer has won" || diagonalResult.winner == "Computer has won"){
            const winningCells = rowResult.cells.length > 0 ? rowResult.cells : 
                                columnResult.cells.length > 0 ? columnResult.cells : 
                                diagonalResult.cells
            setWinningCells(winningCells)
            setGameWon(true)
            setTimeout(() => {
                alert('Sorry you loss the game')
            }, 500)
        }
    }

    const checkForTie = () => {
        const rowResult = rowWinningCondition()
        const columnResult = columnWinningCondition()
        const diagonalResult = diagonalWinningCondition()
        
        // Check if no one has won and all boxes are filled
        const hasWinner = rowResult.winner !== '' || columnResult.winner !== '' || diagonalResult.winner !== ''
        
        if(!hasWinner){
            setGameTied(true)
            setTimeout(() => {
                alert('Game Tied! No one wins.')
            }, 500)
        }
    }

    const rowWinningCondition = () => {
        const row1 = [0,1,2];
        const row2 = [3,4,5];
        const row3 = [6,7,8];
        let userSymbol: string = '';
        let computerSymbol: string= '';
        if(userSlctdSymbol == 'X'){
            userSymbol = 'X';
            computerSymbol = '0';
        }
        else if(userSlctdSymbol == '0'){
            userSymbol = '0';
            computerSymbol = 'X';
        }
        const winningPossForUserInRow1 = row1.every((item) => {
            return myArray[item] == userSymbol
        })
        if(winningPossForUserInRow1){
            return { winner: "User has won", cells: row1 }
        }
        const winningPossForComputerInRow1 = row1.every((item) => {
            return myArray[item] == computerSymbol
        })
        if(winningPossForComputerInRow1){
            return { winner: "Computer has won", cells: row1 }
        }
        const winningPossForUserInRow2 = row2.every((item) => {
            return myArray[item] == userSymbol
        })
        if(winningPossForUserInRow2){
            return { winner: "User has won", cells: row2 }
        }
        const winningPossForComputerInRow2 = row2.every((item) => {
            return myArray[item] == computerSymbol
        })
        if(winningPossForComputerInRow2){
            return { winner: "Computer has won", cells: row2 }
        }
        const winningPossForUserInRow3 = row3.every((item) => {
            return myArray[item] == userSymbol
        })
        if(winningPossForUserInRow3){
            return { winner: "User has won", cells: row3 }
        }
        const winningPossForComputerInRow3 = row3.every((item) => {
            return myArray[item] == computerSymbol
        })
        if(winningPossForComputerInRow3){
            return { winner: "Computer has won", cells: row3 }
        }
        return { winner: '', cells: [] }
    }
    const columnWinningCondition = () => {
        let computerSlctdSymbol = ''
        if(userSlctdSymbol == 'X') computerSlctdSymbol = '0'
        if(userSlctdSymbol == '0') computerSlctdSymbol = 'X'
        const column1Index = [0,3,6]
        const column2Index = [1,4,7]
        const column3Index = [2,5,8]
        const column1UserWin = column1Index.every((index: number) => myArray[index] == userSlctdSymbol )
        if(column1UserWin) return { winner: 'User has won', cells: column1Index }
        const column2UserWin = column2Index.every((index: number) => myArray[index] == userSlctdSymbol )
        if(column2UserWin) return { winner: 'User has won', cells: column2Index }
        const column3UserWin = column3Index.every((index: number) => myArray[index] == userSlctdSymbol )
        if(column3UserWin) return { winner: 'User has won', cells: column3Index }
        const column1MachineWin = column1Index.every((index: number) => myArray[index] == computerSlctdSymbol )
        if(column1MachineWin) return { winner: 'Computer has won', cells: column1Index }
        const column2MachineWin= column2Index.every((index: number) => myArray[index] == computerSlctdSymbol)
        if(column2MachineWin) return { winner: 'Computer has won', cells: column2Index }
        const column3MachineWin = column3Index.every((index: number) => myArray[index] == computerSlctdSymbol)
        if(column3MachineWin) return { winner: 'Computer has won', cells: column3Index }
        return { winner: '', cells: [] }
    }
    
    const diagonalWinningCondition = () => {
        let computerSlctdSymbol = ''
        if(userSlctdSymbol == 'X') computerSlctdSymbol = '0'
        if(userSlctdSymbol == '0') computerSlctdSymbol = 'X'
        const diagonal1Index = [0,4,8] // top-left to bottom-right
        const diagonal2Index = [2,4,6] // top-right to bottom-left
        
        const diagonal1UserWin = diagonal1Index.every((index: number) => myArray[index] == userSlctdSymbol)
        if(diagonal1UserWin) return { winner: 'User has won', cells: diagonal1Index }
        
        const diagonal2UserWin = diagonal2Index.every((index: number) => myArray[index] == userSlctdSymbol)
        if(diagonal2UserWin) return { winner: 'User has won', cells: diagonal2Index }
        
        const diagonal1MachineWin = diagonal1Index.every((index: number) => myArray[index] == computerSlctdSymbol)
        if(diagonal1MachineWin) return { winner: 'Computer has won', cells: diagonal1Index }
        
        const diagonal2MachineWin = diagonal2Index.every((index: number) => myArray[index] == computerSlctdSymbol)
        if(diagonal2MachineWin) return { winner: 'Computer has won', cells: diagonal2Index }
        
        return { winner: '', cells: [] }
    }

    const handleRestart = () => {
        setNewData(new Array(9).fill(''))
        setGameStart(false)
        setWinningCells([])
        setGameWon(false)
        setGameTied(false)
        setUserSymbol('')
    }
    return (
        <>
            <div className={styles['game-body']}>
                <h1>Tic Tac Toe game</h1>
                <div className={styles['game-header']}>
                    {!isGameStart && <span>
                        <span>Select X or 0:</span>
                        {gameSymbolList.map((item : string) => <span>
                            <span>
                                <input type="radio" id={item} value={item} name="cross or zero" onChange={(e) => handleOnChange(e) }/>
                                <label htmlFor={item}>{item}</label>
                            </span>
                        </span>)}
                        <button className={ styles['btn-primary'] + ' ' + styles.fs24} onClick={() => handleConfirm() }>Confirm</button>
                    </span>}
                   {isGameStart && <div>
                        <p>Start your game with symbol {userSlctdSymbol}. Click on any rectangular box which you want to fill.</p>
                        {(gameWon || gameTied) && (
                            <button 
                                className={styles['btn-primary'] + ' ' + styles.fs24 + ' ' + styles['restart-btn']} 
                                onClick={() => handleRestart()}
                            >
                                Restart
                            </button>
                        )}
                    </div>}
                </div>

                {showGameWindow && <div className={styles['game-container']}>
                   {myArray?.length && myArray.map((item: string, index: number) => (
                       <div 
                           key={index} 
                           onClick={() => onSlctBox(index)} 
                           className={winningCells.includes(index) ? styles['winning-cell'] : ''}
                       >
                           {item}
                       </div>
                   ))}
                </div>}
            </div>
        </>
    )
}