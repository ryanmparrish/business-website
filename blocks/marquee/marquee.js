export default function decorate(block)  {
    const bg = block.querySelector(':scope > div:first-of-type > div');
    bg.classList.add('background');
    const bgImg = bg.querySelector(':scope img');
    if (!bgImg) {
        bg.style.display = 'none';
        const bgColor = bg.textContent;
        // block.style.background = `${bgColor}`;
        block.style = `background: ${bgColor};`
    }
    const content = block.querySelector(':scope > div:last-of-type');
    content.classList.add('container');
    content.querySelector(':scope > div:first-of-type').classList.add('text');
    content.querySelector(':scope > div:last-of-type').classList.add('image');
    const themeClass = block.classList.contains('dark') ? 'dark' : 'light';
    content.querySelectorAll('em > a').forEach((aEl) => {
        aEl.classList.add('button', 'primary', 'small', 'block', themeClass);
    });

    const vh100Block = block.classList.contains('vh100');
    if(vh100Block) {
        const svgDwnArrow = '<a class="downarrow" href="#anchor"><svg xmlns="http://www.w3.org/2000/svg" width="41.165" height="23.167" viewBox="0 0 41.165 23.167">\n' +
            '  <g id="down-chevron" transform="translate(0.64 0.717)">\n' +
            '    <g id="Group_187292" data-name="Group 187292" transform="translate(0.025 -0.05)">\n' +
            '      <path id="Path_357249" data-name="Path 357249" d="M20.028,21.95a2.3,2.3,0,0,1-1.64-.659L.689,3.852A2.3,2.3,0,0,1,.689.62a2.343,2.343,0,0,1,3.281,0l16.037,15.8L36.064.62a2.343,2.343,0,0,1,3.281,0,2.261,2.261,0,0,1,0,3.232L21.668,21.269A2.271,2.271,0,0,1,20.028,21.95Z" transform="translate(-0.025 0.05)" fill="#fff" stroke="#fff" stroke-miterlimit="10" stroke-width="1"/>\n' +
            '    </g>\n' +
            '  </g>\n' +
            '</svg></a>\n';
        block.insertAdjacentHTML( 'beforeend', svgDwnArrow );
    }
    // const gNavHeight = document.querySelector("header[data-block-name=gnav]").offsetHeight;
    // if(vh100Block && gNavHeight) {
    //     console.log({gNavHeight});
    //     console.log('window.innerHeight', window.innerHeight);
    //     console.log({block});
    //     // set height so it goes 100vh minus header height
    //     block.style.height = (window.innerHeight - gNavHeight) + "px";
    //
    //
    // }
}
