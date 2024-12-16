# Dummy Data Setup for Cupid Website

This setup demonstrates how I created dummy user data for the initial testing phase of my Cupid website. The data includes sample user profiles to test core features like user matching and preference filtering.

## Dummy User Data
Below is an example of the dummy user data used for testing:

```javascript
export const users = [
    {
        "firstName": "Dummy",
        "lastName": "Male",
        "email": "user19@example.com",
        "gender": "Male",
        "dateOfBirth": "2000-01-05",
        "profilePicture": "https://res.cloudinary.com/dumslt27h/image/upload/v1734331949/nofaceboy_mu4d4i.png",
        "bio": " I love Art.",
        "interests": ["Gaming", "Cooking", "Music"],
        "location": {
            "city": "Houston",
            "country": "India",
            "coordinates": {
                "type": "Point",
                "coordinates": [-21.886042957586994, 47.77818636384956]
            }
        },
        "preference": {
            "gender": "Female",
            "ageRange": {"min": 19, "max": 26},
            "maxDistance": 50,
            "caste": [],
            "interests": ["Travel"]
        },
        "socialLinks": [],
        "verified": false,
        "lastActive": "2024-12-06 04:45:06",
        "createdAt": "2024-06-01 04:45:06",
        "updatedAt": "2024-12-16 04:45:06"
    },
    {
        "firstName": "Dummy",
        "lastName": "Female",
        "email": "user20@example.com",
        "gender": "Female",
        "dateOfBirth": "2000-11-22",
        "profilePicture": "https://res.cloudinary.com/dumslt27h/image/upload/v1734331950/nofacegirl_gcvgma.png",
        "bio": "I love Reading.",
        "interests": ["Music", "Travel"],
        "location": {
            "city": "New York",
            "country": "UK",
            "coordinates": {
                "type": "Point",
                "coordinates": [-117.10022098019314, -42.589534878576366]
            }
        },
        "preference": {
            "gender": "Male",
            "ageRange": {"min": 18, "max": 25},
            "maxDistance": 69,
            "caste": [],
            "interests": ["Dancing"]
        },
        "socialLinks": [],
        "verified": false,
        "lastActive": "2024-12-13 04:45:06",
        "createdAt": "2024-10-15 04:45:06",
        "updatedAt": "2024-12-16 04:45:06"
    }
];
```

## Frontend Setup

A button was implemented to send a POST request to the backend, triggering the creation of the dummy data. This button uses React and includes a loading state for better user experience.

```javascript
// import { users } from "../constants/constant";
// import { useState } from "react";

const [loading, setLoading] = useState(false);

export const createDummy = async () => {
    try {
        setLoading(true);
        await fetch(`${import.meta.env.VITE_SERVER_URL}/create-dummy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ users }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    } catch (e) {
        console.log(e);
    } finally {
        setLoading(false);
    }
};

<button
    onClick={() => createDummy()}
    className="bg-shade-500 w-fit hover:opacity-80 shadow-sm shadow-normal rounded-xl px-10 py-2 tranimate"
>
    {loading ? "Creating..." : "Create Dummy Data"}
</button>
```

## Backend Setup

The backend endpoint `/create-dummy` was created to handle the POST request and insert dummy users into the database. This ensures duplicate entries are avoided by checking if a user with the same email already exists.

```javascript
import User from './models/auth.model.js';

app.post('/create-dummy', async (req, res) => {
    console.log('hi');
    const { users } = req.body;
    console.log(users);

    try {
        for (const user of users) {
            const existingUser = await User.findOne({ email: user.email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
            await User.create(user);
        }
        res.send('Users created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
```

### Key Features:
1. **Validation**: Ensures no duplicate entries by verifying user email.
2. **Logging**: Logs all requests and errors for easier debugging.
3. **Asynchronous Handling**: Uses `async/await` for efficient database operations.

## Usage
1. Import the `users` array into the frontend project.
2. Configure the button component and `createDummy` function.
3. Ensure the backend endpoint `/create-dummy` is running and accessible.
4. Click the button to populate the database with dummy users for testing purposes.

This dummy data was essential for testing and verifying the core functionality of the Cupid website during its initial development phase.
