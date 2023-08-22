window.addEventListener('DOMContentLoaded', async () => {
    const locationsSelect = document.getElementById('location');
    const form = document.getElementById('create-conference-form'); // Changed ID to 'create-conference-form'

    const loadLocations = async () => {
        const locationsUrl = 'http://localhost:8000/api/locations/';
        const response = await fetch(locationsUrl);

        if (response.ok) {
            const locationsData = await response.json();

            for (const location of locationsData.locations) {
                const option = document.createElement('option');
                option.value = location.id;
                option.innerHTML = location.name;

                locationsSelect.appendChild(option);
            }
        }
    };

    const clearForm = () => {
        form.reset();
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const conferenceData = {};

        for (const [key, value] of formData.entries()) {
            conferenceData[key] = value;
        };


        conferenceData['location'] = locationsSelect.value;

        const createConferenceUrl = 'http://localhost:8000/api/conferences/';
        const createResponse = await fetch(createConferenceUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conferenceData)
        });

        if (createResponse.ok) {
            clearForm();
        }
    });

    loadLocations();
});
