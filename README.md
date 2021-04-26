Steps to run the app:

- npm install
- in bash#1 json-server --watch db.json --port 3001
- in bash#2 npm start

After log-in, user is stored in localStorage so it will remain stored after page refresh.
Also, users list is collected from simple JSON server for wich i have created fetch methods (Get, Post, Put and Delete).
While logged in as user, you can change your own data or delete profile.
In meantime, user logged in as Admin, can change his own personal data, and is able of changing other users role.

![LogInScreen](https://user-images.githubusercontent.com/66743918/116098856-af8ffe00-a6ab-11eb-992e-c569c0b5b39a.png)

![CreateNew](https://user-images.githubusercontent.com/66743918/116099059-e108c980-a6ab-11eb-9e1e-2f9e5a5accbc.png)

![Users](https://user-images.githubusercontent.com/66743918/116099119-eebe4f00-a6ab-11eb-8ff1-2e6f8f854977.png)

![Edit](https://user-images.githubusercontent.com/66743918/116099140-f4b43000-a6ab-11eb-828b-32dee96ee0f3.png)
