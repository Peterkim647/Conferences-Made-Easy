function createCard(name, description, pictureUrl, startDate, endDate) {
    return `
      <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
          <div class="card-footer text-muted">
            <p class="card-text">${startDate} - ${endDate}</p>

        </div>
      </div>
    `;
  }


window.addEventListener('DOMContentLoaded', async () => {
const url = 'http://localhost:8000/api/conferences/';

try {
    const response = await fetch(url);

    if (!response.ok) {
    // Handle bad response
    } else {
    const data = await response.json();

    const columns = document.querySelectorAll('.col'); // Select all columns

    data.conferences.forEach(async (conference, index) => {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);

        if (detailResponse.ok) {
        const details = await detailResponse.json();
        const name = details.conference.name;
        const description = details.conference.description;
        const startDate = new Date(details.conference.starts).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
          const endDate = new Date(details.conference.ends).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
        const pictureUrl = details.conference.location.picture_url;
        const html = createCard(name, description, pictureUrl, startDate, endDate);

        const columnIndex = index % columns.length; // Calculate the column index
        const column = columns[columnIndex]; // Select the appropriate column
        column.innerHTML += html; // Append the card to the selected column
        }
    });
    }
} catch (e) {
    console.error(e);
    // Handle errors
}
});
