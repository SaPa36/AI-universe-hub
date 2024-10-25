const loadFeatures = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json(); // Add `await` here to fully resolve the response
    const ais = data.data.tools; // Update to access the correct path if needed

    console.log(ais);
    displayFeatures(ais);
}

const displayFeatures = ais => {
    console.log(ais);

    const aiContainer = document.getElementById('ai-container');

    aiContainer.classList.remove('hidden');

    ais.forEach(ai => {
        // console.log(ai);
        const aiCard = document.createElement('div');
        aiCard.classList = `card bg-base-100 p-5 shadow-xl`;
        aiCard.innerHTML = `
            <figure>
                <img
                src="${ai.image}"
                alt="${ai.name}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${ai.name}</h2>
                <p>${ai.description}</p>
                <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${ai.id}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        aiContainer.appendChild(aiCard);
    });
    toggleLoadingSpinner(false);
}

const handleShowDetail = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const ai = data.data;
    
    showPhoneDetails(ai);
}

const showPhoneDetails = (ai) => {
    console.log(ai); // Use 'ai' instead of 'phone'

    const showDetailContainer = document.getElementById('show-detail-container');
    
    showDetailContainer.innerHTML = `
        <img src="${ai.image}" alt="" />
        <p><span>Description:</span> ${ai?.description}</p>
        <p><span>Published In:</span> ${ai?.published_in}</p>
    `;

    // Show the modal (if your modal setup is correct)
    show_details_modal.showModal();
}

const handleStartByDate = () => {
    toggleLoadingSpinner(true);
    loadFeatures();
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// Initial load
// loadFeatures();