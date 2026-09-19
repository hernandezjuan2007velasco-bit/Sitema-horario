/**
 * ==============================================================================
 * SISTEMA DE CONTROL DE ASISTENCIA SENA
 * Lógica interactiva en Vanilla JavaScript (100% Funcional y sin dependencias)
 * ==============================================================================
 */

// 1. ESTADO GLOBAL
const AppState = {
  currentUser: null,
  activeFicha: null,
  students: [], // Inicia vacía por defecto
  tableDensity: 'compact',
  searchQuery: '',
  currentView: 'attendance',
  TOTAL_SESSIONS_TRIMESTER: 40,
  CRITICAL_ABSENCE_THRESHOLD: 15.0,

  fichasCatalog: {
    '2670142': {
      id: '2670142',
      nombre: 'ADSO (Análisis y Desarrollo de Software)',
      jornada: 'Diurna (7:00 AM - 1:00 PM)',
      aprendices: [
        { id: 'AP-01', name: 'Acosta Morales Juan Esteban', docType: 'CC', doc: '1014298301', email: 'jeacosta@misena.edu.co', priorMissed: 2, status: 'present', checkIn: '06:58 AM' },
        { id: 'AP-02', name: 'Álvarez Rios Daniela Alejandra', docType: 'TI', doc: '1025874123', email: 'dalvarez@misena.edu.co', priorMissed: 1, status: 'present', checkIn: '07:02 AM' },
        { id: 'AP-03', name: 'Barajas Pinto Cristian David', docType: 'CC', doc: '1032489652', email: 'cdbarajas@misena.edu.co', priorMissed: 7, status: 'absent', checkIn: '--' },
        { id: 'AP-04', name: 'Bermúdez Castro Sara Sofía', docType: 'CC', doc: '1018956234', email: 'ssbermudez@misena.edu.co', priorMissed: 0, status: 'present', checkIn: '06:55 AM' },
        { id: 'AP-05', name: 'Cárdenas Silva Mateo Andrés', docType: 'CC', doc: '1029874156', email: 'macardenas@misena.edu.co', priorMissed: 3, status: 'late', checkIn: '07:22 AM' },
        { id: 'AP-06', name: 'Castillo López Valentina', docType: 'CC', doc: '1016548972', email: 'vcastillo@misena.edu.co', priorMissed: 1, status: 'present', checkIn: '07:05 AM' },
        { id: 'AP-07', name: 'Cruz Duarte Santiago José', docType: 'TI', doc: '1036985214', email: 'sjcruz@misena.edu.co', priorMissed: 6, status: 'absent', checkIn: '--' },
        { id: 'AP-08', name: 'Díaz Monroy Isabella María', docType: 'CC', doc: '1024789632', email: 'imdiaz@misena.edu.co', priorMissed: 2, status: 'present', checkIn: '07:01 AM' },
        { id: 'AP-09', name: 'Espitia Navarro Samuel David', docType: 'CC', doc: '1019874523', email: 'sdespitia@misena.edu.co', priorMissed: 0, status: 'present', checkIn: '06:50 AM' },
        { id: 'AP-10', name: 'Fajardo Quintero Laura Camila', docType: 'CC', doc: '1035789412', email: 'lcfajardo@misena.edu.co', priorMissed: 4, status: 'excused', checkIn: '--' },
        { id: 'AP-11', name: 'García Betancur Julián Camilo', docType: 'CC', doc: '1012365478', email: 'jcgarcia@misena.edu.co', priorMissed: 1, status: 'present', checkIn: '07:04 AM' },
        { id: 'AP-12', name: 'Gómez Ortiz Andrés Felipe', docType: 'CC', doc: '1027896541', email: 'afgomez@misena.edu.co', priorMissed: 2, status: 'present', checkIn: '06:59 AM' },
        { id: 'AP-13', name: 'Hernández Vera Mariana Lucía', docType: 'TI', doc: '1039874563', email: 'mlhernandez@misena.edu.co', priorMissed: 8, status: 'absent', checkIn: '--' },
        { id: 'AP-14', name: 'Ibarra Rojas Nicolás Alexander', docType: 'CC', doc: '1015698742', email: 'naibarra@misena.edu.co', priorMissed: 0, status: 'present', checkIn: '07:00 AM' },
        { id: 'AP-15', name: 'Jiménez Pardo Gabriela Paz', docType: 'CC', doc: '1021458963', email: 'gpjimenez@misena.edu.co', priorMissed: 3, status: 'present', checkIn: '07:08 AM' },
        { id: 'AP-16', name: 'Lara Méndez Kevin Alejandro', docType: 'CC', doc: '1038741259', email: 'kalara@misena.edu.co', priorMissed: 1, status: 'present', checkIn: '07:02 AM' },
        { id: 'AP-17', name: 'Martínez Galvis Paola Andrea', docType: 'CC', doc: '1013698521', email: 'pamartinez@misena.edu.co', priorMissed: 2, status: 'late', checkIn: '07:18 AM' },
        { id: 'AP-18', name: 'Medina Beltrán Diego Fernando', docType: 'CC', doc: '1026547893', email: 'dfmedina@misena.edu.co', priorMissed: 6, status: 'absent', checkIn: '--' },
        { id: 'AP-19', name: 'Molina Castro Natalia Elena', docType: 'TI', doc: '1034569871', email: 'nemolina@misena.edu.co', priorMissed: 0, status: 'present', checkIn: '06:48 AM' },
        { id: 'AP-20', name: 'Niño Palacios Sebastián Roy', docType: 'CC', doc: '1017894562', email: 'srnino@misena.edu.co', priorMissed: 2, status: 'present', checkIn: '07:06 AM' },
        { id: 'AP-21', name: 'Ochoa Forero Valeria Sophia', docType: 'CC', doc: '1028745632', email: 'vsochoa@misena.edu.co', priorMissed: 1, status: 'present', checkIn: '07:01 AM' },
        { id: 'AP-22', name: 'Parra Cifuentes Tomás Enrique', docType: 'CC', doc: '1031258974', email: 'teparra@misena.edu.co', priorMissed: 3, status: 'present', checkIn: '06:59 AM' },
        { id: 'AP-23', name: 'Quintero Vega Angie Katherine', docType: 'CC', doc: '1018745236', email: 'akquintero@misena.edu.co', priorMissed: 0, status: 'present', checkIn: '07:03 AM' },
        { id: 'AP-24', name: 'Ramírez Soler Juan Pablo', docType: 'CC', doc: '1023658974', email: 'jpramirez@misena.edu.co', priorMissed: 7, status: 'absent', checkIn: '--' },
        { id: 'AP-25', name: 'Reyes Henao Luisa Fernanda', docType: 'TI', doc: '1039871236', email: 'lfreyes@misena.edu.co', priorMissed: 1, status: 'present', checkIn: '07:09 AM' },
        { id: 'AP-26', name: 'Ríos Salcedo Brandon Alexis', docType: 'CC', doc: '1014563289', email: 'barios@misena.edu.co', priorMissed: 2, status: 'present', checkIn: '07:00 AM' },
        { id: 'AP-27', name: 'Sánchez Cárdenas Manuela', docType: 'CC', doc: '1029874125', email: 'msanchez@misena.edu.co', priorMissed: 0, status: 'present', checkIn: '06:52 AM' },
        { id: 'AP-28', name: 'Torres Silva María Camila', docType: 'CC', doc: '1036541289', email: 'mctorres@misena.edu.co', priorMissed: 2, status: 'present', checkIn: '07:07 AM' },
        { id: 'AP-29', name: 'Uribe Montoya Carlos Daniel', docType: 'CC', doc: '1012589634', email: 'cduribe@misena.edu.co', priorMissed: 1, status: 'present', checkIn: '07:03 AM' },
        { id: 'AP-30', name: 'Valencia Rincón Diana Marcela', docType: 'CC', doc: '1025896321', email: 'dmvalencia@misena.edu.co', priorMissed: 6, status: 'absent', checkIn: '--' },
        { id: 'AP-31', name: 'Vargas Peñuela Brayan Stiven', docType: 'CC', doc: '1034789521', email: 'bsvargas@misena.edu.co', priorMissed: 0, status: 'present', checkIn: '06:54 AM' },
        { id: 'AP-32', name: 'Velandia Ruiz Karen Julieth', docType: 'TI', doc: '1019632587', email: 'kjvelandia@misena.edu.co', priorMissed: 1, status: 'present', checkIn: '07:11 AM' },
        { id: 'AP-33', name: 'Villamizar Roa Johan Felipe', docType: 'CC', doc: '1028741963', email: 'jfvillamizar@misena.edu.co', priorMissed: 3, status: 'present', checkIn: '07:04 AM' },
        { id: 'AP-34', name: 'Yáñez Salgar Wendy Nicole', docType: 'CC', doc: '1035896412', email: 'wnyanez@misena.edu.co', priorMissed: 0, status: 'present', checkIn: '06:58 AM' },
        { id: 'AP-35', name: 'Zambrano Franco Oscar Javier', docType: 'CC', doc: '1014785236', email: 'ojzambrano@misena.edu.co', priorMissed: 2, status: 'present', checkIn: '07:01 AM' }
      ]
    },
    '2712984': {
      id: '2712984',
      nombre: 'Redes de Datos e Infraestructura',
      jornada: 'Mixta (1:00 PM - 7:00 PM)',
      aprendices: [
        { id: 'AP-R1', name: 'Agudelo Morales Felipe', docType: 'CC', doc: '1019876541', email: 'fagudelo@misena.edu.co', priorMissed: 2, status: 'present', checkIn: '01:02 PM' },
        { id: 'AP-R2', name: 'Bonilla Pérez Kelly Johana', docType: 'CC', doc: '1023456789', email: 'kjbonilla@misena.edu.co', priorMissed: 8, status: 'absent', checkIn: '--' }
      ]
    },
    '2821035': {
      id: '2821035',
      nombre: 'Animación y Contenidos Digitales',
      jornada: 'Nocturna (6:00 PM - 10:00 PM)',
      aprendices: [
        { id: 'AP-A1', name: 'Alzate Ríos Juan Manuel', docType: 'CC', doc: '1067891234', email: 'jmalzate@misena.edu.co', priorMissed: 1, status: 'present', checkIn: '05:58 PM' }
      ]
    }
  }
};

