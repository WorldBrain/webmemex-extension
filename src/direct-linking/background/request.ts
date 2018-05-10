import DirectLinkingBackend from './backend'

export type Annotation = any

// This thing sends the annotation back to the tab once it's loaded
export type AnnotationSender = ({ annotation, tabId }: { annotation: Annotation, tabId }) => void

export interface AnnotationRequest {
    memexLinkOrigin: string
    // urlWithoutProtocol: string
    annotationId: string
    tabId: string
}

interface StoredAnnotationRequest extends AnnotationRequest {
    annotationPromise: Promise<Annotation>
}

interface StoredAnnotationRequestMap {
    [tabId: string]: StoredAnnotationRequest
}

export class AnnotationRequests {
    private requests: StoredAnnotationRequestMap = {}

    constructor(private backend: DirectLinkingBackend, private annotationSender: AnnotationSender) {
    }

    request(request: AnnotationRequest) {
        const annotationPromise = this.backend.fetchAnnotationData(request)
        this.requests[request.tabId] = { ...request, annotationPromise }
    }

    // Called when the tabs DOM is loaded, saying it wants a message when the annotation has been loaded
    followAnnotationRequest(tabId) {
        const request = this.requests[tabId]
        if (!request) {
            return false
        }

        request.annotationPromise = request.annotationPromise.then(annotation => {
            this.annotationSender({ annotation, tabId })
            return annotation
        })

        return true
    }
}
