const subjects = [
  // Nivel 1
  { id: "calculo1", nombre: "Cálculo I", requisitos: [] },
  { id: "quimica1", nombre: "Química I", requisitos: [] },
  { id: "etica", nombre: "Ética ciudadana", requisitos: [] },
  { id: "algebra", nombre: "Álgebra Lineal I", requisitos: [] },
  { id: "introGeo", nombre: "Intro. a las Geociencias", requisitos: [] },
  { id: "lenguaje", nombre: "Taller de Lenguaje", requisitos: [] },

  // Nivel 2
  { id: "calculo2", nombre: "Cálculo II", requisitos: ["calculo1", "algebra"] },
  { id: "fisica1", nombre: "Física I", requisitos: [] },
  { id: "geomDes", nombre: "Geometría Descriptiva", requisitos: [] },
  { id: "quimica2", nombre: "Química II", requisitos: ["quimica1"] },
  { id: "mineralogia1", nombre: "Mineralogía I", requisitos: ["introGeo"] },
  { id: "cultura", nombre: "Cultura Física y Deportiva", requisitos: [] },

  // Nivel 3
  { id: "calculo3", nombre: "Cálculo III", requisitos: ["calculo2"] },
  { id: "fisica2", nombre: "Física II", requisitos: ["calculo1"] },
  { id: "mineralogia2", nombre: "Mineralogía II", requisitos: ["mineralogia1"] },
  { id: "cartografia", nombre: "Cartografía", requisitos: ["geomDes"] },
  { id: "biologia", nombre: "Biología para Geólogos", requisitos: ["introGeo"] },
  { id: "ingles1", nombre: "Inglés I", requisitos: [] },

  // Nivel 4
  { id: "fisica3", nombre: "Física III", requisitos: ["calculo3", "fisica2"] },
  { id: "geofisicos", nombre: "Métodos Geofísicos", requisitos: ["fisica3"] },
  { id: "sedimento", nombre: "Sedimentología", requisitos: ["mineralogia2"] },
  { id: "paleo1", nombre: "Paleontología I", requisitos: ["biologia"] },
  { id: "ingles2", nombre: "Inglés II", requisitos: ["ingles1"] },

  // Nivel 5
  { id: "teledeteccion", nombre: "Teledetección", requisitos: ["geofisicos"] },
  { id: "petrologiaIgnea", nombre: "Petrología Ígnea", requisitos: ["sedimento"] },
  { id: "estratigrafia", nombre: "Estratigrafía", requisitos: ["paleo1"] },
  { id: "geomorfologia", nombre: "Geomorfología", requisitos: ["cartografia"] },
  { id: "estructura", nombre: "Geología Estructural", requisitos: ["cartografia"] },

  // Nivel 6
  { id: "sig", nombre: "SIG", requisitos: ["cartografia"] },
  { id: "histGeologica", nombre: "Geología Histórica", requisitos: ["estratigrafia"] },
  { id: "petroMetamorfica", nombre: "Petrología Metamórfica", requisitos: ["petrologiaIgnea"] },
  { id: "campo1", nombre: "Campo I", requisitos: ["estratigrafia"] },
  { id: "geoestadistica", nombre: "Geoestadística", requisitos: ["calculo3"] },
  { id: "contexto1", nombre: "Asignatura de Contexto 1", requisitos: [] },

  // Nivel 7
  { id: "hidro", nombre: "Hidrogeología", requisitos: ["petroMetamorfica"] },
  { id: "geoquimica", nombre: "Geoquímica", requisitos: ["petroMetamorfica"] },
  { id: "campo2", nombre: "Campo II", requisitos: ["campo1", "geoestadistica"] },
  { id: "analisisInst", nombre: "Análisis Instrumental", requisitos: ["campo1"] },
  { id: "contexto2", nombre: "Asignatura de Contexto 2", requisitos: [] },

  // Nivel 8
  { id: "ambiental", nombre: "Geología Ambiental", requisitos: ["geomorfologia"] },
  { id: "economiaGeo", nombre: "Economía Georecursos", requisitos: ["geoestadistica"] },
  { id: "yacimientos", nombre: "Yacimientos Minerales", requisitos: ["geoquimica"] },
  { id: "hidrocarburos", nombre: "Geología Hidrocarburos", requisitos: ["campo2"] },
  { id: "electiva1", nombre: "Electiva Profesional 1", requisitos: [] },

  // Nivel 9
  { id: "empresarial", nombre: "Dirección Empresarial I", requisitos: [] },
  { id: "trabajo1", nombre: "Trabajo de Grado I", requisitos: ["histGeologica"] },
  { id: "colombia", nombre: "Geología de Colombia", requisitos: ["hidrocarburos"] },
  { id: "electiva2", nombre: "Electiva Profesional 2", requisitos: [] },

  // Nivel 10
  { id: "trabajo2", nombre: "Trabajo de Grado II", requisitos: ["trabajo1"] }
];

const grid = document.getElementById('grid');

function crearCaja(ramo) {
  const div = document.createElement('div');
  div.className = 'subject locked';
  div.id = ramo.id;
  div.innerHTML = `<h3>${ramo.nombre}</h3>`;
  div.addEventListener('click', () => {
    div.classList.toggle('approved');
    actualizarEstados();
  });
  grid.appendChild(div);
}

function actualizarEstados() {
  subjects.forEach(ramo => {
    const elem = document.getElementById(ramo.id);
    const aprobados = Array.from(document.getElementsByClassName('approved')).map(e => e.id);
    const requisitosCumplidos = ramo.requisitos.every(r => aprobados.includes(r));

    if (requisitosCumplidos || elem.classList.contains('approved')) {
      elem.classList.remove('locked');
    } else {
      elem.classList.add('locked');
    }
  });
}

subjects.forEach(crearCaja);
actualizarEstados();

