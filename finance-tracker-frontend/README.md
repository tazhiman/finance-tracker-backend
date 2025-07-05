# Finance Tracker Frontend

A modern React.js frontend application for the Finance Tracker backend services. This application provides a comprehensive interface for managing personal finances, including user authentication, transaction management, budgeting, reporting, and account linking.

## 🚀 Features

### ✅ Implemented Features
- **User Authentication**
  - User registration and login
  - JWT token-based authentication
  - Protected routes
  - Role-based access control (Admin/User)

- **User Management**
  - User profile management
  - Password change functionality
  - Admin panel for user management

- **Dashboard**
  - Financial overview with key metrics
  - Recent transactions display
  - Budget alerts
  - Quick action cards

### 🔄 Planned Features
- **Transaction Management**
  - Add, edit, delete transactions
  - Categorize transactions
  - Filter and search transactions
  - Import/export functionality

- **Budget Management**
  - Create and manage budgets
  - Track spending against budgets
  - Budget alerts and notifications
  - Budget templates

- **Financial Reporting**
  - Expense and income summaries
  - Spending trend analysis
  - Budget vs actual reports
  - Export reports in various formats

- **Account Linking**
  - Link bank accounts
  - Automatic transaction sync
  - Account balance monitoring
  - Multi-account support

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-tracker-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:8081
REACT_APP_ENVIRONMENT=development
```

### Backend Services
Make sure the following backend services are running:

- **User Service**: `http://localhost:8081`
- **Transaction Service**: `http://localhost:8082` (planned)
- **Budget Service**: `http://localhost:8083` (planned)
- **Reporting Service**: `http://localhost:8084` (planned)
- **Account Linking Service**: `http://localhost:8085` (planned)

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── admin/           # Admin components
│   │   └── AdminPanel.tsx
│   ├── dashboard/       # Dashboard components
│   │   └── Dashboard.tsx
│   ├── user/            # User management components
│   │   └── UserProfile.tsx
│   ├── transactions/    # Transaction components (planned)
│   ├── budgets/         # Budget components (planned)
│   ├── reports/         # Report components (planned)
│   ├── accounts/        # Account components (planned)
│   └── layout/          # Layout components
│       └── Layout.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx
├── services/            # API services
│   └── api.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Main application component
└── index.tsx            # Application entry point
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Login**: Users authenticate with username/password
2. **Token Storage**: JWT tokens are stored in localStorage
3. **Auto-refresh**: Tokens are automatically refreshed on API calls
4. **Logout**: Tokens are cleared on logout

### Protected Routes
- `/dashboard` - Main dashboard (requires authentication)
- `/profile` - User profile management
- `/transactions` - Transaction management (planned)
- `/budgets` - Budget management (planned)
- `/reports` - Financial reports (planned)
- `/accounts` - Account linking (planned)
- `/admin` - Admin panel (requires admin role)

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Material Design**: Modern, clean interface using MUI components
- **Dark/Light Theme**: Theme switching capability (planned)
- **Loading States**: Proper loading indicators throughout the app
- **Error Handling**: Comprehensive error messages and validation
- **Accessibility**: WCAG compliant components

## 📱 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🔌 API Integration

The frontend integrates with the following backend endpoints:

### User Service (Port 8081)
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/user/me` - Get current user
- `PUT /api/v1/user/me/password` - Update password
- `PUT /api/v1/user/me/update` - Update user details
- `GET /api/v1/admin/users` - Get all users (admin)
- `GET /api/v1/admin/users/{id}` - Get user by ID (admin)
- `PUT /api/v1/admin/users/{id}` - Update user (admin)
- `DELETE /api/v1/admin/users/{id}` - Delete user (admin)

### Future Services
- **Transaction Service**: CRUD operations for transactions
- **Budget Service**: Budget creation and management
- **Reporting Service**: Financial report generation
- **Account Linking Service**: Bank account integration

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ User authentication and management
- ✅ Basic dashboard
- ✅ Admin panel

### Phase 2 (Next)
- 🔄 Transaction management
- 🔄 Budget creation and tracking
- 🔄 Basic reporting

### Phase 3 (Future)
- 🔄 Advanced analytics
- 🔄 Account linking
- 🔄 Mobile app
- 🔄 Advanced reporting and exports
