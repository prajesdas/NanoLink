document.addEventListener('DOMContentLoaded', () => {
    const shortenForm = document.getElementById('shortenForm');
    const resultDiv = document.getElementById('result');

    shortenForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const urlInput = document.getElementById('url');
        const longUrl = urlInput.value;

        try {
            const response = await fetch('/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ longUrl }),
            });

            if (response.ok) {
                const result = await response.json();
                resultDiv.innerHTML = `Shortened URL: <a href="${result.shortUrl}" target="_blank">${result.shortUrl}</a>`;
            } else {
                resultDiv.innerHTML = 'Error shortening the URL.';
            }
        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An unexpected error occurred.';
        }
    });
});
