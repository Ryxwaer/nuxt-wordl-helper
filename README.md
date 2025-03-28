# 🟩🟨⬜ Nuxt Wordle Helper ⬜🟨🟩

A simple web application built with [Nuxt 3](https://nuxt.com/) to help you find possible solutions for the popular word game Wordle.

- https://wordl.ryxwaer.com/

## 🤔 How it Works

This helper allows you to input the information you've gathered from your Wordle guesses:

1.  **Correct Letters (Green):** Enter letters that are in the correct position.
2.  **Present Letters (Yellow):** Enter letters that are in the word but in the wrong position.
3.  **Absent Letters (Grey):** Mark letters that are not present in the word at all using the interactive keyboard.

The application then filters a word list based on these constraints and displays the possible remaining words that fit the criteria.

## ✨ Features

*   Input known letters (correct position, wrong position, absent).
*   Filters a comprehensive word list based on your input.
*   Displays potential Wordle solutions (sorted for maximalizing win chance).
*   Interactive keyboard for easy input of absent letters.
*   Built with modern web technologies.

## 🛠️ Tech Stack

*   [Nuxt 3](https://nuxt.com/) - The Intuitive Vue Framework
*   [Tailwind CSS](https://tailwindcss.com/) + tailwilwindcss-motion
*   [MongoDB](https://www.mongodb.com/) - Words database
*   [TypeScript](https://www.typescriptlang.org/)

## Production

*  Deployed with docker on my portainer server
