const q = 5;
const pos = 5;

const respList = [];
const tmp = [];

const process = [
  {
    id: 1,
    name: "Nexus",
    cpu: 10,
    te: 0,
    cmx: 0,
    tr: 0,
  },
  {
    id: 2,
    name: "Codeblocks",
    cpu: 4,
    te: 0,
    cmx: 0,
    tr: 0,
  },
  {
    id: 3,
    name: "Calculadora",
    cpu: 8,
    te: 0,
    cmx: 0,
    tr: 0,
  },
  {
    id: 4,
    name: "Dev C++",
    cpu: 5,
    te: 0,
    cmx: 0,
    tr: 0,
  },
  {
    id: 5,
    name: "Reason",
    cpu: 12,
    te: 0,
    cmx: 0,
    tr: 0,
  },
];

function roundRobin() {
  //pasamos arreglo
  let lista = process;

  let ciclo = 1;
  let isComplete = false;
  let time = 0;

  while (!isComplete) {
    //primer recorrido
    for (let i = 0; i < lista.length; i++) {
      let ini = time;
      let val = lista[i];

      let m = { name: val.name };
      let pos = 0;

      //separamos
      pos = lista[i].id - 1;
      process[pos].te = parseInt(ini);

      if (val.cpu > q) {
        lista[i].cpu = parseInt(val.cpu - q);
        time += parseInt(q);
        m.cpu = ini + " -> " + time;
        m.ciclo = ciclo;
      } else if (val.cpu === q) {
        //cuando es igual
        lista[i].cpu = parseInt(val.cpu - q);
        time += parseInt(q);
        m.cpu = ini + " -> " + time;
        m.ciclo = ciclo;
      } else {
        //cuando es menor
        time += parseInt(lista[i].cpu);
        lista[i].cpu = 0;
        m.cpu = ini + " -> " + time;
        m.ciclo = ciclo;
      }
      process[pos].tr = parseInt(time);
      process[pos].cmx = ciclo;
      // data2.process[pos].te=(data2.process[pos].te-((ciclo)*data2.q)-data2.q );
      respList.push(m);
    }

    //aca
    let lfilt = lista.filter((v) => {
      return v.cpu > 0;
    });

    if (lfilt.length > 0) {
      isComplete = false;
      lista = lfilt;
    } else {
      isComplete = true;
    }
    ciclo++;
  }
}

roundRobin();
console.log(respList);
