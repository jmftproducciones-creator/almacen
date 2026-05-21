# Trabajo Practico Obligatorio

## Portada

**Tema:** Analisis organizacional, procesos, sistemas y propuesta de mejora para AGD  
**Empresa:** Aceitera General Deheza S.A.  
**Materia:** Gestion de proyectos, auditoria y control de gestion  
**Estudiante:** Completar nombre  
**Profesor:** Completar nombre  
**Fecha:** Mayo de 2026

## Indice

1. Introduccion
2. Perfil de la organizacion
3. Relevamiento de procesos y modelado
4. Evaluacion de sistemas y auditoria
5. Propuesta de proyecto y presupuesto
6. Conclusion y reflexion critica
7. Anexos
8. Referencias

## 1. Introduccion

El presente informe tiene como objetivo analizar la organizacion Aceitera General Deheza S.A. (AGD) desde una mirada administrativa, tecnologica y de control de gestion. La empresa pertenece al sector agroindustrial y alimenticio, con actividades vinculadas a la industrializacion de oleaginosas y cereales, produccion de aceites vegetales, procesamiento de mani, elaboracion de alimentos, exportacion agroindustrial, biodiesel y derivados.

El trabajo relaciona lo observado y relevado con conceptos vistos en clase: estructura organizacional, procesos administrativos, infraestructura tecnologica, auditoria, riesgos, indicadores y gestion de proyectos. A partir de ese analisis se propone una mejora concreta: un sistema de gestion de stock para plantas y almacenes, orientado a registrar ubicaciones, existencias, movimientos y pedidos de reabastecimiento.

## 2. Perfil de la Organizacion

### Identificacion

AGD es una empresa argentina del rubro agroindustrial y alimenticio. Su actividad principal se vincula con la fabricacion de proteinas vegetales en forma de harinas y pellets, aceites vegetales, biodiesel y glicerina refinada. Tambien participa en acopio y comercializacion de granos, logistica ferroviaria y portuaria, produccion agropecuaria, marcas de consumo masivo y procesamiento de mani.

Entre sus marcas y negocios se destacan Natura, Mazola, Sojola, Mayoliva, Copisi y Manley's, ademas de aceites, harinas proteicas, mani confiteria, mayonesas, aderezos, biodiesel y glicerina refinada.

La empresa fue fundada el 22 de julio de 1948 por Adrian Pascual Urquia en General Deheza, Cordoba. Comenzo como una pequena aceitera y, con el paso del tiempo, incorporo nuevas tecnologias, amplio su capacidad productiva, desarrollo plantas industriales, acopios, infraestructura portuaria y operaciones de exportacion.

### Trayectoria

Durante sus primeras decadas, AGD paso del procesamiento de lino hacia cultivos como girasol y mani. Luego incorporo procesos industriales mas complejos, extraccion por solvente, refinacion, envasado, infraestructura logistica y presencia en mercados internacionales.

Actualmente puede caracterizarse como un grupo agroindustrial integrado. Segun informacion institucional de AGD, su funcionamiento se organiza en cuatro unidades de negocio: Agropecuarios, Marcas, Mani, y Cereales y Oleaginosas. Ademas, cuenta con red de acopios en distintas provincias argentinas y plantas industriales distribuidas en Cordoba, Santa Fe y San Luis.

### Estructura organizacional

Por su escala, AGD presenta una estructura mayormente mecanicista, aunque con sectores que pueden funcionar de manera mas organica. Es mecanicista porque posee procesos industriales estandarizados, controles formales, areas diferenciadas, procedimientos, auditoria interna y control de gestion. Sin embargo, en areas vinculadas a tecnologia, agricultura de precision, innovacion y desarrollo de plataformas digitales, puede observarse una tendencia mas organica por la necesidad de adaptacion, analisis de datos y mejora continua.

### Organigrama reconstruido