// 2. AUTENTICACIÓN
function switchAuthTab(tab) {
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const formLogin = document.getElementById('formLogin');
  const formRegister = document.getElementById('formRegister');

  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.classList.add('active');
    formRegister.classList.remove('active');
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.classList.add('active');
    formLogin.classList.remove('active');
  }
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const roleSelect = document.getElementById('loginRole');
  const roleText = roleSelect.options[roleSelect.selectedIndex].text;

  let userName = 'Instructor SENA';
  if (email.includes('@')) {
    const raw = email.split('@')[0].replace('.', ' ');
    userName = raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  AppState.currentUser = { name: userName, email: email, role: roleText };
  activateMainSession();
  showToast(`¡Bienvenido al sistema, ${userName}!`, 'success');
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const roleSelect = document.getElementById('regRole');
  const roleText = roleSelect.options[roleSelect.selectedIndex].text;

  AppState.currentUser = { name: name, email: email, role: roleText };
  activateMainSession();
  showToast(`Registro exitoso. Bienvenido, ${name}.`, 'success');
}

function activateMainSession() {
  document.getElementById('authScreen').style.display = 'none';
  document.getElementById('mainAppScreen').style.display = 'flex';
  document.getElementById('currentUserName').textContent = AppState.currentUser.name;
  document.getElementById('currentUserRole').textContent = AppState.currentUser.role;

  const initials = AppState.currentUser.name
    .split(' ')
    .map(n => n.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
  document.getElementById('currentUserInitial').textContent = initials || 'IN';

  const today = new Date();
  document.getElementById('currentDateText').textContent = today.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  updateAllViews();
}

function handleLogout() {
  if (!confirm('¿Está seguro de que desea cerrar la sesión actual?')) return;
  AppState.currentUser = null;
  AppState.activeFicha = null;
  AppState.students = [];

  document.getElementById('mainAppScreen').style.display = 'none';
  document.getElementById('authScreen').style.display = 'flex';
  showToast('Ha cerrado la sesión correctamente.', 'info');
}

// 3. CARGA DE FICHAS
function loadOfficialFicha(fichaId) {
  const fichaData = AppState.fichasCatalog[fichaId];
  if (!fichaData) return;

  AppState.activeFicha = fichaData;
  AppState.students = JSON.parse(JSON.stringify(fichaData.aprendices));
  document.getElementById('activeFichaText').textContent = `Ficha ${fichaData.id} - ${fichaData.nombre}`;

  updateAllViews();
  switchView('attendance');
  showToast(`Ficha ${fichaData.id} cargada exitosamente (${AppState.students.length} aprendices).`, 'success');
}

function clearCurrentFicha() {
  if (AppState.students.length === 0) {
    showToast('La tabla ya se encuentra vacía.', 'info');
    return;
  }
  if (!confirm('¿Desea vaciar la lista de asistencia activa?')) return;

  AppState.activeFicha = null;
  AppState.students = [];
  document.getElementById('activeFichaText').textContent = 'Sin Ficha Cargada';
  updateAllViews();
  showToast('Tabla de asistencia vaciada correctamente.', 'info');
}

function handleAddStudent(event) {
  event.preventDefault();
  const name = document.getElementById('newStudentName').value.trim();
  const docType = document.getElementById('newStudentDocType').value;
  const doc = document.getElementById('newStudentDoc').value.trim();
  const email = document.getElementById('newStudentEmail').value.trim();

  if (AppState.students.some(s => s.doc === doc)) {
    showToast(`El documento ${doc} ya existe en la lista activa.`, 'error');
    return;
  }

  const newStudent = {
    id: `AP-${AppState.students.length + 1}`,
    name: name,
    docType: docType,
    doc: doc,
    email: email,
    priorMissed: 0,
    status: 'present',
    checkIn: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true })
  };

  AppState.students.push(newStudent);

  if (!AppState.activeFicha) {
    AppState.activeFicha = { id: 'PERSONALIZADA', nombre: 'Ficha Personalizada en Sesión' };
    document.getElementById('activeFichaText').textContent = 'Ficha Personalizada';
  }

  document.getElementById('formAddStudent').reset();
  updateAllViews();
  showToast(`Aprendiz ${name} agregado con éxito a la lista.`, 'success');
}

