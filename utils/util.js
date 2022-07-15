import Swal from "sweetalert2";

export function showDialog(title = "Exito!", text = "", icon = "success", actionfn=()=>{}) {
    Swal.fire({
      title: title,
      width: "300px",
      heightAuto: true,
      showConfirmButton: true,
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#333",
      icon:icon,
      text:text,
    }).then(() => {
     actionfn();
    });
  }