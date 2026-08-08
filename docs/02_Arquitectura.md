# Arquitectura — Encriptador Studio

## Principio principal

La interfaz no debe conocer los detalles internos de cada algoritmo.

La aplicación debe comunicarse con los algoritmos mediante una interfaz común.

Esto permitirá agregar nuevos algoritmos sin modificar el funcionamiento principal de la aplicación.

---

## Arquitectura

```text
                    ENCRIPTADOR STUDIO
                           │
                           ▼
                        APP.JS
                           │
                           ▼
                  ALGORITHM REGISTRY
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
         Clásico          César          Morse
            │              │              │
            └──────────────┼──────────────┘
                           │
                           ▼
                        RESULTADO