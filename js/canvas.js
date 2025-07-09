    // Get guest name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    const guestNameDisplay = document.getElementById('guest-name-display');
    if (guestNameDisplay && guestName) {
        guestNameDisplay.textContent = decodeURIComponent(guestName);
    } else if (guestNameDisplay) {
        guestNameDisplay.textContent = 'Tamu Undangan'; // Default text if no name
    }

    // ... (Kode untuk falling canvas, RSVP, Wishes, Navbar aktif tetap di sini) ...













    
