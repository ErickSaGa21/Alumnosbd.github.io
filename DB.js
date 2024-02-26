function Alumno(nombre, apellidos, edad) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.calificaciones = [];
}

Alumno.prototype.agregarCalificacion = function(calificacion) {
    this.calificaciones.push(calificacion);
};
// Método para calcular el promedio del grupo
alumno.prototype.calcularPromedioGrupo = function(calificaciontotal) {
        var totalPromedios = 0;
        this.alumnos.forEach(function(alumno) {
            totalPromedios += alumno.calcularPromedio();
        });
        if (this.alumnos.length > 0) {
            return totalPromedios / this.alumnos.length;
        } else {
            return 'N/A';
        }
    };

Alumno.prototype.calcularPromedio = function() {
    if (this.calificaciones.length === 0) {
        return 'N/A';
    }
    //reduce es una funcion de los arrays para sumar el contenido del array
    let total = this.calificaciones.reduce(function(sum, calificacion) {
        return sum + calificacion;
    }, 0);
    return total / this.calificaciones.length;
};

function Grupo(nombre) {
    this.nombre = nombre;
    this.alumnos = [];
    this.calificaciontotal =[]; 
}
// Método para calcular el promedio del grupo
alumno.prototype.calcularPromedioGrupo = function(calificaciontotal) {
        var totalPromedios = 0;
        this.alumnos.forEach(function(alumno) {
            totalPromedios += alumno.calcularPromedio();
        });
        if (this.alumnos.length > 0) {
            return totalPromedios / this.alumnos.length;
        } else {
            return 'N/A';
        }
    };
Grupo.prototype.agregarAlumno = function(alumno) {
    this.alumnos.push(alumno);
};

Grupo.prototype.buscarAlumnoPorNombre = function(nombre) {
    return this.alumnos.find(function(alumno) {
        return alumno.nombre.toLowerCase() === nombre.toLowerCase();
    });
};

Grupo.prototype.buscarAlumnoPorApellido = function(apellido) {
    return this.alumnos.find(function(alumno) {
        return alumno.apellidos.toLowerCase() === apellido.toLowerCase();
    });
};

var grupos = [];

document.getElementById('btnAgregarGrupo').addEventListener('click', function() {
    var nombreGrupo = prompt("Ingrese el nombre del grupo:");
    if (nombreGrupo) {
        var grupo = new Grupo(nombreGrupo);
        grupos.push(grupo);
        guardarDatosEnLocalStorage();
        mostrarGrupos();
    }
});

document.getElementById('btnBuscarAlumno').addEventListener('click', function() {
    let nombreAlumnoBuscar = document.getElementById('nombreAlumnoBuscar').value.trim();
    if (nombreAlumnoBuscar !== '') {
        buscarAlumno(nombreAlumnoBuscar);
    } else {
        alert('Por favor ingrese un nombre de alumno.');
    }
});

document.getElementById('btnapellido').addEventListener('click', function() {
    let apellidoAlumnoBuscar = document.getElementById('apellidoAlumnoBuscar').value.trim();
    if (apellidoAlumnoBuscar !== '') {
        buscarApellido(apellidoAlumnoBuscar);
    } else {
        alert('Por favor ingrese un apellido de alumno.');
    }
});

function mostrarGrupos() {
    var gruposContainer = document.getElementById('gruposContainer');
    gruposContainer.innerHTML = '';

    grupos.forEach(function(grupo, index) {
        var grupoDiv = document.createElement('div');
        grupoDiv.classList.add('grupo-card');
        grupoDiv.innerHTML = '<h3>Grupo: ' + grupo.nombre + '</h3>';

        var agregarAlumnoBtn = document.createElement('button');
        agregarAlumnoBtn.textContent = 'Agregar Alumno';
        agregarAlumnoBtn.addEventListener('click', function() {
            agregarAlumnoAGrupo(grupo);
        });

        grupoDiv.appendChild(agregarAlumnoBtn);

        grupo.alumnos.forEach(function(alumno) {
            var alumnoDiv = document.createElement('div');
            alumnoDiv.classList.add('alumno-card');
            alumnoDiv.textContent = alumno.nombre + ' ' + alumno.apellidos;
            alumnoDiv.innerHTML += '<br><button onclick="agregarCalificacion(' + grupos.indexOf(grupo) + ',' + grupo.alumnos.indexOf(alumno) + ')">Agregar Calificación</button>';
            alumnoDiv.innerHTML += '<br>Calificaciones: ' + alumno.calificaciones.join(', ');
            alumnoDiv.innerHTML += '<br>Promedio: ' + alumno.calcularPromedio();
            grupoDiv.appendChild(alumnoDiv);
        });

        gruposContainer.appendChild(grupoDiv);
    });
}

function agregarAlumnoAGrupo(grupo) {
    var nombre = prompt("Ingrese el nombre del alumno:");
    var apellidos = prompt("Ingrese los apellidos del alumno:");
    var edad = parseInt(prompt("Ingrese la edad del alumno:"));
    var alumno = new Alumno(nombre, apellidos, edad);
    grupo.agregarAlumno(alumno);
    guardarDatosEnLocalStorage();
    mostrarGrupos();
}

function agregarCalificacion(indiceGrupo, indiceAlumno) {
    var calificacion = parseInt(prompt("Ingrese la calificación:"));
    if (!isNaN(calificacion)) {
        grupos[indiceGrupo].alumnos[indiceAlumno].agregarCalificacion(calificacion);
        guardarDatosEnLocalStorage();
        mostrarGrupos();
    } else {
        alert("Por favor ingrese un valor numérico válido.");
    }
}

function buscarAlumno(nombre) {
    let resultados = [];
    grupos.forEach(function(grupo) {
        var alumno = grupo.buscarAlumnoPorNombre(nombre);
        if (alumno) {
            resultados.push(alumno);
        }
    });

    if (resultados.length > 0) {
        var mensaje = 'Resultados para "' + nombre + '":\n';
        resultados.forEach(function(alumno) {
            mensaje += 'Nombre: ' + alumno.nombre + ' ' + alumno.apellidos + '\n';
            mensaje += 'Edad: ' + alumno.edad + '\n';
            mensaje += 'Calificaciones: ' + alumno.calificaciones.join(', ') + '\n';
            mensaje += 'Promedio: ' + alumno.calcularPromedio() + '\n\n';
        });
        alert(mensaje);
    } else {
        alert('No se encontraron resultados para "' + nombre + '".');
    }
}

function buscarapellido(apellido) {
    let resultados = [];
    grupos.forEach(function(grupo) {
        var alumno = grupo.buscarAlumnoPorApellido(apellido);
        if (alumno) {
            resultados.push(alumno);
        }
    });
    if (resultados.length > 0) {
        var mensaje = 'Resultados para "' + apellido + '":\n';
        resultados.forEach(function(alumno) {
            mensaje += 'Nombre: ' + alumno.nombre + ' ' + alumno.apellidos + '\n';
            mensaje += 'Edad: ' + alumno.edad + '\n';
            mensaje += 'Calificaciones: ' + alumno.calificaciones.join(', ') + '\n';
            mensaje += 'Promedio: ' + alumno.calcularPromedio() + '\n\n';
        });
        alert(mensaje);
    } else {
        alert('No se encontraron resultados para "' + apellido + '".');
    }
}