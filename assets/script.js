window.onload=()=>{
  setTimeout(()=>{
    document.querySelector('.splash').classList.add('hidden');
    document.querySelector('#menu').classList.remove('hidden');
  },1500);

  document.getElementById('openId').onclick=()=>{
    document.querySelector('#menu').classList.add('hidden');
    document.querySelector('#idcard').classList.remove('hidden');
  };

  document.getElementById('back').onclick=()=>{
    document.querySelector('#idcard').classList.add('hidden');
    document.querySelector('#menu').classList.remove('hidden');
  };
};
