document.getElementById('btn-geo').addEventListener('click', () => {
    const resultado = document.getElementById('resultado');
    
    if (!navigator.geolocation) {
        resultado.textContent = 'Seu navegador não suporta geolocalização.';
        return;
    }

    resultado.textContent = 'Buscando sua localização e endereço...';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            resultado.textContent = 'Coordenadas obtidas! Buscando endereço...';

            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=pt-BR`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                
                    const enderecoCompleto = data.display_name || "Endereço não encontrado";
                    
                    resultado.innerHTML = `
                        📍 <strong>Endereço Encontrado:</strong><br>
                        ${enderecoCompleto}
                        <br><br>
                        <small style="color: #888;">(Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)})</small>
                    `;
                })
                .catch(() => {
        
                    resultado.innerHTML = `Latitude: <strong>${lat}</strong> <br>Longitude: <strong>${lon}</strong>`;
                });
        },
        (error) => {
            resultado.textContent = `Erro ao obter localização: ${error.message}`;
        },
        { enableHighAccuracy: true }
    );
});