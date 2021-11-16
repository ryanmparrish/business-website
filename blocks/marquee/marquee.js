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
}
