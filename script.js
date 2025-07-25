// Objeto para almacenar el estado de los cursos
const coursesState = {};

// Inicializar el estado de todos los cursos
document.querySelectorAll('.course').forEach(course => {
    const courseId = course.getAttribute('data-course');
    coursesState[courseId] = {
        approved: false,
        element: course
    };
    
    // Si no está bloqueado, quitar la clase locked
    if (!course.classList.contains('locked')) {
        checkRequirements(courseId);
    }
});

// Función para alternar el estado de aprobación de un curso
function toggleCourse(courseId) {
    const course = coursesState[courseId];
    
    // No hacer nada si el curso está bloqueado
    if (course.element.classList.contains('locked') && !course.approved) {
        return;
    }
    
    // Cambiar estado
    course.approved = !course.approved;
    
    // Actualizar UI
    if (course.approved) {
        course.element.classList.add('approved', 'approved-animation');
        setTimeout(() => {
            course.element.classList.remove('approved-animation');
        }, 500);
    } else {
        course.element.classList.remove('approved');
    }
    
    // Verificar si este curso es requisito de otros
    checkDependents(courseId);
}

// Función para verificar si se cumplen los requisitos de un curso
function checkRequirements(courseId) {
    const courseElement = document.querySelector(`[data-course="${courseId}"]`);
    if (!courseElement) return;
    
    const requirements = courseElement.getAttribute('data-req');
    if (!requirements) {
        // Si no tiene requisitos, desbloquear
        courseElement.classList.remove('locked');
        return;
    }
    
    // Verificar si todos los requisitos están aprobados
    const reqs = requirements.split(',');
    const allApproved = reqs.every(req => coursesState[req]?.approved);
    
    if (allApproved) {
        courseElement.classList.remove('locked');
    } else {
        courseElement.classList.add('locked');
    }
}

// Función para verificar los cursos que dependen de este
function checkDependents(courseId) {
    document.querySelectorAll('.course').forEach(course => {
        const reqs = course.getAttribute('data-req');
        if (reqs && reqs.includes(courseId)) {
            checkRequirements(course.getAttribute('data-course'));
        }
    });
}

// Verificar requisitos iniciales para cursos no bloqueados
document.querySelectorAll('.course:not(.locked)').forEach(course => {
    checkRequirements(course.getAttribute('data-course'));
});
