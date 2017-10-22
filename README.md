## React-Redux-based Tasks App

1. One can create Task with author **name**, author **email** and task **description** required.
2. There's an option of adding image to a task. For big images resize is applied (both via styles and on server).
3. Before saving, one can **preview** task. If some input fields are invalid, preview is unavailable.
4. After preview opens, one can save the task or come back to editing.
5. One can **sort** tasks by author name and email.
6. One can **filter** tasks based on their completion status.
7. Sorting parameters and filters are resettable.
8. Only **admin** can set task **completion**.
9. To log in, provide _admin_ as login and _123_ as password.
10. Inputs and buttons are **accessible** via keyboard; focus is managed across components. 
11. In case of input errors, user gets visual feedback.
12. Tasks are paginated by 3 on a page.

The App works on the client side and relies on Redux state. State is lost on page reload.

Basic _Bootstrap_ components are used (except for Preview modal component, which has custom styles 
and Redux-based logic, unlike Bootstrap modal. 
Also, some style fixes were applied to Task for images to be responsive and resize without distortion).

[Cloudinary](https://cloudinary.com/) was used for hosting images.

The project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Access Tasks App [on GitHub pages](https://nata25.github.io/TasksApp/).