```text
Directorio / Alta Direccion
|
+-- Gerencia General
    |
    +-- Unidad Agropecuaria
    +-- Unidad Marcas
    +-- Unidad Mani
    +-- Unidad Cereales y Oleaginosas
    +-- Produccion Industrial / Plantas
    +-- Logistica, Ferrocarriles y Puertos
    +-- Red de Acopios
    +-- Administracion y Finanzas
    +-- Recursos Humanos
    +-- Tecnologia / Sistemas
    +-- Control de Gestion
    +-- Auditoria Interna
    +-- Comercializacion y Exportaciones
```

Este organigrama se reconstruye a partir de la informacion publicada por la empresa y de lo relevado. No representa necesariamente el organigrama formal completo, sino una aproximacion academica para explicar su estructura.

### Cultura IT

AGD evidencia una cultura tecnologica desarrollada. No parece una organizacion donde la tecnologia sea gestionada informalmente por los duenos, sino una empresa con sistemas corporativos, plataformas digitales y herramientas especializadas.

Entre los elementos relevados se encuentran portales para proveedores, consulta de pagos, sistemas de Recursos Humanos, recibos digitales, plataformas para clientes y herramientas asociadas a agricultura de precision. Tambien se identifica el ecosistema Experta Tecnologia AGD, orientado a monitoreo de campos, datos productivos y soporte tecnologico para decisiones agropecuarias.

Si bien no se publica oficialmente un departamento de sistemas completo en el organigrama institucional, por la magnitud operativa y el nivel de digitalizacion observado puede inferirse la existencia de un area interna de Tecnologia/Sistemas, complementada posiblemente con servicios tercerizados especializados.

## 3. Relevamiento de Procesos y Modelado

### Proceso seleccionado

Se selecciona el proceso de **Gestion de Stock en planta**, por ser un circuito clave para una empresa agroindustrial. Este proceso impacta en produccion, administracion, compras, logistica, auditoria y control de gestion.

### Descripcion del proceso actual AS-IS

De acuerdo con lo relevado, AGD utiliza ERP J. D. Edwards, software a medida y tambien planillas Excel para determinadas tareas. En el proceso de stock intervienen operarios, responsables de deposito/planta, administracion, compras y control.

El circuito actual puede describirse asi:

1. El area de planta o deposito detecta ingreso, salida o necesidad de insumos/productos.
2. El operario o responsable registra el movimiento en el sistema disponible o en planillas auxiliares.
3. El responsable verifica cantidades fisicas y documentacion asociada.
4. Si corresponde, se actualiza el stock en ERP o sistema interno.
5. Si el nivel de stock es bajo, se solicita reposicion o compra.
6. Administracion o Compras evalua la solicitud.
7. Control de Gestion y Auditoria pueden revisar reportes, diferencias o inconsistencias.
8. Gerencia consulta indicadores y reportes para la toma de decisiones.

### Flujograma AS-IS

```text
Inicio
  |
Detectar ingreso, salida o necesidad de stock
  |
Registrar movimiento en sistema / planilla
  |
Verificar cantidad fisica y documentacion
  |
¿Coincide la informacion?
  |------------------ No ------------------|
  |                                        |
  Si                                       Registrar diferencia
  |                                        |
Actualizar stock en ERP / sistema          Informar a responsable
  |                                        |
¿Stock bajo o necesidad de reposicion? <---|
  |
  |--- No ---> Generar reporte / finalizar
  |
  Si
  |
Solicitar reposicion o compra
  |
Evaluacion de Compras / Administracion
  |
Control y seguimiento
  |
Fin
```

### Puntos de control

Los puntos de control principales son:

- Validacion de usuario para acceder a sistemas.
- Verificacion fisica de cantidades.
- Comparacion entre documentacion y stock real.
- Registro de diferencias.
- Autorizacion para reposicion o compra.
- Revision posterior por Control de Gestion y Auditoria Interna.

## 4. Evaluacion de Sistemas y Auditoria

### Infraestructura tecnologica

La empresa utiliza ERP J. D. Edwards, software a medida y planillas Excel. Esto indica una infraestructura mixta, con sistemas integrados para procesos centrales y herramientas complementarias para necesidades puntuales.

