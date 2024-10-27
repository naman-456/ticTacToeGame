import { useEffect, useState } from 'react'
import styles from '../styles/tictacGame.module.css'
export const TicTacToeGame = () => {
    let [myArray, setNewData] = useState(new Array(9).fill(''))
    const [userSlctdSymbol, setUserSymbol] = useState('')
    const [isGameStart, setGameStart] = useState(false)
    const gameSymbolList : string[] = ['X', '0']
    console.log('hi naman')

    useEffect(() => {
        let count = 0;
        for(let val of myArray){
            if(val) count++;
            if(count == 3){
                checkWhoWins()
                break;
            }
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
        if(userSlctdSymbol && isGameStart){
            myArray[i] = userSlctdSymbol;
            console.log('myArray is:', myArray)
            const newArr = [...myArray]
            setNewData(newArr)
            setTimeout(() => {
                if(checkAnyRecBoxEmpty()){
                    fillBoxByComputer()
                }
            }, 1000)
        }
        else{
            alert('First select your symbol X or 0')
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
        let randNum = Math.floor(Math.random() * 10)
        if(randNum < 9 && !myArray[randNum]){
            myArray[randNum] = (userSlctdSymbol == 'X')? '0': 'X'
            const newArr = [...myArray]
            setNewData(newArr)
            return 0;
        }
        fillBoxByComputer()
    }

    const checkWhoWins = () => {
        const rowPrediction= rowWinningCondition()
        if(rowPrediction == 'User has won'){
            alert('Congrats you have win')
        }
        else if(rowPrediction == "Computer has won"){
            alert('Sorry you loss the game')
        }
    }
    const rowWinningCondition = () => {
        let row1 = [0,1,2];
        let row2 = [3,4,5];
        let row3 = [6,7,8];
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
            return "User has won"
        }
        const winningPossForComputerInRow1 = row1.every((item) => {
            return myArray[item] == computerSymbol
        })
        if(winningPossForComputerInRow1){
            return "Computer has won"
        }
        const winningPossForUserInRow2 = row2.every((item) => {
            return myArray[item] == userSymbol
        })
        if(winningPossForUserInRow2){
            return "User has won"
        }
        const winningPossForComputerInRow2 = row2.every((item) => {
            return myArray[item] == computerSymbol
        })
        if(winningPossForComputerInRow2){
            return "Computer has won"   
        }
        const winningPossForUserInRow3 = row3.every((item) => {
            return myArray[item] == userSymbol
        })
        if(winningPossForUserInRow3){
            return "User has won"
        }
        const winningPossForComputerInRow3 = row3.every((item) => {
            return myArray[item] == computerSymbol
        })
        if(winningPossForComputerInRow3){
            return "Computer has won"
        }
        if(!winningPossForUserInRow1 || !winningPossForComputerInRow1 || !winningPossForUserInRow2 || !winningPossForComputerInRow2 || !winningPossForUserInRow3 || !winningPossForComputerInRow3){
            return ''
        }
    }
    const columnWinningCondition = () => {

    }
    const diagonalWinningCondition = () => {
        
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
                    </div>}
                </div>

                <div className={styles['game-container']}>
                   {myArray?.length && myArray.map((item: string, index: number) => <div key={index} onClick={() => onSlctBox(index)} >{item}</div>)}
                </div>
            </div>
        </>
    )
}