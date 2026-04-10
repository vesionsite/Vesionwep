/* 
   Modern Download Page Logic for Vesion
   Handles the direct file download using fetch and blob.
*/

// --- CONFIGURATION ---
// Change the Batch File URL here
const BATCH_FILE_URL = 'https://raw.githubusercontent.com/3tb3301/Vesion-injector/main/Vesion.bat';
// Change the Icon URL in index.html (img tag)
// ---------------------

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-btn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            // Update button UI to show progress
            const originalContent = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            downloadBtn.disabled = true;

            try {
                // Fetch the file
                const response = await fetch(BATCH_FILE_URL);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch file: ${response.statusText}`);
                }

                // Convert to blob
                const blob = await response.blob();
                
                // Create a temporary link and trigger download
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'Vesion.bat'; // Filename to save as
                
                document.body.appendChild(a);
                a.click();
                
                // Cleanup
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                // Reset button UI
                downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                setTimeout(() => {
                    downloadBtn.innerHTML = originalContent;
                    downloadBtn.disabled = false;
                }, 3000);

            } catch (error) {
                console.error('Download failed:', error);
                alert('Download failed. Please try again or check your connection.');
                
                // Reset button UI on error
                downloadBtn.innerHTML = originalContent;
                downloadBtn.disabled = false;
            }
        });
    }
});