El uso de ERP favorece la integracion entre departamentos, ya que permite centralizar informacion de administracion, compras, stock, produccion y finanzas. Sin embargo, la existencia de planillas Excel puede generar riesgos si se usan fuera de un circuito controlado: duplicacion de datos, errores manuales, versiones desactualizadas o falta de trazabilidad.

### Seguridad logica

Segun lo relevado, los sistemas poseen seguridad de acceso. Esto significa que cada usuario ingresa con credenciales y permisos. En una empresa de esta escala, la seguridad logica resulta fundamental para proteger informacion sensible como datos de proveedores, compras, stock, costos, produccion y reportes internos.

### Backup

Se relevo que la empresa cuenta con un sistema enlatado para backup y que existe una subarea dentro de Tecnologia encargada del tema. Esto representa una practica adecuada, ya que permite recuperar informacion ante fallas, errores humanos, incidentes de seguridad o problemas de infraestructura.

### Auditoria y control de riesgos

AGD cuenta con area de Control de Gestion y Auditoria Interna. Esto fortalece el ambiente de control, porque permite revisar procesos, detectar desvios, evaluar riesgos y proponer mejoras. En el proceso de stock, los riesgos principales son:

- Diferencias entre stock fisico y stock registrado.
- Errores de carga manual.
- Uso de planillas no integradas.
- Falta de trazabilidad del responsable de cada movimiento.
- Demoras en pedidos de reposicion.
- Posibles perdidas, vencimientos o faltantes no detectados a tiempo.

### Indicadores y tableros

La empresa utiliza tableros de control, entre ellos Strategy. Estos reportes permiten que la gerencia evalúe el funcionamiento de la empresa mediante informacion consolidada. Para el proceso de stock, los indicadores recomendables son:

- Stock actual por planta, deposito, estante o ubicacion.
- Cantidad de movimientos diarios.
- Productos bajo stock minimo.
- Diferencias detectadas en inventario.
- Tiempo promedio de reposicion.
- Productos con mayor rotacion.
- Pedidos de reabastecimiento pendientes.

## 5. Propuesta de Proyecto y Presupuesto

### Oportunidad de mejora

La oportunidad de mejora propuesta consiste en implementar un **Sistema de Gestion de Stock General para Plantas**, basado en el prototipo desarrollado en esta carpeta.

El sistema permite:

- Crear un almacen o deposito.
- Cargar estantes con medidas, filas y columnas.
- Ubicar estantes en un plano 2D.
- Visualizar una vista frontal de cada estante.
- Cargar productos por ubicacion.
- Agregar codigo, nombre, cantidad y foto del producto.
- Consultar stock desde un perfil operario.
- Registrar entradas y salidas.
- Solicitar reabastecimiento.
- Mantener historial de movimientos.

Esta propuesta busca reducir errores manuales, mejorar la trazabilidad, facilitar la ubicacion fisica de productos y generar informacion para control de gestion.

### Relacion con el prototipo

El prototipo actual funciona como una demo web. Guarda datos en el navegador mediante `localStorage`, por lo que sirve para demostrar el circuito funcional. Para implementarlo en una empresa real deberia evolucionar hacia una aplicacion con base de datos, autenticacion de usuarios, roles, backups, auditoria de cambios e integracion con ERP.

### Alcance funcional de una version real

- Login con usuarios y roles: administrador, operario, supervisor, auditor.
- Base de datos centralizada.
- Gestion de plantas, depositos, estantes y ubicaciones.
- Registro de productos y codigos internos.
- Movimientos de entrada, salida, ajuste y reabastecimiento.
- Historial auditable por usuario, fecha y motivo.
- Alertas de stock minimo.
- Reportes exportables.
- Integracion futura con ERP J. D. Edwards.

### Metodologia sugerida

Para este proyecto conviene utilizar una metodologia **Agil, basada en Scrum**, porque la solucion puede construirse por incrementos y validarse con usuarios reales de planta.

Se propone trabajar en sprints de dos semanas:

1. Sprint 1: relevamiento detallado y prototipo validado.
2. Sprint 2: usuarios, roles y estructura de almacenes.
3. Sprint 3: carga de productos y movimientos de stock.
4. Sprint 4: reportes, alertas y auditoria.
5. Sprint 5: pruebas piloto en una planta.
6. Sprint 6: ajustes e integracion inicial con sistemas existentes.

