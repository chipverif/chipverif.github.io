# Chipverif Open Source

GitHub Pages site showcasing Chipverif's open source CoCoTB verification IPs and projects.

## About

This repository hosts the documentation website for Chipverif's open source verification ecosystem. We build high-quality CoCoTB (Cosimulation Testbench) verification IPs and tools for the chip verification community.

## Projects

- **CoCoTB DPI** - Direct Programming Interface library for CoCoTB
- **CoCoTB Driver** - Universal driver framework for CoCoTB projects
- **VIP Suite** - Multi-VIP repository for verification

Visit [chipverif.github.io](https://chipverif.github.io) to learn more about our projects.

## Local Development

This site is built with Hugo using the Ananke theme.

### Prerequisites

- Hugo (extended version recommended)
- Git

### Running Locally

```bash
hugo server -D
```

Navigate to `http://localhost:1313` to view the site.

### Building for Production

```bash
hugo
```

The static files will be generated in the `public/` directory.

## Repository Structure

```
.
├── config.toml       # Hugo configuration
├── content/          # Page content and markdown files
├── index.html        # Custom landing page
└── .nojekyll         # Disables Jekyll processing on GitHub Pages
```

## Contributing

We welcome contributions! Please feel free to submit issues or pull requests.

## License

This website's content is open source. Individual verification IP projects may have their own licenses.

## Contact

- GitHub: https://github.com/chipverif
- Website: https://chipverif.github.io

## Mission

We are a team passionate about chip verification and open source. Our goal is to provide robust, well-documented verification IP that accelerates verification workflows.
