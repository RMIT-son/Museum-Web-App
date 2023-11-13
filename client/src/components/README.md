# Components

The `client/src/components` directory contains the reusable presentational components of the application. Each file in this directory typically corresponds to a specific UI element, such as a button, a form, a header, etc.  

These components are primarily concerned with how things look. They render the HTML based on the props they receive and can maintain their own internal state if necessary. However, they usually don't fetch or mutate data directly. Instead, they call functions passed in via props to notify when a user interaction occurs, like a button click.  

These components are used by the container components in the `client/src/containers` directory and the page components in the `client/src/pages` directory to build up the UI.  

This structure helps to keep the codebase organized and maintainable, and it promotes the reuse of components.  