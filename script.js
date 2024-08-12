
function actual_activity(data,t){
    let nt = data.number;
    let t1 = t;
    t1 = t1 / 365 / data.half_life;
    // console.log(`nt ${nt} t1 ${t1}`);
    t1 = t1 * (-1)
    nt = (nt * (2 ** t1))
    // console.log(`nt la final gen ${nt}`)
    return nt;
}
function effi(data,A,T,nt){
    let eff = [];
    let result = data.eu
    for(let i = 0; i < result.length; i++){
        subdata = result[i];
        if (subdata[1] == 0){
            eff.push(0);
        }
        else{
            
            // console.log(`A ${A} nt ${nt} T${T} subdata${subdata}`)
            let x = (A / (nt * T * subdata[1] / 100))
            x = parseFloat(x.toFixed(4));
            eff.push(x);
        }
    }
    return eff
}
function energies(data){

    let energy = []
    let energies = data.eu;
    for (let i = 0; i < energies.length; i++){
        subdata = energies[i];
        energy.push(subdata[0]);
    }
    return energy
}
const now = new Date();
const then = new Date('2008-06-01T00:00:00Z');
let diff = now - then;
diff = diff / (1000 * 60 * 60 * 24);
diff = diff.toFixed(0);
let can_calculate = false;
fetch('data.json')

.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Parse JSON data
})
.then(jsonObject => {
    // console.log('JSON object:', jsonObject); //debug
    const result = transformData(jsonObject);
    document.querySelector('.B').addEventListener('input', function(){

        let A = parseFloat(document.querySelector('#area').value,10);
        let T = parseFloat(document.querySelector('#measuring-time').value,10);
        if (A > 0 && T > 0)
            can_calculate = true
        else
            can_calculate = false
        if (can_calculate == true){
    
            
            const eff=effi(result[0],A,T,actual_activity(result[0],diff))
            const energy = energies(result[0])
            let test1 = eff;
            test1.sort((a, b)=>b-a);
            // console.log(eff);
            // console.log(energy)
            let test2 = eff;
            test2 = test2.sort((a, b)=>a-b)

            // console.log(test2)
            // console.log(test1)
            for (let i = 0 ; i < eff.length; i++){
                if (test1[i] != 1){
                    biggest_number = test1[i];
                }
            }
            for (let i = 0 ; i < eff.length; i++){
                if (test1[i] != 1){
                    smallest_number = test1[i];
                    break;
                }
            }
            console.log(biggest_number,smallest_number)
            new Chart("myChart", {
                type: "line",
                data: {
                  labels: energy,
                  datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: eff
                  }]
                },
                options: {
                  legend: { display: false },
                  scales: {
                    yAxes: [{ type: 'logarithmic', ticks: { min: smallest_number, max: biggest_number } }],
                  }
                }
              });
            
        } 
    
    })
})



function transformData(jsonData) {
    // Initialize an empty array to hold the transformed objects
    let transformedArray = [];

    // Iterate over each key-value pair in the JSON object
    for (const [name, [number, half_life, eu]] of Object.entries(jsonData)) {
        // Create an object with the desired attributes
        const obj = {
            name: name,
            number: number,
            half_life: half_life,
            eu: eu
        };

        // Push the object to the array
        transformedArray.push(obj);
    }

    return transformedArray;
}



