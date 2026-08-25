This app helps to solve binance's wodl puzzle. Each week there is a new theme (a blogpost) which defines what words are in current set for the puzzle. I have separated service to scrape the theme blogpost for the words and add them into the database with `rank=1`.

This is example post from binance that defines that weeks theme (blogpost) and describes how the puzzle work: https://www.binance.com/en/support/announcement/detail/c3a2698c5b3c404c89033fd08e9832b7

## Product principles

**The product is the tool - not a content directory.** Imagine a calculator app: it does one thing well, takes inputs, returns answers, and does NOT have a separate page for every search variant ("what is 5+5?", "what is 5+6?", etc.). This app is the same - we just need to be best in that narrow usecase we build this app for.

## Tech stack
- Make sure to utilize latest Nuxt features and tailwind
- Every UI change needs to be in line with app's overall theme and `./app/assets/css/main.css`

## Comments and documentation

Do not explain changes in code comments. The code should read on its own.
Comment only what the code cannot say - a constraint, a spec reference, a
non-obvious `// 10.0.0.0/8`.

If a decision or trade-off is worth keeping for the future, put it in
`docs/documentation.md` instead, with a date. If it is not worth keeping,
do not write it down at all. Dated analysis and metrics go in
`docs/reports/`.