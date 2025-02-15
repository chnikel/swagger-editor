import type { OpenAPIV3 } from "openapi-types";

export class OpenApiSchema {
    constructor(public schema: OpenAPIV3.Document) {}

    resolveRef(ref: string): OpenAPIV3.ComponentsObject["schemas"] {
        const path = ref.replace("#/", "").split("/")
        
        let a = this.schema as any

        path.forEach((part) => {
            a = (a as any)[part]
        })

        return a as OpenAPIV3.ComponentsObject["schemas"]
    }
}