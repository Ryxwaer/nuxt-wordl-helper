# 🟩🟨⬜ Nuxt Binance WODL Solver ⬜🟨🟩

A simple web application built with [Nuxt 3](https://nuxt.com/) to help you find possible solutions for **Binance WODL** - officially **WOTD** (Word of the Day) - the daily crypto word puzzle inside the Binance app.

- https://wordl.ryxwaer.com/

## 🤔 How it Works

The solver lets you input the information you've gathered from your Binance WODL guesses:

1.  **Correct Letters (Green):** Enter letters that are in the correct position.
2.  **Present Letters (Yellow):** Enter letters that are in the word but in the wrong position.
3.  **Absent Letters (Grey):** Mark letters that are not present in the word at all using the interactive keyboard.

The application then filters a word list (3 to 8 letters) based on these constraints and displays the matching words, with **this week's Binance WODL theme words ranked first** so you find today's answer fast.

## ✨ Features

*   Input known letters (correct position, wrong position, absent).
*   Filters a comprehensive word list (3 to 8 letters) based on your input.
*   Surfaces this week's Binance WODL / WOTD theme words first.
*   Interactive keyboard for easy input of absent letters.
*   Built with modern web technologies.

## 🛠️ Tech Stack

*   [Nuxt 3](https://nuxt.com/) - The Intuitive Vue Framework
*   [Tailwind CSS](https://tailwindcss.com/) + tailwilwindcss-motion
*   [MongoDB](https://www.mongodb.com/) - Words database
*   [TypeScript](https://www.typescriptlang.org/)

## Production

*  Deployed with docker on my own server
*  CI/CD via GitOps polling - Portainer
*  port:domain mapping and certificates managed via Nginx Proxy Manager
*  DNS - Cloudflare
