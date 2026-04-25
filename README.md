# Portfolio

A stunning, interactive 3D portfolio website built with modern web technologies. Features a dynamic project management system, beautiful animations, and a responsive design that works on all devices.

## Features

- **3D Animated Background**: Interactive particle system using Three.js
- **Dynamic Project Management**: Add, edit, and delete projects with a beautiful modal interface
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in effects, hover states, and smooth scrolling
- **Local Storage**: Your projects are saved locally and persist between sessions
- **Modern UI**: Glass-morphism effects, gradients, and contemporary design
- **SEO Optimized**: Semantic HTML5 structure with proper meta tags

## Technologies Used

- **HTML5**: Semantic markup and modern structure
- **CSS3**: Advanced styling with animations and responsive design
- **JavaScript (ES6+)**: Modern JavaScript with classes and modules
- **Three.js**: 3D graphics and particle animations
- **LocalStorage**: Client-side data persistence

## Getting Started

1. **Open the Portfolio**: Simply open `index.html` in your web browser
2. **Add Your Projects**: Click "Add New Project" to showcase your work
3. **Customize Information**: Edit the contact details and about section in `index.html`
4. **Deploy Online**: Upload the files to any web hosting service

## Project Management

### Adding Projects
1. Click the "Add New Project" button in the Projects section
2. Fill in the project details:
   - **Project Name**: The title of your project
   - **Description**: A detailed description of what the project does
   - **Technologies**: Comma-separated list of technologies used
   - **Project URL**: Link to the live project or repository (optional)
   - **Image URL**: URL to a project screenshot (optional - auto-generated if not provided)

### Editing Projects
1. Click the edit (✏️) button on any project card
2. Modify the information in the modal
3. Click "Save Project" to update

### Deleting Projects
1. Click the delete (🗑️) button on any project card
2. Confirm the deletion in the popup

## Customization

### Personal Information
Edit these sections in `index.html`:
- **Hero Section**: Update the title and subtitle
- **About Section**: Modify your personal description and skills
- **Contact Section**: Update your email, LinkedIn, and GitHub links

### Styling
All styles are in `styles.css`. Key variables to customize:
```css
:root {
    --primary-color: #667eea;    /* Main brand color */
    --secondary-color: #764ba2;  /* Secondary accent */
    --accent-color: #f093fb;     /* Highlight color */
    --bg-dark: #0f0f23;          /* Background color */
}
```

### 3D Background
The particle system is controlled in `script.js`. You can modify:
- **Particle count**: Change `particlesCount` in `init3DBackground()`
- **Particle color**: Modify the `color` property in `particlesMaterial`
- **Animation speed**: Adjust the rotation values in `animate3D()`

## File Structure

```
3D Portfolio/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality and 3D graphics
└── README.md           # This documentation file
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Deployment Options

### GitHub Pages
1. Upload all files to a GitHub repository
2. Go to Settings → Pages
3. Select source as "Deploy from a branch"
4. Choose main branch and root folder

### Netlify
1. Drag and drop the folder to netlify.com
2. Your site will be live instantly

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically deploy your portfolio

## Tips for Best Results

1. **Project Images**: Use high-quality screenshots (1200x600 recommended)
2. **Descriptions**: Write detailed but concise descriptions (2-3 sentences)
3. **Technologies**: Use standard technology names for better recognition
4. **URLs**: Ensure all links are working and accessible

## Troubleshooting

### 3D Background Not Working
- Check browser console for WebGL errors
- Ensure Three.js CDN is accessible
- Try updating browser to latest version

### Projects Not Saving
- Check if LocalStorage is enabled in browser
- Clear browser cache and try again
- Ensure no privacy extensions are blocking LocalStorage

### Mobile Issues
- Refresh the page after rotating device
- Check if JavaScript is enabled
- Test in different mobile browsers

## Future Enhancements

Consider adding these features:
- Project categories and filtering
- Dark/light theme toggle
- Social sharing buttons
- Contact form integration
- Blog section
- Testimonials
- Analytics integration

## License

This project is open source and available under the [MIT License](LICENSE).

---

Enjoy your beautiful 3D portfolio! If you need help customizing or have questions, feel free to reach out.
