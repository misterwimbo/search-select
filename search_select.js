document.addEventListener("DOMContentLoaded", function () {
    // Fonction pour injecter le CSS dans le head
    function injectCSS() {
      // Vérifier si le style est déjà injecté
      if (!document.getElementById('WB__unique-modal-search-css__WB')) {
        const style = document.createElement('style');
        style.id = 'WB__unique-modal-search-css__WB'; // ID unique pour éviter les doublons
        style.innerHTML = `
          #WB__customSearchModal__WB li.list-group-item { border: none; cursor: pointer; margin: -7px 0px; }
          #WB__customSearchModal__WB .options-container { margin-top: 5px; }
        `;
        document.head.appendChild(style);
      }
    }
  
    // Fonction pour créer et injecter la modal dans le document
    function createModal() {
      const modalHTML = `
        <div class="modal fade" id="WB__customSearchModal__WB" tabindex="-1" aria-labelledby="__customSearchModalLabel__" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header" style="display:none">
                <h5 class="modal-title" id="__customSearchModalLabel__">Rechercher <span id="__titleSearchData__"></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <input type="text" class="form-control" id="__searchInput__" placeholder="Rechercher...">
                <div class="options-container" style="max-height: 300px; overflow-y: auto;">
                  <ul class="list-group mt-3" id="__optionsList__">
                    <!-- OPTIONS LIST-->
                  </ul>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              </div>
            </div>
          </div>
        </div>`;
  
      // Créer un div temporaire pour contenir le HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = modalHTML;
      // Ajouter le contenu HTML de la modal au body
      document.body.appendChild(tempDiv.firstElementChild);
    }
  
    // Injecter le CSS personnalisé
    injectCSS();
    // Créer et injecter la modal dès que la page est chargée
    createModal();
  
    // Ajouter les événements aux éléments "select" avec la classe "searchable-select"
    document.querySelectorAll(".searchable-select").forEach(function (select) {
      // Créer un conteneur Bootstrap "input-group"
      const inputGroupDiv = document.createElement("div");
      inputGroupDiv.className = "input-group";
  
      // Créer une icône de recherche à l'intérieur de l'input group
      const iconSpan = document.createElement("span");
      iconSpan.className = "input-group-text search-icon";
      iconSpan.innerHTML = '<i class="fa fa-search" style="cursor: pointer;"></i>';
  
      // Insérer le select et l'icône dans le conteneur "input-group"
      select.parentNode.insertBefore(inputGroupDiv, select); // Insérer le conteneur avant le select
      inputGroupDiv.appendChild(select); // Déplacer le select à l'intérieur du conteneur
      inputGroupDiv.appendChild(iconSpan); // Ajouter l'icône à côté du select
  
      // Quand on clique sur l'icône de recherche, ouvrir la modal et afficher les options du select
      iconSpan.addEventListener("click", function () {
        openSearchModal(select);
      });
    });
  
    // Fonction pour ouvrir la modal et afficher les options du select actif
    function openSearchModal(selectElement) {
      const modal = new bootstrap.Modal(document.getElementById('WB__customSearchModal__WB'), {
        backdrop: false,    // Désactive le cadre gris derrière la modal
        keyboard: false     // Empêche la fermeture via la touche "Échap" ou en cliquant en dehors
      });
  
      modal.show();
  
      // Réinitialiser la recherche et les options de la modal
      const optionsList = document.getElementById("__optionsList__");
      const searchInput = document.getElementById("__searchInput__");
  
      searchInput.value = "";
      optionsList.innerHTML = '';
  
      // Si le select a un attribut data-title-search, mettre à jour le titre dans la modal
      const titleSearch = selectElement.getAttribute('data-title-search');
      document.getElementById('__titleSearchData__').textContent = titleSearch || '';
  
      // Ajouter les options du select dans la liste de la modal
      const fragment = document.createDocumentFragment();
      Array.from(selectElement.options).forEach(function (option, index) {
        if (index !== 0) { // Ignorer la première option désactivée
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = option.text;
          li.setAttribute("data-value", option.value);
  
          // Quand une option est sélectionnée, mettre à jour le select et fermer la modal
          li.addEventListener("click", function () {
            selectElement.value = this.getAttribute("data-value");
  
            // Simuler l'événement 'change' manuellement pour déclencher le onchange s'il y en a un
            const event = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(event);
  
            // Aller à l'élément select
            selectElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  
            modal.hide();
          });
  
          fragment.appendChild(li);
        }
      });
      optionsList.appendChild(fragment);
  
      // Ajouter la fonctionnalité de recherche avec debounce
      let debounceTimer;
      searchInput.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const filter = searchInput.value.toLowerCase();
          const items = optionsList.getElementsByTagName("li");
          for (let i = 0; i < items.length; i++) {
            const text = items[i].textContent || items[i].innerText;
            items[i].style.display = text.toLowerCase().indexOf(filter) > -1 ? "" : "none";
          }
        }, 300);
      });
  
      // Focus sur l'input après l'ouverture de la modal
      setTimeout(() => {
        searchInput.focus();
      }, 250);
    }
  });
