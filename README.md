# Pocket Chat
Pocket Chat is an innovative messaging platform that brings a comprehensive suite of communication tools into one accessible, easy-to-use application. Developed with a passion for enhancing connectivity, Pocket Chat supports real-time messaging, video and voice calls, group conversations, live sessions, short videos similar to YouTube Shorts, and notifications, all tailored to create a rich, engaging user experience.

## Project structure

```
.
├── public                   # Public assets like images and static files
│   ├── images               # Image assets
│   │   └── gopher-logo.png  # Example image file
│   └── svg                  # SVG assets
├── src                      # Source code of the application
│   ├── app                  # Application features and pages
│   │   ├── api              # API routes and logic
│   │   ├── auth             # Authentication-related pages and components
│   │   │   ├── sign-in      # Sign-in page components
│   │   │   └── sign-up      # Sign-up page components
│   │   ├── chat             # Chat feature pages and components
│   │   │   └── video        # Video chat-related components
│   │   ├── feed             # Feed feature pages and components
│   │   │   ├── post         # Individual post components
│   │   │   ├── short        # Shorts feature components
│   │   │   └── story        # Stories feature components
│   │   ├── friends          # Friends feature pages and components
│   │   ├── group            # Group feature pages and components
│   │   │   └── discover     # Group discovery components
│   │   ├── live             # Live feature pages and components
│   │   ├── profile          # Profile pages and components
│   │   └── publish          # Publishing related components
│   ├── components           # Reusable components
│   │   ├── chat-bubbles     # Chat bubble components for different message types
│   │   ├── edgestore        # Edgestore-related components
│   │   ├── functional       # Functional components like carousels and uploaders
│   │   ├── LandingPage      # Components specific to the landing page
│   │   ├── micros           # Micro components like inputs and buttons
│   │   ├── modals           # Modal components for various features
│   │   └── Navbar           # Navbar and related components
│   ├── lib                  # Library code, utilities, and hooks
│   │   ├── actions          # Redux or context actions
│   │   ├── context          # React context definitions
│   │   ├── hooks            # Custom React hooks
│   │   ├── queries          # Data fetching queries
│   │   ├── store            # State management stores
│   │   ├── types            # TypeScript type definitions
│   │   └── utilities        # Utility functions
│   └── middleware.ts        # Middleware for Next.js or other server-side logic
├── next.config.js           # Next.js configuration file
├── postcss.config.js        # PostCSS configuration for tailwind CSS or other plugins
├── tailwind.config.ts       # TailwindCSS configuration file
└── tsconfig.json            # TypeScript configuration file
```

## Features

### Fully Responsive 📱💻🖥️
Pocket Chat is fully responsive, adapting seamlessly to any screen size and device. Whether you're on your phone, tablet, or desktop, enjoy a flawless chat experience tailored to your device.

### Real-Time Messaging 💬
Stay connected with friends, family, and colleagues through instant text messages, enriched with emojis 😄 and media-sharing capabilities 📸, ensuring your conversations are as lively and interactive as they can be.

### Video and Voice Calls 📞🎥
Make and receive high-quality video and voice calls with ease. Whether it's a one-on-one conversation or a group call, Pocket Chat ensures you're always just a click away from connecting with your loved ones.

### Groups 👥
Create or join groups to stay connected with multiple people at once. Perfect for organizing events, staying in touch with family, or collaborating with colleagues, our group feature makes collective communication effortless.

### Lives 🎥
Engage with a broader audience through live sessions. Whether showcasing your talents, sharing insights, or just chatting, live sessions bring your community closer together.

### Shorts 🎬
Discover and create short, engaging videos similar to YouTube Shorts. Whether for entertainment, education, or just sharing moments of your day, Pocket Chat's short video feature keeps you and your network engaged and entertained.

### Notifications 🔔
Never miss an important message or update with real-time notifications. Customize your notification settings to stay informed according to your preferences.

## Technologies Used 💻🛠️

Pocket Chat is developed using a comprehensive and modern technology stack to provide a seamless, real-time communication experience:

- **Next.js** 🖤: A React framework that enables functionality such as server-side rendering and generating static websites for React-based web applications.
- **React** ⚛️: A JavaScript library for building user interfaces, enabling dynamic and interactive web applications with reusable components.
- **Tailwind CSS** 🌬️: A utility-first CSS framework for rapidly building custom designs, promoting faster and more efficient styling of web pages.
- **TypeScript** 📘: A superset of JavaScript that adds static type definitions, enhancing code quality and reliability through type safety.
- **WebSocket** 🌐: A protocol enabling two-way interactive communication sessions between the user's browser and a server, perfect for real-time functionalities.
- **Docker** 🐳: A tool designed to make it easier to create, deploy, and run applications by using containers, ensuring consistency across multiple development and release cycles.
- **PeerJS** 🤝: A library that simplifies WebRTC peer-to-peer data, video, and audio calls, making it easier to add real-time communication capabilities.
- **JWT (JSON Web Tokens)** 🔑: A compact and self-contained way for securely transmitting information between parties as a JSON object, used for authentication and information exchange.

Pocket Chat leverages these technologies to deliver an engaging, scalable, and highly interactive chat application, from the backend infrastructure to the frontend user experience.


## Getting Started

### Installation
After cloning the repository run


```bash
npm i
```

### for development
```bash
npm run dev
```

### for production 
```
npm run build && npm run start
```

### Contributing 🤝
As a solo developer, I welcome contributions and feedback to improve Pocket Chat.

### Support 🆘
If you encounter any issues or have questions, please file an issue on GitHub.

### License 📄
Pocket Chat is released under the MIT License. Feel free to fork, modify, and use it in your projects.
