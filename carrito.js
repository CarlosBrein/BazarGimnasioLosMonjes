let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
document.querySelector(`[data-nombre='${nombre}']`).style.backgroundColor = "black";
document.querySelector(`[data-nombre='${nombre}']`).style.color = "white";

}

function mostrarCarrito() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let listaCarrito = document.getElementById("lista-carrito");
    let total = 0;
    listaCarrito.innerHTML = "";
    carrito.forEach(item => {
        listaCarrito.innerHTML += `<li>${item.nombre} - $${item.precio}</li>`;
        total += item.precio;
    });
    document.getElementById("total").innerText = total;
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

function generarFactura() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    
    let factura = {
        items: carrito,
        total: carrito.reduce((sum, item) => sum + item.precio, 0),
        fecha: new Date().toISOString()
    };
    
    db.collection("facturas").add(factura).then(() => {
        alert("Factura generada correctamente. Revisar en Firestore.");
        localStorage.removeItem("carrito");
        mostrarCarrito();
    }).catch(error => {
        console.error("Error al generar factura:", error);
    });
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
