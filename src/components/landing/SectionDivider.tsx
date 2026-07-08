/**
 * Separador sutil entre secciones: una línea centrada con un degradé de los
 * colores de la marca (musgo → orquídea → red-wine) que se desvanece en los
 * bordes. Marca el corte de una sección a la siguiente sin cortar el flujo.
 */
export default function SectionDivider() {
  return (
    <div aria-hidden className="flex justify-center px-6 py-10">
      <div
        className="h-[3px] w-full max-w-[220px] rounded-full opacity-80"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-musgo), var(--color-orquidea), var(--color-red-wine), transparent)",
        }}
      />
    </div>
  );
}
