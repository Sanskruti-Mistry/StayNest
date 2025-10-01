// (() => {
//   'use strict'

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   Array.from(forms).forEach(form => {
//     form.addEventListener('submit', event => {
//       if (!form.checkValidity()) {
//         event.preventDefault()
//         event.stopPropagation()
//       }

//       form.classList.add('was-validated')
//     }, false)
//   })
// })()

// <script>
//   const urlParams = new URLSearchParams(window.location.search);
//   const searchInput = document.querySelector('input[name="q"]');
//   if (searchInput && urlParams.get('q')) {
//     searchInput.value = urlParams.get('q');
//   }
// </script>




(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Persist search input value from URL params
const urlParams = new URLSearchParams(window.location.search);
const searchInput = document.querySelector('input[name="q"]');
if (searchInput && urlParams.get('q')) {
  searchInput.value = urlParams.get('q');
}