# CUPID-JSM

Cupid is a feature-rich, love-themed dating app designed to connect people in meaningful ways. With Cupid, users can explore meaningful connections through modern matchmaking features, real-time communication, and secure interactions. Built using the MERN stack (MongoDB, Express, React, Node.js), the app prioritizes scalability and security, offering plans to integrate advanced functionalities like passwordless authentication and AI-driven matchmaking.

## Purpose
Cupid aims to elevate the online dating experience by providing:
- A user-centric platform for finding meaningful matches.
- Innovative features to foster real connections and simplify interactions.
- A secure environment to ensure privacy and trust.

---

## Features

### Core Features:
1. **User Authentication**:
   - Seamless login with Facebook and Google.
   - Passwordless OTP-based login for enhanced security, powered by `speakeasy` and `nodemailer`.

2. **Profile Management**:
   - Personalized profiles with photo uploads and interests.
   - Easy-to-use interface to update preferences and details.

3. **Matchmaking**:
   - Smart algorithms suggest compatible matches based on user preferences.
   - Fun swipe-based interactions to express interest.

4. **Real-Time Chat**:
   - Secure, fast, and responsive messaging powered by Socket.IO.
   - Features include online/offline indicators and typing notifications.

5. **API Integrations**:
   - Leverage third-party APIs for location-based matchmaking and other advanced features.

---

## Setup Instructions

### Prerequisites
To set up the Cupid app locally, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Yaman/Cupid.git
   cd Cupid
   ```

2. **Install Server Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**:
   - Create a `.env` file in the `server` directory and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     NODEMAILER_USER=your_email
     NODEMAILER_PASS=your_email_password
     SPEAKEASY_SECRET=your_speakeasy_secret
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     FACEBOOK_APP_ID=your_facebook_app_id
     FACEBOOK_APP_SECRET=your_facebook_app_secret
     ```

5. **Run the Server**:
   ```bash
   cd ../server
   npm run dev
   ```

6. **Run the Client**:
   ```bash
   cd ../client
   npm start
   ```

7. **Access the App**:
   Navigate to `http://localhost:3000` in your browser or visit the live site at [cupidjsm.vercel.app](https://cupidjsm.vercel.app).

---

## Standout Features

1. **OTP-Based Authentication**:
   - Secure passwordless login using OTPs for enhanced user trust.

2. **Real-Time Messaging**:
   - Reliable and fast communication with integrated Socket.IO.

3. **Intuitive Interface**:
   - Simple, user-friendly design for effortless navigation.

4. **Scalable Tech Stack**:
   - Built with the MERN stack, ensuring adaptability and performance.

---

## Future Enhancements

While Cupid already offers a robust feature set, we are excited to introduce:
- **E-Commerce Integration**:
   - Allow users to purchase gifts for matches directly within the app.

- **Reservation System**:
   - Schedule virtual dates with calendar integration.

- **AI-Powered Matchmaking**:
   - Enhance compatibility suggestions using advanced algorithms.

- **Mobile App Development**:
   - Expand to Android and iOS using React Native.

- **Privacy-First Features**:
   - Include disappearing messages and end-to-end encryption.

---

## Contribution
We welcome contributions to make Cupid even better! Here's how you can get involved:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push your branch (`git push origin feature-name`).
5. Submit a Pull Request for review.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
We'd love to hear your thoughts or help resolve any issues:
- **Email**: yaman@example.com
- **GitHub**: [Yaman](https://github.com/Yaman)

Feel free to explore, use, and contribute to Cupid!
