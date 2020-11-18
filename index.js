const timerEl = document.querySelector('#timer');
const hourEl = document.querySelector('#hour');
const minEl = document.querySelector('#min');
const secEl = document.querySelector('#sec');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const clearBtn = document.querySelector('#clear');
const showTimeEl = document.querySelector('#show-time');
const now = new Date().toDateString();

// (시)단위 선택목록 생성
for(let i=0;i<10;i++){
    const optionEl = document.createElement('option');
    optionEl.value = i;
    optionEl.innerText = i;
    hour.append(optionEl);
}
// (분,초)단위 선택목록 생성
for(let i=0;i<60;i++){
    const optionEl = document.createElement('option');
    const option1El = document.createElement('option');
    
    optionEl.value = i;
    optionEl.innerText = i;
    option1El.value = i;
    option1El.innerText = i;
    min.append(optionEl);
    sec.append(option1El);
}
// 타이머 시작
// 시간은 분,초가 00이 되면 1감소
// 분은 초가 00이 되면 1감소
// 모두 00이 되면 종료
// 처음 선택 / 선택하고나서 시분초 계산
// 진행중인 시간이 있으면 start 버튼 이벤트 막기
startBtn.addEventListener('click',(e)=>{
    let cHour = showTimeEl.innerHTML === '' ? Number(hourEl.value) : Number(showTimeEl.innerText.split(' ')[0]);
    let cMin = showTimeEl.innerHTML === '' ? Number(minEl.value) : Number(showTimeEl.innerText.split(' ')[1]);
    let cSec = showTimeEl.innerHTML === '' ? Number(secEl.value) : Number(showTimeEl.innerText.split(' ')[2]);

    if(showTimeEl.innerHTML !== ''){
        alert('진행중인 시간이 있습니다');
        return false;
    }
    
    const start = setInterval(()=>{
        showTimeEl.innerHTML= `${cHour} ${cMin} ${cSec}`;
        if(cHour === 0 && cMin === 0 && cSec === 0){
            alert('종료되었습니다');
            showTimeEl.innerHTML = '';
            clearInterval(start);
        }
        else if(cMin === 0 && cSec === 0){
            cHour -= 1;
            cMin = 59;
            cSec = 59;
        }
        else if(cSec === 0){
            cMin -= 1;
            cSec = 59;
        }
        cSec -= 1;
        pauseBtn.addEventListener('click',()=>{
            clearInterval(start);
        });
        clearBtn.addEventListener('click',()=>{
            showTimeEl.innerHTML = '';
            clearInterval(start);
        })
    },1000)
});