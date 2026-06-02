This app helps to solve binance's wodl puzzle. Each week there is a new theme (a blogpost) which defines what words are in current set for the puzzle. I have separated service to scrape the theme blogpost for the words and add them into the database with `rank=1`.

This is example post from binance that defines that weeks theme (blogpost) and describes how the puzzle work: https://www.binance.com/en/support/announcement/detail/c3a2698c5b3c404c89033fd08e9832b7

## Product principles

**The product is the tool - not a content directory.** Imagine a calculator app: it does one thing well, takes inputs, returns answers, and does NOT have a separate page for every search variant ("what is 5+5?", "what is 5+6?", etc.). This app is the same - we just need to be best in that narrow usecase we build this app for.

## Tech stack
- Make sure to utilize latest Nuxt features and tailwind
- Every UI change needs to be in line with app's overall theme and `./app/assets/css/main.css`