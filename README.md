# Netflify URL
[HN-Read](https://hn-read.netlify.app/)

# Functionality
- The selected filter persists on the local storage
- The favorited posts persists on the local storage
- When clicking on the row, a new tab should be open with the link of the post

# Hackers News API
This project is a small responsive web application to test knowledge of React Development and related technologies.

# Table of contents  
1. [Tech Stack](https://github.com/joxedanielc/hackers-news-api#tech-stack)  
2. [Features](https://github.com/joxedanielc/hackers-news-api#features)
3. [Code Explanation](https://github.com/joxedanielc/hackers-news-api#code-explanation)
    1. [API](https://github.com/joxedanielc/hackers-news-api#api)
    2. [Utils](https://github.com/joxedanielc/hackers-news-api#utils)
    3. [Behind the Curtains](https://github.com/joxedanielc/hackers-news-api#behind-the-curtains)
4. [Run Locally](https://github.com/joxedanielc/hackers-news-api#run-locally)  
5. [Feedback](https://github.com/joxedanielc/hackers-news-api#feedback)
6. [License](https://github.com/joxedanielc/hackers-news-api#license)

## Tech Stack  

**Client:** React, Nextjs, Typescript, Boostrap

## Features  

- Favorite News
- All/My Favorites toggle view
- Pagination
- E2E Tests

## Code Explanation  

### API

The file `news-api.ts` contains the logic to both call the url provided concatenated with the selected language and the page, (starting with page 0), 
and listen to the variables: 

- `language`
- `page`
- `pageView`
- `updatedNewsFavorited`

to render the page whenever these changes.

### Utils

The file `utils.ts` contains the interfaces to create the expected objects with its properties, the enums to avoid misspelling across the app and the functions that handle the set of data.

### Behind the Curtains

#### Favorites Locally Storage

The reason why a news object is locally storage instead of just the `news-id` is because I wouldn't need to go through the whole array in the response to extract the news base by id, which could have been which could have time consuming and not efficent.

## Run Locally  

Clone the project  

~~~bash  
  git clone https://github.com/joxedanielc/hackers-news-api.git
~~~

Go to the project directory  

~~~bash  
cd hackers-news-api
~~~

Install dependencies  

~~~bash  
npm install
~~~

Start the server  

~~~bash  
npm run dev
~~~

To run e2e test (no need to start the server before)

~~~bash  
npx playwright test
~~~
or if you'd like to see the test on the browser:
~~~bash  
npx playwright test --debug
~~~

## Feedback  

If you have any feedback, please leave a comment.

## License  

[MIT](https://choosealicense.com/licenses/mit/)
