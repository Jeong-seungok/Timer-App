const timerEl = document.querySelector('#timer');
const hourEl = document.querySelector('#hour');
const minEl = document.querySelector('#min');
const secEl = document.querySelector('#sec');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const clearBtn = document.querySelector('#clear');
const cHourEl = document.querySelector('#c-hour');
const cMinEl = document.querySelector('#c-min');
const cSecEl = document.querySelector('#c-sec');
let checkWork = true;
let startOn = false;

// (시)단위 선택목록 생성
for(let i=0;i<=24;i++){
    const optionEl = document.createElement('option');
    if(i<10){
        optionEl.value = `0${i}`;
        optionEl.innerText = `0${i}`;
    }
    else{
        optionEl.value = i;
        optionEl.innerText = i;
    }
    hour.append(optionEl);
}
// (분,초)단위 선택목록 생성
for(let i=0;i<60;i++){
    const optionEl = document.createElement('option');
    const option1El = document.createElement('option');
    
    if(i<10){
        optionEl.value = `0${i}`;
        option1El.value = `0${i}`;
        optionEl.innerText = `0${i}`;
        option1El.innerText = `0${i}`;
    }
    else{
        optionEl.value = i;
        option1El.value = i;
        optionEl.innerText = i;
        option1El.innerText = i;
    }
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
    e.preventDefault();
    let cHourValue = checkWork ? hourEl.value : cHourEl.innerText;
    let cMinValue = checkWork ? minEl.value : cMinEl.innerText;
    let cSecValue = checkWork ? secEl.value : cSecEl.innerText;

    cHourEl.innerText = cHourValue;
    cMinEl.innerText = cMinValue;
    cSecEl.innerText = cSecValue;

    if(startOn){
        alert('이미 실행중입니다.');
        return false;
    }

    const start =  setInterval(()=>{
        startOn = true;
        checkWork = false;
        // 시,분,초 모두 00이면 종료
        if(cHourEl.innerText === '00' && cMinEl.innerText === '00' && cSecEl.innerText === '00'){
            alert('Time completed!!');
            checkWork = true;
            clearInterval(start);
        }
        // 분,초 00이면 시-1
        else if(cMinEl.innerText === '00' && cSecEl.innerText === '00'){
            if(Number(cHourEl.innerText)<11)
                cHourEl.innerText = `0${Number(cHourEl.innerText)-1}`;
            else
                cHourEl.innerText = `${Number(cHourEl.innerText)-1}`;
            cMinEl.innerText = '59';
            cSecEl.innerText = '59';
        }
        // 초 00이면 분-1
        else if(cSecEl.innerText === '00'){
            if(Number(cMinEl.innerText)<11)
                cMinEl.innerText = `0${Number(cMinEl.innerText)-1}`;
            else
                cMinEl.innerText = `${Number(cMinEl.innerText)-1}`;
            cSecEl.innerText = '59';
        }
        // 그 외 경우 초만 -1
        else{
            if(Number(cSecEl.innerText)<11)
                cSecEl.innerText = `0${Number(cSecEl.innerText)-1}`;
            else
                cSecEl.innerText = `${Number(cSecEl.innerText)-1}`;
        }
        pauseBtn.addEventListener('click',()=>{
            startOn = false;
            clearInterval(start);
        });
        clearBtn.addEventListener('click',()=>{
            cHourEl.innerText = '00';
            cMinEl.innerText = '00';
            cSecEl.innerText = '00';
            checkWork = true;
            startOn = false;
            clearInterval(start);
        })
    },1000)
});
