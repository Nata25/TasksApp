## React-Redux-based Tasks App

1. One can create Task with author **name**, author **email** and task **description** required.
2. Before saving, one can **preview** task. If some input fields are invalid, preview is unavailable.
3. After preview opens, one can save the task or come back to editing.
4. One can **sort** tasks by author name and email.
5. One can **filter** tasks based on their completion status.
6. Sorting parameters and filters are resettable.
7. Only **admin** can set task **completion**.
8. To log in, provide _admin_ as login and _123_ as password.
9. Inputs and buttons are **accessible** via keyboard; focus is managed across components. 
10. In case of input errors, user gets visual feedback.

Basic _Bootstrap_ components are used. (Except for Preview modal component, which has custom styles and Redux-based logic, unlike BS modal).

Access project [on GitHub pages](https://nata25.github.io/TasksApp/).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
