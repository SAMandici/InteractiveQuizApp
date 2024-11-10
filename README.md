This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`]

# Interactive Quiz App 

This is an interactive quiz project build with **Next.js** and **React** technologies; also using **hooks**, **api** and **localStorage**.
In each module we advanced a little bit to get to a modern UI application. 
For the final version of the app each user should be able to answer question and add new question directly through the app.
Since the project lacks a real back-end, questions are saved and updated using `localStorage` to simulate writing data to a file.

## Project Description 

This aplication allows users to:
- Navigate through categories with each quiz for each category.
- Check the results on the last page and posibility to add new question.
- Save and manage questions directly in `localStorage`.

Pages of the app:
1. *Home* --> Introduction to the app(what the quizes are about/rules) and a warm welcome.
2. *Categories* --> Page for selecting a category.
3. *Question1/2/3/4* --> Page for each qustion in the quiz
4. *Results* --> Page too see the results and to add new question. 

## Getting Started

1. **First clone the repository**:
   ```bash
   git clone https://github.com/username/InteractiveQuizApp.git

2. **Navigate to folder**
   ```bash
   cd InteractiveQuizApp

3. **Install dependencies**
   ```bash
   npm install
   
4. **Run the application**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev  
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Contributions**

Contributions are welcome! Follow these steps to contribute:
  - Fork the repository and create a branch for your modifications.
  - Once you've made your changes, submit a Pull Request.
  - Clearly describe the functionality or improvements you've added in the PR.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
