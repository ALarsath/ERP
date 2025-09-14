# CULTrix ERP PWA Documentation

## 1. Overview

CULTrix is a Progressive Web Application (PWA) designed as an Educational Resource Planning (ERP) system for educational institutions. It provides a comprehensive solution for managing academic activities, student information, attendance, fees, projects, and communication between students, teachers, and administrators.

### Key Features
- **Responsive Design**: Works seamlessly on desktops, tablets, and mobile devices
- **Offline Support**: Basic functionality available offline
- **Real-time Updates**: Live data synchronization when online
- **Role-based Access**: Different interfaces and permissions for students, teachers, and administrators
- **Push Notifications**: Real-time alerts and updates

## 2. Technical Architecture

### Technology Stack
- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with Ant Design components
- **State Management**: React Context API
- **Routing**: Next.js App Router
- **UI Components**: Ant Design v5
- **Data Visualization**: AntV Charts
- **Authentication**: Custom authentication system
- **Service Worker**: For PWA functionality

### Project Structure
```
src/
├── app/              # Page-based routing
│   ├── dashboard/
│   ├── academics/
│   ├── attendance/
│   ├── fees/
│   ├── examinations/
│   ├── projects/
│   ├── remarks/
│   └── (auth)/       # Authentication pages
├── components/       # Reusable UI components
│   └── layout/       # Main layout and sidebar
```

## 3. Installation and Setup

### Prerequisites
- Node.js v20+
- npm/yarn/pnpm package manager

### Installation Steps
1. Clone the repository:
```bash
   git clone https://github.com/your-organization/cultrix.git
   cd cultrix
```

2. Install dependencies:
```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
```

3. Start the development server:
```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
```

4. Open the application in your browser:
```
http://localhost:3000
```

## 4. User Guide

### Available Pages
- **Dashboard**: Overview of key metrics and recent activities
- **Personal Info**: Student profile information
- **Academics**: Course materials and resources
- **Attendance**: Attendance records and statistics
- **Fee Management**: Fee payment history and status
- **Examinations**: Exam schedules and results
- **Projects**: Academic projects and team collaboration
- **Remarks**: Submit and track complaints or feedback

### Key Functionalities

#### Sidebar Navigation
- Responsive sidebar with collapse/expand functionality
- Role-based menu items (student, teacher, admin)
- User profile and quick actions
- Logout functionality

#### Attendance Tracking
- Calendar view of attendance records
- Statistics and progress indicators
- Detailed view of attendance history

#### Project Management
- Project list with status indicators
- Team member visualization
- Progress tracking
- Timeline view of project milestones

#### Remarks & Complaints
- Submit new complaints with type, priority, and description
- Track complaint status (pending, in-review, resolved)
- View responses from administrators
- Filter complaints by type and status

## 5. Developer Documentation

### PWA Configuration
The application is configured as a PWA with the following key files:
- `public/manifest.json` - Web App Manifest
- `app/service-worker.js` - Service worker implementation
- `next.config.ts` - PWA configuration settings

### Theming and Styling
The application uses Tailwind CSS with a custom theme defined in `tailwind.config.js`. Key color variables:
- Primary: #3b82f6 (blue)
- Success: #10b981 (green)
- Warning: #f59e0b (yellow)
- Error: #ef4444 (red)

### Component Structure

#### Layout Components
- `MainLayout.tsx`: Main application layout with sidebar and header
- `Sidebar.tsx`: Responsive navigation sidebar
- `PageLayout.tsx`: Alternative page layout (less commonly used)

#### UI Components
- **Cards**: Used for data presentation with consistent styling
- **Tables**: Custom styled tables with responsive design
- **Modals**: Consistent modal dialogs for detailed views
- **Forms**: Styled form components with validation
- **Buttons**: Gradient-styled buttons for primary actions

## 6. Customization Guide

### How to Add a New Page
1. Create a new directory in the `app/` folder
2. Add a `page.tsx` file with the page component
3. Add any necessary components in `components/`
4. Add the page to the sidebar menu in `components/layout/Sidebar.tsx`

### How to Modify the Theme
1. Edit color variables in `tailwind.config.js`
2. Add or modify utility classes in `globals.css`
3. Update component styles as needed

## 7. Deployment

### Building for Production
```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Starting the Production Server
```bash
npm run start
# or
yarn start
# or
pnpm start
```

## 8. Troubleshooting

### Common Issues

#### Login Page Not Working
- Ensure all dependencies are installed
- Check that the development server is running
- Clear browser cache and try again

#### PWA Features Not Working
- Ensure you're using HTTPS in production
- Check service worker registration in `layout.tsx`
- Verify manifest.json is correctly configured

#### Responsive Design Issues
- Check viewport meta tag in `layout.tsx`
- Ensure Tailwind CSS is properly configured
- Verify responsive utilities are being used correctly

For more detailed information about specific components or features, please consult the code documentation or ask for specific sections to be expanded.