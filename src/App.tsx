import React, { useState } from "react";
import styles  from './App.module.css'
import { levels, calculateImc, Level } from "./helpers/imc";
import Griditem from "./components/Griditem/Griditem";
import leftArrow from "./assets/leftarrow.png"

const App = ()=>{

  const [heightField, setHeightField]= useState<number>(0)
  const [weightField, setWeightField]= useState<number>(0)
  const [toShow, setToShow]= useState<Level | null>(null)

  const calculateButton = ()=>{
    if (heightField && weightField){
      setToShow(calculateImc(heightField, weightField))
    }else{
      alert('Preencha todos os campos!')
    }
  }

  const backButton =()=>{
    setToShow(null)
    setHeightField(0)
    setWeightField(0)

  }

  return(
    <>
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftside}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC, é um cálculo simples que permite medir se alguém está ou não com o peso ideal. 
          Ele aponta se o peso está adequado ou se está abaixo ou acima do peso.</p>


          <input 
           type="number" 
           placeholder="Digite a sua altura. Ex:1.5 (em metros)"
           value={heightField > 0 ? heightField : ""}
           onChange={e=> setHeightField(parseFloat(e.target.value))}
           disabled={toShow ? true : false}
          />
          <input 
           type="number" 
           placeholder="Digite o seu peso. Ex:75.3 (em KG)"
           value={weightField > 0 ? weightField : ""}
           onChange={e=> setWeightField(parseFloat(e.target.value))}
           disabled={toShow ? true : false}
          />

          <button onClick={calculateButton} disabled={toShow ? true : false} >Calcular</button>

        </div>
        <div className={styles.rightside}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key)=>(
              <Griditem key={key} item={item} />
            ))}
          </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={backButton}>
                <img src={leftArrow} alt="" width={25} />
              </div>
              <Griditem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default App