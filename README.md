<p align="center">
  <img src="./pictery-icon.png" alt="Pictery Icon">
</p>

<h1 align="center">Pictery</h1>

An image gallery management application developed in Vue and Express.js with Typescript.

**Check it out: https://pictery.onrender.com/**

> **IMPORTANT:** This is not an application intended for the general public. This is a personal project for demonstration and learning purposes. Please use with caution and do not upload harmful, classified or explicit content. I hope you find it interesting and please don't hack me, thanks. ❤️

You are free to explore the code and if you wish to contact me for any related reason, you can do so through the different public means that I make available.

You can read this document in the following languages:

- [English (current)](README.md)
- [Spanish](README.es.md)
- [French](README.fr.md)

## ⚗️ Tech stack (most outstanding)

- Typescript (all the code)
- Vue 3 (Composition API)
- TailwindCSS
- Cypress
- Express.js
- Prisma (PostgreSQL)
- Passport.js
- Google OAuth
- Cloudinary
- Zod
- Jest
- Etc...

# 😴 TL;DR;JK 📖

This is a unique and exclusively demonstrative project focused on my personal learning during it. This entire document is written from a personal approach with technical touches on the parts that I considered most relevant or distinctive of the project and being critical of myself.

## Context

The entire development process of this project has been a great journey from which I have learned a lot and with which I have improved myself in many ways (which is the goal). However, almost 10,000 lines of code later and several months of development in less than optimal conditions (among many of them, a potato as computer with 4GB of RAM and a 1.1 Ghz Intel Celeron 847 Dual Core processor) the project has taken me much longer time than I anticipated and the development experience in general was declining as more was added to it. Taking this into consideration, there were several features that were not included in the final result and which I will mention later, but even so, this is still by far the personal project in which I have put the most effort.

> NOTE: Due to not knowing with certainty if this project would come to light at first and given the long learning process with constant, abrupt and disruptive changes I wasn't quite clear when I should start making commits and by the time I saw it clearly I was about to finish (so I facepalmed myself again).

## The idea

This project started with the simple idea of creating a fairly easy-to-use image gallery (by uploading files) using Vue as the UI framework (simply because I was quite interested in learning how to use this technology). However, I was adding more and more tools like Prisma, Zod, Jest, Cypress, etc. And relatively new concepts for me that I wanted to delve into throughout the development, as I usually do in each of my projects.

## First steps

> **Typescript:** From the backend to the frontend to the testing tools, everything is written in Typescript instead of Javascript, and I had that very clear from the start. I don't think it is necessary to mention the many reasons why this is so, the benefits are more than obvious: type system, autocompletion, more robust code, less error prone, etc. Typescript is the way to go for almost any project in this ecosystem these days and it's quite comfortable for me to use.

