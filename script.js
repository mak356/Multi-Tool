// Notepad Logic
let notes = JSON.parse(localStorage.getItem('notes')) || [];
function saveToStorage() { localStorage.setItem('notes', JSON.stringify(notes)); }
function renderNotes(filter = '') {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = '';
  notes.filter(note => note.title.toLowerCase().includes(filter.toLowerCase()) ||
    note.content.toLowerCase().includes(filter.toLowerCase())).forEach((note, index) => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `<button class="delete-btn" onclick="deleteNote(${index})">&times;</button>
      <h2>${note.title}</h2><p>${note.content}</p>`;
    div.addEventListener('click', () => openNoteEditor(note));
    notesList.appendChild(div);
  });
}
function deleteNote(index) { notes.splice(index, 1); saveToStorage(); renderNotes(); }
function openNoteEditor(note) { document.getElementById('noteTitle').value = note.title; document.getElementById('noteContent').value = note.content; }
document.getElementById('saveNoteBtn').addEventListener('click', () => {
  const title = document.getElementById('noteTitle').value.trim();
  const content = document.getElementById('noteContent').value.trim();
  if (!title || !content) return alert('Enter a title and content.');
  notes.push({ title, content }); saveToStorage(); renderNotes(); document.getElementById('noteTitle').value = ''; document.getElementById('noteContent').value = '';
});

// Calculator Logic
function addToCalc(value) { document.getElementById('calcInput').value += value; }
function calculateResult() { try { document.getElementById('calcInput').value = eval(document.getElementById('calcInput').value); } catch { document.getElementById('calcInput').value = 'Error'; } }

// Unit Converter Logic
function convertUnits() {
  const value = parseFloat(document.getElementById('unitFrom').value);
  const conversions = { meters: { kilometers: value / 1000, miles: value * 0.000621371 }, kilometers: { meters: value * 1000, miles: value * 0.621371 }, miles: { meters: value / 0.000621371, kilometers: value / 0.621371 } };
  document.getElementById('unitTo').value = conversions[document.getElementById('unitFromType').value][document.getElementById('unitToType').value].toFixed(4);
}

// Timer Logic
let timerInterval;
function startTimer() {
  let time = parseInt(document.getElementById("timerInput").value, 10);
  if (isNaN(time) || time <= 0) return alert("Enter a valid time!");
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (time-- <= 0) { clearInterval(timerInterval); document.getElementById("timerDisplay").textContent = "00:00"; alert("Time's up!"); }
    else { document.getElementById("timerDisplay").textContent = `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`; }
  }, 1000);
}

// Tool Navigation Logic
function showTool(toolName) { document.querySelectorAll('main section').forEach(section => section.style.display = 'none'); document.getElementById(toolName).style.display = 'block'; }
