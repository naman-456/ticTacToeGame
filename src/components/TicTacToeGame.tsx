import { useState } from 'react'
import styles from '../styles/tictacGame.module.css'
export const TicTacToeGame = () => {
    let [myArray, setNewData] = useState(new Array(9).fill(''))
    const [userSlctdSymbol, setUserSymbol] = useState('')
    const [isGameStart, setGameStart] = useState(false)
    const gameSymbolList : string[] = ['X', '0']
    console.log('hi naman')
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