# My HelpDesk App

Welcome to My HelpDesk App! This is a full-stack web application built with Ruby on Rails for the backend and React for the frontend.

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- Ruby (version 3.0.0)
- Rails (version 6.1.7.7)
- Node.js (version 20.12.1)
- Npm (version 10.5.0)
- PostgreSQL


### Clone the Repository

Clone this repository to your local machine using:

```bash
git clone https://github.com/freddyrendon/helpdesk.git
```

### Backend Setup

1. Install dependencies:

```bash
bundle install
```

2. Set up the database:

```bash
rails db:create
rails db:migrate
```

3. Start the Rails server:

```bash
rails server
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd /frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm run start
```

### Testing

#### Backend Testing (RSpec)

We use RSpec for testing the backend. To run the tests, navigate to the backend directory/spec and execute:

```bash
rails spec
```

#### Frontend Testing (Playwright)

We use Playwright for testing the frontend. 
To run the tests, navigate to the frontend directory and execute:

```bash
node e2e.spec.js
```

### Accessing the Application

Once both the Rails server and React development server are running, you can access the application in your web browser at [http://localhost:3006](http://localhost:3006).

## Contributing

Thank you for considering contributing to My Awesome App! Contributions are welcome via pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