Scrum resulta adecuado porque permite recibir devolucion temprana de operarios, responsables de planta, administracion y control de gestion. Un enfoque tradicional podria ser util si el alcance estuviera completamente cerrado, pero en este caso conviene iterar porque los procesos reales suelen tener particularidades por planta.

### Estimacion de horas

| Actividad | Horas estimadas |
|---|---:|
| Relevamiento funcional y entrevistas | 24 |
| Analisis de riesgos y puntos de control | 12 |
| Diseno de base de datos y arquitectura | 20 |
| Diseno UX/UI del sistema | 18 |
| Desarrollo frontend | 45 |
| Desarrollo backend y API | 55 |
| Autenticacion, roles y permisos | 22 |
| Modulo de stock y movimientos | 40 |
| Reportes y alertas | 24 |
| Pruebas funcionales | 24 |
| Documentacion y capacitacion | 16 |
| Puesta en marcha piloto | 20 |
| **Total estimado** | **320 horas** |

### Valor hora profesional

Aplicando la formula de la guia de estudio:

```text
Valor hora = Ingreso mensual objetivo / horas facturables mensuales
```

Ejemplo estimativo:

```text
Ingreso mensual objetivo: $1.920.000
Horas facturables mensuales: 160
Valor hora profesional: $12.000
```

### Costo total estimado

```text
320 horas x $12.000 = $3.840.000
```

El presupuesto laboral profesional estimado para el desarrollo e implementacion piloto es de **$3.840.000**. Este valor no incluye licencias de infraestructura, servidores, mantenimiento mensual ni integraciones avanzadas con ERP.

## 6. Conclusion y Reflexion Critica

El analisis de AGD permite observar la diferencia entre una empresa pequena o mediana y una organizacion agroindustrial de gran escala. En la teoria se estudian estructuras, procesos, sistemas, controles e indicadores como elementos separados; en la realidad empresarial todos esos elementos se relacionan entre si.

AGD muestra una estructura formalizada, procesos controlados, sistemas corporativos, areas de auditoria y control de gestion, y una cultura tecnologica avanzada. Sin embargo, incluso en organizaciones grandes pueden existir oportunidades de mejora, especialmente cuando conviven ERP, software a medida y planillas auxiliares.

El principal desafio para modernizar sistemas administrativos no es solamente incorporar tecnologia, sino lograr que esa tecnologia se integre con los procesos reales, sea adoptada por los usuarios y genere informacion confiable para la toma de decisiones. Por eso, la propuesta de gestion de stock busca aportar trazabilidad, orden visual, control por ubicacion y reportes utiles para la administracion y la auditoria.

## 7. Anexos

### Anexo A: Prototipo de sistema

Se adjunta como anexo el sistema desarrollado en la carpeta del proyecto. El prototipo corresponde a una aplicacion web estatica compuesta por:

- `index.html`
- `styles.css`
- `app.js`

El sistema permite demostrar la propuesta de mejora mediante una interfaz funcional para cargar almacenes, estantes, ubicaciones, productos, fotos, movimientos y pedidos de reabastecimiento.

### Anexo B: Evidencias sugeridas

Para completar la entrega final se recomienda incorporar:

- Capturas del sitio oficial de AGD.
- Capturas del prototipo funcionando.
- Imagen del flujograma.
- Notas de campo o entrevista, si existieron.
- Link del sistema publicado en Render.

## 8. Referencias

Aceitera General Deheza. (s. f.). *Aceitera General Deheza*. https://www.agd.com.ar/

Aceitera General Deheza. (s. f.). *Aceitera General Deheza S.A.* https://www.agd.com.ar/es/aceitera-general-deheza-sa

Agricultura Experta. (2026). *Experta Tecnologia AGD*. https://agriculturaexperta.com/

Render. (2026). *Static Sites*. https://render.com/docs/static-sites/

Render. (2026). *Blueprint YAML Reference*. https://render.com/docs/blueprint-spec
