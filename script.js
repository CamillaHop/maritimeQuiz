// ─────────────────────────────────────────────────────────────────
//  script.js — Quiz engine
//  Depends on: questions.js (must be loaded first)
// ─────────────────────────────────────────────────────────────────

(function () {
  // ── State ──────────────────────────────────────────────────────
  let deck = [];       // shuffled subset of questions
  let cur = 0;
  let score = 0;
  let answered = false;
  const history = [];  // { correct: bool, qIndex: number }

  // ── DOM refs ───────────────────────────────────────────────────
  const progressFill  = document.getElementById("progress-fill");
  const progressText  = document.getElementById("progress-text");
  const quizSection   = document.getElementById("quiz-section");
  const resultsSection= document.getElementById("results-section");
  const startSection  = document.getElementById("start-section");
  const totalCountEl  = document.getElementById("total-count");

  // ── Init ───────────────────────────────────────────────────────
  totalCountEl.textContent = QUESTIONS.length;
  document.getElementById("start-btn").addEventListener("click", startQuiz);
  document.getElementById("restart-btn").addEventListener("click", startQuiz);

  function startQuiz() {
    deck = shuffle([...QUESTIONS]);
    cur = 0; score = 0; answered = false;
    history.length = 0;
    startSection.classList.add("hidden");
    resultsSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    renderQuestion();
  }

  // ── Render a question ──────────────────────────────────────────
  function renderQuestion() {
    if (cur >= deck.length) { showResults(); return; }

    const q = deck[cur];
    const pct = Math.round((cur / deck.length) * 100);
    progressFill.style.width = pct + "%";
    progressText.textContent = `${cur + 1} / ${deck.length}`;

    // Tag
    document.getElementById("q-tag").textContent = q.tag;

    // Question text — preserve newlines
    document.getElementById("q-text").innerHTML = q.text
      .split("\n")
      .map(line => line.trim() === "" ? "<br>" : escHtml(line))
      .join("<br>");

    // Options
    const optsWrap = document.getElementById("options");
    optsWrap.innerHTML = "";
    const letters = "ABCDEF";
    q.opts.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.dataset.index = i;
      btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span class="opt-text">${escHtml(opt)}</span>`;
      btn.addEventListener("click", () => pick(i));
      optsWrap.appendChild(btn);
    });

    // Feedback
    const fb = document.getElementById("feedback");
    fb.className = "feedback hidden";
    fb.textContent = "";

    // Next button
    const nextBtn = document.getElementById("next-btn");
    nextBtn.classList.add("hidden");
    nextBtn.textContent = cur < deck.length - 1 ? "Next question →" : "See results →";
    nextBtn.onclick = () => { cur++; renderQuestion(); };

    answered = false;
  }

  // ── Handle answer selection ────────────────────────────────────
  function pick(chosen) {
    if (answered) return;
    answered = true;

    const q = deck[cur];
    const correct = chosen === q.correct;
    if (correct) score++;
    history.push({ correct, chosen, answer: q.correct });

    // Style buttons
    const btns = document.querySelectorAll(".option-btn");
    btns.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) {
        btn.classList.add(correct ? "correct" : "missed");
      } else if (i === chosen) {
        btn.classList.add("wrong");
      }
    });

    // Feedback
    const fb = document.getElementById("feedback");
    fb.className = "feedback " + (correct ? "correct" : "wrong");
    fb.textContent = (correct ? "✓  " : "✗  ") + (correct ? q.fb_correct : q.fb_wrong);

    document.getElementById("next-btn").classList.remove("hidden");
  }

  // ── Results screen ─────────────────────────────────────────────
  function showResults() {
    quizSection.classList.add("hidden");
    resultsSection.classList.remove("hidden");
    progressFill.style.width = "100%";
    progressText.textContent = `${deck.length} / ${deck.length}`;

    const pct = Math.round((score / deck.length) * 100);
    document.getElementById("score-big").textContent = `${score}/${deck.length}`;
    document.getElementById("score-pct").textContent = `${pct}%`;

    let msg = "";
    if (pct >= 87)      msg = "Outstanding — you're exam-ready on this topic.";
    else if (pct >= 62) msg = "Solid understanding. Review the questions you missed below.";
    else                msg = "Worth revisiting the set partitioning model and extensions carefully.";
    document.getElementById("score-msg").textContent = msg;

    // Breakdown list
    const list = document.getElementById("breakdown-list");
    list.innerHTML = "";
    history.forEach((h, i) => {
      const q = deck[i];
      const li = document.createElement("div");
      li.className = "breakdown-row " + (h.correct ? "row-correct" : "row-wrong");
      const shortQ = q.text.split("\n")[0].substring(0, 72) + (q.text.length > 72 ? "…" : "");
      li.innerHTML = `
        <span class="row-dot"></span>
        <span class="row-label">Q${i + 1}</span>
        <span class="row-q">${escHtml(shortQ)}</span>
        <span class="row-status">${h.correct ? "Correct" : "Incorrect"}</span>`;
      list.appendChild(li);
    });
  }

  // ── Helpers ────────────────────────────────────────────────────
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function escHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
