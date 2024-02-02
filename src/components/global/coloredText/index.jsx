export default function ColoredString ({ 
    text, 
    delimiter='**', 
    color,
    clickableWord=false,
    onClickColoredWord=() => {}
}) {
    let parts = text && text.split(delimiter);
  
    return (
      <div>
        {parts && parts.map((part, index) => (
            index % 2 === 0 
                ? <span key={index} style={{fontSize: 'inherit'}}>{part}</span> 
                : <span key={index} style={{fontSize: 'inherit', color: color, ...(clickableWord && {cursor: 'pointer'})}} onClick={() => onClickColoredWord(part)}>
                    {part}
                </span>
        ))}
      </div>
    );
};