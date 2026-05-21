# Almacen virtual

Demo web simple para crear un almacen, agregar estantes con medidas, filas, columnas y existencias con foto.

## Como usar

1. Abre `index.html` en el navegador.
2. Entra en `Admin` para cargar los datos generales del almacen.
3. Crea estantes con codigo, ancho, alto, columnas y filas.
4. Arrastra cada estante dentro del plano 2D para ubicarlo en su posicion real.
5. Haz clic en una celda frontal para cargar productos con codigo, nombre, cantidad y foto opcional.
6. Entra en `Operario` para consultar el mapa sin editar la estructura.
7. Desde `Operario`, selecciona una celda para reportar entradas, salidas o pedidos de reabastecimiento.

Los datos quedan guardados en `localStorage`, incluidas las fotos de prueba, asi que permanecen en el navegador hasta tocar `Reiniciar demo`.