// 4. CONTROL DE ASISTENCIA Y ALERTAS
function calculateAbsenceStats(student) {
  const todayAbsent = (student.status === 'absent') ? 1 : 0;
  const totalAbsences = student.priorMissed + todayAbsent;
  const percentage = ((totalAbsences / AppState.TOTAL_SESSIONS_TRIMESTER) * 100);
  const rounded = parseFloat(percentage.toFixed(1));
  const isCritical = rounded >= AppState.CRITICAL_ABSENCE_THRESHOLD;
  return { totalAbsences, percentage: rounded, isCritical };
}

function renderAttendanceTable() {
  const tbody = document.getElementById('attendanceTableBody');
  const countLabel = document.getElementById('tableRecordCount');
  if (!tbody) return;

  if (AppState.students.length === 0) {
    if (countLabel) countLabel.textContent = 'La tabla no contiene aprendices cargados.';
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-table-state">
            <div class="empty-state-icon">📋</div>
            <h3 class="empty-state-title">No hay aprendices en la lista de asistencia</h3>
            <p class="empty-state-desc">Para comenzar la jornada, diríjase a <strong>Carga de Fichas de Formación</strong> para seleccionar una ficha oficial o agregue aprendices manualmente.</p>
            <button class="btn btn-primary" onclick="switchView('fichas')">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              <span>Ir a Carga de Fichas de Formación</span>
            </button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  const query = AppState.searchQuery.toLowerCase().trim();
  const filtered = AppState.students.filter(s => {
    if (!query) return true;
    return s.name.toLowerCase().includes(query) || s.doc.includes(query) || s.email.toLowerCase().includes(query);
  });

  if (countLabel) countLabel.textContent = `Mostrando ${filtered.length} de ${AppState.students.length} aprendices en lista`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">No se encontraron coincidencias para "${AppState.searchQuery}".</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((student, index) => {
    const stats = calculateAbsenceStats(student);
    const initial = student.name.charAt(0);
    const criticalRowClass = stats.isCritical ? 'critical-row' : '';

    let progressColor = 'progress-low';
    if (stats.percentage >= 15) progressColor = 'progress-critical';
    else if (stats.percentage >= 10) progressColor = 'progress-medium';

    return `
      <tr class="${criticalRowClass}">
        <td style="color: var(--text-muted); font-weight: 600;">${index + 1}</td>
        <td>
          <div class="student-info-flex">
            <span class="student-avatar-inline">${initial}</span>
            <div>
              <div class="student-cell-name">${student.name}</div>
              <div class="student-cell-email">${student.email}</div>
            </div>
          </div>
        </td>
        <td>
          <span style="font-weight: 600; font-size: 0.85rem;">${student.doc}</span>
          <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${student.docType}</span>
        </td>
        <td>
          <span style="font-size: 0.84rem; font-weight: 500;">${student.checkIn}</span>
          <span style="display: block; font-size: 0.7rem; color: var(--text-muted);">${student.status === 'present' ? '✓ Asistió' : (student.status === 'late' ? '⏱ Retardo' : '--')}</span>
        </td>
        <td>
          <div class="absence-stat-block">
            <div class="absence-header-info">
              <span>${stats.totalAbsences} fallas (${stats.percentage}%)</span>
              <span style="color: ${stats.isCritical ? '#dc2626' : 'var(--text-muted)'}; font-size: 0.7rem;">Límite 15%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill ${progressColor}" style="width: ${Math.min(stats.percentage * 4, 100)}%;"></div>
            </div>
            ${stats.isCritical ? '<div class="badge-alert-15">⚠️ Más del 15% de Fallas</div>' : ''}
          </div>
        </td>
        <td>
          <div class="status-btn-group">
            <button type="button" class="btn-status-toggle ${student.status === 'present' ? 'active-present' : ''}" onclick="changeStudentStatus('${student.doc}', 'present')">✓ Asistió</button>
            <button type="button" class="btn-status-toggle ${student.status === 'absent' ? 'active-absent' : ''}" onclick="changeStudentStatus('${student.doc}', 'absent')">✗ Faltó</button>
            <button type="button" class="btn-status-toggle ${student.status === 'late' ? 'active-late' : ''}" onclick="changeStudentStatus('${student.doc}', 'late')">⏱ Retardo</button>
            <button type="button" class="btn-status-toggle ${student.status === 'excused' ? 'active-excused' : ''}" onclick="changeStudentStatus('${student.doc}', 'excused')">✉ Excusado</button>
          </div>
        </td>
        <td style="text-align: center;">
          <button class="btn btn-outline btn-sm" onclick="removeStudent('${student.doc}')" title="Quitar">&times;</button>
        </td>
      </tr>
    `;
  }).join('');
}

