export function validateAndFormatRut(rut: string) {
  const rutPattern = /^\d{1,2}\.?\d{3}\.?\d{3}-[\dKk]$/;
  if (!rutPattern.test(rut)) return false;

  rut = rut.replace(/[\.\-]/g, '');
  const dv = rut.slice(-1).toUpperCase();
  const cuerpo = rut.slice(0, -1);

  let suma = 0;
  let multiplo = 2;

  for (let i = 1; i <= cuerpo.length; i++) {
    suma += multiplo * parseInt(cuerpo.charAt(cuerpo.length - i), 10);
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  if (dvCalculado !== dv)return false;

  return `${cuerpo}${dv}`;
}