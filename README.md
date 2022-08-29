# Professional Profile Generator (PPG) Web Platform

<p align="center">
 <img src="https://docs.nestjs.com/assets/logo-small.svg" height="100" alt="Nest Logo" />
 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png" height="110" alt="Angular Logo" />
</p>

## Description

A web platform that allows you to discover the most demanded technologies in your city in real time using web scraping. Developed in team with [@EmilyLino](https://github.com/EmilyLino).

## Technologies

Server:

- NestJS v9
- TypeScript + ESLint
- Puppeteer v15
- JWT
- ESLint
- Mongoose/MongoDB
- Swagger

Client:

- Angular v14
- TypeScript + ESLint
- Angular Material
- Reactive forms, HttpClient, RxJS, ng2-charts, and others technologies of the Angular ecosystem

## Server repository

<https://github.com/jeanpierm/ppg-server>

## Architecture

### General

![general](screenshots/architecture.png)

### API (Server) Components Diagram [C4 Model - Level 3]

![api components](screenshots/api-component-diagram.svg)

### SPA (Client) Components Diagram [C4 Model - Level 3]

![spa components](screenshots/spa-component-diagram.svg)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Screenshots

### Home

![home](screenshots/ppg-1.png)

### Discover professional profile

It allows discovering the professional profile with the most demanded technologies according to the location and preferred job title in real time.

![home](screenshots/ppg-2.png)

### View professional profile

![home](screenshots/ppg-3.png)

### Dashboard of the technologies found

![home](screenshots/ppg-4.png)

### Discover technology courses

![home](screenshots/ppg-5.png)

### Edit account

![home](screenshots/ppg-7.png)

### Platform maintenance (admin panel)

![home](screenshots/ppg-8.png)

### Logs (admin panel)

![home](screenshots/ppg-9.png)
