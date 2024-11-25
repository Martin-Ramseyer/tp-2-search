document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  fetch("personas.json")
    .then((response) => response.json())
    .then((personas) => {
      const filteredPersonas = personas.filter(
        (persona) =>
          persona.nombre.toLowerCase().includes(query) ||
          persona.apellido.toLowerCase().includes(query)
      );
      displayPersonas(filteredPersonas);
    });
});

function displayPersonas(personas) {
  const personList = document.getElementById("person-list");
  personList.innerHTML = "";
  personas.sort((a, b) => {
    const nombreCompletoA = `${a.nombre} ${a.apellido}`.toLowerCase();
    const nombreCompletoB = `${b.nombre} ${b.apellido}`.toLowerCase();
    if (nombreCompletoA < nombreCompletoB) return -1;
    if (nombreCompletoA > nombreCompletoB) return 1;
    return 0;
  });

  personas.forEach((persona) => {
    const tr = document.createElement("tr");
    const tdNombre = document.createElement("td");
    const tdEstado = document.createElement("td");

    tdNombre.className = "py-2 px-4 border-b text-left w-2/3";
    tdEstado.className = "py-2 px-4 border-b text-left w-1/3";

    tdNombre.textContent = `${persona.nombre} ${persona.apellido}`;
    tdEstado.textContent = persona.estado;

    tr.appendChild(tdNombre);
    tr.appendChild(tdEstado);
    personList.appendChild(tr);
  });
}

fetch("personas.json")
  .then((response) => response.json())
  .then((personas) => displayPersonas(personas));
