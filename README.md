# CV-Powered Dice Analytics

CV-Powered Dice Analytics is an automated dice-tracking system that uses Computer Vision (CV) to bridge the gap between physical tabletop gaming and digital analytics. By using a camera feed and a custom-built processing pipeline, the app automatically recognizes pipped d6 dice rolls and provides real-time statistical visualizations for players.

## Goal of the Project

The goal is to eliminate manual data entry during games like Settlers of Catan or D&D. A camera mounted above a dice tray detects when the dice have settled, reads the values using OpenCV, and updates a React dashboard with historical trends, player-specific luck metrics, and probability distributions.

## Architecture and Workflow

The project utilizes a microservices architecture to handle the distinct needs of high-performance image processing and web-based data management:

- **React Frontend**: Captures the camera feed, displays real-time analytics using D3.js, and manages player sessions.

- **Express.js Gateway**: Acts as the central hub. It handles image uploads from the frontend, manages the MongoDB connection, and orchestrates calls to the ML service.

- **Python ML Service (FastAPI)**: A dedicated service running OpenCV. It performs blob detection and contour analysis to identify die faces and return the integer values of the pips.

- **MongoDB**: Stores the historical record of every roll, game state, and user profile.

## Tech Stack

### Frontend

- **React**: UI Logic and State Management.

- **D3.js / SVG**: Custom data visualizations and probability curves.

- **Tailwind CSS**: Modern, responsive styling.

### Backend and ML

- **Express.js (Node.js)**: API Gateway and business logic.

- **FastAPI (Python)**: High-performance CV processing endpoint.

- **OpenCV**: Computer Vision library for blob detection and image filtering.

- **MongoDB & Mongoose**: NoSQL database for flexible game logging.

## Hardware Requirements (Recommended)

Camera: Standard smartphone or 1080p Webcam.

Dice: Standard pipped d6 (High contrast colors like White/Black or Red/White work best).

Dice Tray: A contained area to prevent dice from leaving the camera's Field of View.

Stand: A tripod or phone mount for a top-down view.

## Sources:

- [Histogram](https://www.react-graph-gallery.com/histogram)
- [Computer Vision](https://golsteyn.com/writing/dice)
- [Blob Detection](https://opencv.org/blog/blob-detection-using-opencv/)
