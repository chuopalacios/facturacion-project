$(document).ready(function () {
  load(1);
});

function load(page) {
  var q = $("#q").val();
  $("#loader").fadeIn("slow");
  $.ajax({
    url: "./ajax/buscar_productos.php?action=ajax&page=" + page + "&q=" + q,
    beforeSend: function (objeto) {
      $("#loader").html('<img src="./img/ajax-loader.gif"> Cargando...');
    },
    success: function (data) {
      $(".outer_div").html(data).fadeIn("slow");
      $("#loader").html("");
    },
  });
}

function eliminar(id) {
  var q = $("#q").val();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "GET",
          url: "./ajax/buscar_productos.php",
          data: "id=" + id,
          q: q,
          success: function (datos) {
            swalWithBootstrapButtons.fire(
				"Eliminao!",
				"Eliminado correctamente!",
				"success"
			  );
            load(1);
          },
        });
        
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelado",
          "Has canclado correctamente!)",
          "error"
        );
      }
    });
}
