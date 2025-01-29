import React from 'react';
import { Instagram, Github, Twitter, Linkedin } from "lucide-react";

const SocialPanel = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/purvaspatel?tab=repositories" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/purvapatel24/" },
    { icon: Instagram, href: "https://instagram.com/purvvvva" },
    { icon: Twitter, href: "https://x.com/purvaspatel" }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-lg rounded-full shadow-xl border border-white/10 p-2">
      <div className="flex items-center gap-3">
        <h3 className='text-white ml-2'>Made by Purva </h3>
        {socialLinks.map(({ icon: Icon, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full hover:bg-white/10 transition-all duration-200 group"
          >
            <Icon 
              size={18} 
              className="text-gray-400 group-hover:text-blue-400 transition-colors duration-200" 
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialPanel;