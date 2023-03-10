import React from 'react';

function Tile({x, y, blockSize=1, active, setActive, id, children}) {

    let gap = 20;
    let edge = 210;

    let sizingUnit = edge + gap;
    let maxHeight = (2*edge + 1*gap);
    let maxWidth = (3*edge + 2*gap);
    let fromLeft = (800 - maxWidth) / 2;
    let fromTop = (480 - maxHeight) / 2;
    
    let height = edge;
    let width = blockSize * edge + (blockSize-1) * gap;
    let left = fromLeft + x * sizingUnit;
    let top = fromTop + y * sizingUnit;

    let act = active === id;
    let hid = !act && active !== "";

    return <div
                onClick={() => setActive(act ? "" : id)}
                className={(hid ? "hidden " : "") + (act ? "active " : "") + "tile"}
                style={!act ? 
                    { top: top+'px', left: left+'px', height: height+'px', width: width+'px', fontSize: (width+height)+'px'}
                    :
                    { top: (fromTop-10)+'px', left: (fromLeft-50)+'px', height: (maxHeight+20)+'px', width: (maxWidth+100)+'px', fontSize: (maxHeight+maxWidth)+'px' }
                }
            >
                <div style={{ 
                                maxHeight: 'calc(100% - 40px)',
                                height: 'calc(100% - 40px)',
                                maxWidth: 'calc(100% - 40px)',
                                width: 'calc(100% - 40px)',
                                margin: '20px',
                                fontSize: '0.1em'
                }}>
                    {children ? React.cloneElement(children, { maximized: act }) : null}
                </div>
                <div className={(act ? "active " : "") + 'loading-bar'}
                     style={{ position: 'absolute', bottom: '0px', height: '5px' }}>

                </div>
            </div>;
}

export default Tile;