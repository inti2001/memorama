import './MemoBlock.css';

const MemoBlock = ({animating, handleMemoClick, memoBlock}) => (
    <div className="memo-block" onClick={() => (!memoBlock.flipped && !animating) && handleMemoClick(memoBlock)}>
        <div className={`memo-block-inner ${memoBlock.flipped && 'memo-block-flipped'}`}>
            <div className="memo-block-front">
                <p className="modular">💎</p>
            </div>
            <div className="memo-block-back">
                {memoBlock.emoji}
            </div>
        </div>
    </div>
)

export default MemoBlock;