function changeStudentStatus(doc, newStatus) {
  const student = AppState.students.find(s => s.doc === doc);
  if (!student) return;

  student.status = newStatus;
  if (newStatus === 'present' || newStatus === 'late') {
    student.checkIn = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });
  } else {
    student.checkIn = '--';
  }

  const stats = calculateAbsenceStats(student);
  if (stats.isCritical && newStatus === 'absent') {
    showToast(`⚠️ Atención: ${student.name} superó el 15% de fallas permitidas.`, 'warning');
  }

  updateAllViews();
}

function removeStudent(doc) {
  const index = AppState.students.findIndex(s => s.doc === doc);
  if (index !== -1) {
    const name = AppState.students[index].name;
    AppState.students.splice(index, 1);
    updateAllViews();
    showToast(`Aprendiz ${name} retirado de la lista.`, 'info');
  }
}

function markAllPresent() {
  if (AppState.students.length === 0) {
    showToast('No hay aprendices en la tabla para marcar asistencia.', 'warning');
    return;
  }
  const time = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });
  AppState.students.forEach(s => { s.status = 'present'; s.checkIn = time; });
  updateAllViews();
  showToast(`Asistencia confirmada para ${AppState.students.length} aprendices.`, 'success');
}

function resetTodayAttendance() {
  if (AppState.students.length === 0) return;
  if (!confirm('¿Desea reiniciar el estado de asistencia de hoy para todos los aprendices?')) return;
  AppState.students.forEach(s => { s.status = 'absent'; s.checkIn = '--'; });
  updateAllViews();
  showToast('Se ha reiniciado el registro de la jornada.', 'info');
}

