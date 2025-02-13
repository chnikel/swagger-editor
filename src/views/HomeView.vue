<script setup lang="ts">
import yaml from "js-yaml";
import type { OpenAPIV3 } from "openapi-types";
import Paths from "@/components/Paths.vue";
import Badge from "@/components/ui/badge/Badge.vue";

const swaggerCode = `openapi: 3.0.0
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9

servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing

paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        "200": # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string`;

const parsed = yaml.load(swaggerCode, {
  json: true,
}) as OpenAPIV3.Document;
</script>

<template>
  <aside class="flex">
    <nav class="min-w-40 border-r p-3 space-y-1">
      <div v-for="i in 3">
        <b>/users</b>
        <div class="flex gap-1">
          <Badge class="bg-green-600">POST</Badge>
          <Badge class="bg-blue-600">GET</Badge>
          <Badge class="bg-yellow-600">PUT</Badge>
          <Badge class="bg-red-600">DELETE</Badge>
        </div>
      </div>
    </nav>
    <main>
      <div class="p-3 border-b">
        <Badge class="bg-green-700">POST</Badge> <span>/users</span>
      </div>

      <pre>{{ parsed.paths }}</pre>


    </main>
  </aside>
</template>
