import React from 'react';

const linksList = [
  { url: 'https://site-preview-blocker.com/privacy', text: 'Privacy' },
  { url: 'https://github.com/designviacode/site-preview-blocker', text: 'Github' },
  { url: 'https://site-preview-blocker.com/help/en', text: 'Help' },
]

export const Footer = () => (
  <footer>
    <div className="footer-links">
      {linksList.map((link) => (
        <a
          key={link.text}
          className="footer-links__link"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.text}
        </a>
      ))}
    </div>
  </footer>
);
