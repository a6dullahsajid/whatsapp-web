# WhatsApp Web Frontend Clone

A **WhatsApp Web UI clone** built using **React, Vite, and Tailwind CSS**.
This project recreates the core interface and chat interactions using **static data and Context API**, without any backend.

## Live Demo

https://a6dullahsajid.github.io/whatsapp-web/

## Features

* WhatsApp Web inspired UI
* Chat sidebar with users
* Dynamic chat switching
* Message bubbles (sent & received)
* Send message functionality
* Last message preview in chat list
* Auto scroll to latest message
* LocalStorage persistence
* Static JSON chat data

## Tech Stack

* React
* Vite
* Tailwind CSS
* Context API
* LocalStorage

## Project Structure

```
src
├── assets
├── components
│   ├── Sidebar
│   └── Chat
├── context
│   └── ChatContext.jsx
├── data
│   ├── userList.js
│   └── chatList.js
├── App.jsx
└── main.jsx
```

## Installation

Clone the repository

```
git clone https://github.com/a6dullahsajid/whatsapp-web.git
```

Go to project directory

```
cd whatsapp-web
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

## Disclaimer

This project is for **educational and portfolio purposes only** and is not affiliated with WhatsApp or Meta.
