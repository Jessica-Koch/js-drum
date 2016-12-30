const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 100; // 100px

function shadow (e){
    const { offsetWidth: width, offsetHeight: height } = hero;
    // use let because the value of the variable may have to change in if statement below
    let { offsetX: x, offsetY: y } = e;

    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

// if 100 is as high as we will go
    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7), 
        ${xWalk * -1}px ${yWalk}px 0 rgba(0, 255, 255, 0.7), 
        ${xWalk}px ${yWalk * -1}px 0 rgba(0, 255, 0, 0.7),
        ${xWalk * -1}px ${yWalk * -1}px 0 rgba(0, 0, 255, 0.7)`;
}

hero.addEventListener('mousemove', shadow);