# Maritime Routing & Scheduling Quiz

A small browser quiz for the NTNU course **TIØ4150 – Operations Research**, focused on tramp and industrial ship routing, the set partitioning (path flow) model, and extensions like ECA, speed optimisation, flexible cargo sizes and split loads.

## Run it
1. Download the repository, or clone it with Git. 
2. Open `index.html` in a browser: no build step, no dependencies.

## Files

- `index.html` – markup and screens (start / quiz / results)
- `style.css` – styling, light/dark theme
- `questions.js` – question bank
- `script.js` – quiz logic
- `resources/` –  supporting material, e.g papers and the relevant exercises from exams and previous work requirements

## Adding questions

Edit `questions.js`. Each question follows the existing object format (text, options, correct answer, tag).
