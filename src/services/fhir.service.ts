import { ObservationDto } from "../dtos/fhir/observation.dto";
import { mapObservation } from "../mappers/fhir-observation.mapper";

const FHIR_BASE_URL = "https://fhir.hl7.pt/r5/fhir";

export async function getObservationsFromFhir(
    code: string = "8310-5",
    patient?: string
): Promise<ObservationDto[]> {

    let url = `${FHIR_BASE_URL}/Observation?code=${encodeURIComponent(code)}`;

    if (patient) {
        url += `&subject=Patient/${patient}`;
    }

    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(`Erro FHIR: ${resposta.status} - ${resposta.statusText}`);
    }

    const bundle = await resposta.json();
    return bundle.entry?.map((entry: any) => mapObservation(entry.resource)) || [];
}

export async function getPatientFromFhir(patientId: string): Promise<any> {
    const url = `${FHIR_BASE_URL}/Patient/${patientId}`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(`Paciente FHIR não encontrado: ${resposta.status}`);
    }

    return resposta.json();
}