// src/js/include_partials.js

/**
 * Displays a critical error message on the page for debugging.
 * @param {string} message The error message to display.
 */
function displayCriticalError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; background: #f8d7da; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; z-index: 9999; text-align: center; font-weight: bold;';
  errorDiv.innerHTML = `ERROR: ${message}`;
  document.body.appendChild(errorDiv);
  console.error(message);
}

/**
 * Fetches an HTML partial and inserts it into a specified DOM element.
 * @param {string} url The URL of the HTML partial to fetch.
 * @param {string} targetElementId The ID of the DOM element where the partial should be inserted.
 */
async function loadPartial(url, targetElementId) {
  const targetElement = document.getElementById(targetElementId);
  if (!targetElement) {
    const errorMsg = `Target element with ID "${targetElementId}" not found for partial "${url}".`;
    displayCriticalError(errorMsg);
    throw new Error(errorMsg); // Re-throw to propagate error
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorMsg = `HTTP error loading partial "${url}": status ${response.status}.`;
      displayCriticalError(errorMsg);
      throw new Error(errorMsg); // Re-throw to propagate error
    }
    const html = await response.text();
    targetElement.innerHTML = html;
  } catch (error) {
    const errorMsg = `Error fetching partial "${url}": ${error.message}`;
    displayCriticalError(errorMsg);
    throw error; // Re-throw to propagate error
  }
}

/**
 * Dynamically loads a JavaScript file.
 * @param {string} url The URL of the script to load.
 * @returns {Promise<void>} A promise that resolves when the script is loaded.
 */
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => {
      const errorMsg = `Failed to load script: ${url}`;
      displayCriticalError(errorMsg);
      reject(new Error(errorMsg));
    };
    document.body.appendChild(script);
  });
}

