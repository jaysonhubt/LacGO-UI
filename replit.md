# Lạc GO - Ride Booking Application

## Overview

Lạc GO is a Vietnamese ride-booking application built as a modern web application using Vue.js 3 with TypeScript. The project is currently in its initial development phase with a focus on the frontend implementation and authentication flow. The application features a green-themed UI design and includes mock services to simulate backend functionality during development.

## System Architecture

### Frontend Architecture
- **Framework**: Vue.js 3 with Composition API
- **Language**: TypeScript for type safety and better development experience
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Vuetify 3 for Material Design components
- **State Management**: Pinia for reactive state management
- **Routing**: Vue Router 4 for client-side routing
- **Styling**: Custom CSS with Vuetify theming and Material Design Icons

### Backend Architecture
- **Current State**: Mock services implemented in frontend
- **Planned**: Backend API will be integrated later (API_BASE_URL configured for future use)
- **Authentication**: Token-based authentication using localStorage
- **API Strategy**: RESTful API design with mock implementations

## Key Components

### Authentication System
- **Login/Registration Flow**: Complete user authentication with form validation
- **Password Recovery**: Forgot password with verification code system
- **Route Protection**: Guards for authenticated and guest-only routes
- **Token Management**: localStorage-based token persistence

### State Management
- **Auth Store**: Handles user authentication state and operations
- **User Store**: Manages user profile data and account operations
- **Reactive State**: Pinia stores with Vue 3 reactivity

### UI Components
- **Material Design**: Consistent design language using Vuetify
- **Responsive Layout**: Mobile-first approach with responsive breakpoints
- **Custom Theming**: Green color scheme matching brand identity
- **Icon System**: Material Design Icons integration

### Routing Structure
- **Public Routes**: Login, register, password recovery flows
- **Protected Routes**: Main application layout with nested routes
- **Route Guards**: Authentication-based navigation protection

## Data Flow

### Authentication Flow
1. User submits credentials through login/register forms
2. Auth store processes request through mock API service
3. Successful authentication updates global state and redirects
4. Token and user data persisted in localStorage
5. Route guards check authentication status for protected routes

### State Updates
1. Components dispatch actions to Pinia stores
2. Stores handle business logic and API calls
3. Reactive state updates trigger component re-renders
4. Persistent data saved to localStorage when needed

## External Dependencies

### Core Dependencies
- **Vue 3**: Frontend framework with Composition API
- **Vuetify 3**: Material Design component library
- **Pinia**: State management library
- **Vue Router 4**: Client-side routing
- **TypeScript**: Type system for JavaScript

### Development Dependencies
- **Vite**: Build tool and development server
- **Vue TSC**: TypeScript compiler for Vue files

### External Resources
- **Google Fonts**: Roboto font family
- **Material Design Icons**: Icon set via CDN

## Deployment Strategy

### Current Setup
- **Development**: Vite dev server with hot module replacement
- **Build Target**: Modern browsers supporting ES2020
- **Module System**: ESNext modules with bundler resolution
- **Assets**: Static assets served through Vite

### Future Considerations
- **Production Build**: Optimized bundle with code splitting
- **Environment Variables**: API URL configuration through env vars
- **Static Hosting**: Compatible with modern static hosting platforms

## Changelog
- July 03, 2025. Initial setup
- July 03, 2025. UI improvements: Removed all animations, fixed bottom navigation position, improved login screen consistency with gradient design

## Recent Changes
- Removed all animations and hover effects from all views for cleaner, faster UX
- Fixed bottom navigation menu to stay at bottom of screen (position: fixed)
- Updated login screen with gradient header design consistent with other views
- Enhanced UI consistency across Home, Messages, Trips views with gradient backgrounds
- Improved login form with emoji icons and better button styling

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: No animations, fixed bottom menu, clean modern interface with gradients.