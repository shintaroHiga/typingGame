// 複数のテキストを格納する配列
const textLists = [
  'Hello World', 'This is my App', 'How are you?',
  'Today is sunny', 'I love JavaScript!', 'Good morning',
  'I am Japanese', 'Let it be', 'Samurai',
  'Typing Game', 'Information Technology',
  'I want to be a programmer', 'What day is today?',
  'I want to build a web app', 'Nice to meet you',
  'Chrome Firefox Edge Safari', 'machine learning',
  'Brendan Eich', 'John Resig', 'React Vue Angular',
  'Netscape Communications', 'undefined null NaN',
  'Thank you very much', 'Google Apple Facebook Amazon',
  'ECMAScript', 'console.log', 'for while if switch',
  'var let const', 'Windows Mac Linux iOS Android',
  'programming'
];

// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let time = 60;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const countTyped = document.getElementById('countTyped');

// ランダムなテキストを表示
const createText = () => {
  typed = '';
  typedfield.textContent = typed;

  let randomNum = Math.floor(Math.random() * textLists.length);
  untyped = textLists[randomNum];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {

  // 誤タイプの場合
  if (e.key !== untyped.substring(0, 1)) {
    if(time > 5) {
      time -= 5;
      count.textContent = time;
    } else {
      time = 0;
      count.textContent = time;
    }
    wrap.classList.add('mistyped');

    // ビープ音を再生
    const beep = new Audio('sound/beep.mp3');
    beep.play();

    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプの場合
  score++;
  console.log(score);
  wrap.classList.remove('mistyped');
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  countTyped.textContent = score;

  // タイプ音を再生
  const audio = new Audio('sound/snare03.mp3');
  audio.play();

  if (untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  let text = '';

  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます。`;
  }

  return `${score}文字打てました。\n${text}\n【OK）リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  if(result) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  // time = count.textContent;
  const id = setInterval(() => {
    time--;
    count.textContent = time;

    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  //ランダムなテキストを表示する 
  createText();

  // スタートボタンを非表示にする
  start.style.display = 'none';

  countTyped.textContent = score;

  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = "スタートボタンで開始";

