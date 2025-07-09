
    // --- Image Generation with Gemini API ---
    generateImageBtn.addEventListener('click', async () => {
        const prompt = imagePromptInput.value.trim();
        if (!prompt) {
            alert('Silakan masukkan deskripsi untuk gambar.');
            return;
        }

        imageLoadingSpinner.classList.remove('hidden');
        generatedImageContainer.innerHTML = ''; // Clear previous image

        try {
            const payload = { instances: { prompt: prompt }, parameters: { "sampleCount": 1 } };
            const apiKey = ""; // API key will be provided by Canvas runtime
            const apiUrl = `"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
                const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Generated Image';
                imgElement.classList.add('w-full', 'max-w-md', 'mx-auto', 'rounded-xl', 'shadow-lg', 'mt-4');
                generatedImageContainer.appendChild(imgElement);
            } else {
                console.error("Unexpected API response structure:", result);
                alert("Gagal membuat gambar. Respon API tidak valid.");
            }
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Server Sedang Sibuk. Silakan coba beberapa saat lagi.");
        } finally {
            imageLoadingSpinner.classList.add('hidden');
        }
    });
