
// Helper: draw a mock QR code pattern on canvas (not a real QR generator)
// Generates a reproducible pattern from a seed string
function drawMockQR(canvas, seed){
  const ctx = canvas.getContext('2d');
  const size = 22; // small grid
  const cell = Math.floor(canvas.width / size);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  // create simple pseudorandom from seed
  let h = 0;
  for(let i=0;i<seed.length;i++) h = (h*31 + seed.charCodeAt(i)) >>> 0;
  function rand(){
    h = (h * 1664525 + 1013904223) >>> 0;
    return (h >>> 0) / 4294967295;
  }
  // draw finder patterns
  function drawFinder(x,y){
    ctx.fillStyle='#000';
    ctx.fillRect(x,y,cell*3,cell*3);
    ctx.fillStyle='#fff';
    ctx.fillRect(x+cell,y+cell,cell,cell);
  }
  drawFinder(0,0); drawFinder((size-3)*cell,0); drawFinder(0,(size-3)*cell);
  // fill rest
  for(let r=0;r<size;r++){
    for(let c=0;c<size;c++){
      // skip finder areas
      if((r<3 && c<3) || (r<3 && c>size-4) || (r>size-4 && c<3)) continue;
      if(rand() > 0.5) ctx.fillStyle='#000'; else ctx.fillStyle='#fff';
      ctx.fillRect(c*cell, r*cell, cell, cell);
    }
  }
}

// handle upload and data binding
const upload = document.getElementById('upload');
const photo = document.getElementById('photo');
const applyBtn = document.getElementById('apply');
const qrCanvas = document.getElementById('qr');

upload.addEventListener('change', e=>{
  const f = e.target.files[0];
  if(!f) return;
  const reader = new FileReader();
  reader.onload = ev=>{
    photo.src = ev.target.result;
  };
  reader.readAsDataURL(f);
});

applyBtn.addEventListener('click', ()=>{
  const name = document.getElementById('name').value.trim();
  const surname = document.getElementById('surname').value.trim();
  const pesel = document.getElementById('pesel').value.trim();
  const birth = document.getElementById('birth').value.trim();
  const gender = document.getElementById('gender').value;

  document.getElementById('out_name').innerText = name || '—';
  document.getElementById('out_surname').innerText = surname || '—';
  document.getElementById('out_pesel').innerText = pesel || '—';
  document.getElementById('out_birth').innerText = birth || '—';
  document.getElementById('out_gender').innerText = gender === 'M' ? 'M' : 'K';

  // draw QR from combined data
  const seed = name + '|' + surname + '|' + pesel + '|' + birth;
  drawMockQR(qrCanvas, seed);
});

// simple download of card view (PNG) by rendering the card canvas
document.getElementById('download').addEventListener('click', ()=>{
  // render id_card to canvas by drawing elements manually
  const card = document.querySelector('.id_card');
  const w = card.offsetWidth;
  const h = card.offsetHeight;
  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(w*scale);
  canvas.height = Math.floor(h*scale);
  const ctx = canvas.getContext('2d');
  // fill background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  // draw photo area and text using rough approximation
  // photo
  const img = document.getElementById('photo');
  try{
    ctx.drawImage(img, 20*scale, 70*scale, 120*scale, 150*scale);
  }catch(e){}
  // texts
  ctx.fillStyle = '#0b1730';
  ctx.font = (14*scale) + 'px sans-serif';
  ctx.fillText('Imię: ' + document.getElementById('out_name').innerText, 150*scale, 100*scale);
  ctx.fillText('Nazwisko: ' + document.getElementById('out_surname').innerText, 150*scale, 130*scale);
  ctx.fillText('PESEL: ' + document.getElementById('out_pesel').innerText, 150*scale, 160*scale);
  ctx.fillText('Urodz.: ' + document.getElementById('out_birth').innerText, 150*scale, 190*scale);
  // fake QR: copy from qrCanvas
  ctx.drawImage(qrCanvas, 20*scale, 240*scale, 110*scale, 110*scale);
  // download
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'dowod_mock.png';
  a.click();
});
