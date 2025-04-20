// This script enables fullscreen mermaid diagrams with zoom functionality
document.addEventListener('DOMContentLoaded', function() {
  // Find all mermaid diagrams on the page
  const mermaidDiagrams = document.querySelectorAll('.mermaid');
  
  mermaidDiagrams.forEach((diagram, index) => {
    // Create a container to make the diagram clickable
    const container = document.createElement('div');
    container.className = 'mermaid-container';
    
    // Create a button overlay
    const expandButton = document.createElement('button');
    expandButton.className = 'expand-diagram-btn';
    expandButton.innerHTML = '<svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7"/></svg>';
    expandButton.setAttribute('aria-label', 'Expand diagram');
    expandButton.setAttribute('title', 'Click to expand diagram');
    
    // Wrap the diagram in the container
    diagram.parentNode.insertBefore(container, diagram);
    container.appendChild(diagram);
    container.appendChild(expandButton);
    
    // Add click handler to open modal
    expandButton.addEventListener('click', function(e) {
      e.preventDefault();
      openDiagramModal(diagram, index);
    });
  });
  
  // Create modal only once
  if (!document.getElementById('diagram-modal')) {
    const modal = document.createElement('div');
    modal.id = 'diagram-modal';
    modal.className = 'diagram-modal';
    modal.innerHTML = `
      <div class="diagram-modal-content">
        <div class="diagram-modal-header">
          <div class="zoom-controls">
            <button class="zoom-in" aria-label="Zoom in">+</button>
            <button class="zoom-out" aria-label="Zoom out">-</button>
            <button class="zoom-reset" aria-label="Reset zoom">Reset</button>
          </div>
          <button class="diagram-modal-close" aria-label="Close modal">&times;</button>
        </div>
        <div class="diagram-modal-body">
          <div class="diagram-container"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add event listeners for modal controls
    const closeBtn = modal.querySelector('.diagram-modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Add zoom functionality
    const zoomIn = modal.querySelector('.zoom-in');
    const zoomOut = modal.querySelector('.zoom-out');
    const zoomReset = modal.querySelector('.zoom-reset');
    
    let scale = 1;
    const diagramContainer = modal.querySelector('.diagram-container');
    
    zoomIn.addEventListener('click', function() {
      scale += 0.1;
      diagramContainer.style.transform = `scale(${scale})`;
    });
    
    zoomOut.addEventListener('click', function() {
      if (scale > 0.5) {
        scale -= 0.1;
        diagramContainer.style.transform = `scale(${scale})`;
      }
    });
    
    zoomReset.addEventListener('click', function() {
      scale = 1;
      diagramContainer.style.transform = `scale(${scale})`;
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
  
  function openDiagramModal(diagram, index) {
    const modal = document.getElementById('diagram-modal');
    const diagramContainer = modal.querySelector('.diagram-container');
    
    // Clone the diagram to display in modal
    diagramContainer.innerHTML = '';
    const clonedDiagram = diagram.cloneNode(true);
    
    // Re-render the diagram in the modal to ensure proper sizing
    const svgContent = clonedDiagram.querySelector('svg');
    if (svgContent) {
      // If mermaid has already rendered an SVG, use that
      diagramContainer.appendChild(svgContent.cloneNode(true));
    } else {
      // Otherwise, use the text content and let mermaid render it
      diagramContainer.innerHTML = `<div class="mermaid">${diagram.textContent}</div>`;
      // Re-run mermaid rendering if needed
      if (window.mermaid) {
        window.mermaid.init(undefined, diagramContainer.querySelectorAll('.mermaid'));
      }
    }
    
    // Show the modal
    modal.classList.add('active');
    
    // Reset zoom when opening modal
    scale = 1;
    diagramContainer.style.transform = `scale(${scale})`;
    
    // Add drag functionality for panning
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    
    diagramContainer.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    function startDrag(e) {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      diagramContainer.style.cursor = 'grabbing';
    }
    
    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      diagramContainer.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }
    
    function endDrag() {
      isDragging = false;
      diagramContainer.style.cursor = 'grab';
    }
  }
  
  function closeModal() {
    const modal = document.getElementById('diagram-modal');
    modal.classList.remove('active');
    
    // Remove event listeners for drag when closing
    const diagramContainer = modal.querySelector('.diagram-container');
    diagramContainer.removeEventListener('mousedown', startDrag);
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
  }
});