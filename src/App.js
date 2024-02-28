import './App.css';
import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
const emojiList = [...'🐎🐖🦓🐤🦖🦕🦎🐊🦆🐧🐋🦭🦈🦀🦑'];
let attempts = 0;

const App = () => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  
  

  useEffect( () => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index: i, emoji, flipped: false}) ));
  }, []);

  const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const handleMemoClick = memoBlock => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);
    if(selectedMemoBlock === null) {
      setselectedMemoBlock(memoBlock);
    } else if(selectedMemoBlock.emoji === memoBlock.emoji) {
      setselectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setselectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
      attempts += 1;
    }
  }
  
  const handleButtonClick = () => {
    // Lógica a ejecutar al hacer clic en el botón
    window.location.reload();
  }


  return (
      <div>
        <Board memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <h1 style={{
          marginBottom:'10px'
          }} >  Intentos: {attempts}</h1>
          <button onClick={handleButtonClick}  style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
          }}>Reiniciar</button>
        </div>
      </div>
  );


  
}

export default App;