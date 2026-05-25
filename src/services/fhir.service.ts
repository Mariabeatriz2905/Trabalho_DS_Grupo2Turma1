const FHIR_BASE_URL = 'https://fstream.hl7.pt/r5/fhir';

export async function getObservationsFromFhir(
  code: string = '8310-5',
  patient?: string
) {
  try {
    let url = `${FHIR_BASE_URL}/Observation?code=${encodeURIComponent(code)}`;

    if (patient) {
      url += `&subject=Patient/${patient}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar dados FHIR:", error);
    throw error;
  }
}
``