function updateKPIs() {
  const total = AppState.students.length;
  const present = AppState.students.filter(s => s.status === 'present').length;
  const lateOrExcused = AppState.students.filter(s => s.status === 'late' || s.status === 'excused').length;
  const critical = AppState.students.filter(s => calculateAbsenceStats(s).isCritical).length;

  document.getElementById('kpiTotalStudents').textContent = total;
  document.getElementById('kpiPresent').textContent = present;
  document.getElementById('kpiLateExcused').textContent = lateOrExcused;
  document.getElementById('kpiCriticalAbsences').textContent = critical;
}

// 5. ESCÁNER QR
function playScannerBeep(type = 'success') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } else {
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {}
}

function processScanCode(code) {
  const cleanCode = (code || '').trim();
  if (!cleanCode) {
    showToast('Por favor ingrese o escanee un documento.', 'warning');
    return false;
  }
  if (AppState.students.length === 0) {
    showToast('Debe cargar una ficha antes de registrar asistencia por QR.', 'warning');
    return false;
  }

  const student = AppState.students.find(s => s.doc === cleanCode || s.id.toLowerCase() === cleanCode.toLowerCase());
  if (!student) {
    playScannerBeep('error');
    addScanLog(`[No Encontrado] Documento '${cleanCode}' no pertenece a la ficha activa.`, 'log-warning');
    showToast(`El documento ${cleanCode} no se encuentra en la lista activa.`, 'error');
    return false;
  }

  const timeString = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });
  student.status = 'present';
  student.checkIn = timeString;

  playScannerBeep('success');
  addScanLog(`[Registrado] ${student.name} (${student.doc}) a las ${timeString}`, 'log-success');
  showToast(`¡Asistencia registrada! ${student.name} (${timeString})`, 'success');

  updateAllViews();
  return true;
}

