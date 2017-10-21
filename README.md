## React-Redux-based Tasks App

1. One can create Task with author **name**, author **email** and task **description** required.
2. There's an option of adding image to a task. Big images are resized.
3. Before saving, one can **preview** task. If some input fields are invalid, preview is unavailable.
4. After preview opens, one can save the task or come back to editing.
5. One can **sort** tasks by author name and email.
6. One can **filter** tasks based on their completion status.
7. Sorting parameters and filters are resettable.
8. Only **admin** can set task **completion**.
9. To log in, provide _admin_ as login and _123_ as password.
10. Inputs and buttons are **accessible** via keyboard; focus is managed across components. 
11. In case of input errors, user gets visual feedback.

The App works on client side.

Basic _Bootstrap_ components are used. (Except for Preview modal component, which has custom styles and Redux-based logic, unlike BS modal. 
Also, some style fixes were applied to Task to resize images without distortion).

[Cloudinary](https://cloudinary.com/) was used for hosting images.

The project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Access Tasks App [on GitHub pages](https://nata25.github.io/TasksApp/).
