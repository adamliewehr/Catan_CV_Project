import { useState, useEffect } from "react";
import Histogram2 from "./d3Plots/testPlot2";

function DigitalDice() {
  const [data, setData] = useState([]);
  const [numOfDice, setNumOfDice] = useState(0);
  const [diceNums, setDiceNums] = useState([]);

  let imagesSrc = [
    "/images/dice-six-faces-one.png",
    "/images/dice-six-faces-two.png",
    "/images/dice-six-faces-three.png",
    "/images/dice-six-faces-four.png",
    "/images/dice-six-faces-five.png",
    "/images/dice-six-faces-six.png",
  ];

  const imgMap = new Map();

  for (let i = 0; i < imagesSrc.length; i++) {
    imgMap.set(i + 1, imagesSrc[i]);
  }

  function addData(num) {
    setData([...data, num]);
  }

  function rollDice() {
    let currentDiceNums = [];

    for (let i = 0; i < numOfDice; i++) {
      currentDiceNums.push(Math.round(Math.random() * (6 - 1) + 1));
    }
    setDiceNums(currentDiceNums);
    addData(
      currentDiceNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  }

  function handleFormSubmit(formData) {
    const input = formData.get("numOfDice");
    setNumOfDice(input);
  }

  return (
    <>
      {diceNums[0] == 0 ? (
        <div>Histogram loading...</div>
      ) : (
        <Histogram2
          width={500}
          height={500}
          data={data}
          maxNum={6 * numOfDice}
        ></Histogram2>
      )}

      <form action={handleFormSubmit}>
        <p>Input the number of dice you would like to roll</p>
        <input name='numOfDice' />
        <button type='submit'>Submit</button>
      </form>

      {numOfDice == 0 ? (
        <div>Submit dice number</div>
      ) : (
        <div>
          <button onClick={rollDice}>Roll Dice</button>
          {diceNums[0] == 0 ? (
            <div>Roll dice...</div>
          ) : (
            <div>
              {diceNums.map((num, index) => {
                return (
                  <img
                    src={imgMap.get(num)}
                    alt={`dice${index}`}
                    width={300}
                    height={300}
                  />
                );
              })}

              {/* <img
                src={imgMap.get(diceNums[1])}
                alt='diceTwo'
                width={300}
                height={300}
              /> */}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DigitalDice;
