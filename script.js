// --- 31 FRASES SARCÁSTICAS E NEUTRAS ---
const sarcasmPhrases = [
    "Ah, resolveu aparecer? Achei que tivesse desistido ontem.",
    "Uau, um tique no checklist! Quer um troféu ou um abraço?",
    "Sério que esse é o seu progresso? Minha Ansiedade é mais produtiva.",
    "Miojo não é almoço e muito menos café da manhã. Tenha modos.",
    "Se preguiça desse dinheiro, você já estaria morando em um castelo.",
    "Desejando uma pessoa gostosa, mas com esse bucho enorme? Coragem.",
    "Seu crush esperava mais de você, mas a decepção é o que temos para hoje.",
    "Já tentou aprender outro idioma ou vai passar a vida no 'the book is on the table'?",
    "Já leu um livro na vida ou só legenda de post fútil no Instagram?",
    "Olha só, o herói do teclado resolveu marcar uma tarefa hoje. Milagre.",
    "Beber água não é exercício físico, é o mínimo para não murchar.",
    "Arrumar a cama conta como vitória? Que nível baixo de ambição o seu.",
    "Sua produtividade é igual sinal de Wi-Fi em dia de chuva: inexistente.",
    "Planejando o futuro ou só gastando o oxigênio que sobra dos outros?",
    "Essa sua 'responsabilidade' deve estar escondida em algum lugar bem profundo.",
    "Uau, levantou da cadeira! Cuidado para o corpo não entrar em choque.",
    "Mais um dia fingindo que trabalha. O Oscar de melhor atuação vai para você.",
    "Seu foco tem a duração de um vídeo do TikTok. Lamentável.",
    "A meta era ser alguém na vida, não o recordista mundial de procrastinação.",
    "Essa roupa de academia é para treinar ou só pra tirar foto no espelho?",
    "Tomar banho e vestir roupa limpa não é 'dia produtivo', é higiene básica.",
    "A inteligência te persegue, mas você é mais veloz que ela, né?",
    "Seu esforço é tão invisível que eu quase chamei um caça-fantasmas.",
    "Procurando motivação? Tenta olhar o saldo da sua conta bancária.",
    "Parabéns por fazer o mínimo! Quer que eu solte fogos ou chame a banda?",
    "Diz que quer uma vida de elite, mas tem hábitos de quem vive no modo soneca.",
    "Você chama isso de rotina? Eu chamo de desespero organizado.",
    "Cuidado, fazer duas tarefas no mesmo dia pode causar fadiga crônica.",
    "Sua força de vontade é mais frágil que tela de celular sem capinha.",
    "Mais uma semana sendo a personificação da derrota. Que orgulho.",
    "Sinceramente, se a sua vida fosse um livro, ninguém passaria da introdução."
];

// Rotina Padrão (Elite)
const eliteRoutine = [
    { name: 'Programming', done: false },
    { name: 'English', done: false },
    { name: 'Singing Class', done: false },
    { name: 'Drums', done: false },
    { name: 'Writing Book', done: false },
    { name: 'Gym', done: false },
    { name: 'Vocal Exercises', done: false }
];

// Banco de dados local
let db = JSON.parse(localStorage.getItem('habit_tracker_elite')) || {};
let activeDay = new Date().getDate();

// Inicialização
function init() {
    const now = new Date();
    const monthDisplay = document.getElementById('month-display');
    if(monthDisplay) {
        monthDisplay.innerText = now.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    }
    renderApp();
}

// Renderizador Principal
function renderApp() {
    renderCalendar();
    renderChecklist();
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    // 1. Cabeçalho dos dias da semana (Sun, Mon...)
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekDays.forEach(day => {
        const el = document.createElement('div');
        el.className = 'day-name';
        el.innerText = day;
        grid.appendChild(el);
    });

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // Descobre em qual dia da semana o mês começa
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 2. Espaços vazios para alinhar o dia 1
    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement('div'));
    }

    // 3. Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
        const dayTasks = db[i] || JSON.parse(JSON.stringify(eliteRoutine));
        const done = dayTasks.filter(t => t.done).length;
        const total = dayTasks.length;
        const perc = total > 0 ? (done / total) * 100 : 0;

        const box = document.createElement('div');
        box.className = 'day-box';
        box.innerText = i;
        
        // Destaque do dia ativo
        if (i === activeDay) {
            box.style.borderColor = "var(--gold)";
            box.style.boxShadow = "0 0 10px var(--gold)";
        }

        // Aplica Neons (Chocolate 100% / Tea 65%)
        if (perc === 100) box.classList.add('status-chocolate');
        else if (perc >= 65) box.classList.add('status-tea');

        box.onclick = () => { 
            activeDay = i; 
            // Troca a frase sarcástica ao clicar no dia
            const textElement = document.getElementById('sarcasm-text');
            if(textElement) {
                textElement.innerText = sarcasmPhrases[Math.floor(Math.random() * sarcasmPhrases.length)];
            }
            renderApp(); 
        };
        grid.appendChild(box);
    }
}

function renderChecklist() {
    const list = document.getElementById('task-list');
    const dayLabel = document.getElementById('day-label');
    const progressVal = document.getElementById('progress-val');
    
    if (!list || !dayLabel) return;
    
    list.innerHTML = '';
    dayLabel.innerText = `Day ${activeDay}`;
    
    // Se o dia não existir no banco, inicia com a rotina padrão
    if (!db[activeDay]) {
        db[activeDay] = JSON.parse(JSON.stringify(eliteRoutine));
    }

    // Ordenação: Itens não marcados em cima, feitos embaixo
    const sorted = [...db[activeDay]].map((t, i) => ({...t, originalIndex: i}))
                                     .sort((a, b) => a.done - b.done);

    sorted.forEach(task => {
        const item = document.createElement('div');
        item.className = 'task-item';
        item.innerHTML = `
            <span>
                <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${task.originalIndex})">
                <label style="${task.done ? 'text-decoration:line-through; opacity:0.5;' : ''}">
                    ${task.name}
                </label>
            </span>
            <span onclick="deleteTask(${task.originalIndex})" style="color:#ff4444; cursor:pointer; font-weight:bold; padding: 0 5px;">x</span>
        `;
        list.appendChild(item);
    });

    // Atualiza progresso
    const doneCount = db[activeDay].filter(t => t.done).length;
    const totalCount = db[activeDay].length;
    const perc = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
    if(progressVal) progressVal.innerText = perc + "%";
}

// Ações Globais
window.toggleTask = (index) => {
    db[activeDay][index].done = !db[activeDay][index].done;
    saveAndRefresh();
};

window.deleteTask = (index) => {
    db[activeDay].splice(index, 1);
    saveAndRefresh();
};

const addBtn = document.getElementById('add-btn');
if(addBtn) {
    addBtn.onclick = () => {
        const input = document.getElementById('new-task-input');
        if (input && input.value.trim()) {
            db[activeDay].push({ name: input.value.trim(), done: false });
            input.value = '';
            saveAndRefresh();
        }
    };
}

function saveAndRefresh() {
    localStorage.setItem('habit_tracker_elite', JSON.stringify(db));
    renderApp();
}

// Inicia o App
document.addEventListener('DOMContentLoaded', init);