function executeScanManual() {
  const input = document.getElementById('barcodeInput');
  if (!input) return;
  if (processScanCode(input.value)) input.value = '';
}

function addScanLog(message, cssClass = 'log-info') {
  const list = document.getElementById('scanLogList');
  if (!list) return;
  const entry = document.createElement('div');
  entry.className = `log-entry ${cssClass}`;
  entry.textContent = message;
  list.prepend(entry);
}

function renderQrQuickSimulationCards() {
  const container = document.getElementById('qrQuickCardsContainer');
  const helperText = document.getElementById('qrSimulationHelperText');
  if (!container) return;

  if (AppState.students.length === 0) {
    if (helperText) helperText.textContent = 'No hay aprendices cargados actualmente en la ficha.';
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 1.5rem; background: var(--bg-app); border-radius: 6px;">
        <p style="color: var(--text-muted); font-size: 0.85rem;">Cargue una ficha para habilitar la simulación de carnés.</p>
        <button class="btn btn-outline btn-sm" style="margin-top: 0.5rem;" onclick="switchView('fichas')">Cargar Ficha</button>
      </div>`;
    return;
  }

  if (helperText) helperText.textContent = 'Haga clic sobre cualquiera de los siguientes aprendices para simular el escaneo de su carné:';
  container.innerHTML = AppState.students.slice(0, 10).map(s => `
    <div class="quick-card" onclick="processScanCode('${s.doc}')" title="Simular escaneo de ${s.name}">
      <span class="quick-card-name">${s.name}</span>
      <span class="quick-card-doc">${s.docType} ${s.doc} | ${s.status === 'present' ? '✓ Asistió' : 'Pendiente'}</span>
    </div>
  `).join('');
}

// 6. DENSIDAD ADAPTATIVA
function setTableDensity(mode) {
  AppState.tableDensity = mode;
  const table = document.getElementById('attendanceTable');
  const btnCompact = document.getElementById('btnDensityCompact');
  const btnComfortable = document.getElementById('btnDensityComfortable');

  if (!table || !btnCompact || !btnComfortable) return;

  if (mode === 'compact') {
    table.classList.remove('density-comfortable');
    table.classList.add('density-compact');
    btnCompact.classList.add('active');
    btnComfortable.classList.remove('active');
    showToast('Vista Compacta: Optimizada para pantallas de computador.', 'info');
  } else {
    table.classList.remove('density-compact');
    table.classList.add('density-comfortable');
    btnComfortable.classList.add('active');
    btnCompact.classList.remove('active');
    showToast('Vista Cómoda: Botones amplios y táctiles para celulares y tabletas.', 'info');
  }
}

// 7. REPORTES CSV
function exportAttendanceCSV() {
  if (AppState.students.length === 0) {
    showToast('No hay datos de aprendices para exportar en este momento.', 'warning');
    return;
  }

  const fichaName = AppState.activeFicha ? `${AppState.activeFicha.id} - ${AppState.activeFicha.nombre}` : 'Sesion_Personalizada';
  const dateStr = new Date().toLocaleDateString('es-CO').replace(/\//g, '-');

  let csv = '\uFEFF';
  csv += `SERVICIO NACIONAL DE APRENDIZAJE - SENA\r\n`;
  csv += `REPORTE CONSOLIDADO DE ASISTENCIA\r\n`;
  csv += `Ficha de Formacion:;${fichaName}\r\n`;
  csv += `Docente/Instructor:;${AppState.currentUser ? AppState.currentUser.name : 'Instructor SENA'}\r\n`;
  csv += `Fecha de Generacion:;${new Date().toLocaleString('es-CO')}\r\n\r\n`;
  csv += `Indice;Aprendiz;Tipo Documento;Numero Documento;Correo Institucional;Estado Hoy;Hora Registro;Fallas Acumuladas;Porcentaje Fallas;Estado del Aprendiz\r\n`;

  AppState.students.forEach((s, i) => {
    const stats = calculateAbsenceStats(s);
    const alertText = stats.isCritical ? 'EN RIESGO (>15% DE INASISTENCIAS)' : 'REGULAR';
    const statusMap = { present: 'Asistió', absent: 'Faltó', late: 'Retardo', excused: 'Excusado' };
    csv += `"${i + 1}";"${s.name}";"${s.docType}";"${s.doc}";"${s.email}";"${statusMap[s.status] || s.status}";"${s.checkIn}";"${stats.totalAbsences}";"${stats.percentage}%";"${alertText}"\r\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SENA_Asistencia_${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showToast('Archivo CSV generado y descargado exitosamente.', 'success');
}

function updateReportSummary() {
  const container = document.getElementById('reportSummaryList');
  if (!container) return;

  if (AppState.students.length === 0) {
    container.innerHTML = `<div class="empty-state-text">No hay ficha cargada en la sesión actual.</div>`;
    return;
  }

  const total = AppState.students.length;
  const present = AppState.students.filter(s => s.status === 'present').length;
  const absent = AppState.students.filter(s => s.status === 'absent').length;
  const late = AppState.students.filter(s => s.status === 'late').length;
  const excused = AppState.students.filter(s => s.status === 'excused').length;
  const critical = AppState.students.filter(s => calculateAbsenceStats(s).isCritical).length;
  const rate = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

  container.innerHTML = `
    <div class="report-summary-row"><span>Ficha Activa:</span><strong>${AppState.activeFicha ? AppState.activeFicha.nombre : 'Personalizada'}</strong></div>
    <div class="report-summary-row"><span>Porcentaje de Asistencia Hoy:</span><strong style="color: var(--sena-green); font-size: 1.05rem;">${rate}% (${present} de ${total})</strong></div>
    <div class="report-summary-row"><span>Inasistencias:</span><strong style="color: var(--status-absent);">${absent}</strong></div>
    <div class="report-summary-row"><span>Retardos:</span><strong style="color: var(--status-late);">${late}</strong></div>
    <div class="report-summary-row"><span>Fallas justificadas:</span><strong style="color: var(--status-excused);">${excused}</strong></div>
    <div class="report-summary-row" style="background: #fee2e2;"><span style="color: #991b1b; font-weight: 600;">Casos en Riesgo (>15%):</span><strong style="color: #dc2626;">${critical} aprendices</strong></div>
  `;
}

// 8. NAVEGACIÓN Y DRAWER
function toggleDrawer() {
  const drawer = document.getElementById('appDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (window.innerWidth <= 768) {
    drawer.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
  } else {
    document.body.classList.toggle('drawer-collapsed');
  }
}

function switchView(viewName, event) {
  if (event) event.preventDefault();
  AppState.currentView = viewName;

  document.querySelectorAll('.drawer-nav .nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-view') === viewName);
  });

  const viewMap = {
    attendance: 'viewAttendance',
    qr: 'viewQr',
    fichas: 'viewFichas',
    reports: 'viewReports'
  };

  const titleMap = {
    attendance: 'Control de Asistencia',
    qr: 'Registro de Código QR',
    fichas: 'Carga de Fichas de Formación',
    reports: 'Generación de Reportes'
  };

  document.querySelectorAll('.content-view').forEach(v => v.classList.remove('active'));
  const activeElem = document.getElementById(viewMap[viewName]);
  if (activeElem) activeElem.classList.add('active');

  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = titleMap[viewName] || 'Control de Asistencia';

  if (window.innerWidth <= 768) {
    document.getElementById('appDrawer').classList.remove('mobile-open');
    document.getElementById('drawerOverlay').classList.remove('active');
  }

  if (viewName === 'qr') renderQrQuickSimulationCards();
  if (viewName === 'reports') updateReportSummary();
}

function onSearchInput() {
  const input = document.getElementById('studentSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  if (!input) return;
  AppState.searchQuery = input.value;
  if (clearBtn) clearBtn.style.display = input.value ? 'block' : 'none';
  renderAttendanceTable();
}

function clearSearch() {
  const input = document.getElementById('studentSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  if (input) input.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  AppState.searchQuery = '';
  renderAttendanceTable();
}

function updateAllViews() {
  renderAttendanceTable();
  updateKPIs();
  renderQrQuickSimulationCards();
  updateReportSummary();
}

// 9. TOAST
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span><button style="background:none;border:none;cursor:pointer;color:inherit;font-size:1.2rem;" onclick="this.parentElement.remove()">&times;</button>`;
  container.appendChild(toast);
  setTimeout(() => { if (toast.parentElement) toast.remove(); }, 4000);
}
