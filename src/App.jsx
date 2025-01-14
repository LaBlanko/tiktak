import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function Feld(props) {

  return (
    <div class="p-[3%] text-center text-[100px] border border-black cursor-pointer min-h-[200px] basis-1/3" onClick={props.onClick}>
      {props.zeichen}
    </div>
  )
}

function Liste(props) {

  return (
    <>
      {
        props.gewinnerliste.map(element => {
          return (
            <div className='flex'>
              {element.substring(0, element.indexOf("("))}
              <div className='italic'>
                {element.substring(element.indexOf("("))}
              </div>
            </div>
          )
        })
      }
    </>
  )
}

function isDone(zeichenliste) {
  for (let i = 0; i < zeichenliste[0].length; i++) {
    if (zeichenliste[i][0] === zeichenliste[i][1] && zeichenliste[i][1] === zeichenliste[i][2] && zeichenliste[i][0] !== "") {
      return zeichenliste[i][0];
    }
  }
  for (let j = 0; j < zeichenliste[1].length; j++) {
    if (zeichenliste[0][j] === zeichenliste[1][j] && zeichenliste[1][j] === zeichenliste[2][j] && zeichenliste[0][j] !== "") {
      return zeichenliste[0][j];
    }
  }
  let diagonale = [zeichenliste[0][0], zeichenliste[1][1], zeichenliste[2][2]];
  let diagonale2 = [zeichenliste[0][2], zeichenliste[1][1], zeichenliste[2][0]];

  if (diagonale[0] !== "" && diagonale[0] === diagonale[1] && diagonale[1] === diagonale[2]) {
    return diagonale[0];
  }
  if (diagonale2[0] !== "" && diagonale2[0] === diagonale2[1] && diagonale2[1] === diagonale2[2]) {
    return diagonale2[0];
  }

  return null;
}

function App() {

  const [zeichenliste, setZeichenliste] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [isXNext, setIsXNext] = useState(true);
  const [gewinnerliste, setGewinnerliste] = useState([]);
  const [timer, setTimer] = useState(new Date(0, 0, 0, 0, 0, 0));

  useEffect(() => {
    const timerid = setInterval(() => {
      const date = new Date(timer);
      date.setSeconds(timer.getSeconds() + 1)
      setTimer(date);
    }, 1000);
    return () => clearInterval(timerid);
  });


  const resetGame = (message) => {
    setZeichenliste([["", "", ""], ["", "", ""], ["", "", ""]]);
    setGewinnerliste([
      ...gewinnerliste,
      message
    ]);
    setTimer(new Date(0, 0, 0, 0, 0, 0));
  };

  function handleClick(x, y) {

    if (zeichenliste[x][y] !== "") {
      return;
    }

    const newzeichenliste = [...zeichenliste];
    newzeichenliste[x][y] = isXNext ? "X" : "O";
    setIsXNext(!isXNext);
    setZeichenliste(newzeichenliste);

    if (isDone(zeichenliste) !== null) {
      resetGame(`Gewonnen: ${isDone(zeichenliste)} (Zeit: ${String(timer.getMinutes()).padStart(2, "0")}:${String(timer.getSeconds()).padStart(2, "0")})`);
    }

    if (zeichenliste.flat().every((e) => e === "X" || e === "O")) {
      resetGame(`Unentschieden (Zeit:${String(timer.getMinutes()).padStart(2, "0")}:${String(timer.getSeconds()).padStart(2, "0")})`);
    }

  }



  return (
    <>
      <div>
        <h1 className='mt-4 mb-6 text-5xl text-center'>Tic Tac Toe</h1>
      </div>

      <div className='flex'>
        <div className='basis-1/2 ml-1'>
          <div className='flex'>
            <Feld zeichen={zeichenliste[0][0]} onClick={() => handleClick(0, 0)} />
            <Feld zeichen={zeichenliste[0][1]} onClick={() => handleClick(0, 1)} />
            <Feld zeichen={zeichenliste[0][2]} onClick={() => handleClick(0, 2)} />
          </div>
          <div className='flex'>
            <Feld zeichen={zeichenliste[1][0]} onClick={() => handleClick(1, 0)} />
            <Feld zeichen={zeichenliste[1][1]} onClick={() => handleClick(1, 1)} />
            <Feld zeichen={zeichenliste[1][2]} onClick={() => handleClick(1, 2)} />
          </div>
          <div className='flex'>
            <Feld zeichen={zeichenliste[2][0]} onClick={() => handleClick(2, 0)} />
            <Feld zeichen={zeichenliste[2][1]} onClick={() => handleClick(2, 1)} />
            <Feld zeichen={zeichenliste[2][2]} onClick={() => handleClick(2, 2)} />
          </div>
          <div className='text-sl font-bold'>
            Zug für: {isXNext ? "X" : "O"}
          </div>
          <div>
            Gewonnen bei X:&nbsp;
            {
              gewinnerliste.filter((m) => m.includes("X")).length
            }
          </div>
          <div>
            Gewonnen bei O:&nbsp;
            {
              gewinnerliste.filter((m) => m.includes("O")).length
            }
          </div>
        </div>
        <div className='basis-1/2'>
          <div className='text-2xl ml-5 mb-4 mr-4'>
            <div className='flex'>
              <div className='basis-1/2 '>
                Zeit: {String(timer.getMinutes()).padStart(2, "0")}:{String(timer.getSeconds()).padStart(2, "0")}
              </div>
              <div className='basis-1/2'>
                <button class="bg-gray-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full btn-wide mb-3" onClick={() => resetGame("")}>
                  Neustart
                </button>
              </div>
            </div>
            <hr />
          </div>

          <h2 className='text-3xl text-center font-bold'>Gewinnerliste</h2>
          <div className='text-center ml-7'>
            <Liste gewinnerliste={gewinnerliste}></Liste>
          </div>
        </div>
      </div>


    </>
  )

}


export default App
