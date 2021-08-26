# [Image Search Unsplash API](https://image-search-rho.vercel.app/)(DEMO)

This project is a SPA implementation of unsplash-api with an ui to search based on query and collection chosen.

e.g Someone might be interested in nature photography and want to explore photos taken in Istanbul.
Then, they can type in `Istanbul` and select `Nature` from the dropdown to search Unsplash.
If none chosen, you'll search with default query "Istanbul".


# Guideline

react-router-dom is used from routing and all the routes can be seen Routes.tsx. This file is the index file of the React App.
In Router, you can see the screen for the matched urls. If you want to add more screen, PR's are welcome.

Assets include icons(svgs) and styles folder(scss variables), please use these file for your icons and scss implementations.

Components are divided as atoms and molecules. For the fundamental components such as Modal or Portal please use atoms.
If you have an abstraction made from a screen which consists more than 3-4 atom components, please add this as a component/molecules with the proper name.
Screens folder usually includes screens made with 3-4 molecule components. Follow these guide when you develop your screens.

Useful hooks useOnClickOutside,useToggle etc. defined under hooks folder.
If you think the code will be cleaner with a custom hook implementation, please add your custom hook under this folder.

In this project react-query/axios is used for fetching api caching responses. Define your api methods under services folder with the name of your endpoint.
For the sake of brevity, group your endpoints for the similar purposes e.g grouping search and track-download service under services/photos.ts If possible, add proper types for your response.

Any other utils or so called helpers should be added under utils folder. PubSub and Axios API instance implementation are great examples for files should be under utils. Project does not have a state management library like redux to be as much as lightweight as possible. Use react-query for caching responses and you can use PubsSub module for your other needs.

This project use normalize.scss of CRA for normalization and css modules for any other components. So, if you need to style your component, add styles.module.scss in component folder.

For any other questions, first of all, please keep folder structure and conventions steady in project. If you have any other improvements or questions feel free to contact me.
