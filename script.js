options: [
      { text: 'Langsung balas ramah', value: -3 },
      { text: 'Bales cuek', value: 1 },
      { text: 'Blokir aja deh', value: 5 }
    ]
  },
  {
    question: 'Kamu lagi dengerin lagu yang biasa kalian denger bareng.',
    options: [
      { text: 'Nangis kejer', value: -2 },
      { text: 'Skip lagunya', value: 1 },
      { text: 'Hapus playlist kenangan', value: 3 }
    ]
  },
  {
    question: 'Kamu nemu foto lama kalian di galeri.',
    options: [
      { text: 'Liatin sambil senyum sedih', value: -1 },
      { text: 'Hapus langsung', value: 2 },
      { text: 'Backup ke folder "masa lalu"', value: 1 }
    ]
  }
];

let currentIndex = 0;

function updateProgress() {
  let percent = Math.min((moveOnLevel / 30) * 100, 100);
  progressBar.style.width = `${percent}%`;
  localStorage.setItem('moveOnLevel', moveOnLevel);
}

function addMessage(text, from = 'him') {
  const msg = document.createElement('div');
  msg.classList.add('msg', from === 'him' ? 'from-him' : 'from-you');
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function renderSituation() {
  if (currentIndex >= situations.length) {
    showEnding();
    return;
  }

  const situation = situations[currentIndex];
  addMessage(situation.question, 'him');

  optionsContainer.innerHTML = '';
  situation.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.innerText = opt.text;
    btn.onclick = () => {
      addMessage(opt.text, 'you');
      moveOnLevel += opt.value;
      updateProgress();
      currentIndex++;
      setTimeout(renderSituation, 600);
    };
    optionsContainer.appendChild(btn);
  });
}

function showEnding() {
  optionsContainer.innerHTML = '';
  let ending = '';
  if (moveOnLevel <= 5) {
    ending = 'Kamu masih bucin berat...';
  } else if (moveOnLevel <= 15) {
    ending = 'Kamu lagi proses move on, semangat!';
  } else if (moveOnLevel <= 25) {
    ending = 'Kamu hampir sembuh, tinggal dikit lagi.';
  } else {
    ending = 'SELAMAT! Kamu sudah bebas dari bayang-bayang dia.';
  }
  addMessage(ending, 'him');

  const restartBtn = document.createElement('button');
  restartBtn.classList.add('option-btn');
  restartBtn.innerText = 'Main Lagi';
  restartBtn.onclick = () => {
    moveOnLevel = 0;
    currentIndex = 0;
    chatBox.innerHTML = '';
    updateProgress();
    renderSituation();
  };
  optionsContainer.appendChild(restartBtn);
}

// Start game
updateProgress();
renderSituation();
