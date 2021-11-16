function getBlockMetadata(block) {
  const data = block.childNodes;
  if(!data)
    return
  const metadata = {};
  let metaRowIndex = 0;
  data.forEach((row, i) => {
    const firstRow = row.querySelector(':scope > div:first-of-type');
    if (firstRow.textContent.trim().toLowerCase() === 'metadata') {
      metaRowIndex = i+1;
      row.classList.add('meta');
    }
    if(metaRowIndex && i >= metaRowIndex) {
      const rowKey = row.querySelector(':scope > div:first-of-type');
      const rowValue = row.querySelector(':scope > div:last-of-type');
      const key = rowKey.textContent.trim().toLowerCase().replace(/ /g, '-');
      const value = rowValue.textContent.trim().toLowerCase().replace(/ /g, '-');
      const valueArry = value.split(',');
      metadata[key] = valueArry;
      row.classList.add('meta');
    }
  });
  removeMetaNodes(block);
  return metadata;
}

function removeMetaNodes(block) {
  const rows = block.querySelectorAll(':scope > div');
  rows.forEach( (row) => {
    if(row.classList.contains('meta')) {
      row.remove();
    }
  });
}

export default function decorate(block)  {

  const blockMetadata = getBlockMetadata(block);
  console.log(blockMetadata);
  const bgRow = block.querySelector(':scope > div:first-of-type');
  bgRow.classList.add('bg-row')
  const bg = bgRow.querySelector(':scope > div');
  bg.classList.add('background');
  const bgImg = bg.querySelector(':scope img');
  if (!bgImg) {
    bg.style.display = 'none';
    const bgColor = bg.textContent;
    // block.style.background = `${bgColor}`;
    block.style = `background: ${bgColor}; height: ${blockMetadata["section-height"][0]};`;
  }else if(blockMetadata && blockMetadata["bg-image-object-position"][0]) {
    bgImg.style = `object-position: ${blockMetadata["bg-image-object-position"][0]};`;
  }
  if(blockMetadata && blockMetadata["section-height"][0]) {
    block.style = `height: ${blockMetadata["section-height"][0]};`;
  }

  const content = block.querySelector(':scope > div:nth-child(2)');
  const text = content.querySelector(':scope > div:nth-child(1)');
  const image = content.querySelector(':scope > div:nth-child(2)');
  const themeClass = block.classList.contains('dark') ? 'dark' : 'light';
  content.classList.add('container');
  text.classList.add('text');
  image.classList.add('image');

  content.querySelectorAll('em > a').forEach((aEl) => {
    aEl.classList.add('button', 'primary', 'small', 'block', themeClass);
  });
}
