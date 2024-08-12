'use strict'

let B_type = 0;
let T_type = 0;
let wu;
let first;
let can_calculate = false;
let can_calculate_B = false;

document.querySelector('#B-type').addEventListener('input', function(){

    B_type = document.querySelector('#B-type').value;
    const errorMessage = document.querySelector('#error-message');
    if (B_type[1] > 5 || B_type[1] == undefined || B_type[2]!= undefined || (B_type[0] != "e" && B_type[0] != "E" && B_type[0] != "M" && B_type[0] != "m")){
        errorMessage.style.display = 'inline';
        can_calculate_B = false;
    } 
    else {
        document.querySelector('.type-of-B').textContent = "B(" + B_type + ")";
        errorMessage.style.display = 'none';
        can_calculate_B = true;
    }

})

document.querySelector('#T-type').addEventListener('input', function(){

    T_type = document.querySelector('#T-type').value;
    const errorMessage = document.querySelector('#error-message-T');
    if (T_type[1] > 5 || T_type[1] == undefined || T_type[2]!= undefined || (T_type[0] != "e" && T_type[0] != "E" && T_type[0] != "M" && T_type[0] != "m")){
        errorMessage.style.display = 'inline';
        can_calculate = false;
    }
    else{
        errorMessage.style.display = 'none';
        can_calculate = true;
    }

})

document.querySelector('.type-option').addEventListener('change', function(){

    let B = document.querySelector('.B');
    let T = document.querySelector('.T');
    if (document.querySelector('#check-B').checked){
        B.style.display = 'block';
        T.style.display = 'none';
        first = 1;
    }
    else{
        B.style.display = 'none';
        T.style.display = 'block';
        first = 0;
        
    }

})

document.querySelector('#Weisskopf').addEventListener('input', function(){

    wu = document.querySelector('input[name=wu]:checked').value;
    
})

document.querySelector('.B').addEventListener('input', function(){

    if (can_calculate == true){

        let T12 = parseFloat(document.querySelector('#lifetime').value,10);
        let ep = parseFloat(document.querySelector('#ep').value,10);
        let em = parseFloat(document.querySelector('#em').value,10);
        const um = 10 ** (-12);
        T12 = T12 * um;
        ep = ep * um;
        em = em * um;
        let T = T12;
        let A = parseFloat(document.querySelector('#mass').value,10);
        let Energy = parseFloat(document.querySelector('#energy').value,10);
        Energy = Energy / 1000;
        let coefficient = parseFloat(document.querySelector('#coefficient').value,10);
        let mu = T_type.toUpperCase();
        if (mu == "E1")
            formula(T,1.587,15,Energy,3,6.446,-2,A,0.6666666667,ep,em,mu,coefficient);
        else if (mu == "E2")
                formula(T,1.223,9,Energy,5,5.940,-2,A,1.3333333333,ep,em,mu,coefficient);
        else if (mu == "E3")
            formula(T,5.698,2,Energy,7,5.940,-2,A,2,ep,em,mu,coefficient);
        else if (mu == "E4")
            formula(T,1.694,-4,Energy,9,6.285,-2,A,2.6666666667,ep,em,mu,coefficient);
        else if (mu == "E5")
            formula(T,3.451,-11,Energy,11,6.928,-2,A,3.333333,ep,em,mu,coefficient);
        else if (mu == "M1")
            formula(T,1.779,13,Energy,3,1.790,0,A,0,ep,em,mu,coefficient);
        else if (mu == "M2")
            formula(T,1.371,7,Energy,5,1.650,0,A,0.6666666667,ep,em,mu,coefficient);
        else if (mu == "M3")
            formula(T,6.387,0,Energy,7,1.650,0,A,1.3333333333,ep,em,mu,coefficient);
        else if (mu == "M4")
            formula(T,1.899,-6,Energy,9,1.746,0,A,2,ep,em,mu,coefficient);
        else if (mu == "M5")
            formula(T,3.868,-13,Energy,11,1.924,0,A,2.6666666667,ep,em,mu,coefficient);

    } 

})

