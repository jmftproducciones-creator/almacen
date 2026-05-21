# Despliegue en Render

Este proyecto es una aplicacion web estatica: solo usa `index.html`, `styles.css` y `app.js`.

## Opcion recomendada: Static Site

1. Subir esta carpeta a un repositorio de GitHub.
2. Entrar a Render y elegir **New > Static Site**.
3. Conectar el repositorio.
4. Usar estos valores:
   - **Build Command:** dejar vacio.
   - **Publish Directory:** `.`
5. Crear el servicio.

Render va a entregar una URL del tipo:

```text
https://almacen-virtual-agd.onrender.com
```

## Notas para la defensa

- El sistema guarda la informacion en `localStorage`, por eso es una demo funcional sin base de datos.
- Sirve para mostrar el flujo propuesto de gestion de stock: carga de almacen, estantes, ubicaciones, productos, fotos, movimientos y pedidos de reabastecimiento.
- Para una implementacion real en AGD, el siguiente paso seria conectar este prototipo con una base de datos, usuarios por rol, auditoria de movimientos e integracion con ERP.
