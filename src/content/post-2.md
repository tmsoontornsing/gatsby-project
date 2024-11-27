---
template: "github"
title: "My second Post"
path: "/second-post"
---
# AutoManual Project 

AutoManual is a PHP-based project designed to dynamically display and manage a collection of manuals. It supports both local markdown files and external API sources, providing a user-friendly interface for navigating and rendering content.

---

## Features

- **Local and External Content Handling**:
  - Fetch and render local .md files stored in the `/manual/` directory.
  - Support for external manuals via API endpoints.

- **Template System**:
  - Dynamically switch between different UI templates. 
  - Built-in template selection feature with fallback to a default template.

- **Pagination**:
  - Display content in paginated form for large collections.
  - Customizable items per page.

- **Search and Metadata Display**:
  - Display metadata (e.g., title, description, keywords) for manuals fetched via API.

- **Navigation Controls**:  
  - Home, Back, and Content links for intuitive navigation.

- **User Customization**:
  - Choose UI templates dynamically.
  - Store user preferences for templates in sessions.

---

## Project Structure

```
AutoManual/
â”œâ”€â”€ manual/       # Directory for local markdown files
â”œâ”€â”€ templates/    # UI templates for rendering 
â”œâ”€â”€ config.txt    # Configuration file
â”œâ”€â”€ index.php     # Main entry point for manual listing
â”œâ”€â”€ show.php      # Renders individual manual content
â”œâ”€â”€ content.php   # Additional content navigation (optional) 
â”œâ”€â”€ vendor/       # Composer dependencies
â””â”€â”€ README.md     # Project documentation
```

---

## Requirements

- **PHP Version**: 7.4 or higher
- **Composer**: For dependency management  
- **External Libraries**: 
  - Parsedown (Markdown parsing)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/AutoManual.git
   ```

2. Navigate to the project directory:
   ```bash 
   cd AutoManual
   ```

3. Install dependencies:
   ```bash
   composer install
   ```

4. Configure the project:
   - Create or modify `config.txt` in the root directory:
     ```
     enable_template_selector=true
     enable_navigation=true
     default_template=github
     ```

5. Ensure the `manual/` directory contains your markdown files.

## Usage

1. **Access the project in your browser**:
   - Navigate to `http://your-server/automanual/index.php`.

2. **Template Selection**: 
   - Use the dropdown menu to select a template. Preferences are saved in the session.

3. **Manual Rendering**:
   - Local manuals are displayed from the `manual/` directory.  
   - External manuals are fetched via the `contentapi` query parameter.

4. **Pagination**:
   - Customize the `page` and `limit` query parameters for pagination.

## Configuration Options

- `config.txt`: 
  - `enable_template_selector`: Enable/disable template switching.
  - `enable_navigation`: Show/hide navigation links.
  - `default_template`: Specify the default template to load.

## Example

Fetch Local Manuals:
```bash
http://your-server/automanual/index.php
```

Fetch External Manuals via API:
```bash
http://your-server/automanual/index.php?contentapi=https://api.example.com/manuals
```

Render a Specific Manual:
```bash  
http://your-server/automanual/show.php?manual=example-manual
```

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Credits

- **Developer**: Your Name
- **Framework**: PHP
- **Markdown Parser**: Parsedown