# Dataviz Explorer

<p align="center">
   <img src="https://github.com/fehmisener/dataviz-explorer/actions/workflows/main.yml/badge.svg?branch=develop" alt="build">
   <a href="https://sensational-fox-f31fd7.netlify.app">
   <img src="https://api.netlify.com/api/v1/badges/bc438b2e-9f12-4bbe-987e-d36fcef20a2f/deploy-status">
   </a>
</p>

DataViz Explorer: React-powered tool for large CSV, database, and real-time visualization. User-friendly interface, interactive plots, Node.js backend for scalability. **[Follow this link](https://sensational-fox-f31fd7.netlify.app)** to reach the live application.

![Gif](/docs/demo.gif)

## Overview

This application is a powerful tool for handling large CSV files, visualizing data, and providing real-time insights. It features an intuitive user-friendly interface, interactive plots, and a scalable Node.js backend. Whether you're analyzing data or creating dynamic visualizations, this React-based tool has you covered.

## Features

- **CSV Handling**: Upload and process large CSV files effortlessly.
- **Interactive Plots**: Create dynamic charts and graphs to visualize your data.

  - You can view the data as a datagrid table before displaying it
  - You can generate more than one chart on the same page.
  - You can change the type of charts, select the columns to be visualized.
  - Zooming and panning is available, you can also download the generated charts in different formats.

- **Real-Time Updates**: Receive live updates as data changes (Not Yet).
- **Database Visualization**: Create charts from the database (Not Yet).

## Setup Instructions

### Front-end Applicaiton

1. **Clone the Repository**:

   ```git
   git clone https://github.com/fehmisener/dataviz-explorer.git
   cd dataviz-explorer
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Aplication**:

   ```bash
   npm run dev
   ```

4. **Build for Production**:

   ```bash
   npm run build
   ```

5. **Run in Production Mode**:

   ```bash
   npm start
   ```

### Back-end Applicaiton

## Dependencies

> [!IMPORTANT]
> Vite requires Node.js version 18+ or 20+.

- [Vite](https://vitejs.dev/): A build tool that provides fast, reliable builds for modern web projects.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): The programming language used for both frontend and backend development.
- [Material UI](https://material-ui.com/): A popular React UI framework that provides pre-built components for building user interfaces.
- [Node.js](https://nodejs.org/): A JavaScript runtime for building scalable network applications.
