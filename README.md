# Ajout d'une fonction de recherche aux sélecteurs Bootstrap 5

Pour faciliter la sélection dans les listes d'options longues, vous pouvez ajouter une fonctionnalité de recherche à vos sélecteurs Bootstrap 5. Voici comment procéder :

1. **Ajoutez le fichier JavaScript nécessaire dans votre page HTML**
2. **Ajoutez la classe `searchable-select` aux éléments `<select>` que vous souhaitez rendre recherchables**

```html
<script src="path/to/searchable-select.js"></script>

<select class="form-select searchable-select" aria-label="Select example">
  <option selected>Choisissez une option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