I started this project actually through another project I was working on which was just a backend in Express.js with Typescript and Prisma (the best ORM I've used so far in Node.js), influenced a bit by the SOLID principles and a more scalable structure by features. I took advantage of this implementation I made of the backend and modified it to integrate it to this new idea (two birds with one stone) with a database schema that included users, galleries and pictures.

> **OOP and SOLID principles:** I have never used OOP (Object Oriented Programming) much in my projects even though it is a topic that I know relatively well, simply because functional programming tends to be a better fit given the language and the type of project. For this occasion I wanted to do it, but in a very simplified way and only in the backend, also trying to follow the SOLID principles (which I did not strictly apply, I have to say). The benefits of developing software following this paradigm and design are appreciable, especially in development teams and much larger scale projects. Although I have also realized that if certain measures are not taken, it can make everything more complex than it should be and that something very similar can be achieved with well-organized functional programming. Finally, I have to say that instead of doing this on your own (although you learn a lot), it is better to use an already established and more dogmatic framework like Nest.js.

> **Structure-by-feature:** Given the scale of the project, I decided to go for a structure organized by features and the truth is that it has been an excellent decision, although my implementation could be better.

Before writing the first line of code in the client, I set out to design in Figma (in a very basic way) some of the things that I had in mind at that time for an MVP (Minimum Viable Product). You can visualize said design through this link: https://www.figma.com/file/7ZvkKPdhLL8ycGwyyVUaVr/Vue-Gallery

> The name of the project was chosen until the end, so during development, it kept the generic name of "Vue Gallery".

Once I finished the basic skeleton of the application in Figma, I made some small advances learning Vue 3 with the composition API and Typescript on the fly, also using Vite (the best frontend tooling out there) and pure CSS. My best friend was the documentation through this process, as it was my first time using this framework.

### The Vue experience

In general, the development experience in Vue has been quite pleasant, with a very comfortable learning curve, an ecosystem and documentation of a high quality but not very abundant.

Using the Composition API in Vue, it was very easy to find similarities with React (my benchmark) which made the learning process much easier. Compared to React, everything feels much more organized, integrated and coherent at least for newcomers like me and as the name suggests, it is a progressive framework that is discovered and extended as needed. Still, React is still more relevant to me as there is so much more support and demand for it by comparison, and I'm already pretty used to JSX.

What I have loved the most about Vue is the ease of choosing between the (officially) recommended options of its ecosystem and working with animations, which is not so easy with React.

## Getting better in web design

After a long learning process, learning the basics of Vue and building part of the UI, I decided to improve the design. For this, I ended up reading an excellent book called **Refactoring UI**, which I highly recommend since it is focused by and for developers who are not designers as such (which is my case). I tried to absorb as much knowledge as I could and apply it to the project, from which I learned a lot and the improvement over other previous projects is quite remarkable in my opinion, although there is still a lot to learn. Being a primarily backend developer, I'm proud of the progress.

At this point and to speed up the development process with an already established layout system, I replaced pure CSS with TailwindCSS (my favorite CSS framework) since the code would scale much more than in the beginning.

The general idea of the design and UI was that it be quite minimalist and intuitive, doing more with less and that everything is adapted to different screen sizes. Instead of overloading the interface with a lot of things, I tried to keep everything as simple and light as possible so that it would be very comfortable and smooth to use. In this sense, I believe that I have fulfilled the objective, although there are parts that could be improved, without a doubt.

## Backend stuff

With part of the interface established, the next logical step was to integrate the backend API with the client. In this sense, the first thing was the authentication system with Passport.js, which on this occasion, I wanted it to be something different: OAuth (Open Authentication). Of the available services, I chose Google OAuth as it is the most accessible among the most relevant. Later I also decided to incorporate the option of registering by local credentials (by email and password), in which I wanted to implement email verification but I ruled it out as I did not have an SMTP service available that I could comfortably take to production.

After wrapping up numerous routes (a total of 23, mostly CRUDs), middlewares, and so on with validation in Zod (a library I wanted to test), it was time to implement a file upload service. The first options that I considered and also the best known are AWS S3, GCS or Microsoft Azure, however all these options were discarded since they are not free or easy (even so, I did several mock tests with their SDK). Looking for a more viable alternative, the obvious choice ended up being Cloudinary, which not only offers a free and quite generous service for uploading media files and such, but also numerous tools to dynamically manipulate those files. For this project, I only took advantage of Cloudinary's file upload and took care of the rest, taking into account the limitations and scale of the project.

> From this point in the development, I took everything more seriously to deliver a product as "realistic" as possible, as if it were aimed at the general public (with its nuances), even if it is only a demo at the end (something I usually do and it takes me a long time to materialize my "little" ideas). For this reason, I took many more details into consideration to give a more professional finish. Throughout the development I was integrating numerous changes and improvements every time I saw the opportunity to learn more and better, making the project more and more ambitious.

### Security

This is one of those things that I always take into consideration and that I love about software development, but about which I have not been able to deepen much in a practical way in a real case where it is vital. This is because there is simply no such need in projects of this type, with the essentials it is more than enough (and it is what I have done). Among these measures are the usual ones: protect routes well, validate and clean input and output data, do not issue errors that compromise the system, limit requests, maintain the integrity of the system and users, etc. I also had a special consideration with Cloudinary to avoid exceeding the limit of the plan "accidentally".

### Logging stuff

I've always wanted to learn about logging in software systems, although the truth is that it is much better to leave this task in the hands of a more automated third-party service. Despite this I tried to implement a very simplified logging middleware just to have it even though it wasn't really necessary and I could only send them to the console due to the limitation of non-persistent files (which I knew I would find in production).

### Privacy

As usually happens in all my projects, user privacy is paramount. There is nothing under the table, what you see is what you get (it can be seen in the code). The use of the data collected from the user is only used in the context of the service that the application offers, nothing more. Only authenticated users can access the content within the app and all data deleted by the user is actually deleted via "hard delete".

Private galleries HIDE access to the images they contain within the application, but these are always publicly accessible through their direct URL. I tried to do something about it but I didn't find anything very enlightening, besides that it is an external service so I don't have absolute control (although it sure is possible and I'm dumb). In order not to overcomplicate things, an the end I kept the implementation as it was.

> **IMPORTANT:** The images uploaded in this application are inside a folder of the same name in my Cloudinary account. Please do not upload content that may be harmful, classified or explicit. Remember, this is a demo application that is not intended for the general public.

## Frontend stuff

This is where most of the lines of code are, and therefore, most of the effort and time in this project.

Compared to the backend, the frontend is much less organized and consistent. This is because there is much more code and all of that code has been written in the context of someone learning to use the tool (Vue). So it is not surprising to see different ways of doing the same thing or changes that make certain sections of code inconsistent since I started from scratch and evolved as I learned more (a bit of spaghetti code, basically).

### Pages

- **Home:** As a simulation, I thought of making the most generic presentation possible about the application and the service it offers, selling it a little to the public.

- **Register/Login:** A few simple forms to create an account and login respectively, with the option to do it through Google OAuth.

- **Dashboard:** Where all user galleries are managed.

- **Gallery:** Where a gallery and all the images that belong to it are managed.

- **Profile:** Where very basic information of a user is displayed. Initially it would have extensive customization... it ended up being the perfect place to randomly put motivational phrases (which is much better in my opinion).

- **Not Found:** A simple banner to redirect to "Home" if you have entered a non-existent page, which includes galleries and profiles.

### Accessibility

I always take accessibility into account when developing on the frontend, at least in the essentials: contrast, UI feedback, full and comfortable keyboard interaction, making it intuitive, etc.

### Performance and optimization

Performance and optimization are always important to me, although in this case it was not a priority concern. Both in the backend and the frontend I took certain measures and factors into consideration to avoid going overboard with some heavy computing operation. Vue is quite fast (in the context of Javascript) and despite some effortful operations, everything is expected to run smoothly.

### Forms

Working on decent forms for a SPA (Single Page Application) is almost always a headache, this one was no exception. There are several things to take into account: data status, validation, error messages, submission, etc. I tried to use a library (Vee-validate) to solve this issue more easily than the "manual" method and also learn something new. The result was satisfactory, especially due to the support available with Zod, although I think there are better ways achieve it.

### Working with QR codes

A friend of mine once gave me an idea to include QR codes in one of my projects so I just thought "why not?". I had no idea about this topic, so I researched about it and looked for a way to implement something like it. I was slightly surprised that in the Vue ecosystem I would find an extremely simple solution for this issue (since there is usually one for almost everything). And just like that, I ended up implementing QR codes to share galleries.

### Lighthouse

The overall result of Lighthouse has been almost perfect, with some minor detail around contrast and little else:

![Lighthouse](https://i.ibb.co/7pq8NGv/pictery-lighthouse.png)

## Testing

Using Jest in the backend and Cypress (for the first time) in the frontend... One of the things that caused me the most headaches was implementing tests throughout the most important parts of the application (not because of laziness, I swear). I initially planned to develop this project from start to finish using TDD (Test Driven Development), which is a very interesting and useful development process in my opinion. However, the problem lies in the hardware I've been working with (pretty bad), since constantly running new tests for everything, lots of new code and whatnot, would only slow down development and hurt my overall experience on the project. Therefore, I started doing only "important" tests relatively late in the game, but not so much as to make implementation difficult, since it's best to start testing as early as possible in development. Despite this measure, suffering was unavoidable with about 15 minutes of waiting in the client's E2E tests (my potato burned). Of course, this terrible development experience is reflected in the quality of the tests. However, leaving aside those problems, testing is very rewarding for me and trying Cypress for the first time has been, as far as it goes, an enriching experience (but one that I don't recommend to those who have a potato as computer like me).

Speaking of the tests, there are 34 in the client (33 E2E and 1 component) and 81 in the backend (unitary and integral). These tests cover, as I have mentioned before, the most important parts of the application although not in a very deep way. There are many things to improve regarding the tests: They are too nested, many more mocks are missing, some depend on network connections, they are not completely isolated or they do not cover all the cases. However, the goal has never been 100% coverage or code that aspires to be foolproof. The objective is to learn, and for me to implement these tests in a project of this magnitude given my limitations, it is already a big step in the right direction. Also, this is just a demo, and for that purpose it is more than enough.

## Monorepo attempt

The need to share code (interfaces, schemas, constants and mock data) between the frontend and the backend in order to avoid violating the DRY (Don't Repeat Yourself) principle in this particular case, led me to look for a solution in the which I saw a perfect opportunity to learn something new. The solution that I chose for this issue was the use of a Monorepo, something that I had not done before but that caught my attention. I researched the topic and the most popular tools around this development strategy, being Nx the one that caught my attention the most but unfortunately it did not have native support for Vue. The rest of the available tools didn't convince me so I ended up making my own "Monorepo" with the npm and Typescript workspaces (Spoiler: I shot myself in the foot). The result was not the best, I have to say, I'm not even sure that it deserves to be called Monorepo, but it fulfills the objective of sharing code between both parties and I learned a lot more this way despite the lack of clear documentation about it (for the next one, better use the right tool for the job).

## More ideas

There were many things that for one reason or another I could not include in the final product but that I had in mind, most of them due to limitations or simply because it was too much. Among which were:

- Email verification
- Gallery browser with pagination and search filters
- "Visits" and "Likes" for galleries and images
- Favorite galleries section
- Extensive user profile customization (name, image, cover, bio, etc.)
- More user-friendly URLs
- CI/CD
- Etc...

Many of these potential features focus on the social side of the app. I may include them later, although without a clear motivation and better hardware, I highly doubt it.

## Production issues

Being a fullstack/backend developer who wants to upload demos of their projects to the internet is not easy at all. Deploying a frontend project can be as simple as a couple of clicks completely free of charge and as if by magic, but this is often not the case in the backend. Projects that involve the backend are much more complex and expensive given their nature. With this in mind, I knew that bringing such a project to production would be difficult, but it was even more so.

### Hosting

With the demise of Heroku's free plans (the platform where I usually uploaded my demos), it was hard to find a viable replacement for both their web and database hosting services. Heroku wasn't perfect but it offered a very generous, well-documented and easy-to-use free plan.

The alternative I was able to find was a combination of Render.com for web hosting and Supabase for hosting a PostgreSQL database.

### Google OAuth

There's always something that works fine locally and you think it won't be a problem in production but it eventually does, that was the case with Google OAuth. Basically the issue lies in the verification process that must be carried out to publicly use the Google API as an OAuth provider. This project does not meet the requirements and therefore is not verified to use Google OAuth in its entirety. There is a default limit of only 100 total uses of the service in this context.

I think it's overkill to go through this verification process when I just want to prove that the functionality is there. So it's only a matter of time before this feature stops working properly in the public demo.

### Others

As I have mentioned throughout the document, there are many other features that are limited or that I could not include as I had planned given the conditions presented. For example: email verification, file upload, etc.

> Considering all these issues, I currently find it difficult to continue deploying personal projects that involve such complexity, time and cost. Not because I don't want to, but because it's unsustainable in my context. I will focus on small scale purely technical projects until I can get back to this kind of projects as they are a lot of fun for me and add a lot to my learning and experience.

## Conclusion

This is the personal project in which I have put the most effort and time. It is not the one in which I have learned the most, but the one in which I have consolidated what I have learned the most in all this time and there is still much to learn and improve, that is what I like the most about software development and I am very proud of the work that I've done here. I must admit that it is where I have had the worst experience due to the limitations with which I have carried out this work (such as the poor hardware). Still, that hasn't stopped this project and the many others I have in mind to explore new and interesting ideas through this exciting field.

To finish, thank you very much for reading and see you in another pull request! ❤️

*I almost forgot the reference to The Office LMAO.*

![The Office I'm dead inside](https://c.tenor.com/o-YELW_C6s8AAAAd/when-ur-bff-moves-away-dead-inside.gif)

_\- DevCorvus_
