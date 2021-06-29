# Project Overview

## Project Name

Intersectional Bookshelf

## Project Description

The intersectional bookshelf is a book recommendation app where users can search for books that have representation for populations tradtionally underrepresented in popular media.  Users can browse or search for books by genre, character and author representation tags, and theme tags.  They can also recommend books based on said tags.

## Wireframes



## Component Hierarchy
Show your component hierarchy here! Use [this](https://cms-assets.tutsplus.com/uploads/users/1795/posts/30352/image/GettingStartedWithReduxTutorial-React-Component-Structure.png) as an example.

## API and Data Sample


```json
{
    "records": [
        {
            "id": "recPfzmjgj023WzW3",
            "fields": {
                "repTags": "#women#lgbtq#lesbian",
                "author": "Samantha Shannon",
                "title": "The Priory of the Orange Tree",
                "description": "A world divided. A queendom without an heir. An ancient enemy awakens.\n\nThe House of Berethnet has ruled Inys for a thousand years. Still unwed, Queen...",
                "genres": "#fantasy#romance",
                "imageURL": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1527807139l/40275288._SY475_.jpg",
                "reviews": "#rating|handle|comments#rating|handle|comments\n",
                "authorTags": "#woman",
                "themeTags": "#dragons#magic"
            },
            "createdTime": "2021-06-29T03:00:00.000Z"
        },
        {
            "id": "recYHjNn5RsjDRtD9",
            "fields": {
                "title": "Firekeeper's Daughter",
                "author": "Angeline Boulley",
                "description": "As a biracial, unenrolled tribal member and the product of a scandal, eighteen-year-old Daunis Fontaine has never quite fit in, both in her hometown a...",
                "imageURL": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1595093218l/52346471.jpg",
                "genres": "#young adult#mystery#thriller#contemporary#fiction",
                "repTags": "#women#indigenous#native#Ojibwe#biracial",
                "authorTags": "#woman#indigenous#native",
                "themeTags": "#coming-of-age",
                "triggerWarnings": "#alcoholism#racism#physical abuse#murder#rape#sexual assault#suicide",
                "reviews": "#rating|handle|comments"
            },
            "createdTime": "2021-06-29T03:00:00.000Z"
        },
        {
            "id": "recpAHfNDiIqztTHX",
            "fields": {
                "title": "Get a Life, Chloe Brown",
                "author": "Talia Hibbert",
                "description": "Chloe Brown is a chronically ill computer geek with a goal, a plan, and a list. After almost—but not quite—dying, she’s come up with seven directives ...",
                "imageURL": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1614273529l/43884209.jpg",
                "genres": "#romance#contemporary#adult#humor",
                "repTags": "#women#black/african diaspora#disability#fibromyalgia#",
                "authorTags": "#woman#black/african diaspora",
                "themeTags": "#spicy#tattoos",
                "triggerWarnings": "#abuse#racism#ableism#trauma",
                "reviews": "#rating|handle|comments"
            },
            "createdTime": "2021-06-29T03:00:00.000Z"
        }
    ],
    "offset": "recpAHfNDiIqztTHX"
}
```

### MVP/PostMVP
  

#### MVP 
*These are examples only. Replace with your own MVP features.*

- Users can browse or search for books by genre, representation tag, author tag, or theme tag
- Users can click on an individual search page to view book description, ratings, and comments
- Users can add tags to books
- Users can add ratings and reviews/comments to books
- Users can post recommendations and check off as well as input their own genre, representation, author and theme tags as well as trigger warnings

#### PostMVP  
*These are examples only. Replace with your own Post-MVP features.*

- Users can search for books using multiple different types of tags, and results will appear in order of relevance
- Calculate and display average user rating
- Add other forms of ratings - a represenatation rating and a problematic rating
- ratings will render as images like stars/filled/partially filled 
- Add more books to initial database
- Threaded comments

## Project Schedule


|  Day | Deliverable | Status
|---|---| ---|
|June 28| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|June 29| Project Approval | Incomplete
|June 30| Skeleton Components, getting and rendering API data | Incomplete
|July 1| Pseudocode/code/style search and result components | Incomplete
|July 2| Pseudocode/code/style user input/post/put components | Incomplete
|July 6| MVP | Incomplete
|July 7| Presentations | Incomplete

## Timeframes


| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| API data | H | 3hrs|  |  |
| Working with API | H | 2hrs|  |  |
| HTML/JS Coding homepage Structure | M | 2hrs|  |  |
| CSS Sytling Homepage(carousel menu) | H | 2hrs|  |  |
| HTML/JS coding browse/search page | H | 3hrs|  |  |
| Rendering search results | H | 2hrs|  |  |
| CSS Styling browse/search/search results  | H | 3hrs|  |  |
| HTML/JS coding Book Component | H | 3hrs|  |  |
| Rendering comments/ratings| H | 2hrs|  |  |
| CSS Styling Book Component | H | 2hrs|  |  |
| HTML/JS coding User-Add Tags/Ratings/Reviews to Books | H | 2hrs|  |  |
| HTML/JS coding Add Recommendation Form | H | 4hrs|  |  |
| CSS styling Add Recommnedation Form| H | 1hrs|  |  |
| Tag/Genre/Book research | M | 2hrs|  |  |
| Rendering search results | H | 2hrs|  |  |
| Flex Time | L | 2hrs|  |  |
| Total |  | 35hrs|  |  |








| Total | H | 6hrs| 5hrs | 5hrs |

## SWOT Analysis

### Strengths:
Getting/rendering, posting, and updating data from the airtable API

### Weaknesses:
No arrays/objects in airtable; I will have to work around.
allowing Users to search for recs based on multiple inputs, and finding best matches

### Opportunities:
learn more about searching with multiple terms, prioritizing results
show/hide data
learn/use carousel menu

### Threats:
workarounds with formats of input data like comments, ratings, tags, etc
time