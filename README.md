# RealtyChance - Real Estate Platform

RealtyChance is a comprehensive real estate platform that connects property buyers, sellers, and renters. The platform provides a seamless experience for property listing, searching, and management.

## Features

- **User Authentication**: Secure login and registration system
- **Property Listings**: Browse, search, and filter properties
- **Property Management**: For property owners to manage their listings
- **Admin Dashboard**: For administrators to verify properties and manage the platform
- **Inquiry System**: Allow users to inquire about properties
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend**: React.js with TypeScript
- **UI Components**: Shadcn UI components
- **Routing**: React Router
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Backend**: Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Python 3.8+
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/realty-chance.git
   cd realty-chance
   ```

## API Documentation

### Base URL
For local development:
```http
http://localhost:8000
```
All API endpoints should be prefixed with this base URL. For example:
- Local: `http://localhost:8000/api/register-seeker/`
- Production: Your deployed domain (e.g., `https://api.realtychance.com/api/register-seeker/`)

### Authentication Endpoints

#### User Registration and Authentication
- **Register as Owner**
  ```http
  POST /api/register-owner/
  ```

- **Register as Seeker**
  ```http
  POST /api/register-seeker/
  ```

- **Login**
  ```http
  POST /api/login/
  ```
  Body:
  ```json
  {
      "phone": "your_phone_number",
      "password": "your_password"
  }
  ```

- **Phone Verification**
  ```http
  POST /api/send-verification-code/
  POST /api/verify-phone/
  ```

- **Check User Role**
  ```http
  GET /api/check-user-role/
  ```

### Property Endpoints

#### Property Management
- **List Properties**
  ```http
  GET /api/properties/
  ```

- **Create Property**
  ```http
  POST /api/properties/
  ```
  Sample Body:
  ```json
  {
      "title": "Beautiful 3BHK Apartment",
      "description": "Modern apartment with great amenities",
      "property_type": "apartment",
      "transaction_type": "sale",
      "price": 1500000,
      "bedrooms": 3,
      "bathrooms": 2,
      "area_sqft": 1500,
      "city": "Mumbai",
      "state": "Maharashtra",
      "locality": "Andheri West",
      "address": "123 ABC Road",
      "amenities": ["parking", "gym", "swimming_pool"]
  }
  ```

- **Property Operations**
  ```http
  GET /api/properties/{id}/
  PUT /api/properties/{id}/
  DELETE /api/properties/{id}/
  ```

#### Special Property Endpoints
- **My Listings**
  ```http
  GET /api/properties/my-listings/
  ```

- **Admin Operations**
  ```http
  PATCH /api/properties/{id}/verify-property/
  GET /api/properties/unverified-properties/
  GET /api/properties/deleted-properties/
  ```

### New Projects Endpoints

#### Project Management
- **List Projects**
  ```http
  GET /api/new-projects/
  ```

- **Create Project**
  ```http
  POST /api/new-projects/
  ```
  Sample Body:
  ```json
  {
      "name": "Green Valley Heights",
      "builder_name": "ABC Builders",
      "description": "Luxury apartment project",
      "location": "Powai",
      "city": "Mumbai",
      "state": "Maharashtra",
      "launch_date": "2024-01-01",
      "possession_date": "2026-12-31",
      "price_range_start": 8000000,
      "price_range_end": 15000000,
      "total_units": 100,
      "available_units": 50,
      "amenities": ["club_house", "garden", "security"]
  }
  ```

- **Project Operations**
  ```http
  GET /api/new-projects/{id}/
  PUT /api/new-projects/{id}/
  DELETE /api/new-projects/{id}/
  ```

#### Special Project Endpoints
- **My Projects**
  ```http
  GET /api/new-projects/my-projects/
  ```

- **Admin Operations**
  ```http
  PATCH /api/new-projects/{id}/approve-project/
  GET /api/new-projects/unapproved-projects/
  ```

### Inquiry Endpoints
```http
GET /api/inquiries/
POST /api/inquiries/
GET /api/inquiries/{id}/
```

### Favorites Endpoints
```http
GET /api/favorites/
POST /api/favorites/{property_id}/add/
DELETE /api/favorites/{property_id}/remove/
```

### Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```http
Authorization: Bearer <your_access_token>
```

### Response Format

Successful responses will have the following format:
```json
{
    "data": {
        // Response data
    },
    "message": "Success message"
}
```

Error responses will have the following format:
```json
{
    "error": "Error message",
    "status": 400
}
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.