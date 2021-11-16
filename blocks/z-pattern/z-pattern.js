function isOdd(num) { return num % 2 ? 'z-row-odd' : 'z-row-even'; }

export default function decorate(block)  {
    if (block.classList.contains('is-loaded')) {
        return;
    }
    const h2 = block.querySelector('h2');
    if (h2) {
        h2.parentElement.parentElement.classList.add('z-pattern-heading');
    }
    const zRows = block.querySelectorAll(':scope > div:not([class])');
    zRows.forEach((row, idx) => {
        row.classList.add(isOdd(idx));
        row.querySelectorAll('em > a').forEach((aEl) => {
            aEl.classList.add('button', 'primary', 'small', 'light');
        });
        row.querySelectorAll('strong > a').forEach((aEl) => {
            aEl.classList.add('button', 'primary', 'small', 'light');
        });
    });
}
