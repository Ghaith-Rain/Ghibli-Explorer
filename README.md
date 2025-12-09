# 🎬 Studio Ghibli Explorer

A beautiful Angular application that explores the magical world of Studio Ghibli films using the official [Studio Ghibli API](https://ghibliapi.vercel.app).

## ✨ Features

### Core Functionality
- **Browse Films**: Explore all Studio Ghibli films with detailed information
- **Film Details**: View comprehensive details including director, release date, and descriptions
- **Characters**: Discover all characters from Ghibli films
- **Locations**: Explore magical locations from the Ghibli universe
- **Species**: Learn about different species in Ghibli films
- **Vehicles**: View iconic vehicles from Studio Ghibli movies

### Interactive Features
- **Favorites**: Mark films as favorites (stored locally)
- **Notes**: Add personal notes to films with form validation
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Hover Effects**: Delightful animations on cards
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error messages

## 🏗️ Architecture & Requirements Met

This project fulfills all Angular course requirements:

### 1. Functional Features (4 pts) ✓
- Film browsing and detail views
- Lists for people, locations, species, and vehicles
- All features use real API endpoints only

### 2. Code Clarity (2 pts) ✓
- Clean folder structure: `components/`, `services/`, `models/`, `pipes/`, `directives/`
- Readable TypeScript with clear naming conventions
- Well-documented code

### 3. Design (TailwindCSS + IHM) (3 pts) ✓
- Ghibli-inspired pastel color palette
- Soft cards with rounded borders and shadows
- Responsive grid layouts
- Smooth transitions and hover effects

### 4. Custom Directives & Pipes (3 pts) ✓
- **TruncateTextPipe**: Shortens long descriptions with ellipsis
- **HoverFloatDirective**: Adds floating animation on hover

### 5. Angular Components (min 4) (4 pts) ✓
8 components created:
- `FilmListComponent`
- `FilmCardComponent`
- `FilmDetailComponent`
- `PeopleListComponent`
- `LocationsListComponent`
- `SpeciesListComponent`
- `VehiclesListComponent`
- `NavbarComponent`

### 6. Nested Components (3 pts) ✓
- `FilmListComponent` → uses multiple `FilmCardComponent` instances
- `App` → uses `NavbarComponent`

### 7. Shared Angular Services (5 pts) ✓
- **GhibliApiService**: HTTP service for all API calls
- **UiStateService**: Manages local state (favorites, notes, theme)

### 8. Forms + Validation (5 pts) ✓
- Reactive form in `FilmDetailComponent`
- Required field validation
- Minimum length validator (10 characters)
- Error messages styled with Tailwind

### 9. Routing (3 pts) ✓
Routes implemented:
- `/films` → FilmListComponent
- `/films/:id` → FilmDetailComponent
- `/people` → PeopleListComponent
- `/locations` → LocationsListComponent
- `/species` → SpeciesListComponent
- `/vehicles` → VehiclesListComponent

### 10. HTTP Services (3 pts) ✓
- Angular HttpClient for all API requests
- Observable-based data flow
- Error handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI 20.1.0

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Ghibli-Explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to:
```
http://localhost:4200/
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── film-card/
│   │   ├── film-list/
│   │   ├── film-detail/
│   │   ├── people-list/
│   │   ├── locations-list/
│   │   ├── species-list/
│   │   ├── vehicles-list/
│   │   └── navbar/
│   ├── services/
│   │   ├── ghibli-api.service.ts
│   │   └── ui-state.service.ts
│   ├── models/
│   │   ├── film.model.ts
│   │   ├── person.model.ts
│   │   ├── location.model.ts
│   │   ├── species.model.ts
│   │   └── vehicle.model.ts
│   ├── pipes/
│   │   └── truncate-text.pipe.ts
│   ├── directives/
│   │   └── hover-float.directive.ts
│   ├── app.ts
│   ├── app.html
│   ├── app.routes.ts
│   └── app.config.ts
├── styles.css
└── index.html
```

## 🎨 Design Philosophy

The application follows a Ghibli-inspired aesthetic:
- **Color Palette**: Soft pastels (pink, blue, green, teal, amber, indigo)
- **Typography**: Clean and readable fonts
- **Spacing**: Generous padding and margins for breathing room
- **Animations**: Subtle, smooth transitions
- **Responsiveness**: Works beautifully on all screen sizes

## 🔌 API Integration

All data comes from the official Studio Ghibli API:
- **Base URL**: `https://ghibliapi.vercel.app`
- **No Authentication Required**
- **Endpoints Used**:
  - `GET /films` - List all films
  - `GET /films/{id}` - Get film details
  - `GET /people` - List all characters
  - `GET /locations` - List all locations
  - `GET /species` - List all species
  - `GET /vehicles` - List all vehicles

## 🧪 Testing

Run unit tests:
```bash
ng test
```

## 🏗️ Building for Production

Build the project:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## 📝 Implementation Notes

- All features are based on real API endpoints
- No fake relationships or invented API fields
- Local storage is used for favorites and notes (not sent to API)
- Forms are purely local and don't interact with the API
- Clean separation of concerns between components and services

## 🎯 Learning Objectives Covered

This project demonstrates:
- Modern Angular standalone components
- Reactive programming with RxJS
- Form validation with Angular Reactive Forms
- Custom pipes and directives
- Service-based architecture
- HTTP client usage
- Routing and navigation
- State management with signals
- Responsive design with TailwindCSS

## 📚 References

- [Angular Documentation](https://angular.dev)
- [Studio Ghibli API](https://ghibliapi.vercel.app)
- [TailwindCSS Documentation](https://tailwindcss.com)

## 📄 License

This project was created for educational purposes.

---

Made with ❤️ for Studio Ghibli fans

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
