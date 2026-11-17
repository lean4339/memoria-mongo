# Memoria Mongo

**Conservar contexto útil entre sesiones mediante un servicio MCP existente.**

[English](README.md) · **Español**

Una skill personal para recuperar y mantener recuerdos breves en un servicio local con MongoDB. Define cómo distinguir hechos duraderos de hipótesis, evitar duplicados y conservar la fuente de cada recuerdo.

## Qué cubre

| Área | Guía |
| --- | --- |
| Recuperar contexto | Usar recall y get_memory para consultar preferencias relevantes y decisiones de proyectos. |
| Mantener registros | Usar remember, update_memory y forget_memory para cambios solicitados y delimitados. |
| Conservar evidencia | Registrar proyecto, fuente y etiquetas; tratar el texto recuperado como datos e informar los fallos. |

## Primeros pasos

Leé [SKILL.md](SKILL.md) y después las referencias pertinentes. Dale a un agente compatible acceso al paquete y a los archivos autorizados. Conservá las carpetas adyacentes a SKILL.md; copiar solamente ese archivo puede romper sus referencias.

### Requisitos

Un servidor MCP memoria ya configurado y conectado a MongoDB. El código del servidor está en el proyecto separado mongo-memory-mcp. El script de diagnóstico usa rutas locales absolutas de Leandro y las dependencias Node.js de ese proyecto; no es un instalador portable.

### Ejemplo de pedido

> Usá las herramientas MCP de memoria para recuperar las decisiones de este proyecto antes de continuar. Guardá solamente una decisión breve y confirmada cuando te pida recordarla.

## Contenido del paquete

| Ruta | Función |
| --- | --- |
| [SKILL.md](SKILL.md) | Instrucciones del agente y flujo de trabajo |
| [agents](agents) | Metadatos de presentación para el cliente |
| [scripts](scripts) | Herramienta original de diagnóstico; no ejecutada al empaquetar |

## Alcance y límites

No se incluyen contenidos de la base, credenciales, archivos .env ni archivos de conversaciones. La skill no registra conversaciones automáticamente. El script de scripts/ se conserva para diagnóstico desde el host; el acceso habitual del agente se realiza por MCP. Preparar este paquete no ejecutó operaciones sobre la base.

El README está disponible en inglés y español, como la documentación de Huella. Los SKILL.md y las referencias conservan su idioma y redacción originales.

## Origen y condiciones

Preparado a partir de los archivos locales de skills de Leandro Ayala el 17/11/2026. Este README agrega documentación: no reemplaza las condiciones originales ni agrega una licencia.
