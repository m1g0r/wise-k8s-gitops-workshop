const random = (min, max) => {
    return Math.floor(Math.random() * ( max - min ) + min);
};
const initialiseBlade = (num) => {
    gsap.set('#blade_'+num+'-1', {
        transformOrigin: 'center bottom'
    });
    gsap.set('#blade_'+num+'-2', {
        transformOrigin: 'right top'
    });
    gsap.set('#blade_'+num+'-3', {
        transformOrigin: 'left top'
    });
}
const initialiseWind = (num) => {
    gsap.set('#wind-1, #wind-2', {
        visibility: 'hidden',
    });
    if (num == 1) {
        gsap.set('#wind-1', {
            strokeDasharray: 250,
            strokeDashoffset: 250,
        });
    } else {
        gsap.set('#wind-2', {
            strokeDasharray: 230,
            strokeDashoffset: 230,
        });
    }
}
const initialiseBird = (num) => {
    gsap.set('#bird-1, #bird-2, #bird-3', {
        visibility: 'hidden',
    })
    gsap.set('#left-wing-'+num, {
        transformOrigin: 'right bottom',
    })
    gsap.set('#right-wing-'+num, {
        transformOrigin: 'left bottom',
    });
}
const rotateMill = (num) => {
    initialiseBlade(num);
    var tl = new gsap.timeline();
    tl.to('#blade_'+ num +'-1, #blade_'+ num +'-2, #blade_'+ num +'-3', {
        rotateZ: 360,
        duration: 3,
        ease: Linear.easeIn
    });
    tl.to('#blade_'+ num +'-1, #blade_'+ num +'-2, #blade_'+ num +'-3', {
        rotateZ: 720,
        duration: 1.7,
        repeat: 3,
        ease: Linear.easeOut
    });
    return tl;
}
const flowWind = (num, offset) => {
    initialiseWind(num);
    var fx = random(-100, 0);
    var tx = random(0, 100);
    var tl = new gsap.timeline();
    tl.set('#wind-'+num, {
        visibility: 'visible',
    });
    tl.fromTo('#wind-'+ num, {
        strokeDashoffset: offset,
        x: fx,
        opacity: 0,
    }, {
        x: tx,
        strokeDashoffset: 0,
        opacity: 0.4,
        duration: 1,
        ease: 'sine'
    }, 0);
    tl.fromTo('#wind-'+num, {
        strokeDashoffset: 0,
    }, {
        strokeDashoffset: -offset,
        duration: 1,
        ease: Linear.easeInOut,
    }, 0.6);
    return tl;
}

const flyBird = (id, rot, fr_x, fr_y, tr_x, tr_y) => {
    initialiseBird(id);
    var tl = new gsap.timeline({repeat: -1});
    tl.set('#bird-'+id, {
        visibility: 'visible',
    });
    tl.fromTo('#left-wing-'+id, {
        scale: 0.5,
    }, {
        rotateZ: rot,
        yoyo: true,
        repeat: 5,
        duration: 0.6,
        scale: 1,
    }, 0);
    tl.fromTo('#right-wing-'+id, {
        scale: 0.5
    }, {
        rotateZ: -rot,
        yoyo: true,
        repeat: 5,
        duration: 0.6,
        scale: 1,
    }, 0);
    tl.fromTo('#bird-'+id, {
        x: fr_x,
        y: fr_y,
        opacity: 1,
        scale: 1
    }, {
        x: tr_x,
        y: tr_y,
        scale: 0.8,
        duration: 9,
        opacity: 0.5,
        ease: Linear.easeOut,
    }, 0);
}
var master = new gsap.timeline({repeat: -1});
master.add('start');
master.add(rotateMill(1), 'start');
master.add(rotateMill(2), 'start');
master.add(rotateMill(3), 'start');
master.add(flowWind(1, 250), 'start+=2.6');
master.add(flowWind(2, 230), 'start+=3');

flyBird(1);
flyBird(2);
flyBird(3);
for(var i = 1; i<=3; i++){
    let rot = random(20, 40);
    let fr_x = random(-100, 0);
    let fr_y = random(0, 30);
    let tr_x = random(0, 100);
    let tr_y = random(-30, 0);
    flyBird(i, rot, fr_x, fr_y, tr_x, tr_y);
}
