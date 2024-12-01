# Quickart - E-commerce Web Application

Quickart is an e-commerce web app designed to provide users with a seamless online shopping experience. The app showcases products across various categories like electronics, fashion, and home appliances.

## Features
- **Product Overview**: Users can explore products from different categories.
- **Shopping Cart**: Add, remove, and view items in the cart.
- **Checkout**: Complete the purchase with an easy checkout process.
- **User Authentication**: Sign up, login, and manage accounts.
- **Progressive Web App (PWA)**: Supports offline functionality and adds to the home screen.

## Technologies Used
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js (with possible integration with MongoDB)
- **Deployment**: Vercel
- **Others**: Preload images, SEO optimizations, structured data

## SEO & PWA Features
### Meta Tags:
- Added description, keywords, robots meta tags for better search engine ranking.
- Custom author meta tag for brand identity.

### Open Graph Tags:
- `og:title`, `og:description`, `og:type`, `og:image`, `og:url` for optimized social media sharing.

### Twitter Cards:
- `twitter:card`, `twitter:site`, `twitter:title`, `twitter:description`, `twitter:image` for Twitter preview.

### Preloading:
- Preloaded important images to improve page load speed.

### Structured Data:
- Added JSON-LD for SEO-rich snippets using Schema.org (Organization schema).

### Manifest for PWA:
- Linked `manifest.json` to enable Progressive Web App support.

### Favicon & Icons:
- Set up multiple sizes of favicon and Apple touch icons for a better mobile experience.

### Canonical Link:
- Implemented `rel="canonical"` to prevent duplicate content issues.

## Environment Variables
Before running the project, set up your environment variables. Example of environment variables are provided in the `.env.example` file. Copy the content into a `.env` file in the root directory of your project.


## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/rishabh3562/coneixement-assignment-frontend.git
    ```

2. Navigate into the project directory:
    ```bash
    cd coneixement
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

## Deployment
This project is deployed on Vercel.

## Screenshots
![Landing Page](https://github.com/user-attachments/assets/f4a0791d-0544-4864-ae6a-65e7977b6dc1)
![Products Page](https://github.com/user-attachments/assets/2c589496-983e-4068-a165-0b5fd654f617)

## Contributing
1. Fork the repository.
2. Create your branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.
