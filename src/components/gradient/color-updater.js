/**
 * This script bridges between our gradient-controller.js and the Gradient class.
 * It adds an updateColors method to the Gradient class that allows us to change the colors dynamically.
 */

// External function to update gradient colors
function addUpdateColorsToGradient(gradientInstance) {
  if (!gradientInstance) {
    console.error("No gradient instance provided");
    return;
  }

  // Add an updateColors method to the gradient instance
  gradientInstance.updateColors = function (colors) {
    if (!colors || !Array.isArray(colors) || colors.length < 4) {
      console.error("Invalid colors array provided to updateColors");
      return false;
    }

    try {
      // Convert the hex/rgb colors to normalized RGB arrays for the shader
      const normalizedColors = colors.map((color) => {
        // If it's already a normalized array, return it
        if (Array.isArray(color)) {
          // Make sure values are between 0 and 1
          return color.map((c) =>
            typeof c === "number" ? Math.min(1, Math.max(0, c)) : 0
          );
        }

        // If it's an RGB string like "rgb(r,g,b)"
        if (typeof color === "string" && color.startsWith("rgb")) {
          const match = color.match(
            /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
          );
          if (match) {
            return [
              parseInt(match[1], 10) / 255,
              parseInt(match[2], 10) / 255,
              parseInt(match[3], 10) / 255,
            ];
          }
        }

        // Ensure it's a hex string
        if (typeof color === "string") {
          // Remove # if present
          color = color.replace(/^#/, "");

          // Expand shorthand hex (e.g., #FFF to #FFFFFF)
          if (color.length === 3) {
            color =
              color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
          }

          // Check if it's a valid hex color
          if (!/^[0-9A-Fa-f]{6}$/.test(color)) {
            console.error("Invalid hex color:", color);
            return [0, 0, 0]; // Default to black
          }

          // Parse hex to RGB components normalized to 0-1
          const r = parseInt(color.substring(0, 2), 16) / 255;
          const g = parseInt(color.substring(2, 4), 16) / 255;
          const b = parseInt(color.substring(4, 6), 16) / 255;

          return [r, g, b];
        }

        console.error("Invalid color format:", color);
        return [0, 0, 0]; // Default black if invalid
      });

      // Update section colors used for waves
      this.sectionColors = normalizedColors;

      // Update the base color (first color)
      if (this.uniforms && this.uniforms.u_baseColor) {
        this.uniforms.u_baseColor.value = normalizedColors[0];
      }

      // Update wave layer colors (remaining colors)
      if (
        this.uniforms &&
        this.uniforms.u_waveLayers &&
        this.uniforms.u_waveLayers.value
      ) {
        for (
          let i = 1;
          i <
          Math.min(
            normalizedColors.length,
            this.uniforms.u_waveLayers.value.length + 1
          );
          i++
        ) {
          if (
            this.uniforms.u_waveLayers.value[i - 1] &&
            this.uniforms.u_waveLayers.value[i - 1].value &&
            this.uniforms.u_waveLayers.value[i - 1].value.color
          ) {
            this.uniforms.u_waveLayers.value[i - 1].value.color.value =
              normalizedColors[i];
          }
        }
      }

      // Update canvas CSS variables for future reference
      const canvas = document.getElementById("gradient-canvas");
      if (canvas) {
        colors.forEach((color, index) => {
          let cssColor;

          // If it's a hex string, use it directly
          if (typeof color === "string") {
            // Ensure it has a # prefix if it's a hex color
            cssColor = color.startsWith("#")
              ? color
              : color.startsWith("rgb")
              ? color
              : `#${color}`;
          }
          // If it's an RGB array, convert to hex for CSS
          else if (Array.isArray(color)) {
            // For normalized 0-1 values
            if (color.every((c) => typeof c === "number" && c <= 1)) {
              cssColor =
                "#" +
                Math.round(color[0] * 255)
                  .toString(16)
                  .padStart(2, "0") +
                Math.round(color[1] * 255)
                  .toString(16)
                  .padStart(2, "0") +
                Math.round(color[2] * 255)
                  .toString(16)
                  .padStart(2, "0");
            }
            // For 0-255 values
            else {
              cssColor =
                "#" +
                Math.round(color[0]).toString(16).padStart(2, "0") +
                Math.round(color[1]).toString(16).padStart(2, "0") +
                Math.round(color[2]).toString(16).padStart(2, "0");
            }
          }

          if (cssColor) {
            canvas.style.setProperty(`--gradient-color-${index + 1}`, cssColor);
          }
        });
      }

      // Mark the canvas as needing a redraw
      if (this.minigl && this.minigl.render) {
        this.minigl.render();
      }

      return true;
    } catch (error) {
      console.error("Error updating gradient colors:", error);
      return false;
    }
  };

  return gradientInstance;
}

export { addUpdateColorsToGradient };
