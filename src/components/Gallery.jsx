import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const CATEGORY_MAP = {
  "OBE Stakeholders Meetings": [
    "OBE Stakeholders meeting 2025",
    "College Wide OBE planning session",
    "Stakeholder's meeting with New Horizon"
  ],
  "OBE Meetings": [
    "Departmental OBE meeting",
    "Meeting with College OBE Desk Officer",
    "The Provost and the College OBE Implementation committee",
    "Training of College Staff on OBE implementation",
    "Quality Control Team on a meeting with the Provost"
  ],
  "SIWES": [
    "Visit to our Students for SIWES"
  ],
  "Student Activities": [
    "Student Excursion",
    "A session at the software lab",
    "Students at a construction site within the school",
    "Student Projects",
    "Ni Elvis LAB",
    "At the Build a Bot Event",
    "At the ABUAD-Interswitch Competition 2026",
    "Students being prepped for ABUAD-Zhume (China) Intelligent Control and Manufacturing certificate training",
    "Technical Drawing Tutorials",
    "Power and Control Students on Site Visit",
    "IEEE Student Society Staff Advisor",
    "Students Interacting with External Examiners"
  ],
  "Conferences": [
    "ABUAD International Conference 2024",
    "Award Presentation at NSE Conference, 2025",
    "The NSE Induction ceremony, 2025"
  ],
  "Social Events": [
    "Staff social event",
    "The provost at a staff fitness session"
  ],
  "Other": [
    "At the premise of our technical partner, CABOTA",
    "Staff at a drone development seminar, 2025",
    "Staff at a technical session",
    "HOD, Provost and Alumni representatives"
  ]
};

// Eagerly import all images from assets (ignoring svgs to avoid logos/icons)
const imagesGlob = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}', { eager: true });

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  // Group images
  const groupedImages = { "All": [] };
  Object.keys(CATEGORY_MAP).forEach(cat => {
    groupedImages[cat] = [];
  });
  groupedImages["Other"] = [];

  Object.entries(imagesGlob).forEach(([path, rawUrl]) => {
    // Safely resolve the URL whether Vite returned a string or a module with default export
    const url = typeof rawUrl === 'string' ? rawUrl : rawUrl?.default || rawUrl;

    // Filter out root logos/icons or specific images that shouldn't be in gallery
    if (path.includes('abuad_logo') || path.includes('hero.png') || path.includes('react.svg') || path.includes('vite.svg')) return;

    // extract folder name: '../assets/Folder Name/image.jpg'
    const parts = path.split('/');
    // If it's directly in assets (not in a folder), parts length is 3 (['..', 'assets', 'image.jpg'])
    // We only want images inside subfolders.
    if (parts.length <= 3) return;

    let folder = parts[parts.length - 2];

    let assignedCategory = "Other";
    for (const [cat, folders] of Object.entries(CATEGORY_MAP)) {
      if (folders.includes(folder)) {
        assignedCategory = cat;
        break;
      }
    }

    const imageObj = { url, folder, path };
    groupedImages[assignedCategory].push(imageObj);
    groupedImages["All"].push(imageObj);
  });

  // Only show categories that have images (excluding "All" for a moment)
  const categories = ["All", ...Object.keys(CATEGORY_MAP).filter(cat => groupedImages[cat] && groupedImages[cat].length > 0)];
  if (groupedImages["Other"].length > 0 && !categories.includes("Other")) {
    categories.push("Other");
  }

  const imagesToRender = groupedImages[activeCategory] || [];

  return (
    <div className="content-panel">
      <div className="content-panel-header">
        <h2 className="content-panel-title">Moments &amp; Highlights</h2>
        <p className="content-panel-subtitle">
          A collection of pictures highlighting various activities across the College of Engineering.
        </p>
      </div>

      <div className="gallery-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '10px 18px',
              borderRadius: '100px',
              border: 'none',
              background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
              color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '13.5px',
              fontWeight: 600,
              boxShadow: activeCategory === cat ? 'var(--shadow-md)' : 'var(--shadow-sm)',
              border: activeCategory === cat ? '1px solid var(--primary)' : '1px solid var(--border-color)',
              transition: 'all 0.25s var(--transition-smooth)'
            }}
            onMouseOver={(e) => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = 'var(--primary-tint)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'none';
              }
            }}
          >
            {cat} <span style={{ 
              background: activeCategory === cat ? 'rgba(255,255,255,0.2)' : 'var(--primary-tint)', 
              color: activeCategory === cat ? '#fff' : 'var(--primary)',
              padding: '2px 8px', 
              borderRadius: '12px', 
              fontSize: '11px', 
              marginLeft: '6px' 
            }}>{groupedImages[cat] ? groupedImages[cat].length : 0}</span>
          </button>
        ))}
      </div>

      <div className="gallery-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
        gap: '20px' 
      }}>
        {imagesToRender.map((img, i) => (
          <div 
            key={i} 
            className="gallery-card" 
            style={{ 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              background: 'var(--bg-card)', 
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.3s var(--transition-smooth)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={() => setSelectedImage(img)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--primary-tint)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
          >
            <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={img.url} 
                alt={img.folder} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }} 
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(26, 46, 35, 0.4), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} className="overlay" />
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-card)', zIndex: 2 }}>
              <p style={{ margin: 0, fontSize: '13.5px', fontWeight: 600, color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--primary-light)'
                }}></span>
                {img.folder !== "Other" ? img.folder : "College Activity"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {imagesToRender.length === 0 && (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-color)'
        }}>
          <p>No images found in this category.</p>
        </div>
      )}

      {selectedImage && createPortal(
        <div 
          className="gallery-modal"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(26, 46, 35, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100000,
            padding: '40px',
            cursor: 'pointer',
            animation: 'fadeIn 0.2s ease-out forwards'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            style={{ 
              position: 'relative', 
              maxWidth: '90%', 
              maxHeight: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image/container
          >
            <button 
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              ✕
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.folder} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '80vh', 
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
              }} 
            />
            <div style={{ 
              color: '#fff', 
              textAlign: 'center', 
              marginTop: '20px', 
              fontSize: '16px', 
              fontWeight: 500,
              background: 'rgba(255,255,255,0.1)',
              padding: '8px 20px',
              borderRadius: '100px',
              backdropFilter: 'blur(4px)'
            }}>
              {selectedImage.folder !== "Other" ? selectedImage.folder : "College Activity"}
            </div>
          </div>
        </div>,
        document.body
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .gallery-card:hover img {
          transform: scale(1.05);
        }
        .gallery-card:hover .overlay {
          opacity: 1 !important;
        }
      `}} />
    </div>
  );
}
