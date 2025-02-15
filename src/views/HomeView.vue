<script setup lang="ts">
import Badge from "@/components/ui/badge/Badge.vue";
import ExampleSpec from "@/assets/example.json";
import { OpenApiSchema } from "@/lib/OpenApiSchema";
import type { RouterView } from "vue-router";

const openApiSchema = new OpenApiSchema(ExampleSpec as any);

console.log(openApiSchema.resolveRef("#/components/schemas/Tag"));
</script>

<template>
  <aside class="flex">
    <nav class="min-w-40 border-r p-3 space-y-1">
      <RouterLink
        v-for="{ path, methods } in openApiSchema.getPaths()"
        :to="{ name: 'path-view', query: { path: path } }"
      >
        <div>
          <b>{{ path }}</b>
          <div class="flex gap-1">
            <Badge
              v-for="method in methods"
              :class="{
                'bg-blue-600': method === 'get',
                'bg-green-600': method === 'post',
                'bg-yellow-600': method === 'put',
                'bg-red-600': method === 'delete',
              }"
            >
              {{ method.toUpperCase() }}
            </Badge>
          </div>
        </div>
      </RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </aside>
</template>