document.querySelector('.T').addEventListener('input', function(){

    let T;
    let T12;
    if (can_calculate_B){

        let BE = parseFloat(document.querySelector('#bx').value,10);
        let A = parseFloat(document.querySelector('#mass2').value,10);
        let E = parseFloat(document.querySelector('#energy2').value,10);
        E = E / 1000;
        let mu = B_type.toUpperCase();
        let P;
        if (wu == "no"){
            if (mu == "E1"){
                P = 1.587 * (10 ** 15) * (E ** 3) * BE;
            }
            else if (mu == "E2"){
                P = 1.223 * (10 ** 9) * (E ** 5) * BE;
            }
            else if (mu == "E3"){
                P = 5.698 * (10 ** 2) * (E ** 7) * BE;
            }
            else if (mu == "E4"){
                P = 1.694 * (10 ** -4) * (E ** 9) * BE;
            }
            else if (mu == "E5"){
                P = 3.451 * (10 ** -11) * (E ** 11) * BE;
            }
            else if (mu == "M1"){
                P = 1.779 * (10 ** 13) * (E ** 3) * BE;
            }
            else if (mu == "M2"){
                P = 1.371 * (10 ** 7) * (E ** 5) * BE;
            }
            else if (mu == "M3"){
                P = 6.387 * (E ** 7) * BE;
            }
            else if (mu == "M4"){
                P = 1.899 * (10 ** -6) * (E ** 9) * BE;
            }
            else if (mu == "M5"){
                P = 3.868 * (10 ** -13) * (E ** 11) * BE;
            }
        }
        else{
            if (mu == "E1"){
                P = 1.587 * (10 ** 15) * (E ** 3) * BE * 6.446 * (10 ** -2) * (A ** 0.66666666);
            }
            else if (mu == "E2"){
                P = 1.223 * (10 ** 9) * (E ** 5) * BE * 5.940 * (10 ** -2) * (A ** 1.3333333);
            }
            else if (mu == "E3"){
                P = 5.698 * (10 ** 2) * (E ** 7) * BE * 5.940 * (10 ** -2) * (A ** 2);
            }
            else if (mu == "E4"){
                P = 1.694 * (10 ** -4) * (E ** 9) * BE * 6.285 * (10 ** -2) * (A ** 2.66666666);
            }
            else if (mu == "E5"){
                P = 3.451 * (10 ** -11) * (E ** 11) * BE * 6.928 * (10 ** -2) * (A ** 3.333333);
            }
            else if (mu == "M1"){
                P = 1.779 * (10 ** 13) * (E ** 3) * BE * 1.790;
            }
            else if (mu == "M2"){
                P = 1.371 * (10 ** 7) * (E ** 5) * BE * 1.650 * (A ** 0.66666666);
            }
            else if (mu == "M3"){
                P = 6.387 * (E ** 7) * BE * 1650 * (A ** 1.3333333);
            }
            else if (mu == "M4"){
                P = 1.899 * (10 ** -6) * (E ** 9) * BE * 1.746 * (A ** 2);

            }
            else if (mu == "M5"){
                P = 3.868 * (10 ** -13) * (E ** 11) * BE * 1.924 * (A ** 2.6666666);
            }
        }
        T = 1 / P;
        T12 = T * 0.69314718056;

    }
    let result1 = unitateMasura(T);
    if (result1.y == undefined) result1.y = "";
    document.querySelector('#t1').textContent = `Mean lifetime: ${result1.x} ${result1.y}s`;
    let result2 = unitateMasura(T12);
    if (result2.y == undefined) result2.y = "";
    document.querySelector('#t2').textContent = `Halflife: ${result2.x} ${result2.y}s`;
})

function formula (T, p1, p2, E, p3, p4, p5, A, p6, ep, em, mu, cc){

    let BE, BEWU, BEWUCC;
    let eBE, eWU, dBE, dWU, eWUCC;
    let x = 1;

    BE = 1 / T / p1 / (10 ** p2) / (E ** p3);
    BEWU = BE / p4 / (10 ** p5) / (A ** p6);
    BEWUCC = BEWU / (1 + cc);
    dBE = 1 / (T ** 2) / p1 / (10 ** p2) / (E ** p3);
    eBE = Math.sqrt((dBE ** 2) * (ep ** 2));
    dWU = dBE / p4 / (10 ** p5) / (A ** p6);
    eWU = Math.sqrt((dWU ** 2) * (ep ** 2));
    eWUCC = eWU / (1 + cc);
    
    BE = BE.toFixed(7);
    BEWU = BEWU.toFixed(7);
    BEWUCC = BEWUCC;
    dBE = dBE.toFixed(7);
    eBE = eBE.toFixed(7);
    dWU = dWU.toFixed(7);
    eWU = eWU.toFixed(7);
    eWUCC = eWUCC.toFixed(7);

    document.querySelector('#b1').textContent = `${mu}: (e^2fm^4)  ${BE}  ± ${eBE}`;
    document.querySelector('#b2').textContent = `${mu}: (w.u.)  ${BEWU} ± ${eWU}`;
    document.querySelector('#b3').textContent = `${mu}: (w.u.)(cc)  ${BEWUCC} ± ${eWUCC}`;

}

function unitateMasura(input) {
    let x;
    let y;
    const um = [' ', 'm', 'u', 'n', 'p', 'f'];
    const exponent = Math.floor(Math.log10(Math.abs(input)));
    y = Math.floor(Math.abs((exponent - (exponent % 3)) / 3) + 1);
    const mantissa = input / Math.pow(10, exponent - 1);
    x = mantissa * Math.pow(10, 2 - Math.abs(exponent) % 3);
    return {
        x: x.toFixed(2), 
        y: um[y]        
    };
  }
